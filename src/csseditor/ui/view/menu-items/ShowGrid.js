import MenuItem from "./MenuItem";
import { EVENT } from "../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_TOOL } from "../../../types/event";
import { SELECTION_CURRENT_PAGE } from "../../../types/SelectionTypes";
import { EMPTY_STRING } from "../../../../util/css/types";


export default class ShowGrid extends MenuItem {
    getIcon() { return 'show-grid'; }
    getTitle () { return 'Show Grid'; }
    getChecked () { return this.config('show.grid'); }

    clickButton (e) {
        this.read(SELECTION_CURRENT_PAGE, (item) => {
            this.checked = !this.checked; 
            this.initConfig('show.grid', this.checked)
            this.config('snap.grid', this.checked)
        });

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