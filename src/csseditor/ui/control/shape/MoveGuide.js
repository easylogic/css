import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_MOVE,
    CHANGE_LAYER_POSITION, 
    CHANGE_SELECTION,
    CHANGE_LAYER_ROTATE
} from '../../../types/event';
import { RESIZE, DEBOUNCE, LOAD } from '../../../../util/Event';

export default class MoveGuide extends UIElement {

    initialize () {
        super.initialize()

        this.$board = this.parent.refs.$board;
        this.$page = this.parent.refs.$page; 
    }

    template () { 
        return `
            <div class="move-guide">

            </div>
        `
    }

    [LOAD()] () {
        var layer = this.read('selection/current/layer');
        if (!layer) return []; 

        var list = this.read('guide/line/layer', 3);        

        var bo = this.$board.offset()
        var po = this.$page.offset()

        var top = po.top - bo.top + this.$board.scrollTop();
        var left = po.left - bo.left + this.$board.scrollLeft(); 

        return list.map(axis => {
            if (axis.type == '-') {
                return `<div class='line' style='left: 0px; top: ${axis.y + top}px; right: 0px; height: 1px;'></div>`
            } else {
                return `<div class='line' style='left: ${axis.x + left}px; top: 0px; bottom: 0px; width: 1px;'></div>`
            }            
        })
    }

    refresh () {

        var isShow = this.isShow()

        this.$el.toggle(isShow);
        if (isShow) {
            this.load()
        }
    }

    isShow() {
        return this.$page.hasClass('moving');
    }

    [EVENT(
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_ROTATE,
        CHANGE_LAYER_MOVE,
        CHANGE_LAYER_POSITION,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }


    [RESIZE('window') + DEBOUNCE(300)] (e) {
        this.refresh();
    }    

}