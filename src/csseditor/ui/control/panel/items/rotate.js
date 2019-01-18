import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER_TRANSFORM, CHANGE_EDITOR, CHANGE_LAYER, CHANGE_SELECTION, CHANGE_LAYER_ROTATE } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";

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
        this.read(SELECTION_CURRENT_LAYER, (item) => {
            this.refs.$rotateRange.val(item.rotate || "0")
            this.refs.$rotate.val(item.rotate || "0")
        })
        
    }

    updateTransform (type) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {

            if (type == 'rotate') {
                this.commit(CHANGE_LAYER_TRANSFORM, {id, rotate: this.refs.$rotate.val()})
                this.refs.$rotateRange.val(this.refs.$rotate.val())
            } else if (type == 'range') {
                this.commit(CHANGE_LAYER_TRANSFORM, {id, rotate: this.refs.$rotateRange.val()})
                this.refs.$rotate.val(this.refs.$rotateRange.val())
            }
            
        })
    }

    [INPUT('$rotateRange')] () { this.updateTransform('range'); }
    [INPUT('$rotate')] () { this.updateTransform('rotate'); }
    
}