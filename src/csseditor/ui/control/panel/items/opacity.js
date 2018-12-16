import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_OPACITY
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class Opacity extends BasePropertyItem {
    template () {
        return `
            <div class='property-item opacity show'>
                <div class='items'>            
                    <div>
                        <label>Opacity</label>
                        <div>
                            <input type='range' ref="$opacityRange" min="0" max="1" step="0.01">
                            <input type='number' ref="$opacity" min="0" max="1" step="0.01">
                        </div>
                    </div>                                                                           
                </div>
            </div>
        `
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_OPACITY,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        this.read('/selection/current/layer', (item) => {
            this.refs.$opacityRange.val(item.opacity || "1")
            this.refs.$opacity.val(item.opacity || "1")
        })
        
    }

    updateTransform (type) {
        this.read('/selection/current/layer/id', (id) => {

            if (type == 'opacity') {
                this.commit(CHANGE_LAYER_TRANSFORM, {id, opacity: this.refs.$opacity.val()})
                this.refs.$opacityRange.val(this.refs.$opacity.val())
            } else if (type == 'range') {
                this.commit(CHANGE_LAYER_TRANSFORM, {id, opacity: this.refs.$opacityRange.val()})
                this.refs.$opacity.val(this.refs.$opacityRange.val())
            }
            
        })
    }

    'input $opacityRange' () { this.updateTransform('range'); }
    'input $opacity' () { this.updateTransform('opacity'); }
    
}