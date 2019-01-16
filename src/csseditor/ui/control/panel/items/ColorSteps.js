import GradientSteps from "../../colorsteps/GradientSteps";
import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR } from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";

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
        return { GradientSteps }
    }

    refresh () {
        this.$el.toggle(this.isShow())
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }

    isShow () {
        var item = this.read(SELECTION_CURRENT_IMAGE)

        if (!item) return false; 

        return this.read('image/type/isGradient', item.type)
    }

}