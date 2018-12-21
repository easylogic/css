import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_LAYER_TRANSFORM, 
    CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER_ROTATE
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { UNIT_DEG, UNIT_PX } from "../../../../../util/css/types";

export default class Transform extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='title' ref="$title">Transform 2D</div>
                <div class='items'>            
                    <div>
                        <label>Rotate</label>
                        <div>
                            <input type='range' ref="$rotateRange" min="0" max="360">
                            <input type='number' ref="$rotate"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>
                    <div>
                        <label>Scale</label>
                        <div>
                            <input type='range' ref="$scaleRange" min="0.5" max="10.0" step="0.1">                        
                            <input type='number' ref="$scale" min="0.5" max="10.0" step="0.1">
                        </div>
                    </div>                      
                    <div>
                        <label>SkewX</label>
                        <div>
                            <input type='range' ref="$skewXRange" min="-360" max="360" step="0.1">    
                            <input type='number' ref="$skewX" min="-360" max="360" step="0.1"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>
                    <div>                        
                        <label>SkewY</label>
                        <div>
                            <input type='range' ref="$skewYRange" min="-360" max="360" step="0.1">
                            <input type='number' ref="$skewY" min="-360" max="360" step="0.1"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>     
   
                    <div>
                        <label>translateX</label>
                        <div>
                            <input type='range' ref="$translateXRange" min="-2000" max="2000" step="1">                        
                            <input type='number' ref="$translateX" min="-2000" max="2000" step="1"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>                        
                        <label>translateY</label>
                        <div>
                            <input type='range' ref="$translateYRange" min="-2000" max="2000" step="1">
                            <input type='number' ref="$translateY" min="-2000" max="2000" step="1"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>                        
                        <label>translateZ</label>
                        <div>
                            <input type='range' ref="$translateZRange" min="-2000" max="2000" step="1">
                            <input type='number' ref="$translateZ" min="-2000" max="2000" step="1"> <span>${UNIT_PX}</span>
                        </div>                        
                    </div>                                                         
                </div>
            </div>
        `
    }

    [MULTI_EVENT (
        EVENT_CHANGE_LAYER_TRANSFORM,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_LAYER_ROTATE
    )] () {
        this.refresh()
    }

    refresh() {
        this.read('/selection/current/layer', (item) => {

            var attr = ['rotate', 'skewX', 'skewY', 'scale', 'translateX', 'translateY', 'translateZ']

            attr.forEach( key => {
                if (item[key]) {
                    this.refs[`$${key}Range`].val(item[key])    
                    this.refs[`$${key}`].val(item[key])    
                }
            })        
        })
        
    }

    updateTransform (key, postfix = '') {
        this.read('/selection/current/layer/id', (id) => {
            var value = this.refs['$' + key + postfix].val();
            if (postfix == '') {
                this.refs['$' + key + 'Range'].val(value);
            } else {
                this.refs['$' + key].val(value);
            }
            this.commit(CHANGE_LAYER_TRANSFORM, {id, [key]: value })
        })
    }

    'change:input $rotateRange' () { this.updateTransform('rotate','Range'); }
    'change:input $skewXRange' () { this.updateTransform('skewX','Range'); }
    'change:input $skewYRange' () { this.updateTransform('skewY','Range'); }
    'change:input $scaleRange' () { this.updateTransform('scale','Range'); }
    'change:input $translateXRange' () { this.updateTransform('translateX','Range'); }
    'change:input $translateYRange' () { this.updateTransform('translateY','Range'); }
    'change:input $translateZRange' () { this.updateTransform('translateZ','Range'); }

    'input $rotate' () { this.updateTransform('rotate'); }
    'input $skewX' () { this.updateTransform('skewX'); }
    'input $skewY' () { this.updateTransform('skewY'); }
    'input $scale' () { this.updateTransform('scale'); }
    'input $translateX' () { this.updateTransform('translateX'); }
    'input $translateY' () { this.updateTransform('translateY'); }
    'input $translateZ' () { this.updateTransform('translateZ'); }    
    
}