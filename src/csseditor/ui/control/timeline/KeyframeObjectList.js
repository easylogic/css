import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, POINTERSTART, POINTERMOVE, POINTEREND, SELF, CHECKER, CLICK, ALT, WHEEL, SCROLL } from "../../../../util/Event";
import { TIMELINE_TOTAL_WIDTH, TIMELINE_LIST } from "../../../types/TimelineTypes";
import { CHANGE_EDITOR, ADD_TIMELINE, CHANGE_KEYFRAME, CHANGE_TOOL } from "../../../types/event";
import { html } from "../../../../util/functions/func";
import { IS_LAYER } from "../../../../util/css/make";
import { stringUnit, pxUnit } from "../../../../util/css/types";
import { ITEM_MAP_KEYFRAME_CHILDREN } from "../../../types/ItemSearchTypes";
import { ITEM_ADD_KEYFRAME } from "../../../types/ItemCreateTypes";

export default class KeyframeObjectList extends UIElement {
    template () {
        return `<div class="keyframe-list"></div>`
    }

    [LOAD()] () {
        return this.read(TIMELINE_LIST).map( (timeline, index) => {
            return this.makeTimelineRow(timeline, index);
        })
    }

    setBackgroundGrid () {

        var width = this.config('timeline.1ms.width');
        var one_second = 1000;
        var widthFor1s = width * one_second;        
        var scrollLeft;
        var startTime = 0;  // 0ms 
        var timeScale; 
        var timeDist = 100  // 100ms = 0.1s 

        if ( (startTime % timeDist) != 0 ) {
            startTime +=  timeDist - (startTime % timeDist)
        }

        var fullWidth = Math.max(10, timeDist * width); 
        this.$el.cssText(`
            background-size: ${fullWidth}px 100%;
            background-position: ${fullWidth-1}px 0px;
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

        if (IS_LAYER(targetItem)) {
            return this.makeTimelineObjectForLayer(timeline);
        } 

        return ''; 
    }

    makeKeyFrameItem (keyframe, keyframeIndex, timeline) {

        var left = pxUnit(keyframe.startTime * this.config('timeline.1ms.width'))
        var width = pxUnit((keyframe.endTime - keyframe.startTime) * this.config('timeline.1ms.width'))

        return `
        <div 
            class='keyframe-item line' 
            style='left: ${stringUnit(left)}; width: ${stringUnit(width)};' 
            keyframe-id="${keyframe.id}" 
            keyframe-property="${keyframe.property}"
        >
            <div class='bar'></div>
            <div class='start' time="${keyframe.startTime}" value="${stringUnit(keyframe.startValue)}"></div>
            <div class='end' time="${keyframe.endTime}" value="${stringUnit(keyframe.endValue)}"></div>
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

    makeTimelineTransformProperty (timeline) {
        return `
        <div class='keyframe-collapse row' data-property='transform'></div>
        <div class='keyframe-property-list' data-property='transform'>
            ${this.makeKeyframeProperty('translateX', timeline)}
            ${this.makeKeyframeProperty('translateY', timeline)}
        </div>
        `
    }

    makeTimelineProperty (timeline) {

        this.updateKeyframeList(timeline);

        return html`${[
            this.makeTimelineTransformProperty(timeline)
        ]}`
    }

    makeTimelineObjectForLayer (timeline) {

        return `
            <div class='keyframe-object' data-type='layer' data-timeline-id='${timeline.id}'>
                <div class='keyframe-title row'></div>
                <div class='keyframe-group'>${this.makeTimelineProperty(timeline)}</div>
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
            var htmlString = this.makeTimelineProperty(timeline);
            $t.$('.keyframe-group').html(htmlString)
        }
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }

    [EVENT(ADD_TIMELINE)] (timelineId) {
        this.refresh()
    }

    [POINTERSTART('$el .bar') + SELF] (e) {
        this.selectedClass = 'bar'
        this.selectedElement = e.$delegateTarget.parent()
        this.selectedStartX  = this.selectedElement.cssFloat('left');
        this.selectedStartWidth  = this.selectedElement.cssFloat('width');
        this.selectedX = this.selectedStartX
        this.selectedWidth = this.selectedStartWidth

        this.xy = e.xy; 
        this.minX = 0; 
        this.maxX = 10000; 

        var selectedKeyframe = this.get(this.selectedElement.attr('keyframe-id'))
        if (selectedKeyframe.prevId) {
            this.minX = this.get(selectedKeyframe.prevId).endTime * ONE_MIllISECOND_WIDTH;
        }

        if (selectedKeyframe.nextId) {
            this.maxX = this.get(selectedKeyframe.nextId).startTime * ONE_MIllISECOND_WIDTH;
        }
        // console.log('start', e.xy);
    }

    [POINTERSTART('$el .start') + SELF] (e) {
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

        var selectedKeyframe = this.get(this.selectedElement.attr('keyframe-id'))
        if (selectedKeyframe.prevId) {
            this.minX = this.get(selectedKeyframe.prevId).endTime * ONE_MIllISECOND_WIDTH;
        }                   
        // console.log('start', e.xy);
    }    

    [POINTERSTART('$el .end') + SELF] (e) {
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
        // console.log('start', e.xy);

        var selectedKeyframe = this.get(this.selectedElement.attr('keyframe-id'))
        if (selectedKeyframe.nextId) {
            this.maxX = this.get(selectedKeyframe.nextId).startTime * ONE_MIllISECOND_WIDTH;
        }        
    }    


    isSelectedClass () {
        return this.selectedClass != '';
    }

    updateKeyframeTime () {
        var id = this.selectedElement.attr('keyframe-id');
        var startTime = this.selectedX / ONE_MIllISECOND_WIDTH
        var endTime = startTime + (this.selectedWidth / ONE_MIllISECOND_WIDTH)
        this.commit(CHANGE_KEYFRAME, {id, startTime, endTime})
    }

    setBarPosition (e) {
        var dx = (e.xy.x - this.xy.x);            
        var newX = Math.min(Math.max(this.minX, this.selectedStartX + dx), this.maxX - this.selectedStartWidth);
        this.selectedElement.px('left', newX)
        this.selectedX = newX

        this.updateKeyframeTime()
    }

    setStartPosition (e) {
        var dx = (e.xy.x - this.xy.x);
        var newX = Math.min( Math.max(this.minX, this.selectedStartX + dx) , this.selectedEndX)
        var newWidth = this.selectedStartWidth - (newX - this.selectedStartX)
        this.selectedElement.px('left', newX)
        this.selectedElement.px('width', newWidth)
        this.selectedX = newX
        this.selectedWidth = newWidth

        this.updateKeyframeTime()        
    }

    setEndPosition (e) {
        var dx = (e.xy.x - this.xy.x);
        var newX = Math.min( Math.max(this.minX, this.selectedEndX + dx) , this.maxX)
        var newWidth =  Math.max(0, this.selectedStartWidth + (newX - this.selectedEndX) )
        this.selectedElement.px('width', newWidth)
        this.selectedWidth = newWidth

        this.updateKeyframeTime()        
    }

    [POINTERMOVE('document') + CHECKER('isSelectedClass')] (e) {
        if (this.selectedClass == 'bar') {
            this.setBarPosition(e);
        } else if (this.selectedClass == 'start' ) {
            this.setStartPosition(e);
        } else if (this.selectedClass == 'end') {
            this.setEndPosition(e);
        }
    }

    [POINTEREND('document')] (e) {
        if (this.selectedClass) {
            this.selectedClass = ''
            this.selectedElement = null; 
            // console.log('end', e.xy);    
        }
    }

    [CLICK('$el .keyframe-property') + ALT] (e) {
        var [parentId, property] = e.$delegateTarget.attrs('data-timeline-id', 'data-property');
        var startTime = (e.xy.x - e.$delegateTarget.offset().left)  / this.config('timeline.1ms.width')
        var endTime = startTime + 100; 

        this.run(ITEM_ADD_KEYFRAME, parentId, { property, startTime, endTime }, (keyframeId) => {
            this.refreshKeyframe(keyframeId);
        })
    }

    [EVENT(CHANGE_TOOL)] (key, value) {
        this.refresh();
    }
}