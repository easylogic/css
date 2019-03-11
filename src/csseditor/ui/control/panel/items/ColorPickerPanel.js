import UIElement, { EVENT } from "../../../../../util/UIElement";
// import ColorPicker  from "./color/ColorPicker";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { editor } from "../../../../../editor/editor";



export default class ColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item colorpicker show'>
                <div class='items'>            
                    <ColorPicker></ColorPicker>
                </div>
                <div class='items bar'></div>
            </div>
        `
    }

    components() {
        return { 
                // ColorPicker 
        }
    }


    refresh () {
        this.$el.toggle(this.isShow())
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    isShow () {
        var item = editor.selection.backgroundImage;

        if (!item) return false; 

        return item.image.isImage()
    }


}