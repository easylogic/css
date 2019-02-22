import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, POINTERSTART, POINTERMOVE, POINTEREND, SELF, CLICK, ALT, IF } from "../../../../util/Event";
import { TIMELINE_TOTAL_WIDTH, TIMELINE_LIST, TIMELINE_NOT_EXISTS_KEYFRAME, TIMELINE_MIN_TIME_IN_KEYFRAMES, TIMELINE_MAX_TIME_IN_KEYFRAMES } from "../../../types/TimelineTypes";
import { CHANGE_EDITOR, ADD_TIMELINE, CHANGE_KEYFRAME, CHANGE_TOOL, CHANGE_KEYFRAME_SELECTION } from "../../../types/event";
import { html } from "../../../../util/functions/func";
import { stringUnit, pxUnit, PROPERTY_LIST, EMPTY_STRING, unitValue } from "../../../../util/css/types";
import { ITEM_MAP_KEYFRAME_CHILDREN } from "../../../types/ItemSearchTypes";
import { ITEM_ADD_KEYFRAME } from "../../../types/ItemCreateTypes";
import { RESIZE_TIMELINE, MOVE_TIMELINE } from "../../../types/ToolTypes";
import { GET_PROPERTY_LIST } from "../../../../util/css/make";

export default class KeyframeObjectList extends UIElement {
    templateClass () {
        return 'keyframe-list'
    }

    [LOAD()] () {
        return this.read(TIMELINE_LIST).map( (timeline, index) => {
            return this.makeTimelineRow(timeline, index);
        })
    }

    setBackgroundGrid () {

        var width = this.config('timeline.1ms.width');
        var cursorTime = this.config('timeline.cursor.time')
        var startTime = 0;  // 0ms 
        var timeDist = 100  // 100ms = 0.1s 
        var currentPosition = width * cursorTime - 1;

        if ( (startTime % timeDist) != 0 ) {
            startTime +=  timeDist - (startTime % timeDist)
        }

        var fullWidth = Math.max(10, timeDist * width); 
        var position = fullWidth - 0.5; 
        this.$el.cssText(`
            background-size: 2px 100%, ${fullWidth}px 100%;
            background-position: ${currentPosition}px 0px, ${position}px 0px;
        `)
    }

    updateKeyframeList (timeline) {
        timeline.keyframes = {}
        var children = this.read(ITEM_MAP_KEYFRAME_CHILDREN, timeline.id);
        children.forEach(it => {
            if (!timeline.keyframes[it.property]) {
                timeline.keyframes[it.property] = []
            }

            timeline.keyframes[it.property].push(it);
        })
    }

    makeTimelineRow (timeline, index) {
        var targetItem = this.get(timeline.targetId)

        return this.makeTimelineObject(timeline, targetItem); 
    }

    makeKeyFrameItem (keyframe, keyframeIndex, timeline) {
        var msWidth = this.config('timeline.1ms.width');
        var startTime = keyframe.startTime;
        var endTime = keyframe.endTime;
        var left = pxUnit(startTime * msWidth)
        var width = pxUnit((endTime - startTime) * msWidth)

        var nested = unitValue(width) < 1 ? 'nested' : EMPTY_STRING

        return `
        <div 
            class='keyframe-item line ${nested}' 
            style='left: ${stringUnit(left)}; width: ${stringUnit(width)};' 
            keyframe-id="${keyframe.id}" 
            keyframe-property="${keyframe.property}"
        >
            <div class='bar'></div>
            <div class='start' time="${startTime}"></div>
            <div class='end' time="${endTime}"></div>
        </div>
        `
    }

    makeKeyframeProperty (property, timeline) {

        var keyframes = timeline.keyframes[property] || []

        return html`
            <div class='keyframe-property row' data-property='${property}' data-timeline-id="${timeline.id}">
            ${keyframes.map(keyframe => this.makeKeyFrameItem(keyframe, timeline))}
            </div>`
    }


    makeTimelinePropertyGroup (timeline, targetItem) {
        this.updateKeyframeList(timeline);

        targetItem = targetItem || this.get(timeline.targetId)
        var list = GET_PROPERTY_LIST(targetItem)

        return html`${list.map(it => {
            return html`
            <div class='keyframe-collapse row' data-property='${it.key}'></div>
            <div class='keyframe-property-list' data-property='${it.key}'>
                ${it.properties.map(property => {
                    return this.makeKeyframeProperty(property, timeline)
                })}
            </div>            
            `
        })}`
        
    }    

