import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_TRANSFORM, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_MOVE,
    CHANGE_LAYER_ROTATE,
    CHANGE_PAGE_SIZE,
    CHANGE_IMAGE
} from '../../../types/event';
import { caculateAngle } from '../../../../util/functions/math';
import { UNIT_PX, unitValue, pxUnit, stringUnit } from '../../../../util/css/types';
import { POINTERSTART, POINTERMOVE, POINTEREND, RESIZE, DEBOUNCE, CHECKER, LOAD } from '../../../../util/Event';
import { defaultValue, isNotUndefined } from '../../../../util/functions/func';
import { 
    SEGMENT_TYPE_MOVE, 
    SEGMENT_TYPE_RIGHT, 
    SEGMENT_TYPE_LEFT, 
    SEGMENT_TYPE_TOP, 
    SEGMENT_TYPE_BOTTOM, 
    SEGMENT_TYPE_TOP_RIGHT, 
    SEGMENT_TYPE_BOTTOM_RIGHT, 
    SEGMENT_TYPE_BOTTOM_LEFT, 
    SEGMENT_TYPE_TOP_LEFT, 
    SEGMENT_TYPE_ROTATE 
} from '../../../module/ItemTypes';

const SNAP_GRID = 20; 

export default class PredefinedGroupLayerResizer extends UIElement {


    initialize () {
        super.initialize()

        this.$board = this.parent.refs.$board;
        this.$canvas = this.parent.refs.$canvas;
        this.$page = this.parent.refs.$page; 
    }

    template () { 
        return `<div class="predefined-group-resizer"></div>`
    } 

    [LOAD()] () {

        var layers = this.read('selection/current/layer');
        var isImage = this.read('selection/is/image');

        if (!layers) return '';

        if (Array.isArray(layers) == false) {
            layers = [layers]
        }

        return layers.map(item => { 
            var css = this.setRectangle(item);
            var image = isImage ? 'image' : ''; 

            var backgroundCSS = {} 

            if (image == 'image') {
                var backgroundImage = this.read('selection/current/image');

                backgroundCSS = this.read('image/backgroundSize/toCSS', backgroundImage);
            }
            return ` 
                <div class="predefined-layer-resizer ${image}" predefined-layer-id="${item.id}" style="${this.read('css/toString', css)}" >
                    <div class="event-panel" data-value="${SEGMENT_TYPE_MOVE}"></div>
                    <div class="image-panel" style="${this.read('css/toString', backgroundCSS)}"></div>
                    <div class='button-group' predefined-layer-id="${item.id}">
                        <button type="button" data-value="${SEGMENT_TYPE_RIGHT}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_LEFT}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_TOP}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_BOTTOM}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_TOP_RIGHT}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_BOTTOM_RIGHT}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_BOTTOM_LEFT}"></button>
                        <button type="button" data-value="${SEGMENT_TYPE_TOP_LEFT}"></button>
                    </div>
                    <button type='button' data-value='${SEGMENT_TYPE_ROTATE}'></button>         
                    
                    
                </div> 
            `
        })
    }


