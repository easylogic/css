import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import ColorPicker  from "./color/ColorPicker";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";



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
        var item = this.read('selection/current/image')

        if (!item) return false; 

        return this.read('image/type/isImage', item.type) == false; 
    }


}