    makeTimelineObject (timeline, targetItem) {
        return `
            <div class='keyframe-object' data-type='layer' data-timeline-id='${timeline.id}'>
                <div class='keyframe-title row'></div>
                <div class='keyframe-group'>${this.makeTimelinePropertyGroup(timeline, targetItem)}</div>
            </div>
        `
    }    

    refresh () {
        this.$el.px('width', TIMELINE_TOTAL_WIDTH);
        this.setBackgroundGrid()
        this.load();
    }

    refreshKeyframe (keyframeId) {
        var keyframe = this.get(keyframeId)
        var timelineId = keyframe.parentId
        var timeline = this.get(timelineId)

        var $t = this.$el.$(`.keyframe-object[data-timeline-id="${timelineId}"]`);

        if ($t) {
            $t.$('.keyframe-group').html(this.makeTimelinePropertyGroup(timeline))
        }
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }

    [EVENT(ADD_TIMELINE)] (timelineId) {
        this.refresh()
    }

    [POINTERSTART('$el .bar') + SELF] (e) {
        this.msWidth = this.config('timeline.1ms.width')
        this.selectedClass = 'bar'
        this.selectedElement = e.$delegateTarget.parent()
        this.selectedStartX  = this.selectedElement.cssFloat('left');
        this.selectedStartWidth  = this.selectedElement.cssFloat('width');
        this.selectedX = this.selectedStartX
        this.selectedWidth = this.selectedStartWidth
        this.selectedId = this.selectedElement.attr('keyframe-id')

        this.xy = e.xy; 
        this.minX = 0; 
        this.maxX = 10000; 

        var minTime = this.read(TIMELINE_MIN_TIME_IN_KEYFRAMES, this.selectedId)
        this.minX = minTime * this.msWidth;

        var maxTime = this.read(TIMELINE_MAX_TIME_IN_KEYFRAMES, this.selectedId)
        this.maxX = maxTime * this.msWidth;

        // console.log('start', e.xy);
        this.setCurrentKeyframeItem(this.selectedId, 'bar')
    }

    [POINTERSTART('$el .start') + SELF] (e) {
        this.msWidth = this.config('timeline.1ms.width')        
        this.selectedClass = 'start'
        if (this.selectedEl) {
            this.selectedEl.removeClass('selected')
        }
        this.selectedEl = e.$delegateTarget;
        this.selectedEl.addClass('selected')
        this.selectedElement = e.$delegateTarget.parent()
        this.selectedStartX  = this.selectedElement.cssFloat('left');
        this.selectedStartWidth  = this.selectedElement.cssFloat('width');
        this.selectedEndX = this.selectedStartX + this.selectedStartWidth
        this.selectedX = this.selectedStartX
        this.selectedWidth = this.selectedStartWidth        
        this.xy = e.xy; 
        this.minX = 0;  
        this.maxX = this.selectedEndX;
        this.selectedId = this.selectedElement.attr('keyframe-id')


        var minTime = this.read(TIMELINE_MIN_TIME_IN_KEYFRAMES, this.selectedId)
        this.minX = minTime * this.msWidth;
        
        // console.log('start', e.xy);
        this.setCurrentKeyframeItem(this.selectedId, 'start')  
    }    

    [POINTERSTART('$el .end') + SELF] (e) {
        this.msWidth = this.config('timeline.1ms.width')        
        this.selectedClass = 'end'
        if (this.selectedEl) {
            this.selectedEl.removeClass('selected')
        }
        this.selectedEl = e.$delegateTarget;
        this.selectedEl.addClass('selected')        
        this.selectedElement = e.$delegateTarget.parent()
        this.selectedStartX  = this.selectedElement.cssFloat('left');
        this.selectedStartWidth  = this.selectedElement.cssFloat('width');
        this.selectedEndX = this.selectedStartX + this.selectedStartWidth
        this.selectedX = this.selectedStartX
        this.selectedWidth = this.selectedStartWidth                
        this.xy = e.xy; 
        this.minX = this.selectedStartX;
        this.maxX = 1000; 
        this.selectedId = this.selectedElement.attr('keyframe-id')        
        // console.log('start', e.xy);

        var maxTime = this.read(TIMELINE_MAX_TIME_IN_KEYFRAMES, this.selectedId)
        this.maxX = maxTime * this.msWidth;   

        this.setCurrentKeyframeItem(this.selectedId, 'end')

    }    

