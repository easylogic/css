import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import ColorPicker  from "./color/ColorPicker";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../../../types/event";



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

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }

    isShow () {
        var item = this.read('/selection/current/image')

        if (!item) return false; 

        return this.read('/image/type/isImage', item.type) == false; 
    }


}