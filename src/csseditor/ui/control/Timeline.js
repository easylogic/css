import UIElement from "../../../colorpicker/UIElement";
import { CLICK, SCROLL, DEBOUNCE, DROP, RESIZE, WHEEL, ALT } from "../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../types/SelectionTypes";
import Animation from "../../../util/animation/Animation";
import { ITEM_SET } from "../../types/ItemTypes";
import { TOOL_SAVE_DATA, TOOL_RESTORE_DATA, RESIZE_TIMELINE, SCROLL_LEFT_TIMELINE, TOGGLE_TIMELINE } from "../../types/ToolTypes";
import TimelineObjectList from "./timeline/TimelineObjectList";
import KeyframeObjectList from "./timeline/KeyframeObjectList";
import { TIMELINE_PUSH, TIMELINE_NOT_EXISTS } from "../../types/TimelineTypes";
import { ADD_TIMELINE } from "../../types/event";
import KeyframeTimeView from "./timeline/KeyframeTimeView";
import TimelineTopToolbar from "./timeline/TimelineTopToolbar";

export default class Timeline extends UIElement {

    components() {
        return { 
            TimelineTopToolbar,            
            KeyframeTimeView,
            TimelineObjectList,
            KeyframeObjectList 
        }
    }

    template () {
        return `
            <div class='timeline-view'>
                <div class="timeline-top" ref="$top">
                    <div class='timeline-toolbar'>
                        <span ref='$title' class='title'>Timeline</span>
                    </div>
                    <div class='keyframe-toolbar'>
                        <TimelineTopToolbar />
                    </div>                
                </div>
                <div class="timeline-header" ref="$header">
                    <div class='timeline-toolbar'>
                        
                    </div>
                    <div class='keyframe-toolbar' ref="$keyframeToolbar">
                        <KeyframeTimeView />
                    </div>
                </div>
                <div class='timeline-body' ref="$timelineBody">
                    <div class='timeline-panel' ref='$keyframeList'>
                        <KeyframeObjectList />
                    </div>                
                    <div class='timeline-list' ref='$timelineList'>
                        <TimelineObjectList />
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

    [CLICK('$title')] () {
        this.emit(TOGGLE_TIMELINE)
    }

    [SCROLL('$timelineList') + DEBOUNCE(10)] (e) {
        this.refs.$keyframeList.setScrollTop(this.refs.$timelineList.scrollTop())
    }

    [SCROLL('$keyframeList') + DEBOUNCE(10)] (e) {
        this.refs.$timelineList.setScrollTop(this.refs.$keyframeList.scrollTop())
        this.initConfig('timeline.scroll.left', this.refs.$keyframeList.scrollLeft())
        this.emit(SCROLL_LEFT_TIMELINE)
    }    

    [DROP('$timelineList')] (e) {
        e.preventDefault();
        var draggedId = e.dataTransfer.getData('text');

        if (this.read(TIMELINE_NOT_EXISTS, draggedId)) {
            this.run(TIMELINE_PUSH, draggedId);
        } else {
            alert(`Item exists already in timeline.`)
        }
    }

    [WHEEL('$timelineBody') + ALT] (e) {
        e.preventDefault()
        e.stopPropagation()

        // 현재 마우스 위치 저장 
        this.initConfig('timeline.mouse.pointer', e.xy);

        if (e.wheelDeltaY < 0) {    // 확대 
            this.initConfig('timeline.1ms.width', Math.min(0.5, this.config('timeline.1ms.width') * 1.1)  )
        } else {    // 축소 
            this.initConfig('timeline.1ms.width', Math.max(0.1, this.config('timeline.1ms.width') * 0.9)  )
        }

        this.emit(RESIZE_TIMELINE, e);

    }
}