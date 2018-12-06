import BasePropertyItem from "./BasePropertyItem";
import { EVENT_CHANGE_LAYER_TRANSFORM_3D, CHANGE_LAYER_TRANSFORM_3D, EVENT_CHANGE_EDITOR } from "../../../../types/event";

export default class Transform3d extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='title' ref="$title">Transform 3D</div> 
                <div class='items'>            
                    <div>
                        <label>Rotate 3D</label>
                        <div>
                            <div class='input'> 
                                <input type='number' ref="$rotate3dX"> 
                                <input type='number' ref="$rotate3dY"> 
                                <input type='number' ref="$rotate3dZ"> 
                                <input type='number' ref="$rotate3dA"> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <label></label>
                        <div>
                            
                            <div class='input-text'>
                                <span>X</span>
                                <span>Y</span>
                                <span>Z</span>
                                <span>Angle</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Scale 3D</label>
                        <div>
                            <div class='input'> 
                                <input type='number' ref="$scale3dX"> 
                                <input type='number' ref="$scale3dY"> 
                                <input type='number' ref="$scale3dZ"> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <label></label>
                        <div>
                            <div class='input-text'>
                                <span>X</span>
                                <span>Y</span>
                                <span>Z</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Translate3D</label>
                        <div>
                            <div class='input'> 
                                <input type='number' ref="$translate3dX"> 
                                <input type='number' ref="$translate3dY"> 
                                <input type='number' ref="$translate3dZ"> 
                            </div>
                        </div>
                    </div>
                    <div>
                        <label></label>                            
                        <div>
                            <div class='input-text'>
                                <span>X</span>
                                <span>Y</span>
                                <span>Z</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        `
    }

    [EVENT_CHANGE_LAYER_TRANSFORM_3D] () {
        this.refresh();
    }

    [EVENT_CHANGE_EDITOR] () {
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
                    this.refs[`$${key}`].val(item[key])    
                }
            })        
        })
        
    }

    updateTransform (key) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TRANSFORM_3D, {id, [key]: this.refs['$' + key].val()})
        })
    }

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