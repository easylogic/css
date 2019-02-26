import UIElement, { EVENT } from "../../../../../util/UIElement";
import ColorPicker  from "./color/ColorPicker";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { SELECTION_CURRENT_IMAGE } from "../../../../types/SelectionTypes";
import { IMAGE_TYPE_IS_IMAGE } from "../../../../../util/css/make";



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

        return IMAGE_TYPE_IS_IMAGE(item.type) == false; 
    }


}