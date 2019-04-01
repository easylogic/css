import UIElement, { EVENT } from "../../../../util/UIElement";
import { CHANGE_SELECTION } from "../../../types/event";

export default class DragAreaView extends UIElement {

    templateClass () {
        return 'drag-area-view'
    }

    initDragAreaView () {
        this.$el.css({left: '-10000px'});
    }

    setDragAreaView (dragRect) {
        this.$el.css(dragRect);
    }

    [EVENT('setDragAreaView')] (dragRect) {
        this.setDragAreaView(dragRect);
    }

    [EVENT(
        CHANGE_SELECTION
    )] () {
        this.initDragAreaView();
    }
}