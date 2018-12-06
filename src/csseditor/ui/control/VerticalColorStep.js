import UIElement from "../../../colorpicker/UIElement";
import GradientSteps from "./colorsteps/GradientSteps";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../types/event";

export default class VerticalColorStep extends UIElement {

    components () {
        return {
            GradientSteps
        }
    }

    template () {
        return `
            <div class='vertical-colorstep'>
                <GradientSteps></GradientSteps>
            </div>
        `
    }

    refresh () {
        this.$el.toggle(this.isShow())
        this.$el.px('width', this.$store.step.width);
    }

    [EVENT_CHANGE_EDITOR] () { this.refresh() }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }

    isShow () {
        var item = this.read('/selection/current/image')

        if (!item) return false; 

        return this.read('/image/type/isGradient', item.type)
    }    

}