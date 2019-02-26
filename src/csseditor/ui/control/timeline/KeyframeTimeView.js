import UIElement, { EVENT } from "../../../../util/UIElement";
import { CHANGE_EDITOR } from "../../../types/event";
import { RESIZE_WINDOW, RESIZE_TIMELINE, SCROLL_LEFT_TIMELINE, MOVE_TIMELINE } from "../../../types/ToolTypes";
import { POINTERSTART, MOVE } from "../../../../util/Event";

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

            this.drawOption({strokeStyle: 'rgba(204, 204, 204, 0.3)',  lineWidth: 0.5, ...textOption})
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
                        this.drawOption({ fillStyle: '#ececec'})
                        this.drawText(startX, y, secondStringS)
                    } else {
                        var y = rect.height / 2;

                        // this.drawLine(startX, y, startX, rect.height);

                        if (width > 0.4) {
                            this.drawOption({ fillStyle: '#ececec'})                            
                            this.drawText(startX, y, secondStringS)
                        } else {
                            var currentView = (viewSecond % 1000)/100;
                            if ( currentView === 5) {
                                this.drawOption({ fillStyle: '#ececec'})                                
                                this.drawText(startX, y, secondString)
                            } else {
                                this.drawOption({ fillStyle: 'rgba(204, 204, 204, 0.3)'})
                                this.drawCircle(startX, y, 1)
                            }

                        }
                    }
                }

                startSecond += distSecond;
                viewSecond += distSecond;
                startX = startSecond * width; 
            }

            var left =  (cursorTime - currentTime) * width;
            var markTop = 10
            var markWidth = 4
            this.drawOption({strokeStyle: 'rgba(204, 204, 204, 0.3)',fillStyle: 'rgba(204, 204, 204, 0.3)', lineWidth: 1})
            this.drawPath(
                [left - markWidth, rect.height - markTop],
                [left + markWidth, rect.height - markTop],
                [left + markWidth, rect.height - markWidth],
                [left, rect.height],
                [left - markWidth, rect.height - markWidth],
                [left - markWidth, rect.height - markTop]
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