import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import GradientInfo from "../../colorsteps/GradientInfo";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { SELECTION_CURRENT_IMAGE } from "../../../../module/SelectionTypes";

export default class ColorStepsInfo extends UIElement {
    template () {
        return `
            <div class='property-item gradient-steps-info show'>
                <div class='items'>            
                    <GradientInfo></GradientInfo>
                </div>
            </div>
        ` 
    }

    components() {
        return { GradientInfo }
    }
 
    refresh () {
        this.$el.toggle(this.isShow())
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh(); }

    isShow () {
        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) return false; 

        return this.read('image/type/isGradient', item.type)
    }
}