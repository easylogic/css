import UIElement, { EVENT } from '../../../../util/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    CHANGE_SELECTION, 
    CHANGE_ARTBOARD,
    CHANGE_IMAGE} from '../../../types/event';
import { caculateAngle } from '../../../../util/functions/math';
import { EMPTY_STRING, SEGMENT_TYPE_RIGHT, SEGMENT_TYPE_LEFT, SEGMENT_TYPE_TOP, SEGMENT_TYPE_BOTTOM, SEGMENT_TYPE_TOP_RIGHT, SEGMENT_TYPE_BOTTOM_RIGHT, SEGMENT_TYPE_BOTTOM_LEFT, SEGMENT_TYPE_TOP_LEFT, SEGMENT_TYPE_MOVE, SEGMENT_TYPE_ROTATE } from '../../../../util/css/types';
import { POINTERSTART, LOAD, MOVE, END } from '../../../../util/Event';
import { isNotUndefined } from '../../../../util/functions/func';
import { DEFAULT_TOOL_SIZE } from '../../../types/ItemTypes';
import { ITEM_DOM } from '../../../types/ItemSearchTypes';
import { RESIZE_WINDOW } from '../../../types/ToolTypes';
import { GUIDE_SNAP_CACULATE } from '../../../types/GuideTypes';
import { CSS_TO_STRING } from '../../../../util/css/make';
import { editor } from '../../../../editor/editor';
import { Length } from '../../../../editor/unit/Length';

const SNAP_GRID = 20; 

export default class PredefinedGroupLayerResizer extends UIElement {

    templateClass () { 
        return 'predefined-group-resizer'
    } 

    [LOAD()] () {

        var layers = editor.selection.layers
        if (!layers.length) return EMPTY_STRING;

        return layers.map( (item) => { 
            var css = this.setRectangle(item);
            var image = item.backgroundImage ? 'image' : EMPTY_STRING;             
            
            return ` 
                <div class="predefined-layer-resizer ${image}" predefined-layer-id="${item.id}" style="${CSS_TO_STRING(css)}" title="${item.title}" >
                    <div class="event-panel" data-value="${SEGMENT_TYPE_MOVE}"></div>
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


    setRectangle (item) {
        var toolSize = editor.config.get('tool.size') || DEFAULT_TOOL_SIZE
        var boardOffset = toolSize['board.offset']
        var pageOffset = toolSize['page.offset']
        var canvasScrollLeft = toolSize['board.scrollLeft'];
        var canvasScrollTop = toolSize['board.scrollTop'];

        var width = item.width;
        var height = item.height;
        var id = item.id; 
        var left = Length.px( (+item.x) + pageOffset.left - boardOffset.left + canvasScrollLeft ); 
        var top = Length.px( (+item.y) + pageOffset.top - boardOffset.top  + canvasScrollTop ); 

        return { width, height, left, top}
    }

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow)

        if (isShow) {
            this.load()
        }
    }

    caculatePosition (list, key, align ) {

        var valueList = list.filter(it => it.align == align).map(it => +it[key] )

        if (valueList.length) {
            return Math.max(  Number.MIN_SAFE_INTEGER,  ...valueList )
        }

        return undefined;
    }    

    isShow () {
        return editor.selection.isNotEmpty()
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_ARTBOARD,
        CHANGE_IMAGE
    )] () { this.refresh() }

    caculateRightSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'right')

        if (isNotUndefined(x)) {
            var newWidth = Math.abs(this.moveX - x)
            item.width = Length.px(newWidth); 
        }
    }

    caculateLeftSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'left')

        if (isNotUndefined(x)) {
            var newWidth = this.width + (this.moveX - x)

            item.x = Length.px(x) 
            item.width = Length.px(newWidth); 
        }
    }

    caculateBottomSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'bottom')

        if (isNotUndefined(y)) {
            var newHeight = Math.abs(this.moveY - y);
            item.height = Length.px(newHeight); 
        }
    }

    caculateTopSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'top')

        if (isNotUndefined(y)) {
            var newHeight = this.height + (this.moveY - y)

            item.y = Length.px(y) 
            item.height = Length.px(newHeight); 
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
        item.width.plus(dx)
    }

    toLeft (item) { 
        var {dx} = this;
        item.width.plus(-dx);
        item.x.plus(dx);
    }    

    toBottom (item) {
        var {dy} = this;
        item.height.plus(dy);
    }    

    toTop (item) {
        var {dy} = this;
        item.height.plus(-dy);
        item.y.plus(dy);
    }    
    
    moveXY (item) {
        var {dx, dy} = this;
        item.x.plus(dx);
        item.y.plus(dy);        
    }

    rotate (item) {
        var {angle} = this; 
        var rotate = item.rotate;

        item.rotate = (rotate + Math.floor(angle) - 270)
    }

    resizeComponent () {
        var items = this.rectItems;
        var event = CHANGE_LAYER;

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
            event = CHANGE_LAYER 
        }

        this.caculateSnap();
        editor.send(event)    

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
        this.$selectLayer = editor.get(layerId);

        if (this.$dom) {
            var rect = this.$dom.rect()
            this.layerX = +this.$selectLayer.x;
            this.layerY = +this.$selectLayer.y;
            this.layerCenterX = rect.left + rect.width/2;
            this.layerCenterY = rect.top + rect.height/2;
        }
        this.xy = e.xy;
        this.rectItems = editor.selection.items

    }

    moveLayer () {
        this.targetXY = editor.config.get('pos'); 

        this.dx = this.targetXY.x - this.xy.x;
        this.dy = this.targetXY.y - this.xy.y;

        if (this.currentType == 'rotate') {
            this.angle = caculateAngle (targetXY.x - this.layerCenterX,  targetXY.y - this.layerCenterY);
        }

        if (editor.config.get('snap.grid')) {

            if (this.currentType == 'move') {
                var moveX = this.layerX + this.dx
                var moveY = this.layerY + this.dy
        
                var tempX = moveX - moveX % SNAP_GRID
                var tempY = moveY - moveY % SNAP_GRID
        
                this.dx = Math.floor( tempX / SNAP_GRID) * SNAP_GRID - this.layerX; 
                this.dy = Math.floor( tempY / SNAP_GRID) * SNAP_GRID - this.layerY; 
            }

        }

        if (!editor.config.get('moving')) {
            editor.config.set('moving', true);
        }
        
        this.resizeComponent();
    }

    moveEndLayer () {

        this.currentType = null; 
        this.xy = null 
        this.moveX = null;
        this.moveY = null; 
        this.rectItems = null 
        this.currentId = null; 
        editor.config.set('moving', false);
        
    }

    [EVENT(RESIZE_WINDOW)] () {
        this.refresh()
    }
}