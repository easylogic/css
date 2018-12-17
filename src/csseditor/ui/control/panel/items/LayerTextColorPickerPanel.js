import UIElement from "../../../../../colorpicker/UIElement";
import TextFillColorPicker from "./color/TextFillColorPicker";
 
export default class LayerTextColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item text-colorpicker show'>
                <div class='items'>            
                    <TextFillColorPicker></TextFillColorPicker>
                </div>
            </div>
        `
    }

    components() {
        return { TextFillColorPicker }
    }

}