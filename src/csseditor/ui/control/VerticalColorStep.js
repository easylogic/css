import UIElement, { EVENT } from "../../../util/UIElement";
import GradientSteps from "./colorsteps/GradientSteps";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../types/event";
import { SELECTION_CURRENT_IMAGE } from "../../types/SelectionTypes";
import { IMAGE_TYPE_IS_GRADIENT } from "../../../util/css/make";

export default class VerticalColorStep extends UIElement {

    components () {
        return {
            GradientSteps
        }
    }

    template () {
        return `
            <div class='vertical-colorstep-container'>
                <div class='vertical-colorstep' ref="$verticalColorstep">
                    <GradientSteps />
                </div>
            </div>
        `
    }

    refresh () {
        this.$el.toggle(this.isShow())
        this.refs.$verticalColorstep.px('width', this.$store.step.width);
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    isShow () {
        var item = this.read(SELECTION_CURRENT_IMAGE)

        if (!item) return false; 

        return IMAGE_TYPE_IS_GRADIENT(item.type)
    }    

}