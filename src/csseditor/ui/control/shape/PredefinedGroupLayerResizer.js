import UIElement, { EVENT } from '../../../../util/UIElement';
import { CHANGE_EDITOR, CHANGE_LAYER_SIZE, CHANGE_LAYER_POSITION, CHANGE_LAYER_TRANSFORM, CHANGE_SELECTION, CHANGE_LAYER_MOVE,CHANGE_LAYER_ROTATE,CHANGE_PAGE_SIZE,CHANGE_IMAGE,CHANGE_LAYER_BORDER} from '../../../types/event';
import { caculateAngle } from '../../../../util/functions/math';
import { UNIT_PX, unitValue, pxUnit, stringUnit, EMPTY_STRING, SEGMENT_TYPE_RIGHT, SEGMENT_TYPE_LEFT, SEGMENT_TYPE_TOP, SEGMENT_TYPE_BOTTOM, SEGMENT_TYPE_TOP_RIGHT, SEGMENT_TYPE_BOTTOM_RIGHT, SEGMENT_TYPE_BOTTOM_LEFT, SEGMENT_TYPE_TOP_LEFT, SEGMENT_TYPE_MOVE, SEGMENT_TYPE_ROTATE } from '../../../../util/css/types';
import { POINTERSTART, RESIZE, DEBOUNCE, LOAD, MOVE, END } from '../../../../util/Event';
import { defaultValue, isNotUndefined, isArray } from '../../../../util/functions/func';
import { ITEM_SET,DEFAULT_TOOL_SIZE } from '../../../types/ItemTypes';
import { SELECTION_CURRENT_LAYER, SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT, SELECTION_TYPE, SELECTION_IS_NOT_EMPTY } from '../../../types/SelectionTypes';
import { HISTORY_PUSH } from '../../../types/HistoryTypes';
import { ITEM_DOM } from '../../../types/ItemSearchTypes';
import { TOOL_SET, RESIZE_WINDOW } from '../../../types/ToolTypes';
import { GUIDE_SNAP_CACULATE } from '../../../types/GuideTypes';
import { CSS_TO_STRING, IMAGE_BACKGROUND_SIZE_TO_CSS, LAYER_NAME } from '../../../../util/css/make';

const SNAP_GRID = 20; 

export default class PredefinedGroupLayerResizer extends UIElement {

    templateClass () { 
        return 'predefined-group-resizer'
    } 

    [LOAD()] () {

        var layers = this.read(SELECTION_CURRENT_LAYER);
        var isImage = this.read(SELECTION_IS_IMAGE);

        if (!layers) return EMPTY_STRING;

        if (isArray(layers) == false) {
            layers = [layers]
        }

        return layers.map( (item) => { 
            var css = this.setRectangle(item);
            var image = isImage ? 'image' : EMPTY_STRING; 

            var backgroundCSS = {} 

            if (image == 'image') {
                var backgroundImage = this.read(SELECTION_CURRENT_IMAGE);

                backgroundCSS = IMAGE_BACKGROUND_SIZE_TO_CSS(backgroundImage);
            }
            
            var title = LAYER_NAME(item)

            
            return ` 
                <div class="predefined-layer-resizer ${image}" predefined-layer-id="${item.id}" style="${CSS_TO_STRING(css)}" title="${title}" >
                    <div class="event-panel" data-value="${SEGMENT_TYPE_MOVE}"></div>
                    <div class="image-panel" style="display:none;${CSS_TO_STRING(backgroundCSS)}"></div>
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
                </div> 
            `
        })
    }


