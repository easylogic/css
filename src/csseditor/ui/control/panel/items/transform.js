import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_LAYER_TRANSFORM, 
    CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER_ROTATE
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class Transform extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='title' ref="$title">Transform</div>
                <div class='items'>            
                    <div>
                        <label>Rotate</label>
                        <div>
                            <input type='number' ref="$rotate"> <span>deg</span>
                        </div>
                        <label>Scale</label>
                        <div>
                            <input type='number' ref="$scale" min="0.5" max="10.0" step="0.1"> <span></span>
                        </div>
                    </div>                      
                    <div>
                        <label>SkewX</label>
                        <div>
                            <input type='number' ref="$skewX"> <span>deg</span>
                        </div>
                        <label>SkewY</label>
                        <div>
                            <input type='number' ref="$skewY"> <span>deg</span>
                        </div>
                    </div>     
   
                    <div>
                        <label>translateX</label>
                        <div>
                            <input type='number' ref="$translateX"> <span>px</span>
                        </div>
                        <label>translateY</label>
                        <div>
                            <input type='number' ref="$translateY"> <span>px</span>
                        </div>
                        <label>translateZ</label>
                        <div>
                            <input type='number' ref="$translateZ"> <span>px</span>
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
                    this.refs[`$${key}`].val(item[key])    
                }
            })        
        })
        
    }

    updateTransform (key) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TRANSFORM, {id, [key]: this.refs['$' + key].val()})
        })
    }

    'input $rotate' () { this.updateTransform('rotate'); }
    'input $skewX' () { this.updateTransform('skewX'); }
    'input $skewY' () { this.updateTransform('skewY'); }
    'input $scale' () { this.updateTransform('scale'); }
    'input $translateX' () { this.updateTransform('translateX'); }
    'input $translateY' () { this.updateTransform('translateY'); }
    'input $translateZ' () { this.updateTransform('translateZ'); }
    
}