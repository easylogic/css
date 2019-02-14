import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { CHANGE_EDITOR, CHANGE_TOOL } from "../../../types/event";
import { RESIZE_WINDOW } from "../../../types/ToolTypes";

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

        var textOption = {
            textAlign: 'center',
            textBaseline: 'bottom'
        }

        this.refs.$canvas.update(function () {
            var rect = this.rect();

            this.drawOption({strokeStyle: 'rgba(0, 0, 0, 0.5)'})
            var startSecond = startTime; 
            var distSecond = timeDist; 
            var startX = startSecond * width 

            while(startX < rect.width) {

                if (startSecond % one_second === 0) {
                    this.drawOption({strokeStyle: 'rgba(0, 0, 0, 0.5)'})
                    this.drawLine(startX, rect.height - 15, startX, rect.height);
                    this.drawText(startX, rect.height - 15, `${(startSecond/1000)}s`, textOption)
                } else {
                    this.drawOption({strokeStyle: 'rgba(0, 0, 0, 0.5)'})                    
                    this.drawLine(startX, rect.height - 5, startX, rect.height);

                    if (width > 0.6) {
                        this.drawText(startX, rect.height - 5, `${(startSecond/1000)}s`, textOption)
                    }

                }

                startSecond += distSecond;
                startX = startSecond * width; 
            }
            
        })
    }

    [EVENT(
        CHANGE_EDITOR,
        RESIZE_WINDOW,
        CHANGE_TOOL
    )] () {
        this.resizeCanvas()        
        this.refresh();
    }
}