    setRectangle ({x, y, width, height, id}) {
        var toolSize = this.config('tool.size') || DEFAULT_TOOL_SIZE
        var boardOffset = toolSize['board.offset']
        var pageOffset = toolSize['page.offset']
        var canvasScrollLeft = toolSize['board.scrollLeft'];
        var canvasScrollTop = toolSize['board.scrollTop'];

        x = pxUnit( unitValue(x) + pageOffset.left - boardOffset.left + canvasScrollLeft ); 
        y = pxUnit( unitValue(y) + pageOffset.top - boardOffset.top  + canvasScrollTop ); 

        var left = stringUnit(x);
        var top = stringUnit(y);
        width = stringUnit(width); 
        height = stringUnit(height);

        // var transform = "none"; 
        
        if (id) {
            // transform = this.read(LAYER_MAKE_TRANSFORM, this.get( id));
        }

        return { width, height, left, top}
    }

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow).attr('line-type', this.read(SELECTION_TYPE))

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
        return this.read(SELECTION_IS_NOT_EMPTY)
    }

    [EVENT(
        CHANGE_LAYER_TRANSFORM,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_ROTATE,
        CHANGE_LAYER_MOVE,
        CHANGE_LAYER_BORDER,
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
        this.run(GUIDE_SNAP_CACULATE, 3, this.currentType);
    }

    setPosition() {
        this.$el.children().forEach($el => {
            var item = this.get( $el.attr('predefined-layer-id'));

            $el.cssText(CSS_TO_STRING(this.setRectangle(item)));
        })
    }

    updatePosition (items) { 

        this.setPosition();
    }


    toRight (item) {
        var {dx} = this;

        this.run(ITEM_SET, {
            id: item.id,
            width: pxUnit (item.width + dx)
        });            
    }

    toLeft (item) { 
        var {dx} = this;

        this.run(ITEM_SET, {
            id: item.id,
            width: pxUnit (item.width - dx),
            x: pxUnit (item.x + dx)
        });            
    }    

    toBottom (item) {
        var {dy} = this;

        this.run(ITEM_SET, {
            id: item.id,
            height: pxUnit (item.height + dy) 
        });            
    }    

    toTop (item) {
        var {dy} = this;
        
        this.run(ITEM_SET, {
            id: item.id,
            height: pxUnit (item.height - dy) ,
            y: pxUnit (item.y + dy)
        });            
    }    
    
    moveXY (item) {
        var {dx, dy} = this;
        
        this.run(ITEM_SET, {
            id: item.id,
            x: pxUnit (item.x + dx) ,
            y: pxUnit (item.y + dy)
        });
    }

    rotate (item) {
        var {angle} = this; 

        var {rotate} =item;

        rotate = defaultValue(rotate, 0);

        this.run(ITEM_SET, {
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

    [POINTERSTART('$el [data-value]') + MOVE('moveLayer') + END('moveEndLayer')] (e) {
        e.stopPropagation();
        this.activeButton = e.$delegateTarget;
        this.activeButton.addClass('active');
        var type = e.$delegateTarget.attr('data-value');
        this.currentType = type; 
        var layerId = e.$delegateTarget.parent().attr('predefined-layer-id')
        this.$dom = this.read(ITEM_DOM, layerId);
        this.$selectLayer = this.get( layerId);

        if (this.$dom) {
            var rect = this.$dom.rect()
            this.layerX = unitValue(this.$selectLayer.x);
            this.layerY = unitValue(this.$selectLayer.y);
            this.layerCenterX = rect.left + rect.width/2;
            this.layerCenterY = rect.top + rect.height/2;
        }
        this.xy = e.xy;
        this.rectItems = this.read(SELECTION_CURRENT).map(it => {
            return {
                id: it.id,
                x: unitValue(it.x),
                y: unitValue(it.y),
                width: unitValue(it.width),
                height: unitValue(it.height),
                rotate: unitValue(it.rotate || 0)
            }
        })

    }

    moveLayer () {
        this.targetXY = this.config('pos'); 

        this.dx = this.targetXY.x - this.xy.x;
        this.dy = this.targetXY.y - this.xy.y;

        if (this.currentType == 'rotate') {
            this.angle = caculateAngle (targetXY.x - this.layerCenterX,  targetXY.y - this.layerCenterY);
        }

        if (this.config('snap.grid')) {

            if (this.currentType == 'move') {
                var moveX = this.layerX + this.dx
                var moveY = this.layerY + this.dy
        
                var tempX = moveX - moveX % SNAP_GRID
                var tempY = moveY - moveY % SNAP_GRID
        
                this.dx = Math.floor( tempX / SNAP_GRID) * SNAP_GRID - this.layerX; 
                this.dy = Math.floor( tempY / SNAP_GRID) * SNAP_GRID - this.layerY; 
            }

        }

        this.initConfig('moving', true);

        this.resizeComponent();
    }

    moveEndLayer () {

        switch (this.currentType)  {
        case SEGMENT_TYPE_MOVE:  
            this.dispatch(HISTORY_PUSH, 'Move layer');
            break; 
        case SEGMENT_TYPE_ROTATE:  
            this.dispatch(HISTORY_PUSH, 'Rotate layer');
            break;             
        default: 
            this.dispatch(HISTORY_PUSH, 'Resize layer');
            break; 
        }

        this.currentType = null; 
        this.xy = null 
        this.moveX = null;
        this.moveY = null; 
        this.rectItems = null 
        this.currentId = null; 
        this.initConfig('moving', false);
        
    }

    [EVENT(RESIZE_WINDOW)] () {
        this.refresh()
    }
}