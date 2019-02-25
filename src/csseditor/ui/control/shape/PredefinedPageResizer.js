import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { CHANGE_EDITOR, CHANGE_PAGE_SIZE, CHANGE_SELECTION } from '../../../types/event';
import { unitValue, pxUnit, stringUnit } from '../../../../util/css/types';
import { POINTERSTART, POINTERMOVE, DEBOUNCE, POINTEREND, RESIZE, IF, MOVE, END } from '../../../../util/Event';
import { SELECTION_CURRENT_PAGE, SELECTION_IS_PAGE } from '../../../types/SelectionTypes';
import { HISTORY_PUSH } from '../../../types/HistoryTypes';
import { RESIZE_WINDOW } from '../../../types/ToolTypes';
import { keyEach } from '../../../../util/functions/func';

export default class PredefinedPageResizer extends UIElement {

    template () { 
        return `
            <div class="predefined-page-resizer">
                <button type="button" data-value="to right"></button>
                <button type="button" data-value="to bottom"></button>
                <button type="button" data-value="to bottom right"></button>
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
        var page = this.read(SELECTION_CURRENT_PAGE)

        if (!page) return; 

        var {width, height} = page; 
        var toolSize = this.config('tool.size');

        var boardOffset = toolSize['board.offset']
        var pageOffset = toolSize['page.offset']
        var canvasScrollLeft = toolSize['board.scrollLeft'];
        var canvasScrollTop = toolSize['board.scrollTop'];

        var x = pxUnit (pageOffset.left - boardOffset.left + canvasScrollLeft); 
        var y = pxUnit (pageOffset.top - boardOffset.top + canvasScrollTop) ; 

        x = stringUnit(x);
        y = stringUnit(y);
        width = stringUnit(width);
        height = stringUnit(height);

        this.$el.css({ 
            width, height, 
            left: x, top: y
        })

    }    

    isShow () { 
        return this.read(SELECTION_IS_PAGE)
    }

    [EVENT(
        CHANGE_PAGE_SIZE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    change (style1 = {}, style2 = {}) {

        let style = {...style1, ...style2}

        keyEach(style, (key, value) => {
            style[key] = pxUnit(value) 
        })

        var page = this.read(SELECTION_CURRENT_PAGE)
        page = {...page, ...style}
        this.commit(CHANGE_PAGE_SIZE, page)
        this.emit(RESIZE_WINDOW)
        this.refresh();
    }

    changeX (dx) {
        var width = this.width + dx; 

        this.change({ width: pxUnit( width ) });
    }

    changeY (dy) {
        var height = this.height + dy; 

        this.change({ height: pxUnit( height ) });        
    }

    changeXY (dx, dy) {
        var width = this.width + dx; 
        var height = this.height + dy; 

        this.change({ width: pxUnit( width ), height: pxUnit( height ) });        
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
        this.targetXY = this.config('pos')
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

    [POINTERSTART('$el [data-value]') + MOVE('resize') + END('resizeEnd')] (e) {
        e.stopPropagation();
        var type = e.$delegateTarget.attr('data-value');
        this.currentType = type; 
        this.xy = e.xy;
        this.page = this.read(SELECTION_CURRENT_PAGE)
        this.width = unitValue(this.page.width)
        this.height = unitValue(this.page.height)
    }

    resizeEnd () {
        this.dispatch(HISTORY_PUSH, 'Resize a layer');        
    }

    [RESIZE('window') + DEBOUNCE(300)] (e) {
        this.refresh();
    }
        
}