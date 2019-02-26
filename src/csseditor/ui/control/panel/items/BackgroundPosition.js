import UnitRange from "./element/UnitRange";
import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_IMAGE, CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { UNIT_PX, percentUnit, convertPercentUnit, unitValue } from "../../../../../util/css/types";
import { defaultValue } from "../../../../../util/functions/func";
import { SELECTION_CURRENT_IMAGE_ID, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";
import PredefinedBackgroundPosition from "../../shape/PredefinedBackgroundPosition";
import BackgroundResizer from "../../shape/BackgroundResizer";

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

    updateX (backgroundPositionX) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundPositionX})
        })
    }    

    updateY (backgroundPositionY) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundPositionY})
        })
    }        


    getMaxHeight () {
        var layer = this.read(SELECTION_CURRENT_LAYER);

        if (!layer) return 0;

        return unitValue(layer.height)
    }

    getMaxY () {
        var layer = this.read(SELECTION_CURRENT_LAYER);

        if (!layer) return 0;

        return unitValue(layer.height) * 2; 
    }

    getMaxWidth () {
        var layer = this.read(SELECTION_CURRENT_LAYER);

        if (!layer) return 0;

        return unitValue(layer.width)
    }

    getMaxX () {
        var layer = this.read(SELECTION_CURRENT_LAYER);

        if (!layer) return 0;

        return unitValue(layer.width) * 2; 
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
            this.read(SELECTION_CURRENT_IMAGE, (image) => {

                var x = convertPercentUnit( defaultValue(image.backgroundPositionX, percentUnit(0)) )
                var y = convertPercentUnit( defaultValue(image.backgroundPositionY, percentUnit(0)) )
                
                this.children.$x.refresh(x);
                this.children.$y.refresh(y);

            })   
        }

    }

    isShow () {

        return true; 
    }

}