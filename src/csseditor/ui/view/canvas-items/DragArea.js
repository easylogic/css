import UIElement from "../../../../util/UIElement";
import { POINTERSTART, PREVENT, STOP, MOVE, END } from "../../../../util/Event";
import { CHANGE_SELECTION } from "../../../types/event";
import { editor } from "../../../../editor/editor";
import { Length } from "../../../../editor/unit/Length";
import { itemPositionCalc } from "../../../../editor/ItemPositionCalc";

export default class DragArea extends UIElement {

    templateClass () {
        return 'area drag-area'
    }

    [POINTERSTART() + PREVENT + STOP + MOVE('dragArea') + END('dragAreaEnd')] (e) {
        this.selectMode = 'drag'
        this.offsetX = e.offsetX 
        this.offsetY = e.offsetY
        this.emit('removeGuideLine')
    }

    getDragRect (dx, dy) {
        var x = dx > -1 ? this.offsetX : this.offsetX + dx;
        var y = dy > -1 ? this.offsetY : this.offsetY + dy; 

        var rect = {
            x: Length.px(x),
            y: Length.px(y),
            width: Length.px(Math.abs(dx)),
            height: Length.px(Math.abs(dy)),
        }

        rect.x2 = Length.px(rect.x.value + rect.width.value)
        rect.y2 = Length.px(rect.y.value + rect.height.value)

        return rect; 
    }

    getDragCSS (dx, dy) {
        var rect  = this.getDragRect(dx, dy);

        return {
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height
        }
    }

    dragArea (dx, dy) {
        this.emit('setDragAreaView', this.getDragCSS(dx, dy))
    }

    dragAreaEnd (dx, dy) {

        editor.selection.area(this.getDragRect(dx, dy));
        itemPositionCalc.initialize();
        this.emit(CHANGE_SELECTION);
    }
}