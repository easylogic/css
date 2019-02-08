import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_RADIUS 
} from "../../../../types/event";
import { pxUnit, string2unit } from "../../../../../util/css/types";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { defaultValue } from "../../../../../util/functions/func";
import { CLICK, INPUT } from "../../../../../util/Event";
import { ITEM_TYPE_CIRCLE } from "../../../../types/ItemTypes";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";

export default class RadiusFixed extends BasePropertyItem {
    template () {
        return `
            <div class='property-item fixed-radius'>
                <div class='items'>            
                    <div>
                        <label > <button type="button" ref="$radiusLabel">*</button> Radius</label>
                        <div>
                            <input type='range' ref="$radiusRange" min="0" max="360">
                            <input type='number' class='middle' ref="$radius" min="0" max="360"> <span>px</span>
                        </div>
                    </div>                                                                           
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_RADIUS,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            this.read(SELECTION_CURRENT_LAYER, (item) => {
                var radius = defaultValue(string2unit(item.borderRadius), pxUnit(0) )
                this.refs.$radiusRange.val(radius.value)
                this.refs.$radius.val(radius.value)
            })
        }
    }

    isShow () {
        var layer = this.read(SELECTION_CURRENT_LAYER);

        if (!layer) return false; 
        if (layer.type == ITEM_TYPE_CIRCLE) return false;

        return true;
    }

    updateTransform (type) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {

            if (type == 'radius') {
                var borderRadiusValue = this.refs.$radius.val()
                this.commit(CHANGE_LAYER_RADIUS, {
                    id, 
                    fixedRadius: true, 
                    borderRadius: pxUnit( borderRadiusValue )
                })
                this.refs.$radiusRange.val(borderRadiusValue)
            } else if (type == 'range') {
                var borderRadiusValue = this.refs.$radiusRange.val()
                this.commit(CHANGE_LAYER_RADIUS, {
                    id, 
                    fixedRadius: true, 
                    borderRadius: pxUnit( borderRadiusValue )
                })
                this.refs.$radius.val(borderRadiusValue)
            }
            
        })
    }

    [INPUT('$radiusRange')] () { this.updateTransform('range'); }
    [INPUT('$radius')] () { this.updateTransform('radius'); }
    [CLICK('$radiusLabel')] () {
        this.emit('toggleRadius');
    }
}