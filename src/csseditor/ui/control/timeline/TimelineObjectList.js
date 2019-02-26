import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, CHANGEINPUT } from "../../../../util/Event";
import { TIMELINE_LIST, TIMELINE_SEEK } from "../../../types/TimelineTypes";
import { CHANGE_TIMELINE, ADD_TIMELINE, CHANGE_LAYER_TRANSFORM, CHANGE_KEYFRAME_SELECTION, CHANGE_IMAGE_COLOR } from "../../../types/event";
import { unitValue, EMPTY_STRING } from "../../../../util/css/types";
import { defaultValue, html, isNotUndefined } from "../../../../util/functions/func";
import { IS_LAYER, PROPERTY_GET_DEFAULT_VALUE, IS_IMAGE, GET_PROPERTY_LIST } from "../../../../util/css/make";
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

        return this.makeTimelineObjectForLayer(timeline, targetItem, index);
    }

    makeInputColor (sampleValue, targetItem, property, timeline) {
        var value = defaultValue(targetItem[property], sampleValue.defaultValue)
        return `
            <div 
                class='input-color' 
                data-property='${property}' 
                data-timeline-id='${timeline.id}'
            >
                <div class='color-panel' style='background-color: ${value};'></div>
            </div>
        `
    }

    makeInputNumber (sampleValue, targetItem, property, timeline) {

        var value = unitValue(defaultValue(targetItem[property], sampleValue.defaultValue))

        return `
            <span class='input-field' data-unit-string="${sampleValue.unit}">
            <input 
                type='number' 
                min="${sampleValue.min}" 
                max="${sampleValue.max}" 
                step="${sampleValue.step}" 
                value="${value}" 
                data-property='${property}' 
                data-timeline-id="${timeline.id}" 
                /> 
            </span>`
    }

    makeInput (targetItem, property, timeline) {
        var sampleValue = PROPERTY_GET_DEFAULT_VALUE(property)
        if (sampleValue.type == 'color') {
            return this.makeInputColor(sampleValue, targetItem, property, timeline)
        } else {
            return this.makeInputNumber(sampleValue, targetItem, property, timeline)
        }
    }

    makeTimelineProperty (property, timeline, targetItem, index) {
        return ` 
            <div class='timeline-property row'>
                <label>${property}</label>
                ${this.makeInput(targetItem, property, timeline)}
            </div>    
        `
    }

    makeTimelinePropertyGroup (timeline, targetItem, index) {

        var list = GET_PROPERTY_LIST(targetItem)

        return html`${list.map(it => {
            var collapse = timeline.collapse[it.key] ? 'collapsed': ''            
            return html`
            <div class='timeline-collapse ${collapse}' data-sub-key='${it.key}' data-timeline-id="${timeline.id}">
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

    getLayerName (item) {
        return item.name ||  ((item.index/100) + 1) + '. ' + 'Layer'
    }

    makeTimelineObjectForLayer (timeline, targetItem, index) {
        var name = EMPTY_STRING;

        if (IS_LAYER(targetItem)) {
            name = this.getLayerName(targetItem)
        } else if (IS_IMAGE(targetItem)) {
            var layer = this.get(targetItem.parentId)
            name = `${this.getLayerName(layer)} -&gt; ${targetItem.type}`
        }
        var collapse = timeline.groupCollapsed ? 'group-collapsed': ''
        return `
            <div class='timeline-object ${collapse}' data-type='${targetItem.itemType}' data-timeline-id="${timeline.id}">
                <div class='timeline-object-title row'>
                    <div class='icon'></div>    
                    <div class='title'>${name}</div>
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

    [CLICK('$el .timeline-object-title')] (e) {
        var $parent = e.$delegateTarget.parent();
        $parent.toggleClass('group-collapsed')

        var id = $parent.attr('data-timeline-id');

        var groupCollapsed = $parent.hasClass('group-collapsed')

        this.run(ITEM_SET, {id, groupCollapsed })
        this.emit('collapsedGroupTimelineTree', id, groupCollapsed);
    }

    [CLICK('$el .timeline-collapse > .property-title')] (e) {
        var $parent = e.$delegateTarget.parent();
        $parent.toggleClass('collapsed')

        var [subkey, id] = $parent.attrs('data-sub-key', 'data-timeline-id');

        var timeline = this.get(id);
        var isCollapsed = $parent.hasClass('collapsed')
        var collapse = {...timeline.collapse, [subkey]: isCollapsed}

        this.run(ITEM_SET, {id, collapse })
        this.emit('collapsedTimelineTree', id, subkey, isCollapsed);
    }

    [EVENT('collapsedTimelineTree')] (id, subkey, isCollapsed) {
        var $propertyGroup = this.$el.$(`[data-sub-key="${subkey}"][data-timeline-id="${id}"]`);
        $propertyGroup.toggleClass('collapsed', isCollapsed)
    }

    [EVENT('collapsedGroupTimelineTree')] (id, isGroupCollapsed) {
        var $propertyGroup = this.$el.$(`.timeline-object[data-timeline-id="${id}"]`);
        $propertyGroup.toggleClass('group-collapsed', isGroupCollapsed)
    }

    [EVENT(CHANGE_TIMELINE, ADD_TIMELINE)] () {
        this.refresh();
    }

    [EVENT(MOVE_TIMELINE)] () {
        this.run(TIMELINE_SEEK, this.config('timeline.cursor.time'));
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
        var propertyInfo  = PROPERTY_GET_DEFAULT_VALUE(property)
        var $input = this.$el.$(`[data-property="${property}"][data-timeline-id="${timelineId}"]` );

        if (propertyInfo.type == 'color') {
            var colorPanel = $input.$('.color-panel');
            if (colorPanel) {
                colorPanel.css('background-color', value);
            }
        } else {
            $input.val(value);
        }

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

    [CLICK('$el .input-color')] (e) {
        var $t = e.$delegateTarget;
        var $colorPanel = $t.$('.color-panel')
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
            var oldColor = e.$delegateTarget.css('background-color')

            if (keyframe && isNotUndefined(time)) {
                this.emit('openTimelineColorPicker', e.xy, oldColor, (newColor) => {
                    $colorPanel.css('background-color', newColor)                    
                    this.run(ITEM_SET, {id: selectedId, [valueField]: newColor })
                    this.commit(CHANGE_IMAGE_COLOR, {id: targetId, [property]: newColor})
                })
            }
        }
    }
}

