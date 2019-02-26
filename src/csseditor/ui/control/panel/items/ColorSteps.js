import GradientSteps from "../../colorsteps/GradientSteps";
import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR } from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { IMAGE_TYPE_IS_GRADIENT } from "../../../../../util/css/make";

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

        return IMAGE_TYPE_IS_GRADIENT(item.type)
    }

}