import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_LAYER, CHANGE_SELECTION, CHANGE_ARTBOARD, CHANGE_INSPECTOR } from "../../../../types/event";
import { KEYDOWN, ENTER, ARROW_DOWN, ARROW_UP } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";

export default class RowGapEditor extends UIElement {

    template () {
        return `
            <div class='row-gap-editor'>
                <label>row gap</label>
                <input type='text' ref='$rowGap' />
            </div>
        `
    }     

    getTarget () {
        var current = this.current || editor.selection.current;

        if (editor.selection.count() > 1) {
            return null;
        }

        if (!current) return null;

        if (!current.hasLayout()) {
            // NOOP
        } else if (current.parent().hasLayout()) {
            current = current.parent();
        }

        return current;
    }

    refresh() {
        var current = this.getTarget();

        if (!current) {
            return;
        }
        if (!current.display.isGrid()) {
            return; 
        }

        this.refs.$rowGap.val(current.display.rowGap);
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_ARTBOARD,
        CHANGE_INSPECTOR,        
        CHANGE_SELECTION
    )] () {
        this.refresh();
    }

    modifyGrid (callback) {
        var current = this.getTarget()

        if (current) {
            callback && callback (current);

            if (current.itemType == 'artboard') {
                this.emit(CHANGE_ARTBOARD, current);
            } else {
                this.emit(CHANGE_LAYER, current);
            }
        }
    }



    modifyRowGap (e) {
        var type = this.getKeyTarget(e.key || e.code);        
        var $el = this.refs.$rowGap;
        var len = Length.parse($el.val());

        if (type == 'add') {
            len.add(1);
        } else if (type == 'sub') {
            len.add(-1);
        }

        if (len.value < 0 || len.value == '') {
            len.value = 0;
        }        

        $el.val(len);
                
        this.modifyGrid((current) => {
            current.display.rowGap = len; 
        })

    }

    getKeyTarget (key) {
        switch(key) {
        case 'Enter': return 'enter'
        case 'ArrowDown': return 'sub'
        case 'ArrowUp': return 'add'
        }
    }    

    [KEYDOWN('$rowGap') + ENTER + ARROW_DOWN + ARROW_UP] (e) {
        this.modifyRowGap(e);
        return false;
    }

}