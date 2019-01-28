import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD } from "../../../../util/Event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { TIMELINE_MAX_SECOND, TIMELINE_TOTAL_WIDTH } from "../../../types/TimelineTypes";
import { CHANGE_EDITOR } from "../../../types/event";

export default class KeyframeTimeView extends UIElement {
    template () {
        return `<div class='keyframe-time-view'></div>`
    }

    [LOAD()] () {
        return [...Array(TIMELINE_MAX_SECOND)].map((it, index) => {
            return `<div class='time'>${index + 1}s</div>`
        }).join(EMPTY_STRING)
    }

    refresh () {
        this.$el.px('width', TIMELINE_TOTAL_WIDTH);
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }    
}