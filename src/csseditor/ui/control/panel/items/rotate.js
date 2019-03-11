import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR, CHANGE_LAYER, CHANGE_SELECTION, CHANGE_LAYER_ROTATE } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";
import { EVENT } from "../../../../../util/UIElement";
import { editor } from "../../../../../editor/editor";

export default class Rotate extends BasePropertyItem {
    template () {
        return `
            <div class='property-item rotate show'>
                <div class='items'>            
                    <div>
                        <label>Rotate</label>
                        <div>
                            <input type='range' ref="$rotateRange" min="-360" max="360" step="0.1">
                            <input type='number' class='middle' ref="$rotate" min="-360" max="360" step="0.1"> <span>°</span>
                        </div>
                    </div>                                                                           
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_ROTATE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        var layer = editor.selection.layer; 
        if (layer) {
            this.refs.$rotateRange.val(layer.rotate || "0")
            this.refs.$rotate.val(layer.rotate || "0")
        }        
    }

    updateTransform (type) {
        var layer = editor.selection.layer;
        if (layer) {
            if (type == 'rotate') {
                layer.rotate = this.refs.$rotate;
                this.refs.$rotateRange.val(layer.rotate)
            } else if (type == 'range') {
                layer.rotate = this.refs.$rotateRange
                this.refs.$rotate.val(layer.rotate)
            }
            editor.send(CHANGE_LAYER_ROTATE, layer)
        }
    }

    [INPUT('$rotateRange')] () { this.updateTransform('range'); }
    [INPUT('$rotate')] () { this.updateTransform('rotate'); }
    
}