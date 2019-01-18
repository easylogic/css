import MenuItem from "./MenuItem";
import { EVENT } from "../../../../colorpicker/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_TOOL } from "../../../types/event";
import { SELECTION_CURRENT_PAGE } from "../../../types/SelectionTypes";
import { EMPTY_STRING } from "../../../../util/css/types";


export default class ShowGrid extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Show Grid';
        this.icon = 'show-grid';
        this.checked = this.config('show.grid');
    }

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