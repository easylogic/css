import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_LAYER_TRANSFORM_3D, 
    CHANGE_LAYER_TRANSFORM_3D, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION
} from "../../../../types/event";
import { UNIT_DEG, UNIT_PX } from "../../../../../util/css/types";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class Transform3d extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='title' ref="$title">Transform 3D</div> 
                <div class='items'>            
                    <div>
                        <label>Rotate X</label>
                        <div>
                            <input type='range' ref="$rotate3dXRange" min="-360" max="360">
                            <input type='number' ref="$rotate3dX"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>
                    <div>
                        <label>Rotate Y</label>
                        <div>
                            <input type='range' ref="$rotate3dYRange" min="-360" max="360">
                            <input type='number' ref="$rotate3dY"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>                    
                    <div>
                        <label>Rotate Z</label>
                        <div>
                            <input type='range' ref="$rotate3dZRange" min="-360" max="360">
                            <input type='number' ref="$rotate3dZ"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>                                        
                    <div>
                        <label>3D Angle</label>
                        <div>
                            <input type='range' ref="$rotate3dARange" min="-360" max="360">
                            <input type='number' ref="$rotate3dA"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>       
                    <div>
                        <label>Scale X</label>
                        <div>
                            <input type='range' ref="$scale3dXRange" min="0.5" max="10" step="0.1">
                            <input type='number' ref="$scale3dX"> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Scale Y</label>
                        <div>
                            <input type='range' ref="$scale3dYRange" min="0.5" max="10" step="0.1">
                            <input type='number' ref="$scale3dY"> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Scale Z</label>
                        <div>
                            <input type='range' ref="$scale3dZRange" min="0.5" max="10" step="0.1">
                            <input type='number' ref="$scale3dZ"> 
                        </div>
                    </div>    
                    <div>
                        <label>Translate X</label>
                        <div>
                            <input type='range' ref="$translate3dXRange" min="-2000" max="2000">
                            <input type='number' ref="$translate3dX" min="-2000" max="2000"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Translate Y</label>
                        <div>
                            <input type='range' ref="$translate3dYRange" min="-2000" max="2000">
                            <input type='number' ref="$translate3dY" min="-2000" max="2000"> <span>${UNIT_PX}</span> 
                        </div>
                    </div>
                    <div>
                        <label>Translate Z</label>
                        <div>
                            <input type='range' ref="$translate3dZRange" min="-2000" max="2000">
                            <input type='number' ref="$translate3dZ" min="-2000" max="2000">  <span>${UNIT_PX}</span>
                        </div>
                    </div>                                        
                </div>
            </div>
        `
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER_TRANSFORM_3D,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    refresh() {
        this.read('/selection/current/layer', (item) => {

            var attr = [
                'rotate3dX', 'rotate3dY', 'rotate3dZ', 'rotate3dA', 
                'scale3dX', 'scale3dY', 'scale3dZ', 
                'translate3dX','translate3dY','translate3dZ'
            ]

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
            this.commit(CHANGE_LAYER_TRANSFORM_3D, {id, [key]: value })
        })
    } 

    'change:input $rotate3dXRange' () { this.updateTransform('rotate3dX', 'Range'); }
    'change:input $rotate3dYRange' () { this.updateTransform('rotate3dY', 'Range'); }
    'change:input $rotate3dZRange' () { this.updateTransform('rotate3dZ', 'Range'); }
    'change:input $rotate3dARange' () { this.updateTransform('rotate3dA', 'Range'); }
    'change:input $scale3dXRange' () { this.updateTransform('scale3dX', 'Range'); }
    'change:input $scale3dYRange' () { this.updateTransform('scale3dY', 'Range'); }
    'change:input $scale3dZRange' () { this.updateTransform('scale3dZ', 'Range'); }
    'change:input $translate3dXRange' () { this.updateTransform('translate3dX', 'Range'); }
    'change:input $translate3dYRange' () { this.updateTransform('translate3dY', 'Range'); }
    'change:input $translate3dZRange' () { this.updateTransform('translate3dZ', 'Range'); }

    'input $rotate3dX' () { this.updateTransform('rotate3dX'); }
    'input $rotate3dY' () { this.updateTransform('rotate3dY'); }
    'input $rotate3dZ' () { this.updateTransform('rotate3dZ'); }
    'input $rotate3dA' () { this.updateTransform('rotate3dA'); }
    'input $scale3dX' () { this.updateTransform('scale3dX'); }
    'input $scale3dY' () { this.updateTransform('scale3dY'); }
    'input $scale3dZ' () { this.updateTransform('scale3dZ'); }
    'input $translate3dX' () { this.updateTransform('translate3dX'); }
    'input $translate3dY' () { this.updateTransform('translate3dY'); }
    'input $translate3dZ' () { this.updateTransform('translate3dZ'); }    
    
}