import UIElement from "../../../../../colorpicker/UIElement";
import LayerColorPicker  from "./color/LayerColorPicker";

export default class LayerColorPickerPanel extends UIElement {
    template () {
        return `
            <div class='property-item layer-colorpicker show'>
                <div class='items'>            
                    <LayerColorPicker></LayerColorPicker>
                </div>
            </div>
        `
    }

    components() {
        return { LayerColorPicker }
    }

}