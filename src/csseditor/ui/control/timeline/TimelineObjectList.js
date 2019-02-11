import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, DROP, INPUT, CLICK } from "../../../../util/Event";
import { ITEM_GET } from "../../../types/ItemTypes";
import { TIMELINE_LIST } from "../../../types/TimelineTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE } from "../../../types/event";
import { EMPTY_STRING, UNIT_PX } from "../../../../util/css/types";
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
    template () {
        return `<div class="timeline-object-list"></div>`
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

    makeTimelineObjectForLayer (timeline, targetItem, index) {
        return `
            <div class='timeline-object' data-type='layer'>
                <div class='timeline-object-title row'>
                    <div class='icon'></div>    
                    <div class='title'>${targetItem.name ||  ((targetItem.index/100) + 1) + '. Layer'}</div>
                </div>
                <div class='timeline-group'>
                    <div class='timeline-collapse' data-property='transform'>
                        <div class='property-title row' >Transform</div>
                        <div class='timeline-property-list' data-property='transform'>
                            <div class='timeline-property row' data-property='translateX'>
                                <label>translateX</label>
                                <input type='number' data-type='translateX' /> <span class='unit'>${UNIT_PX}</span>
                            </div>    
                            <div class='timeline-property row' data-property='translateY'>
                                <label>translateY</label>
                                <input type='number' data-type='translateY' /> <span class='unit'>${UNIT_PX}</span>
                            </div>    
                        </div>
                    </div>
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
}

