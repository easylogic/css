import UIElement from "../../../../../colorpicker/UIElement";
import InfoFillColorPicker from "./color/InfoFillColorPicker";
 
export default class LayerInfoColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item text-colorpicker show'>
                <div class='items'>            
                    <InfoFillColorPicker></InfoFillColorPicker>
                </div>
            </div>
        `
    }

    components() {
        return { InfoFillColorPicker }
    }

}