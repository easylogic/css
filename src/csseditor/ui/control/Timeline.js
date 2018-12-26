import UIElement from "../../../colorpicker/UIElement";
import { CLICK } from "../../../util/Event";

export default class Timeline extends UIElement {

    template () {
        return `
            <div class='timeline-view'>
                <div class="timeline-header" ref="$header">
                    Timeline
                </div>
                <div class='timeline-body"></div>
            </div>
        `
    }


    [CLICK('$header')] () {
        this.parent.toggleTimeline();
    }
}