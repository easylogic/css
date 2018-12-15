import UIElement from "../../../../../colorpicker/UIElement";
import FillColorPicker from "./color/FillColorPicker";

export default class FillColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item fill-colorpicker show'>
                <div class='items'>            
                    <FillColorPicker></FillColorPicker>
                </div>
            </div>
        `
    }

    components() {
        return { FillColorPicker }
    }

}