import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { parseParamNumber } from '../../../../util/gl/filter/util';
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_PAGE_SIZE, CHANGE_PAGE_SIZE, EVENT_CHANGE_SELECTION } from '../../../types/event';
import { px } from '../../../../util/css/types';
import { POINTERSTART, POINTERMOVE, DEBOUNCE, POINTEREND, RESIZE, CHECKER } from '../../../../util/Event';

export default class PredefinedPageResizer extends UIElement {


    initialize () {
        super.initialize()

        this.$board = this.parent.refs.$board;
        this.$page = this.parent.refs.$page; 
    }

    template () { 
        return `
            <div class="predefined-page-resizer">
                <button type="button" data-value="to right"></button>
                <!--<button type="button" data-value="to left"></button>-->
                <!--<button type="button" data-value="to top"></button>-->
                <button type="button" data-value="to bottom"></button>
                <!--<button type="button" data-value="to top right"></button>-->
                <button type="button" data-value="to bottom right"></button>
                <!--<button type="button" data-value="to bottom left"></button>-->
                <!--<button type="button" data-value="to top left"></button>-->
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


    setPosition () {
        var page = this.read('selection/current/page')

        if (!page) return; 

        var {width, height} = page; 

        var boardOffset = this.$board.offset()
        var pageOffset = this.$page.offset()
        var canvasScrollLeft = this.$board.scrollLeft();
        var canvasScrollTop = this.$board.scrollTop();

        var x = px (pageOffset.left - boardOffset.left + canvasScrollLeft); 
        var y = px (pageOffset.top - boardOffset.top + canvasScrollTop) ; 

        this.$el.css({ 
            width, height, 
            left: x, top: y
        })

    }    

    isShow () { 
        return this.read('selection/is/page')
    }

    [MULTI_EVENT(
        EVENT_CHANGE_PAGE_SIZE,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    change (style1 = {}, style2 = {}) {

        let style = Object.assign({}, style1, style2);

        Object.keys(style).forEach(key => {
            style[key] = px(style[key]) 
        })

        var page = this.read('selection/current/page')
        page = Object.assign(page, style)
        this.commit(CHANGE_PAGE_SIZE, page)
        this.refresh();
    }

    changeX (dx) {
        var width = this.width + dx; 

        this.change({ width: px( width ) });
    }

    changeY (dy) {
        var height = this.height + dy; 

        this.change({ height: px( height ) });        
    }

    changeXY (dx, dy) {
        var width = this.width + dx; 
        var height = this.height + dy; 

        this.change({ width: px( width ), height: px( height ) });        
    }

    toTop () {
        var dy = this.xy.y - this.targetXY.y
        var height = this.height + dy; 

        return { height }
    }

    toBottom () {
        var dy = this.targetXY.y - this.xy.y
        var height = this.height + dy * 2; 

        return { height }        
    }

    toRight () {
        var dx = this.targetXY.x - this.xy.x
        var width = this.width + dx * 2; 

        return { width }
    }

    toLeft () {
        var dx = this.xy.x  - this.targetXY.x
        var width = this.width + dx; 

        return { width }
    }

    resize () {

        if (this.currentType == 'to top') {
            this.change(this.toTop())
        } else if (this.currentType == 'to bottom') {
            this.change(this.toBottom())
        } else if (this.currentType == 'to right') {
            this.change(this.toRight())
        } else if (this.currentType == 'to left') {
            this.change(this.toLeft())
        } else if (this.currentType == 'to bottom left') {
            this.change(this.toBottom(), this.toLeft())
        } else if (this.currentType == 'to bottom right') {
            this.change(this.toBottom(), this.toRight())
        } else if (this.currentType == 'to top right') {
            this.change(this.toTop(), this.toRight())
        } else if (this.currentType == 'to top left') {
            this.change(this.toTop(), this.toLeft())
        }
    }


    isNotDownCheck () {
        return !this.xy;
    }

    isDownCheck () {
        return this.xy; 
    }    

    [POINTERSTART('$el [data-value]') + CHECKER('isNotDownCheck')] (e) {
        e.stopPropagation();
        var type = e.$delegateTarget.attr('data-value');
        this.currentType = type; 
        this.xy = e.xy;
        this.page = this.read('selection/current/page')
        this.width = parseParamNumber(this.page.width)
        this.height = parseParamNumber(this.page.height)
    }

    [POINTERMOVE('document') + DEBOUNCE(10) + CHECKER('isDownCheck')] (e) {
        this.targetXY = e.xy; 
        this.resize();

    }

    [POINTEREND('document') + CHECKER('isDownCheck')] (e) {
        this.currentType = null; 
        this.xy = null 
        this.dispatch('history/push', 'Resize a layer');        
    }

    [RESIZE('window') + DEBOUNCE(300)] (e) {
        this.refresh();
    }
        
}