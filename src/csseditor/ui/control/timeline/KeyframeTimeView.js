import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { CHANGE_EDITOR } from "../../../types/event";
import { RESIZE_WINDOW, RESIZE_TIMELINE, SCROLL_LEFT_TIMELINE, MOVE_TIMELINE } from "../../../types/ToolTypes";
import { POINTERSTART, POINTERMOVE, POINTEREND, IF, MOVE, END } from "../../../../util/Event";

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
        var cursorTime = this.config('timeline.cursor.time')
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
            textBaseline: 'middle',
            font: '10px sans-serif'
        }

        this.refs.$canvas.update(function () {
            var rect = this.rect();

            this.drawOption({strokeStyle: 'rgba(0, 0, 0, 0.5)',  lineWidth: 0.5, ...textOption})
            var startSecond = startTime; 
            var viewSecond = viewTime;
            var distSecond = timeDist; 
            var startX = startSecond * width 

            while(startX < rect.width) {

                if (startSecond !== 0) {    // 0 이 아닌 경우만 그리기 
                    var secondString = viewSecond/1000;     // 표시 지점 
                    var secondStringS = secondString
                    if (viewSecond % one_second === 0) {
                        var y = rect.height / 2;
                        // this.drawLine(startX, y, startX, rect.height);
                        this.drawOption({ fillStyle: '#333'})
                        this.drawText(startX, y, secondStringS)
                    } else {
                        var y = rect.height / 2;

                        // this.drawLine(startX, y, startX, rect.height);

                        if (width > 0.4) {
                            this.drawOption({ fillStyle: '#333'})                            
                            this.drawText(startX, y, secondStringS)
                        } else {
                            var currentView = (viewSecond % 1000)/100;
                            if ( currentView === 5) {
                                this.drawOption({ fillStyle: '#333'})                                
                                this.drawText(startX, y, secondString)
                            } else {
                                this.drawOption({ fillStyle: 'rgba(0, 0, 0, 0.5)'})
                                this.drawCircle(startX, y, 0.5)
                            }

                        }
                    }
                }

                startSecond += distSecond;
                viewSecond += distSecond;
                startX = startSecond * width; 
            }

            var left =  (cursorTime - currentTime) * width;
            this.drawOption({strokeStyle: 'rgba(0, 0, 0, 0.5)',fillStyle: 'rgba(236, 236, 236, 0.5)', lineWidth: 1})
            this.drawPath(
                [left - 5, rect.height - 13],
                [left + 5, rect.height - 13],
                [left + 5, rect.height - 5],
                [left, rect.height],
                [left - 5, rect.height - 5],
                [left - 5, rect.height - 13]
            )
            
        })
    }

    [POINTERSTART('$canvas') + MOVE()] (e) {
        this.selectedCanvasOffset = this.refs.$canvas.offset()
    }

    move () {
        var distX = this.config('pos').x - this.selectedCanvasOffset.left; 
        var scrollLeft = this.config('timeline.scroll.left') + distX;
        this.initConfig('timeline.cursor.time', scrollLeft / this.config('timeline.1ms.width'));
        this.emit(MOVE_TIMELINE)
        this.refreshCanvas();
    }

    [EVENT(
        CHANGE_EDITOR,
        RESIZE_WINDOW,
        RESIZE_TIMELINE,
        SCROLL_LEFT_TIMELINE,
        MOVE_TIMELINE
    )] () {
        this.resizeCanvas()        
        this.refresh();
    }
}