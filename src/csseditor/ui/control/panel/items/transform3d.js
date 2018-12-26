import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_LAYER_TRANSFORM_3D, 
    CHANGE_LAYER_TRANSFORM_3D, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION
} from "../../../../types/event";
import { UNIT_DEG, UNIT_PX } from "../../../../../util/css/types";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { CHANGEINPUT, INPUT } from "../../../../../util/Event";

export default class Transform3d extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='title' ref="$title">Transform 3D</div> 
                <div class='items'>            
                    <div>
                        <label>Perspective</label>
                        <div>
                            <input type='range' data-type="perspective" ref="$perspectiveRange" min="0" max="3000">
                            <input type='number' data-type="perspective" ref="$perspective"> <span>${UNIT_PX}</span>
                        </div>
                    </div>                
                    <div>
                        <label>Rotate X</label>
                        <div>
                            <input type='range' data-type="rotate3dX" ref="$rotate3dXRange" min="-360" max="360">
                            <input type='number' data-type="rotate3dX" ref="$rotate3dX"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>
                    <div>
                        <label>Rotate Y</label>
                        <div>
                            <input type='range' data-type="rotate3dY" ref="$rotate3dYRange" min="-360" max="360">
                            <input type='number' data-type="rotate3dY" ref="$rotate3dY"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>                    
                    <div>
                        <label>Rotate Z</label>
                        <div>
                            <input type='range' data-type="rotate3dZ" ref="$rotate3dZRange" min="-360" max="360">
                            <input type='number' data-type="rotate3dZ" ref="$rotate3dZ"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>                                        
                    <div>
                        <label>3D Angle</label>
                        <div>
                            <input type='range' data-type="rotate3dA" ref="$rotate3dARange" min="-360" max="360">
                            <input type='number' data-type="rotate3dA" ref="$rotate3dA"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>       
                    <div>
                        <label>Scale X</label>
                        <div>
                            <input type='range' data-type="scale3dX" ref="$scale3dXRange" min="0.5" max="10" step="0.1">
                            <input type='number' data-type="scale3dX" ref="$scale3dX"> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Scale Y</label>
                        <div>
                            <input type='range' data-type="scale3dY" ref="$scale3dYRange" min="0.5" max="10" step="0.1">
                            <input type='number' data-type="scale3dY" ref="$scale3dY"> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Scale Z</label>
                        <div>
                            <input type='range' data-type="scale3dZ" ref="$scale3dZRange" min="0.5" max="10" step="0.1">
                            <input type='number' data-type="scale3dZ" ref="$scale3dZ"> 
                        </div>
                    </div>    
                    <div>
                        <label>Translate X</label>
                        <div>
                            <input type='range'  data-type="translate3dX" ref="$translate3dXRange" min="-2000" max="2000">
                            <input type='number'  data-type="translate3dX" ref="$translate3dX" min="-2000" max="2000"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Translate Y</label>
                        <div>
                            <input type='range'  data-type="translate3dY" ref="$translate3dYRange" min="-2000" max="2000">
                            <input type='number' data-type="translate3dY" ref="$translate3dY" min="-2000" max="2000"> <span>${UNIT_PX}</span> 
                        </div>
                    </div>
                    <div>
                        <label>Translate Z</label>
                        <div>
                            <input type='range' data-type="translate3dZ" ref="$translate3dZRange" min="-2000" max="2000">
                            <input type='number' data-type="translate3dZ" ref="$translate3dZ" min="-2000" max="2000">  <span>${UNIT_PX}</span>
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
                'perspective',
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

    [CHANGEINPUT('$el input[type=range]')] (e) {
        var $item = e.$delegateTarget;
        this.updateTransform($item.attr('data-type'), 'Range');
    }

    [INPUT('$el input[type=number]')] (e) {
        var $item = e.$delegateTarget;
        this.updateTransform($item.attr('data-type'));
    }
}