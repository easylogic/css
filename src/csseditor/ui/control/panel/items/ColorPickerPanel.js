import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import ColorPicker  from "./color/ColorPicker";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { SELECTION_CURRENT_IMAGE } from "../../../../module/SelectionTypes";



export default class ColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item colorpicker show'>
                <div class='items'>            
                    <ColorPicker></ColorPicker>
                </div>
            </div>
        `
    }

    components() {
        return { ColorPicker }
    }


    refresh () {
        this.$el.toggle(this.isShow())
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    isShow () {
        var item = this.read(SELECTION_CURRENT_IMAGE)

        if (!item) return false; 

        return this.read('image/type/isImage', item.type) == false; 
    }


}