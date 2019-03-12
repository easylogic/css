import UIElement, { EVENT } from '../../../../util/UIElement';
import { CHANGE_EDITOR, CHANGE_ARTBOARD, CHANGE_SELECTION } from '../../../types/event';
import { POINTERSTART, MOVE, END } from '../../../../util/Event';
import { RESIZE_WINDOW } from '../../../types/ToolTypes';
import { keyEach } from '../../../../util/functions/func';
import { editor } from '../../../../editor/editor';
import { Length } from '../../../../editor/unit/Length';


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
        var page = editor.selection.artboard
        if (!page) return; 

        var toolSize = editor.config.get('tool.size');
        if (!toolSize) return;  

        var width = page.width;
        var height = page.height; 
        var boardOffset = toolSize['board.offset']
        var pageOffset = toolSize['page.offset']
        var canvasScrollLeft = toolSize['board.scrollLeft'];
        var canvasScrollTop = toolSize['board.scrollTop'];

        var left = Length.px (pageOffset.left - boardOffset.left + canvasScrollLeft); 
        var top = Length.px (pageOffset.top - boardOffset.top + canvasScrollTop) ; 

        this.$el.css({  width, height,  left, top })
    }    

    isShow () { 
        return editor.selection.artboard
    }

    [EVENT(
        CHANGE_ARTBOARD,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    change (style1 = {}, style2 = {}) {

        let style = {...style1, ...style2}

        keyEach(style, (key, value) => {
            style[key] = Length.px(value) 
        })

        var page = editor.selection.currentArtBoard
        page.reset(style);
        editor.send(CHANGE_ARTBOARD, page)
        editor.send(RESIZE_WINDOW)
        this.refresh();
    }

    changeX (dx) {
        var width = this.width + dx; 

        this.change({ width: Length.px( width ) });
    }

    changeY (dy) {
        var height = this.height + dy; 

        this.change({ height: Length.px( height ) });        
    }

    changeXY (dx, dy) {
        var width = this.width + dx; 
        var height = this.height + dy; 

        this.change({ width: Length.px( width ), height: Length.px( height ) });        
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
        this.page = editor.selection.artboard
        this.width = +this.page.width
        this.height = +this.page.height
    }

    resizeEnd () {
        this.page = null; 
    }

    [EVENT(RESIZE_WINDOW)] (e) {
        this.refresh();
    }
        
}