import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, CLICK, CHANGEINPUT } from "../../../../util/Event";
import { TIMELINE_LIST, TIMELINE_SEEK } from "../../../types/TimelineTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE, CHANGE_LAYER_TRANSFORM, CHANGE_KEYFRAME_SELECTION, CHANGE_EDITOR, CHANGE_LAYER } from "../../../types/event";
import { UNIT_PX, PROPERTY_LIST, unitValue, PROPERTY_DEFAULT_VALUE, EMPTY_STRING } from "../../../../util/css/types";
import { defaultValue, html, isNotUndefined } from "../../../../util/functions/func";
import { IS_LAYER, PROPERTY_GET_DEFAULT_VALUE, TIMING_GET_VALUE } from "../../../../util/css/make";
import { ITEM_SET } from "../../../types/ItemTypes";
import { MOVE_TIMELINE } from "../../../types/ToolTypes";


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

        return EMPTY_STRING; 
    }

    makeTimelineProperty (property, timeline, targetItem, index) {
        var sampleValue = PROPERTY_GET_DEFAULT_VALUE(property)
        var value = unitValue(defaultValue(targetItem[property], sampleValue.defaultValue))
        return ` 
            <div class='timeline-property row'>
                <label>${property}</label>
                <input type='number' min="${sampleValue.min}" max="${sampleValue.max}" step="${sampleValue.step}" value="${value}" data-property='${property}' data-timeline-id="${timeline.id}" /> <span class='unit'>${UNIT_PX}</span>
            </div>    
        `
    }

    makeTimelinePropertyGroup (timeline, targetItem, index) {

        var list = PROPERTY_LIST[targetItem.itemType] || []

        return html`${list.map(it => {
            return html`
            <div class='timeline-collapse' data-property='${it.key}'>
                <div class='property-title row' >${it.title}</div>
                <div class='timeline-property-list' data-property='${it.key}'>
                    ${it.properties.map(property => {
                        return this.makeTimelineProperty(property, timeline, targetItem, index)
                    })}
                </div>
            </div>
            `
        })}`

        
    }

    makeTimelineObjectForLayer (timeline, targetItem, index) {
        return `
            <div class='timeline-object' data-type='layer'>
                <div class='timeline-object-title row'>
                    <div class='icon'></div>    
                    <div class='title'>${targetItem.name ||  ((targetItem.index/100) + 1) + '. Layer'}</div>
                </div>
                <div class='timeline-group'>
                    ${this.makeTimelinePropertyGroup(timeline, targetItem, index)}
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

    [EVENT(MOVE_TIMELINE)] () {
        this.run(TIMELINE_SEEK, this.config('timeline.cursor.time'), this.$el);
    }

    [CLICK('$el .group .title')] (e) {
        var groupId = e.$delegateTarget.attr('id');

        var isShow = e.$delegateTarget.hasClass('show');

        e.$delegateTarget.toggleClass('show', !isShow);

        this.$el.$$(`[group-id="${groupId}"]`).forEach($dom => {
            $dom.toggleClass('show', !isShow);
        })
    }

    [EVENT(CHANGE_KEYFRAME_SELECTION)] () {
        var selectedId = this.config('timeline.keyframe.selectedId');
        var selectedType = this.config('timeline.keyframe.selectedType');
        var keyframe = this.get(selectedId);
        var property = keyframe.property;
        var timelineId = keyframe.parentId;        
        var targetId = keyframe.targetId;
        var value = keyframe[`${selectedType}Value`];

        var $input = this.$el.$(`[data-property="${property}"][data-timeline-id="${timelineId}"]` );
        $input.val(value);

        this.commit(CHANGE_LAYER_TRANSFORM, {id: targetId, [property]: value})

    }

    [CHANGEINPUT('$el input[data-property]')] (e) {
        var $t = e.$delegateTarget;
        const [property, timelineId] = $t.attrs('data-property', 'data-timeline-id')

        var selectedId = this.config('timeline.keyframe.selectedId');
        var selectedType = this.config('timeline.keyframe.selectedType');
        var keyframe = this.get(selectedId);
        var targetId = keyframe.targetId

        // 선택한 값에 대입 하도록 설정 
        if (timelineId == keyframe.parentId && property == keyframe.property) {
            var timeField = `${selectedType}Time`
            var valueField = `${selectedType}Value`
            var time = keyframe[timeField]
            var value = $t.float()
    
            if (keyframe && isNotUndefined(time)) {
                keyframe[valueField] = value; 

                this.run(ITEM_SET, {id: selectedId, [valueField]: value })
                this.commit(CHANGE_LAYER_TRANSFORM, {id: targetId, [property]: value})
            }
        }

    }
}

