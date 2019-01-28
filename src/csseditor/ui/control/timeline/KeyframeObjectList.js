import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, POINTERSTART, POINTERMOVE, POINTEREND } from "../../../../util/Event";
import { TIMELINE_TOTAL_WIDTH } from "../../../types/TimelineTypes";
import { CHANGE_EDITOR } from "../../../types/event";

export default class KeyframeObjectList extends UIElement {
    template () {
        return `<div class="keyframe-list"></div>`
    }


    [LOAD('$el')] () {
        return [...Array(100)].map(it => {
            return `<div class='keyframe-object'>
                <div class='keyframe-info'></div>
            </div>`
        })
    }

    refresh () {
        this.$el.px('width', TIMELINE_TOTAL_WIDTH);
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }

    [POINTERSTART('$el .keyframe-object')] (e) {
        console.log('start', e.xy);
    }

    [POINTERMOVE('$el .keyframe-object')] (e) {
        console.log('move', e.xy);
    }

    [POINTEREND('$el .keyframe-object')] (e) {
        console.log('end', e.xy);
    }

}