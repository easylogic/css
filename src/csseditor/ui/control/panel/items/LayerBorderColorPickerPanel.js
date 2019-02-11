import UIElement from "../../../../../colorpicker/UIElement";
import BorderFillColorPicker from "./color/BorderFillColorPicker";
 
export default class LayerBorderColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item text-colorpicker show'>
                <div class='items'>            
                    <BorderFillColorPicker />
                </div>
                <div class="items bar"></div>
            </div>
        `
    }

    components() {
        return { BorderFillColorPicker }
    }

}