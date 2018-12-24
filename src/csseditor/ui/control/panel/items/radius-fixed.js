import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_RADIUS, 
    CHANGE_LAYER_RADIUS 
} from "../../../../types/event";
import { parseParamNumber } from "../../../../../util/gl/filter/util";
import { px, pxUnit } from "../../../../../util/css/types";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { defaultValue } from "../../../../../util/functions/func";

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

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_RADIUS,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        this.read('/selection/current/layer', (item) => {
            var radius = defaultValue(item.borderRadius, pxUnit(0) )
            this.refs.$radiusRange.val(radius.value)
            this.refs.$radius.val(radius.value)
        })
        
    }

    updateTransform (type) {
        this.read('/selection/current/layer/id', (id) => {

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

    'input $radiusRange' () { this.updateTransform('range'); }
    'input $radius' () { this.updateTransform('radius'); }
    'click $radiusLabel' () {
        this.emit('toggleRadius');
    }
}