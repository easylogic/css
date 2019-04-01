import GradientSteps from "../../colorsteps/GradientSteps";
import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR } from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { IMAGE_TYPE_IS_GRADIENT } from "../../../../../util/css/make";
import { editor } from "../../../../../editor/editor";

export default class ColorSteps extends BasePropertyItem {
    template () {
        return `
            <div class='property-item gradient-steps show'>
                <div class='title'>Color Steps</div>
                <div class='items'>            
                    <GradientSteps></GradientSteps>
                </div>
            </div>
        `
    }

    components() {
        return { 
            // GradientSteps 
        }
    }

    refresh () {
        this.$el.toggle(this.isShow())
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }

    isShow () {
        var item = editor.selection.backgroundImage

        if (!item) return false; 

        return item.image.isGradient()
    }

}