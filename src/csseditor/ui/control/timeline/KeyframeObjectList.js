import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, POINTERSTART, POINTERMOVE, POINTEREND, SELF, CHECKER } from "../../../../util/Event";
import { TIMELINE_TOTAL_WIDTH, TIMELINE_LIST } from "../../../types/TimelineTypes";
import { CHANGE_EDITOR, ADD_TIMELINE } from "../../../types/event";
import { defaultValue } from "../../../../util/functions/func";
import { IS_LAYER } from "../../../../util/css/make";

export default class KeyframeObjectList extends UIElement {
    template () {
        return `<div class="keyframe-list"></div>`
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
            <div class='keyframe-object' data-type='layer' data-timeline-id='${timeline.id}'>
                <div class='keyframe-title row'></div>
                <div class='keyframe-group'>
                    <div class='keyframe-collapse row' data-property='transform'></div>
                    <div class='keyframe-property-list' data-property='transform'>
                        <div class='keyfame-property row' data-property='translateX'>
                            <div class='keyframe-item line' style='left: 50px; width: 300px;'>
                                <div class='bar'></div>
                                <div class='start' ></div>
                                <div class='end' ></div>
                            </div>
                            <div class='keyframe-item line' style='left: 350px; width: 300px;'>
                                <div class='bar'></div>
                                <div class='start' ></div>
                                <div class='end' ></div>
                            </div>
                            <div class='keyframe-item line' style='left: 650px; width: 300px;'>
                                <div class='bar'></div>
                                <div class='start' ></div>
                                <div class='end' ></div>
                            </div>
                            <div class='keyframe-item line' style='left: 950px; width: 300px;'>
                                <div class='bar'></div>
                                <div class='start' ></div>
                                <div class='end' ></div>
                            </div>                            
                        </div>    
                        <div class='keyfame-property row' data-property='translateY'></div>    
                    </div>
                </div>
            </div>
        `
    }    

    refresh () {
        this.$el.px('width', TIMELINE_TOTAL_WIDTH);
        this.load();
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
        this.xy = e.xy; 
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
        this.xy = e.xy; 
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
        this.xy = e.xy; 
        // console.log('start', e.xy);
    }    


    isSelectedClass () {
        return this.selectedClass != '';
    }

    [POINTERMOVE('document') + CHECKER('isSelectedClass')] (e) {
        if (this.selectedClass == 'bar') {
            var newX = Math.max(0, this.selectedStartX + (e.xy.x - this.xy.x));
            this.selectedElement.px('left', newX)
        } else if (this.selectedClass == 'start' ) {
            var dx = (e.xy.x - this.xy.x);
            var newX = Math.min( Math.max(0, this.selectedStartX + dx) , this.selectedEndX)
            var newWidth = this.selectedStartWidth - (newX - this.selectedStartX)
            this.selectedElement.px('left', newX)
            this.selectedElement.px('width', newWidth)
        } else if (this.selectedClass == 'end') {
            var dx = (e.xy.x - this.xy.x);
            var newWidth =  Math.max(0, this.selectedStartWidth + dx)
            this.selectedElement.px('width', newWidth)
        }
    }

    [POINTEREND('document')] (e) {
        this.selectedClass = ''
        this.selectedElement = null; 
        // console.log('end', e.xy);
    }

}