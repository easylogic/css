import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER_TRANSFORM, 
    CHANGE_EDITOR, 
    CHANGE_LAYER_ROTATE
} from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { UNIT_DEG, UNIT_PX, EMPTY_STRING } from "../../../../../util/css/types";
import { CHANGEINPUT, INPUT } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from "../../../../module/SelectionTypes";

export default class Transform extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='title' ref="$title">Transform 2D</div>
                <div class='items block'>            
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
                </div>
            </div>
        `
    }

    [EVENT (
        CHANGE_LAYER_TRANSFORM,
        CHANGE_EDITOR,
        CHANGE_LAYER_ROTATE
    )] () {
        this.refresh()
    }

    refresh() {
        this.read(SELECTION_CURRENT_LAYER, (item) => {

            var attr = ['rotate', 'skewX', 'skewY', 'scale', 'translateX', 'translateY']

            attr.forEach( key => {
                if (item[key]) {
                    this.refs[`$${key}Range`].val(item[key])    
                    this.refs[`$${key}`].val(item[key])    
                }
            })        
        })
        
    }

    updateTransform (key, postfix = EMPTY_STRING) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            var value = this.refs['$' + key + postfix].val();
            if (postfix == EMPTY_STRING) {
                this.refs['$' + key + 'Range'].val(value);
            } else {
                this.refs['$' + key].val(value);
            }
            this.commit(CHANGE_LAYER_TRANSFORM, {id, [key]: value })
        })
    }

    [CHANGEINPUT('$rotateRange')] () { this.updateTransform('rotate','Range'); }
    [CHANGEINPUT('$skewXRange')] () { this.updateTransform('skewX','Range'); }
    [CHANGEINPUT('$skewYRange')] () { this.updateTransform('skewY','Range'); }
    [CHANGEINPUT('$scaleRange')] () { this.updateTransform('scale','Range'); }
    [CHANGEINPUT('$translateXRange')] () { this.updateTransform('translateX','Range'); }
    [CHANGEINPUT('$translateYRange')] () { this.updateTransform('translateY','Range'); }

    [INPUT('$rotate')] () { this.updateTransform('rotate'); }
    [INPUT('$skewX')] () { this.updateTransform('skewX'); }
    [INPUT('$skewY')] () { this.updateTransform('skewY'); }
    [INPUT('$scale')] () { this.updateTransform('scale'); }
    [INPUT('$translateX')] () { this.updateTransform('translateX'); }
    [INPUT('$translateY')] () { this.updateTransform('translateY'); }
    
}