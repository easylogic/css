import UIElement from "../../../../colorpicker/UIElement";
import { POINTERSTART, MOVE } from "../../../../util/Event";
import {CHANGE_HEIGHT_TIMELINE, INIT_HEIGHT_TIMELINE } from "../../../types/ToolTypes";

export default class TimelineSplitter extends UIElement {

    templateClass() {
        return 'timeline-splitter'
    }

    move () {
        var dy = this.config('pos').y - this.initXY.y;
        this.emit(CHANGE_HEIGHT_TIMELINE, {dy})
        
    }

    [POINTERSTART() + MOVE()] (e) {
        this.initXY = e.xy
        this.emit(INIT_HEIGHT_TIMELINE)
    }
}