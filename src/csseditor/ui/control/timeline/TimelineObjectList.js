import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, CLICK, CHANGEINPUT } from "../../../../util/Event";
import { TIMELINE_LIST } from "../../../types/TimelineTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE } from "../../../types/event";
import { UNIT_PX } from "../../../../util/css/types";
import { defaultValue } from "../../../../util/functions/func";
import { IS_LAYER } from "../../../../util/css/make";


const LAYER_TRANSFORM_PROPERTY = [
    'translateX',
    'translateY'
]

const PROPERTY_DEFAULT_VALUE = {
    'translateX' : 0,
    'translateY' : 0
}

export default class TimelineObjectList extends UIElement {
    templateClass () {
        return 'timeline-object-list'
    }

    [LOAD('$el')] () {

        return this.read(TIMELINE_LIST).map( (timeline, index) => {
            return this.makeTimelineRow(timeline, index);
        })
    }

    

    makeTimelineRow (timeline, index) {

        var targetItem = this.get(timeline.targetId);

        if (IS_LAYER(targetItem)) {
            return this.makeTimelineObjectForLayer(timeline, targetItem, index);
        } 

        return ''; 
    }

    getPropertyValue (targetItem, property) {
        return defaultValue(targetItem[property], PROPERTY_DEFAULT_VALUE[property])
    }

    makeTimelineProperty (property, timeline, targetItem, index) {
        return ` 
            <div class='timeline-property row'>
                <label>${property}</label>
                <input type='number' min="-10000" max="10000" data-property='${property}' data-timeline-id="${timeline.id}" /> <span class='unit'>${UNIT_PX}</span>
            </div>    
        `
    }

    makeTimelineTransform (timeline, targetItem, index) {
        return `
        <div class='timeline-collapse' data-property='transform'>
            <div class='property-title row' >Transform</div>
            <div class='timeline-property-list' data-property='transform'>
                ${this.makeTimelineProperty('translateX', timeline, targetItem, index)}
                ${this.makeTimelineProperty('translateY', timeline, targetItem, index)}
            </div>
        </div>
        `
    }

    makeTimelineObjectForLayer (timeline, targetItem, index) {
        return `
            <div class='timeline-object' data-type='layer'>
                <div class='timeline-object-title row'>
                    <div class='icon'></div>    
                    <div class='title'>${targetItem.name ||  ((targetItem.index/100) + 1) + '. Layer'}</div>
                </div>
                <div class='timeline-group'>
                    ${this.makeTimelineTransform(timeline, targetItem, index)}
                </div>
            </div>
        `
    }

    refresh () {
        this.load();
    }

    [EVENT(CHANGE_TIMELINE)] () {
        this.refresh();
    }

    [EVENT(ADD_TIMELINE)] (id) {
        this.refresh();
    }

    [CLICK('$el .group .title')] (e) {
        var groupId = e.$delegateTarget.attr('id');

        var isShow = e.$delegateTarget.hasClass('show');

        e.$delegateTarget.toggleClass('show', !isShow);

        this.$el.$$(`[group-id="${groupId}"]`).forEach($dom => {
            $dom.toggleClass('show', !isShow);
        })
    }

    [CHANGEINPUT('$el [data-property]')] (e) {
        var $t = e.$delegateTarget;
        var value = $t.val()
        var property = $t.attr('data-property')
        var timelineId = $t.attr('data-timeline-id')

        console.log(value, property, timelineId)
    }
}

