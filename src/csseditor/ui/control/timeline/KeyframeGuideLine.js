import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { CHANGE_EDITOR } from "../../../types/event";
export default class KeyframeGuideLine extends UIElement {
    template () {
        return `<div class="keyframe-guide-line">
            <div class='guide' style='width:1px;position:absolute;left:500px;height:100%;background-color:black;'></div>
        </div>`
    }

    refresh () {
        // this.$el.px('height', 3000);
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }


}