    setRectangle ({x, y, width, height, id}) {
        var boardOffset = this.boardOffset || this.$board.offset()
        var pageOffset = this.pageOffset || this.$page.offset()
        var canvasScrollLeft = this.canvasScrollLeft || this.$board.scrollLeft();
        var canvasScrollTop = this.canvasScrollTop || this.$board.scrollTop();

        x = pxUnit( unitValue(x) + pageOffset.left - boardOffset.left + canvasScrollLeft ); 
        y = pxUnit( unitValue(y) + pageOffset.top - boardOffset.top  + canvasScrollTop ); 

        x = stringUnit(x);
        y = stringUnit(y);
        width = stringUnit(width); 
        height = stringUnit(height);

        var transform = "none"; 
        
        if (id) {
            transform = this.read('layer/make/transform/rotate', this.read('item/get', id));
        }

        return { 
            width, height, 
            left: x, top: y, 
            ...transform
        }
    }

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow).attr('line-type', this.read('selection/type'))

        if (isShow) {
            this.load()
        }
    }

    caculatePosition (list, key, align, unit = UNIT_PX ) {

        var valueList = list.filter(it => it.align == align).map(it => unitValue(it[key]) )

        if (valueList.length) {
            return Math.max(  Number.MIN_SAFE_INTEGER,  ...valueList )
        }

        return undefined;
    }    

    isShow () {
        return this.read('selection/is/not/empty')
    }

    [EVENT(
        CHANGE_LAYER_TRANSFORM,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_ROTATE,
        CHANGE_LAYER_MOVE,
        CHANGE_LAYER_POSITION,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_PAGE_SIZE,
    )] () { this.refresh() }

    [EVENT(
        CHANGE_IMAGE
    )] () { this.refresh() }    

    caculateRightSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'right')

        if (isNotUndefined(x)) {
            var newWidth = Math.abs(this.moveX - x)
            item.width = pxUnit(newWidth); 
        }
    }

    caculateLeftSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'left')

        if (isNotUndefined(x)) {
            var newWidth = this.width + (this.moveX - x)

            item.x = pxUnit(x) 
            item.width = pxUnit(newWidth); 
        }
    }

    caculateBottomSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'bottom')

        if (isNotUndefined(y)) {
            var newHeight = Math.abs(this.moveY - y);
            item.height = pxUnit(newHeight); 
        }
    }

    caculateTopSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'top')

        if (isNotUndefined(y)) {
            var newHeight = this.height + (this.moveY - y)

            item.y = pxUnit(y) 
            item.height = pxUnit(newHeight); 
        }
    }

    cacualteSizeItem (item, list) {
        if (this.currentType == 'to right') {   // 오른쪽 왼쪽 크기를 맞추기 
            this.caculateRightSize(item, list);
        } else if (this.currentType == 'to bottom') {   // 아래위 크기 맞추기 
            this.caculateBottomSize(item, list);
        } else if (this.currentType == 'to bottom left') {   // 아래위 크기 맞추기 
            this.caculateBottomSize(item, list);
            this.caculateLeftSize(item, list);
        } else if (this.currentType == 'to bottom right') {   // 아래위 크기 맞추기 
            this.caculateBottomSize(item, list);
            this.caculateRightSize(item, list);
        } else if (this.currentType == 'to left') {
            this.caculateLeftSize(item, list)
        } else if (this.currentType == 'to top') {
            this.caculateTopSize(item, list);
        } else if (this.currentType == 'to top right') {
            this.caculateTopSize(item, list);
            this.caculateRightSize(item, list);
        } else if (this.currentType == 'to top left') {
            this.caculateTopSize(item, list);
            this.caculateLeftSize(item, list);
        }
    }

    caculateSnap () {
        // if (this.currentType == SEGMENT_TYPE_MOVE) {
        this.run('guide/snap/caculate', 3, this.currentType);
        // }

    }

    setPosition() {
        this.$el.children().forEach($el => {
            var item = this.read('item/get', $el.attr('predefined-layer-id'));

            $el.cssText(this.read('css/toString', this.setRectangle(item)));
        })
    }

    updatePosition (items) { 

        this.setPosition();
    }


    toRight (item) {
        var {dx} = this;

        this.run('item/set', {
            id: item.id,
            width: pxUnit (item.width + dx)
        });            
    }

    toLeft (item) { 
        var {dx} = this;

        this.run('item/set', {
            id: item.id,
            width: pxUnit (item.width - dx),
            x: pxUnit (item.x + dx)
        });            
    }    

    toBottom (item) {
        var {dy} = this;

        this.run('item/set', {
            id: item.id,
            height: pxUnit (item.height + dy) 
        });            
    }    

    toTop (item) {
        var {dy} = this;
        
        this.run('item/set', {
            id: item.id,
            height: pxUnit (item.height - dy) ,
            y: pxUnit (item.y + dy)
        });            
    }    
    
    moveXY (item) {
        var {dx, dy} = this;
        
        this.run('item/set', {
            id: item.id,
            x: pxUnit (item.x + dx) ,
            y: pxUnit (item.y + dy)
        });
    }

    rotate (item) {
        var {angle} = this; 

        var {rotate} =item;

        rotate = defaultValue(rotate, 0);

        this.run('item/set', {
            id: item.id, 
            rotate: (rotate + Math.floor(angle) - 270)
        });
    }

    resizeComponent () {
        var items = this.rectItems;
        var event = CHANGE_LAYER_SIZE;

        if (this.currentType == SEGMENT_TYPE_TOP) {
            items.forEach(item => { this.toTop(item) })
        } else if (this.currentType == SEGMENT_TYPE_BOTTOM) {
            items.forEach(item => { this.toBottom(item) })
        } else if (this.currentType == SEGMENT_TYPE_RIGHT) {
            items.forEach(item => { this.toRight(item) })
        } else if (this.currentType == SEGMENT_TYPE_LEFT) {
            items.forEach(item => { this.toLeft(item) })
        } else if (this.currentType == SEGMENT_TYPE_BOTTOM_LEFT) {
            items.forEach(item => { this.toBottom(item) })
            items.forEach(item => { this.toLeft(item) })
        } else if (this.currentType == SEGMENT_TYPE_BOTTOM_RIGHT) {
            items.forEach(item => { this.toBottom(item) })
            items.forEach(item => { this.toRight(item) })
        } else if (this.currentType == SEGMENT_TYPE_TOP_RIGHT) {
            items.forEach(item => { this.toTop(item) })
            items.forEach(item => { this.toRight(item) })
        } else if (this.currentType == SEGMENT_TYPE_TOP_LEFT) {
            items.forEach(item => { this.toTop(item) })
            items.forEach(item => { this.toLeft(item) })
        } else if (this.currentType == SEGMENT_TYPE_MOVE) {
            items.forEach(item => { this.moveXY(item) })
        } else if (this.currentType == SEGMENT_TYPE_ROTATE) {
            items.forEach(item => { this.rotate(item) })      
            event = CHANGE_LAYER_ROTATE 
        }

        this.caculateSnap();
        this.emit(event)    

        this.updatePosition(items)        
           
    }


    /* drag  */

    isNotDownCheck () {
        return !this.xy;
    }

    isDownCheck () {
        return this.xy; 
    }

    [POINTERSTART('$el [data-value]') + CHECKER('isNotDownCheck')] (e) {
        e.stopPropagation();
        this.activeButton = e.$delegateTarget;
        this.activeButton.addClass('active');
        var type = e.$delegateTarget.attr('data-value');
        this.currentType = type; 
        var layerId = e.$delegateTarget.parent().attr('predefined-layer-id')
        this.$dom = this.read('item/dom', layerId);
        this.$selectLayer = this.read('item/get', layerId);

        if (this.$dom) {
            var rect = this.$dom.rect()
            this.layerX = unitValue(this.$selectLayer.x);
            this.layerY = unitValue(this.$selectLayer.y);
            this.layerCenterX = rect.left + rect.width/2;
            this.layerCenterY = rect.top + rect.height/2;
        }
        this.xy = e.xy;
        this.rectItems = this.read('selection/current').map(it => {
            return {
                id: it.id,
                x: unitValue(it.x),
                y: unitValue(it.y),
                width: unitValue(it.width),
                height: unitValue(it.height),
                rotate: unitValue(it.rotate || 0)
            }
        })

        this.boardOffset = this.$board.offset()
        this.pageOffset = this.$page.offset()
        this.canvasScrollLeft = this.$board.scrollLeft();
        this.canvasScrollTop = this.$board.scrollTop();        
    }

    [POINTERMOVE('document') + CHECKER('isDownCheck')] (e) {
        this.targetXY = e.xy; 

        if (!this.xy) {
            return; 
        }

        this.dx = e.xy.x - this.xy.x;
        this.dy = e.xy.y - this.xy.y;

        if (this.currentType == 'rotate') {
            this.angle = caculateAngle (e.xy.x - this.layerCenterX,  e.xy.y - this.layerCenterY);
        }

        if (this.read('tool/get', 'snap.grid')) {

            if (this.currentType == 'move') {
                var moveX = this.layerX + this.dx
                var moveY = this.layerY + this.dy
        
                var tempX = moveX - moveX % SNAP_GRID
                var tempY = moveY - moveY % SNAP_GRID
        
                // console.log({tempX, tempY})
        
                this.dx = Math.floor( tempX / SNAP_GRID) * SNAP_GRID - this.layerX; 
                this.dy = Math.floor( tempY / SNAP_GRID) * SNAP_GRID - this.layerY; 

                // console.log('dy', this.dx, 'dx', this.dy)                
            }

        }

        this.run('tool/set', 'moving', true);

        this.resizeComponent();
    }

    isMoved (e) {
        if (!this.xy) return false;
        return this.xy.x != e.xy.x || this.xy.y != e.xy.y; 
    }

    [POINTEREND('document') + CHECKER('isDownCheck')] (e) {
        this.currentType = null; 
        this.xy = null 
        this.moveX = null;
        this.moveY = null; 
        this.rectItems = null 
        this.currentId = null; 
        this.run('tool/set', 'moving', false);
        this.dispatch('history/push', 'Resize a layer');
    }

    [RESIZE('window') + DEBOUNCE(300)] (e) {
        this.refresh();
    }
}