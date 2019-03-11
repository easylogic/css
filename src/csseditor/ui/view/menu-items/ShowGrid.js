import MenuItem from "./MenuItem";
import { EVENT } from "../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_TOOL } from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { editor } from "../../../../editor/editor";


export default class ShowGrid extends MenuItem {
    getIcon() { return 'show-grid'; }
    getTitle () { return 'Show Grid'; }
    getChecked () { return editor.config.get('show.grid'); }

    clickButton (e) {

        this.checked = !this.checked; 
        editor.config.set('show.grid', this.checked)
        editor.config.set('snap.grid', this.checked)
        editor.send(CHANGE_TOOL);
        this.refresh();
    }

    [EVENT(
        CHANGE_TOOL,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh();
    }

    refresh () {
        this.$el.attr('checked', this.checked ? 'checked' : EMPTY_STRING);
    }
}