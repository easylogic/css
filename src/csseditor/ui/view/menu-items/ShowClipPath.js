import MenuItem from "./MenuItem";
import { EVENT } from "../../../../colorpicker/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_CLIPPATH } from "../../../types/event";
import { SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER } from "../../../module/SelectionTypes";
import { EMPTY_STRING } from "../../../../util/css/types";


export default class ShowClipPath extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Show ClipPath';
        this.icon = 'show-clip-path';
    }

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