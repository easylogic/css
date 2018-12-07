import UIElement from '../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER_SIZE, 
    EVENT_CHANGE_LAYER_MOVE,
    EVENT_CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_SELECTION
} from '../../../types/event';

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

    'load $el' () {
        var layer = this.read('/selection/current/layer');
        if (!layer) return []; 

        var list = this.read('/guide/line/layer', 3);        

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

    [EVENT_CHANGE_LAYER_SIZE] () { this.refresh(); }
    [EVENT_CHANGE_LAYER_MOVE] () { this.refresh(); }
    [EVENT_CHANGE_LAYER_POSITION] () { this.refresh(); }    
    [EVENT_CHANGE_EDITOR] () { this.refresh(); }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }


    'resize window | debounce(300)' (e) {
        this.refresh();
    }    

}