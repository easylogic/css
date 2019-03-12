import MenuItem from "./MenuItem";
import { EVENT } from "../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER } from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { editor } from "../../../../editor/editor";


export default class ShowClipPath extends MenuItem {

    getIcon() { return 'show-clip-path'; }
    getTitle () { return 'Show ClipPath'; }

    clickButton () {

        editor.selection.layers.forEach(item => {
            item.showClipPathEditor = !item.showClipPathEditor
            this.emit(CHANGE_LAYER)
            this.refresh();            
        })

    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh();
    }

    refresh () {

        var layers = editor.selection.layers;

        this.$el.css('display',  layers.length ? 'inline-block' : 'none');

        layers.forEach(item => {
            this.$el.attr('checked', item.showClipPathEditor ? 'checked' : EMPTY_STRING);
        })
        
    }
}