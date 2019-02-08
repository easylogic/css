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
import { GUIDE_TYPE_HORIZONTAL } from '../../../types/ItemTypes';
import { SELECTION_CURRENT_LAYER } from '../../../types/SelectionTypes';
import { GUIDE_SNAP_LAYER } from '../../../types/GuideTypes';

export default class MoveGuide extends UIElement {


    template () { 
        return `<div class="move-guide"></div>`
    }

    [LOAD()] () {
        var layer = this.read(SELECTION_CURRENT_LAYER);
        if (!layer) return []; 
        var toolSize = this.config('tool.size')
        var list = this.read(GUIDE_SNAP_LAYER, 3);

        var bo = toolSize['board.offset']
        var po = toolSize['page.offset']

        var top = po.top - bo.top + toolSize['board.scrollTop'];
        var left = po.left - bo.left + toolSize['board.scrollLeft']; 

        return list.map(axis => {
            if (axis.type == GUIDE_TYPE_HORIZONTAL) {
                return `<div class='line horizontal' style='left: 0px; top: ${axis.y + top}px; right: 0px; height: 1px;'></div>`
            } else {
                return `<div class='line vertical' style='left: ${axis.x + left}px; top: 0px; bottom: 0px; width: 1px;'></div>`
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
        return  this.config('moving');
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