    setCurrentKeyframeItem (id, type) {
        this.initConfig('timeline.keyframe.selectedId', id);
        this.initConfig('timeline.keyframe.selectedType', type)

        if (type == 'start' || type == 'end') {
            this.emit(CHANGE_KEYFRAME_SELECTION)
        }
    }


    isSelectedClass () {
        return !!this.selectedClass;
    }

    updateKeyframeTime () {
        var id = this.selectedElement.attr('keyframe-id');
        var startTime = this.selectedX / this.msWidth
        var endTime = startTime + (this.selectedWidth / this.msWidth)
        this.commit(CHANGE_KEYFRAME, {id, startTime, endTime})
    }

    getTimeString (pixel, unit = 'ms') {
        var time = Math.floor(pixel / this.msWidth)

        return `${time}${unit}` 
    }

    setBarPosition (e) {
        var dx = (e.xy.x - this.xy.x);            
        var newX = this.match1ms( Math.min(Math.max(this.minX, this.selectedStartX + dx), this.maxX - this.selectedStartWidth), 10)
        this.selectedElement.px('left', newX)
        this.selectedElement.attr('data-start-time', this.getTimeString(newX))        
        this.selectedElement.attr('data-end-time', this.getTimeString(newX + this.selectedStartWidth))
        this.selectedX = newX

        this.updateKeyframeTime()
    }

    match1ms (x, baseTime = 1) {
        var width = this.msWidth * baseTime
        var time = Math.floor(x / width)
        return time * width;
    }

    setStartPosition (e) {
        var dx = (e.xy.x - this.xy.x);
        var newX = this.match1ms(Math.min( Math.max(this.minX, this.selectedStartX + dx) , this.maxX), 10)

        var newWidth = this.selectedEndX - newX

        this.selectedElement.attr('data-start-time', this.getTimeString(newX))        
        this.selectedElement.px('left', newX)
        this.selectedElement.px('width', newWidth)
        this.selectedElement.toggleClass('nested', newWidth < 1)
        this.selectedX = newX
        this.selectedWidth = newWidth

        this.updateKeyframeTime()        
    }

    setEndPosition (e) {
        var dx = (e.xy.x - this.xy.x);
        var newX = this.match1ms( Math.min( Math.max(this.minX, this.selectedEndX + dx) , this.maxX) , 10)
        var newWidth =  Math.max(0, newX - this.selectedStartX)
        this.selectedElement.attr('data-end-time', this.getTimeString(newX))
        this.selectedElement.px('width', newWidth)
        this.selectedElement.toggleClass('nested', !newWidth)        
        this.selectedWidth = newWidth

        this.updateKeyframeTime()        
    }

    [POINTERMOVE('document') + IF('isSelectedClass')] (e) {
        if (this.selectedClass == 'bar') {
            this.setBarPosition(e);
        } else if (this.selectedClass == 'start' ) {
            this.setStartPosition(e);
        } else if (this.selectedClass == 'end') {
            this.setEndPosition(e);
        }
    }

    [POINTEREND('document') + IF('isSelectedClass')] (e) {
        this.selectedClass = null;
        this.selectedElement.removeAttr('data-start-time')
        this.selectedElement.removeAttr('data-end-time')            
        this.selectedElement = null; 
    }

    [CLICK('$el .keyframe-property') + ALT] (e) {
        var [parentId, property] = e.$delegateTarget.attrs('data-timeline-id', 'data-property');
        var startTime = (e.xy.x - e.$delegateTarget.offset().left)  / this.config('timeline.1ms.width')
        var endTime = startTime; 

        if (this.read(TIMELINE_NOT_EXISTS_KEYFRAME, parentId, property, startTime)) {
            var timeline = this.get(parentId)
            var targetItem = this.get(timeline.targetId)
            var startValue = targetItem[property] || 0;
            var endValue = targetItem[property] || 0; 

            this.run(ITEM_ADD_KEYFRAME, parentId, { property, startTime, endTime, startValue, endValue }, (keyframeId) => {
                this.refreshKeyframe(keyframeId);
            })
        } else {
            alert('Time can not nested')
        }

    }

    [EVENT(MOVE_TIMELINE)] () {
        this.setBackgroundGrid()
    }

    [EVENT( CHANGE_TOOL, RESIZE_TIMELINE )] () {
        this.refresh();
    }
}