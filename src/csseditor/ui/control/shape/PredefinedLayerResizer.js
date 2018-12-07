import UIElement from '../../../../colorpicker/UIElement';
import TopLeftRadius from './item/TopLeftRadius';
import TopRightRadius from './item/TopRightRadius';
import BottomLeftRadius from './item/BottomLeftRadius';
import BottomRightRadius from './item/BottomRightRadius';
import LayerRotate from './item/LayerRotate';
import Radius from './item/Radius';
import { parseParamNumber } from '../../../../util/filter/functions';
import LayerRadius from './item/LayerRadius';
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER_SIZE, 
    EVENT_CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_MOVE,
    EVENT_CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_MOVE
} from '../../../types/event';

export default class PredefinedLayerResizer extends UIElement {


    initialize () {
        super.initialize()

        this.$board = this.parent.refs.$board;
        this.$canvas = this.parent.refs.$canvas;
        this.$page = this.parent.refs.$page; 
    }

    components () {
        return { TopLeftRadius, LayerRadius, TopRightRadius, BottomLeftRadius, BottomRightRadius, LayerRotate, Radius }
    }

    template () { 
        return `
            <div class="predefined-layer-resizer">
                <div class="event-panel" ref="$eventPanel"></div>
                <div class='button-group' ref='$buttonGroup'>
                    <button type="button" data-value="to right"></button>
                    <button type="button" data-value="to left"></button>
                    <button type="button" data-value="to top"></button>
                    <button type="button" data-value="to bottom"></button>
                    <button type="button" data-value="to top right"></button>
                    <button type="button" data-value="to bottom right"></button>
                    <button type="button" data-value="to bottom left"></button>
                    <button type="button" data-value="to top left"></button>
                </div>

                <Radius></Radius>
                <TopLeftRadius></TopLeftRadius>
                <TopRightRadius></TopRightRadius>
                <BottomLeftRadius></BottomLeftRadius>
                <BottomRightRadius></BottomRightRadius>
                <LayerRadius></LayerRadius>
                <LayerRotate></LayerRotate>
            </div> 
        `
    } 

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow).attr('line-type', this.read('/selection/type'))

        if (isShow) {
            this.setPosition()
        }
    }

    caculatePosition (list, key, align, unit = 'px') {

        var valueList = list.filter(it => it.align == align).map(it => it[key])

        if (valueList.length) {
            return Math.max(  Number.MIN_SAFE_INTEGER,  ...valueList )
        }

        return undefined;
    }    

    setRectangle ({x, y, width, height, id}) {
        var boardOffset = this.boardOffset || this.$board.offset()
        var pageOffset = this.pageOffset || this.$page.offset()
        var canvasScrollLeft = this.canvasScrollLeft || this.$board.scrollLeft();
        var canvasScrollTop = this.canvasScrollTop || this.$board.scrollTop();

        x = parseParamNumber(x, x => x + pageOffset.left - boardOffset.left + canvasScrollLeft) + 'px'; 
        y = parseParamNumber(y, y => y + pageOffset.top - boardOffset.top  + canvasScrollTop) + 'px'; 

        var transform = "none"; 
        
        if (id) {
            transform = this.read('/layer/make/transform', this.read('/item/get', id));
        }

        this.$el.css({ 
            width, height, 
            left: x, top: y, 
            transform
        })
    }

    setPosition () {
        this.setRectangle(this.read('/selection/rect'));
    }

    isShow () {
        if (this.read('/selection/is/group')) {
            return false; 
        }

        return !this.read('/selection/is/page');
    }

    [EVENT_CHANGE_LAYER_TRANSFORM] () { this.refresh() }
    [EVENT_CHANGE_LAYER_SIZE] () {this.refresh()}
    [EVENT_CHANGE_LAYER_MOVE] () {this.refresh()}
    [EVENT_CHANGE_LAYER_POSITION] () {this.refresh()}
    [EVENT_CHANGE_EDITOR] () { this.refresh(); }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }

    caculateRightSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'right')

        if (typeof x != 'undefined') {
            var newWidth = Math.abs(this.moveX - parseParamNumber(x))
            item.width = newWidth; 
        }
    }

    caculateLeftSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'left')

        if (typeof x != 'undefined') {
            var newWidth = this.width + (this.moveX - parseParamNumber(x))

            item.x = x 
            item.width = newWidth; 
        }
    }

    caculateBottomSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'bottom')

        if (typeof y != 'undefined') {
            var newHeight = Math.abs(this.moveY - parseParamNumber(y));
            item.height = newHeight; 
        }
    }

    caculateTopSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'top')

        if (typeof y != 'undefined') {
            var newHeight = this.height + (this.moveY - parseParamNumber(y))

            item.y = y 
            item.height = newHeight; 
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

        var list = this.read('/guide/line/layer', 3);

        if (list.length) {
            this.cacualteSizeItem(item, list);
        }

        return item; 
    }

    updatePosition (items) { 

        // this.caculateSnap()
        // this.caculateActiveButtonPosition(rect);

        items.forEach(item => {
            this.run('/item/set', {
                id: item.id,
                x: item.x + 'px',
                y: item.y + 'px',
                width: item.width + 'px',
                height: item.height + 'px'
            });
        })

        this.setPosition();
    }

    caculateActiveButtonPosition (item) {
        if (!this.activeButton) return;
        var value = this.activeButton.attr('data-value')
        var position = [] 
        var x = parseParamNumber(item.x), y = parseParamNumber(item.y);
        var width = parseParamNumber(item.width), height = parseParamNumber(item.height);

        if (value == 'to right') {
            position = [x + width, y + Math.floor(height/2)]
        } else if (value == 'to bottom') {
            position = [x + Math.floor(width/2), y + height]
        } else if (value == 'to top') {
            position = [x + Math.floor(width/2), y]
        } else if (value == 'to left') {
            position = [x, y + Math.floor(height/2)]
        } else if (value == 'to top left') {
            position = [x, y]
        } else if (value == 'to top right') {
            position = [x + width, y]
        } else if (value == 'to bottom left') {
            position = [x, y + height]
        } else if (value == 'to bottom right') {
            position = [x + width, y + height]
        }

        this.activeButton.attr('data-position', position.map(it => it + 'px').join(', '))
    }


    toRight (item) {
        var dx = this.targetXY.x - this.xy.x;

        if (dx < 0 && Math.abs(dx) > this.width) {
            // var width = Math.abs(dx) - this.width; 
            // var x = this.moveX  - width;  
            // return { x, width} 
        } else {
            item.width += dx;   

        }
    }

    toLeft (item) {
        // top + height 
        var dx = this.xy.x - this.targetXY.x;

        if (dx < 0 && Math.abs(dx) > this.width) {
            // var width = Math.abs(dx) - this.width; 
            // var x = this.moveX  + this.width;  
            // return { x, width} 
        } else {
            item.x -= dx 
            item.width += dx; 
        }
    }    

    toBottom (item) {
        var dy = this.targetXY.y - this.xy.y;

        if (dy < 0 && Math.abs(dy) > this.height) {
            // var height = Math.abs(dy) - this.height; 
            // var y = this.moveY  - height;  
            // return { y, height} 
        } else {
            item.height += dy;   
        }
    }    

    toTop (item) {
        var dy = this.xy.y - this.targetXY.y;
        
        if (dy < 0 && Math.abs(dy) > this.height) {

        } else {
            item.y -= dy 
            item.height += dy; 
        }  

    }        

    resizeComponent () {
        var items = this.read('/clone', this.rectItems);
        if (this.currentType == 'to top') {
            items.forEach(item => { this.toTop(item) })
        } else if (this.currentType == 'to bottom') {
            items.forEach(item => { this.toBottom(item) })
        } else if (this.currentType == 'to right') {
            items.forEach(item => { this.toRight(item) })
        } else if (this.currentType == 'to left') {
            items.forEach(item => { this.toLeft(item) })
        } else if (this.currentType == 'to bottom left') {
            items.forEach(item => { this.toBottom(item) })
            items.forEach(item => { this.toLeft(item) })
        } else if (this.currentType == 'to bottom right') {
            items.forEach(item => { this.toBottom(item) })
            items.forEach(item => { this.toRight(item) })
        } else if (this.currentType == 'to top right') {
            items.forEach(item => { this.toTop(item) })
            items.forEach(item => { this.toRight(item) })
        } else if (this.currentType == 'to top left') {
            items.forEach(item => { this.toTop(item) })
            items.forEach(item => { this.toLeft(item) })
        }
     
        this.updatePosition(items)        
        this.emit(CHANGE_LAYER_SIZE)               
    }


    /* position drag */ 

    isPositionDragCheck () {
        return this.isPositionDrag;
    }

    isNotPositionDragCheck () {
        return !this.isPositionDrag;
    }    

    'pointerstart $eventPanel | isNotPositionDragCheck' (e) {
        this.isPositionDrag = true; 
        this.xy = e.xy;
        var rect = this.read('/selection/rect')

        this.xy = e.xy;
        this.rect = rect
        this.xRectItems = this.read('/selection/ids').map(id => this.read('/item/get', id)).map(it => {
            return {
                id: it.id,
                x: parseParamNumber(it.x),
                y: parseParamNumber(it.y),
                width: parseParamNumber(it.width),
                height: parseParamNumber(it.height)
            }
        })
        this.rectItems = this.read('/clone', this.xRectItems)
        this.moveX = parseParamNumber(rect.x)
        this.moveY = parseParamNumber(rect.y)    
    }   
    
    isLayerCheck () {
        return this.isLayer;
    }

    isNotLayerCheck () {
        return !this.isLayer;
    }

    moveXY (dx, dy) {
        var items = this.read('/clone', this.rectItems);

        items.forEach(item => {
            item.y += dy;
            item.x += dx;
        })

        this.updatePosition(items);
        this.emit(CHANGE_LAYER_MOVE);        
    }

    'pointermove document | isPositionDragCheck' (e) {
        this.targetXY = e.xy;
        this.moveXY(this.targetXY.x - this.xy.x, this.targetXY.y - this.xy.y)
    }


    isNotFirstPosition (e) {
        return this.xy.x !== e.xy.x || this.xy.y !== e.xy.y     
    }     

    'pointerend document | isPositionDragCheck' (e) {
        this.isPositionDrag = false; 
        this.rect = null;

        if (this.isNotFirstPosition(e)) {
            this.dispatch('/history/push', 'Move a layer');
        }
    }


    /* size drag  */

    isNotDownCheck () {
        return !this.xy;
    }

    isDownCheck () {
        return this.xy; 
    }

    'pointerstart $buttonGroup [data-value] | isNotDownCheck' (e) {
        var rect = this.read('/selection/rect')

        this.activeButton = e.$delegateTarget;
        this.activeButton.addClass('active');
        var type = e.$delegateTarget.attr('data-value');
        this.currentType = type; 
        this.xy = e.xy;
        this.rect = rect
        this.xRectItems = this.read('/selection/ids').map(id => this.read('/item/get', id)).map(it => {
            return {
                id: it.id,
                x: parseParamNumber(it.x),
                y: parseParamNumber(it.y),
                width: parseParamNumber(it.width),
                height: parseParamNumber(it.height)
            }
        })
        this.rectItems = this.read('/clone', this.xRectItems)
        this.width = parseParamNumber(rect.width) 
        this.height = parseParamNumber(rect.height)
        this.moveX = parseParamNumber(rect.x)
        this.moveY = parseParamNumber(rect.y)

        this.boardOffset = this.$board.offset()
        this.pageOffset = this.$page.offset()
        this.canvasScrollLeft = this.$board.scrollLeft();
        this.canvasScrollTop = this.$board.scrollTop();

    }

    'pointermove document | isNotPositionDragCheck | isDownCheck' (e) {
        e.preventDefault();        
        this.targetXY = e.xy; 
        this.$page.addClass('moving')

        this.resizeComponent();
    }

    'pointerend document| isNotPositionDragCheck  | isDownCheck' (e) {
        e.preventDefault();        
        if (this.activeButton) {
            this.activeButton.removeClass('active')
        }
        this.currentType = null; 
        this.xy = null 
        this.moveX = null;
        this.moveY = null; 
        this.$page.removeClass('moving')    
        this.dispatch('/history/push', 'Resize a layer');
    }

    'resize window | debounce(300)' (e) {
        this.refresh();
    }
}