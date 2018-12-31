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

export default class RadiusFixed extends BasePropertyItem {
    template () {
        return `
            <div class='property-item fixed-radius show'>
                <div class='items'>            
                    <div>
                        <label > <button type="button" ref="$radiusLabel">*</button> Radius</label>
                        <div>
                            <input type='range' ref="$radiusRange" min="0" max="360">
                            <input type='number' ref="$radius" min="0" max="360"> <span>px</span>
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
        this.read('selection/current/layer', (item) => {
            var radius = defaultValue(string2unit(item.borderRadius), pxUnit(0) )
            this.refs.$radiusRange.val(radius.value)
            this.refs.$radius.val(radius.value)
        })
        
    }

    updateTransform (type) {
        this.read('selection/current/layer/id', (id) => {

            if (type == 'radius') {
                this.commit(CHANGE_LAYER_RADIUS, {
                    id, 
                    fixedRadius: true, 
                    borderRadius: pxUnit( this.refs.$radius.val() )
                })
                this.refs.$radiusRange.val(this.refs.$radius.val())
            } else if (type == 'range') {
                this.commit(CHANGE_LAYER_RADIUS, {
                    id, 
                    fixedRadius: true, 
                    borderRadius: pxUnit( this.refs.$radiusRange.val() )
                })
                this.refs.$radius.val(this.refs.$radiusRange.val())
            }
            
        })
    }

    [INPUT('$radiusRange')] () { this.updateTransform('range'); }
    [INPUT('$radius')] () { this.updateTransform('radius'); }
    [CLICK('$radiusLabel')] () {
        this.emit('toggleRadius');
    }
}