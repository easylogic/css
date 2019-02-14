import UIElement from "../../../colorpicker/UIElement";
import { CLICK, SCROLL, DEBOUNCE, DROP, RESIZE, WHEEL, ALT } from "../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../types/SelectionTypes";
import Animation from "../../../util/animation/Animation";
import { ITEM_SET } from "../../types/ItemTypes";
import { TOOL_SAVE_DATA, TOOL_RESTORE_DATA } from "../../types/ToolTypes";
import TimelineObjectList from "./timeline/TimelineObjectList";
import KeyframeObjectList from "./timeline/KeyframeObjectList";
import KeyframeGuideLine from "./timeline/KeyframeGuideLine";
import { TIMELINE_PUSH } from "../../types/TimelineTypes";
import { ADD_TIMELINE } from "../../types/event";
import KeyframeTimeView from "./timeline/KeyframeTimeView";

export default class Timeline extends UIElement {

    components() {
        return { 
            KeyframeTimeView,
            KeyframeGuideLine,
            TimelineObjectList,
            KeyframeObjectList
        }
    }

    template () {
        return `
            <div class='timeline-view'>
                <div class="timeline-header" ref="$header">
                    <div class='timeline-toolbar'>Timeline</div>
                    <div class='keyframe-toolbar' ref="$keyframeToolbar">
                        <KeyframeTimeView></KeyframeTimeView>
                    </div>
                </div>
                <div class='timeline-body' ref="$timelineBody">
                    <div class='timeline-panel' ref='$keyframeList'>
                        <KeyframeObjectList></KeyframeObjectList>
                        <KeyframeGuideLine></KeyframeGuideLine>
                    </div>                
                    <div class='timeline-list' ref='$timelineList'>
                        <TimelineObjectList></TimelineObjectList>
                    </div>
                </div>
            </div>
        `
    }


    startAnimation () {

        this.run(TOOL_SAVE_DATA);

        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var self = this; 
            var obj = layer
            var aniObject = Animation.createTimeline([{
                duration: 1000, 
                obj,
                timing: 'ease-out-sine',
                iteration: 3, 
                direction: 'alternate',
                keyframes : {
                    '0%': {
                        'x': '0px',
                        'background-color': 'rgba(255, 255, 255, 0.5)',
                    },
                    '100%': {
                        'x': '250px',
                        'background-color': 'rgba(255, 0, 255, 1)'
                    }
                } 

            }], {
                callback: () => {
                    this.run(ITEM_SET, layer);
                    this.emit('animationEditor')
                },
                done:  () => {
                    this.run(TOOL_RESTORE_DATA);
                }
            });

            aniObject.start();
    
        })

    }



    [CLICK('$header')] () {
        this.startAnimation();
    }

    [SCROLL('$timelineList') + DEBOUNCE(10)] (e) {
        this.refs.$keyframeList.setScrollTop(this.refs.$timelineList.scrollTop())
    }

    [SCROLL('$keyframeList') + DEBOUNCE(10)] (e) {
        this.refs.$timelineList.setScrollTop(this.refs.$keyframeList.scrollTop())
        this.refs.$keyframeToolbar.setScrollLeft(this.refs.$keyframeList.scrollLeft())
    }    

    [DROP('$timelineList')] (e) {
        e.preventDefault(e);
        var draggedId = e.dataTransfer.getData('text');

        this.run(TIMELINE_PUSH, draggedId);

    }

    [WHEEL('$timelineBody') + ALT] (e) {
        e.preventDefault()
        e.stopPropagation()
        var dt = Math.abs(this.config('timeline.1ms.width.original') * e.deltaY * 0.1);

        if (e.wheelDeltaY < 0) {    // 확대 
            this.config('timeline.1ms.width', this.config('timeline.1ms.width') + dt  )
        } else {    // 축소 
            this.config('timeline.1ms.width', Math.max(0.1, this.config('timeline.1ms.width') - dt)  )
        }
    }
}