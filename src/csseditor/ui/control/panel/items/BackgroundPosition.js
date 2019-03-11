import UnitRange from "./element/UnitRange";
import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_IMAGE, CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { UNIT_PX} from "../../../../../util/css/types";
import PredefinedBackgroundPosition from "../../shape/PredefinedBackgroundPosition";
import BackgroundResizer from "../../shape/BackgroundResizer";
import { editor } from "../../../../../editor/editor";

export default class BackgroundPosition extends UIElement {
    components () {
        return {
            PredefinedBackgroundPosition,
            BackgroundResizer,
            UnitRange
        }
    }
    template () {
        return `
            <div class='property-item background-position show'>
                <div class='items'>

                    <div class='drag-property-ui'>
                        <div class='drag-ui'>
                            <PredefinedBackgroundPosition></PredefinedBackgroundPosition>
                            <BackgroundResizer></BackgroundResizer>
                        </div>

                        <div class='property-ui'>

                            <div>
                                <label>x</label>
                                <UnitRange 
                                    ref="$x" 
                                    min="-100" max="1000" step="1" value="0" unit="${UNIT_PX}"
                                    maxValueFunction="getMaxX"
                                    updateFunction="updateX"
                                ></UnitRange>
                            </div>
                            <div>
                                <label>y</label>
                                <UnitRange 
                                    ref="$y" 
                                    min="-100" max="1000" step="1" value="0" unit="${UNIT_PX}"
                                    maxValueFunction="getMaxY"
                                    updateFunction="updateY"
                                ></UnitRange>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        `
    }

    updateX (x) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, { x })
    }    

    updateY (y) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, { y })
    }        


    getMaxHeight () {
        var layer = editor.selection.currentLayer;
        if (!layer) return 0;

        return +layer.height
    }

    getMaxY () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return (+layer.height) * 2; 
    }

    getMaxWidth () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return (+layer.width)
    }

    getMaxX () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return (+layer.width) * 2; 
    }  

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    refresh() {

        var isShow = this.isShow()

        this.$el.toggle(isShow)

        if (isShow) {
            var image = editor.selection.currentBackgroundImage;
            if (image) {
                this.children.$x.refresh(image.x);
                this.children.$y.refresh(image.y);
            }
        }

    }

    isShow () {

        return true; 
    }

}