import UIElement from '../../../../colorpicker/UIElement';
import TopLeftRadius from './item/TopLeftRadius';
import TopRightRadius from './item/TopRightRadius';
import BottomLeftRadius from './item/BottomLeftRadius';
import BottomRightRadius from './item/BottomRightRadius';
import LayerRotate from './item/LayerRotate';
import Radius from './item/Radius';
import { parseParamNumber } from '../../../../util/filter/functions';
import LayerRadius from './item/LayerRadius';

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

                <div class="guide-horizontal"></div>
                <div class="guide-vertical"></div>
            </div> 
        `
    } 

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow)

        if (isShow) {
            this.setPosition()
        }
    }

    caculatePosition (list, key, align, unit = 'px') {

        var valueList = list.filter(it => it.align == align).map(it => it[key])

        if (valueList.length) {
            return Math.max(  Number.MIN_SAFE_INTEGER,  ...valueList ) + unit  
        }

        return undefined;
    }    

    setPosition () {
        var layer = this.read('/item/current/layer')

        if (!layer) return; 

        var {x, y, width, height} = layer; 
        var boardOffset = this.boardOffset || this.$board.offset()
        var pageOffset = this.pageOffset || this.$page.offset()
        var canvasScrollLeft = this.canvasScrollLeft || this.$board.scrollLeft();
        var canvasScrollTop = this.canvasScrollTop || this.$board.scrollTop();

        x = parseParamNumber(x, x => x + pageOffset.left - boardOffset.left + canvasScrollLeft) + 'px'; 
        y = parseParamNumber(y, y => y + pageOffset.top - boardOffset.top  + canvasScrollTop) + 'px'; 

        this.$el.css({ 
            width, height, 
            left: x, top: y, 
            transform: this.read('/layer/make/transform', layer)
        })

        var rotate = layer.rotate || 0

        if (rotate == 0) {
            this.refs.$buttonGroup.show()
        } else {
            this.refs.$buttonGroup.hide()
        }
    }

    isShow () {
        return !this.read('/item/is/mode', 'page');
    }

    '@changeEditor' () { this.refresh(); }

    caculateRightSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'right')

        if (typeof x != 'undefined') {
            var newWidth = Math.abs(this.moveX - parseParamNumber(x))
            item.width = newWidth + 'px'; 
        }
    }

    caculateLeftSize (item, list) {
        var x = this.caculatePosition(list, 'x', 'left')

        if (typeof x != 'undefined') {
            var newWidth = this.width + (this.moveX - parseParamNumber(x))

            item.x = x 
            item.width = newWidth + 'px'; 
        }
    }

    caculateBottomSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'bottom')

        if (typeof y != 'undefined') {
            var newHeight = Math.abs(this.moveY - parseParamNumber(y));
            item.height = newHeight + 'px'; 
        }
    }

    caculateTopSize (item, list) {
        var y = this.caculatePosition(list, 'y', 'top')

        if (typeof y != 'undefined') {
            var newHeight = this.height + (this.moveY - parseParamNumber(y))

            item.y = y 
            item.height = newHeight + 'px'; 
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

    caculateSnap (item) {

        var layer = this.read('/item/current/layer');
        if (!layer) return item; 
        var list = this.read('/guide/line/layer', 3, layer.id);

        if (list.length) {
            this.cacualteSizeItem(item, list);
        }

        return item; 
    }

    updatePosition (style1 = {}, style2 = {}) { 

        let style = Object.assign({}, style1, style2);

        Object.keys(style).forEach(key => {
            style[key] = style[key] + 'px' 
        })

        var item = this.read('/item/current/layer')

        item = Object.assign(item, style);

        item = this.caculateSnap(item)

        this.caculateActiveButtonPosition(item);
        this.dispatch('/item/set', item);
        this.setPosition();
    }

    caculateActiveButtonPosition (item) {

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


    toRight () {
        var dx = this.targetXY.x - this.xy.x;

        if (dx < 0 && Math.abs(dx) > this.width) {
            var width = Math.abs(dx) - this.width; 
            var x = this.moveX  - width;  
            return { x, width} 
        } else {
            var width = this.width + dx;   
            return { width}
        }
    }

    toLeft () {
        // top + height 
        var dx = this.xy.x - this.targetXY.x;
        var x = this.moveX - dx 
        var width = this.width + dx; 

        if (dx < 0 && Math.abs(dx) > this.width) {
            var width = Math.abs(dx) - this.width; 
            var x = this.moveX  + this.width;  
            return { x, width} 
        } else {
            var x = this.moveX - dx 
            var width = this.width + dx; 
            return { x, width }
        }
    }    

    toBottom () {
        var dy = this.targetXY.y - this.xy.y;

        if (dy < 0 && Math.abs(dy) > this.height) {
            var height = Math.abs(dy) - this.height; 
            var y = this.moveY  - height;  
            return { y, height} 
        } else {
            var height = this.height + dy;   
            return { height}
        }
    }    

    toTop () {
        var dy = this.xy.y - this.targetXY.y;
        
        if (dy < 0 && Math.abs(dy) > this.height) {
            var height = Math.abs(dy) - this.height; 
            var y = this.moveY  + this.height;  

            return { y, height} 
        } else {
            var y = this.moveY - dy 
            var height = this.height + dy; 

            return { y, height }
        }  
    }        

    resizeComponent () {

        if (this.currentType == 'to top') {
            this.updatePosition(this.toTop())
        } else if (this.currentType == 'to bottom') {
            this.updatePosition(this.toBottom())
        } else if (this.currentType == 'to right') {
            this.updatePosition(this.toRight())            
        } else if (this.currentType == 'to left') {
            this.updatePosition(this.toLeft())   
        } else if (this.currentType == 'to bottom left') {
            this.updatePosition(this.toBottom(), this.toLeft())
        } else if (this.currentType == 'to bottom right') {
            this.updatePosition(this.toBottom(), this.toRight())
        } else if (this.currentType == 'to top right') {
            this.updatePosition(this.toTop(), this.toRight())
        } else if (this.currentType == 'to top left') {
            this.updatePosition(this.toTop(), this.toLeft())
        }
    }

    isNotDownCheck () {
        return !this.xy;
    }

    isDownCheck () {
        return this.xy; 
    }

    'pointerstart $el [data-value] | isNotDownCheck' (e) {
        var layer = this.read('/item/current/layer')
        if (!layer) return; 

        this.activeButton = e.$delegateTarget;
        this.activeButton.addClass('active');
        var type = e.$delegateTarget.attr('data-value');
        this.currentType = type; 
        this.xy = e.xy;
        this.layer = layer
        this.width = parseParamNumber(layer.width) 
        this.height = parseParamNumber(layer.height)
        this.moveX = parseParamNumber(layer.x)
        this.moveY = parseParamNumber(layer.y)

        this.boardOffset = this.$board.offset()
        this.pageOffset = this.$page.offset()
        this.canvasScrollLeft = this.$board.scrollLeft();
        this.canvasScrollTop = this.$board.scrollTop();

    }

    'pointermove document | isDownCheck' (e) {
        this.targetXY = e.xy; 
        this.$page.addClass('moving')

        this.resizeComponent();
    }



    'pointerend document | isDownCheck' (e) {
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