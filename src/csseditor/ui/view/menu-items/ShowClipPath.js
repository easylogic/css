import MenuItem from "./MenuItem";
import { EVENT } from "../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_CLIPPATH } from "../../../types/event";
import { SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER } from "../../../types/SelectionTypes";
import { EMPTY_STRING } from "../../../../util/css/types";


export default class ShowClipPath extends MenuItem {

    getIcon() { return 'show-clip-path'; }
    getTitle () { return 'Show ClipPath'; }

    clickButton (e) {
        this.read(SELECTION_CURRENT_LAYER, (item) => {
            this.commit(CHANGE_LAYER_CLIPPATH, {
                id: item.id, 
                showClipPathEditor: !item.showClipPathEditor
            })
            this.refresh();            
        })
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh();
    }

    isShow () {
        return this.read(SELECTION_IS_LAYER);
    }

    refresh () {

        var isShow = this.isShow();

        this.$el.css('display',  isShow ? 'inline-block' : 'none');

        if (isShow) {
            this.read(SELECTION_CURRENT_LAYER, item => {
                this.$el.attr('checked', item.showClipPathEditor ? 'checked' : EMPTY_STRING);
            })
        }

        
    }
}