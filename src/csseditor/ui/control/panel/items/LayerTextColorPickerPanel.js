import UIElement from "../../../../../util/UIElement";
import TextFillColorPicker from "./color/TextFillColorPicker";
 
export default class LayerTextColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item text-colorpicker show'>
                <div class='items'>            
                    <TextFillColorPicker />
                </div>
                <div class='items bar'></div>
            </div>
        `
    }

    components() {
        return { TextFillColorPicker }
    }

}