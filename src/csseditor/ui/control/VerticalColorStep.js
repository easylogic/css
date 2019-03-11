import UIElement, { EVENT } from "../../../util/UIElement";
import GradientSteps from "./colorsteps/GradientSteps";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../types/event";
import { editor } from "../../../editor/editor";

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
        this.refs.$verticalColorstep.px('width', editor.config.get('step.width'));
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    isShow () {
        var item = editor.selection.backgroundImage;
        if (!item) return false; 

        return item.isGradient()
    }    

}