import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION,
    CHANGE_LAYER
} from "../../../../types/event";
import { UNIT_DEG, UNIT_PX, EMPTY_STRING } from "../../../../../util/css/types";
import { EVENT } from "../../../../../util/UIElement";
import { CHANGEINPUT, INPUT, CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class Transform3d extends BasePropertyItem {
    template () {
        return `
            <div class='property-item transform show'>
                <div class='items block'>            
                    <div>
                        <label> 3D </label>
                        <div><label><input type='checkbox' ref="$preserve"> preserve-3d </label></div>
                    </div>                    
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
                            <input type='range' data-type="rotateX" ref="$rotateXRange" min="-360" max="360">
                            <input type='number' data-type="rotateX" ref="$rotateX"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>
                    <div>
                        <label>Rotate Y</label>
                        <div>
                            <input type='range' data-type="rotateY" ref="$rotateYRange" min="-360" max="360">
                            <input type='number' data-type="rotateY" ref="$rotateY"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>                    
                    <div>
                        <label>Rotate Z</label>
                        <div>
                            <input type='range' data-type="rotateZ" ref="$rotateZRange" min="-360" max="360">
                            <input type='number' data-type="rotateZ" ref="$rotateZ"> <span>${UNIT_DEG}</span>
                        </div>
                    </div>                                         
                    <div>
                        <label>Scale X</label>
                        <div>
                            <input type='range' data-type="scaleX" ref="$scaleXRange" min="0.5" max="10" step="0.1">
                            <input type='number' data-type="scaleX" ref="$scaleX"> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Scale Y</label>
                        <div>
                            <input type='range' data-type="scaleY" ref="$scaleYRange" min="0.5" max="10" step="0.1">
                            <input type='number' data-type="scaleY" ref="$scaleY"> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Scale Z</label>
                        <div>
                            <input type='range' data-type="scaleZ" ref="$scaleZRange" min="0.5" max="10" step="0.1">
                            <input type='number' data-type="scaleZ" ref="$scaleZ"> 
                        </div>
                    </div>    
                    <div>
                        <label>Translate X</label>
                        <div>
                            <input type='range'  data-type="translateX" ref="$translateXRange" min="-2000" max="2000">
                            <input type='number'  data-type="translateX" ref="$translateX" min="-2000" max="2000"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Translate Y</label>
                        <div>
                            <input type='range'  data-type="translateY" ref="$translateYRange" min="-2000" max="2000">
                            <input type='number' data-type="translateY" ref="$translateY" min="-2000" max="2000"> <span>${UNIT_PX}</span> 
                        </div>
                    </div>
                    <div>
                        <label>Translate Z</label>
                        <div>
                            <input type='range' data-type="translateZ" ref="$translateZRange" min="-2000" max="2000">
                            <input type='number' data-type="translateZ" ref="$translateZ" min="-2000" max="2000">  <span>${UNIT_PX}</span>
                        </div>
                    </div>                                        
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }


    [CLICK('$preserve')] (e) {

        var layer = editor.selection.layer; 
        if (layer) {
            layer.preserve = this.refs.$preserve;
            editor.send(CHANGE_LAYER, layer);
        }
    }    

    refresh() {
        var layer = editor.selection.layer; 
        if (layer) {

            var attr = [
                'perspective',
                'rotateX', 'rotateY', 'rotateZ', 
                'scaleX', 'scaleY', 'scaleZ', 
                'translateX','translateY','translateZ'
            ]

            attr.forEach( key => {
                if (layer[key]) {
                    this.refs[`$${key}Range`].val(layer[key])    
                    this.refs[`$${key}`].val(layer[key])    
                }
            })       
            
            this.refs.$preserve.checked(!!layer.preserve);            
        }
        
    }

    updateTransform (key, postfix = EMPTY_STRING) {
        var layer = editor.selection.layer;
        if (layer) {
            var value = this.refs['$' + key + postfix].val();
            if (postfix == EMPTY_STRING) {
                this.refs['$' + key + 'Range'].val(value);
            } else {
                this.refs['$' + key].val(value);
            }
            layer[key] = value; 
            editor.send(CHANGE_LAYER)
        }
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