import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import GradientInfo from "../../colorsteps/GradientInfo";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../../../types/event";

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

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh(); }

    isShow () {
        var item = this.read('/selection/current/image')
        if (!item) return false; 

        return this.read('/image/type/isGradient', item.type)
    }
}