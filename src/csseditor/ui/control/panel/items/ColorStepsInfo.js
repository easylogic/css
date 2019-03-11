import UIElement, { EVENT } from "../../../../../util/UIElement";
import GradientInfo from "../../colorsteps/GradientInfo";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { editor } from "../../../../../editor/editor";

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
        var item = editor.selection.backgroundImage;
        if (!item) return false; 

        return item.image.isGradient()
    }
}