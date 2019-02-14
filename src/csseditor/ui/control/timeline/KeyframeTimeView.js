import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { CHANGE_EDITOR, CHANGE_TOOL } from "../../../types/event";
import { RESIZE_WINDOW, RESIZE_TIMELINE, SCROLL_LEFT_TIMELINE } from "../../../types/ToolTypes";

export default class KeyframeTimeView extends UIElement {
    template () {
        return `<div class='keyframe-time-view'><canvas ref="$canvas"></canvas></div>`
    }

    refresh () {
        this.refreshCanvas();
    }

    resizeCanvas () {
        this.refs.$canvas.resize(this.$el.rect());
    }

    refreshCanvas() {

        var scrollLeft = this.config('timeline.scroll.left');
        var width = this.config('timeline.1ms.width');
        var one_second = 1000;
        var currentTime = Math.floor(scrollLeft / width)
        var startTime = 0;  // 0ms 
        var timeDist = 100  // 100ms = 0.1s 

        if ( (currentTime % timeDist) != 0 ) {
            startTime =  timeDist - (currentTime % timeDist)
        }

        var viewTime = currentTime + startTime;

        var textOption = {
            textAlign: 'center',
            textBaseline: 'bottom',
            font: '10px sans-serif'
        }

        this.refs.$canvas.update(function () {
            var rect = this.rect();

            this.drawOption({strokeStyle: 'rgba(0, 0, 0, 0.5)', ...textOption})
            var startSecond = startTime; 
            var viewSecond = viewTime;
            var distSecond = timeDist; 
            var startX = startSecond * width 

            while(startX < rect.width) {

                if (startSecond !== 0) {    // 0 이 아닌 경우만 그리기 
                    var secondString = viewSecond/1000;     // 표시 지점 
                    var secondStringS = secondString + 's'
                    if (viewSecond % one_second === 0) {
                        var y = rect.height - 15;
                        this.drawLine(startX, y, startX, rect.height);
                        this.drawText(startX, y, secondStringS)
                    } else {
                        var y = rect.height - 5
                        this.drawLine(startX, y, startX, rect.height);

                        if (width > 0.4) {
                            this.drawText(startX, y, secondStringS)
                        } else {
                            var currentView = (viewSecond % 1000)/100;
                            if ( currentView === 3 || currentView === 6) {
                                this.drawText(startX, y, secondString)
                            }
                        }
                    }
                }

                startSecond += distSecond;
                viewSecond += distSecond;
                startX = startSecond * width; 
            }
            
        })
    }

    [EVENT(
        CHANGE_EDITOR,
        RESIZE_WINDOW,
        RESIZE_TIMELINE,
        SCROLL_LEFT_TIMELINE
    )] () {
        this.resizeCanvas()        
        this.refresh();
    }
}