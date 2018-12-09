import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_RADIUS, 
    CHANGE_LAYER_RADIUS 
} from "../../../../types/event";
import { parseParamNumber } from "../../../../../util/gl/filter/util";

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

    [EVENT_CHANGE_LAYER] () { this.refresh(); }
    [EVENT_CHANGE_LAYER_RADIUS] () { this.refresh(); }
    [EVENT_CHANGE_EDITOR] () { this.refresh() }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }    

    refresh() {
        this.read('/selection/current/layer', (item) => {
            var radius = parseParamNumber(item.borderRadius || "0px");
            this.refs.$radiusRange.val(radius)
            this.refs.$radius.val(radius)
        })
        
    }

    updateTransform (type) {
        this.read('/selection/current/layer/id', (id) => {

            if (type == 'radius') {
                this.commit(CHANGE_LAYER_RADIUS, {
                    id, 
                    fixedRadius: true, 
                    borderRadius: this.refs.$radius.val() + 'px'
                })
                this.refs.$radiusRange.val(this.refs.$radius.val())
            } else if (type == 'range') {
                this.commit(CHANGE_LAYER_RADIUS, {
                    id, 
                    fixedRadius: true, 
                    borderRadius: this.refs.$radiusRange.val() + 'px'
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