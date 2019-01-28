import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, DROP, INPUT, CLICK } from "../../../../util/Event";
import { ITEM_TYPE_LAYER, ITEM_GET } from "../../../types/ItemTypes";
import { TIMELINE_LIST } from "../../../types/TimelineTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE } from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { defaultValue } from "../../../../util/functions/func";


const LAYER_TRANSFORM_PROPERTY = [
    'translateX',
    'translateY'
]

const PROPERTY_DEFAULT_VALUE = {
    'translateX' : 0,
    'translateY' : 0
}

export default class TimelineObjectList extends UIElement {
    template () {
        return `<div class="timeline-object-list"></div>`
    }

    [LOAD('$el')] () {

        return this.read(TIMELINE_LIST).map( (timeline, index) => {
            return this.makeTimelineRow(timeline, index);
        })
    }

    

    makeTimelineRow (timeline, index) {

        var targetItem = this.read(ITEM_GET, timeline.targetId);

        if (targetItem.itemType === ITEM_TYPE_LAYER) {
            return this.makeTimelineObjectForLayer(timeline, targetItem, index);
        } 

        return ''; 
    }

    getPropertyValue (targetItem, property) {
        return defaultValue(targetItem[property], PROPERTY_DEFAULT_VALUE[property])
    }

    makeTimelineObjectForLayer (timeline, targetItem, index) {
        return `
            <div class='timeline-object'>
                <div class='icon'></div>
                <div class='title'>${targetItem.name || 'Layer'}</div>
            </div>
            <div class='timeline-object group'>
                <div class='icon'></div>
                <div class='title' id='${timeline.id}Transform'>Transform</div>
            </div>
            ${LAYER_TRANSFORM_PROPERTY.map(property => {
                return `
                <div class='timeline-object property' group-id='${timeline.id}Transform'>
                    <div class='icon'></div>
                    <div class='title'>${property}</div>
                    <div class='value'>
                        <input type='text' timeline-id='${timeline.id}' property-type='${property}' value='${this.getPropertyValue(targetItem, property)}' />px
                    </div>
                </div>`
            }).join(EMPTY_STRING)}
        `
    }

    refresh () {
        this.load();
    }

    [EVENT(CHANGE_TIMELINE)] () {
        this.refresh();
    }

    appendTimeline (id) {
        var timeline = this.read(ITEM_GET, id);
        var str = this.makeTimelineRow(timeline);
        this.$el.appendHTML(str);
    }

    [EVENT(ADD_TIMELINE)] (id) {
        this.appendTimeline(id);
    }

    [CLICK('$el .group .title')] (e) {
        var groupId = e.$delegateTarget.attr('id');

        var isShow = e.$delegateTarget.hasClass('show');

        e.$delegateTarget.toggleClass('show', !isShow);

        this.$el.$$(`[group-id="${groupId}"]`).forEach($dom => {
            $dom.toggleClass('show', !isShow);
        })
    }
}

