import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER_TRANSFORM, 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_OPACITY
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { INPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class Opacity extends BasePropertyItem {
    template () {
        return `
            <div class='property-item opacity show'>
                <div class='items'>            
                    <div>
                        <label>Opacity</label>
                        <div>
                            <input type='range' ref="$opacityRange" min="0" max="1" step="0.01">
                            <input type='number' class='middle' ref="$opacity" min="0" max="1" step="0.01">
                        </div>
                    </div>                                                                           
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_OPACITY,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        var layer = editor.selection.layer;
        if (layer) {
            this.refs.$opacityRange.val(layer.opacity || "1")
            this.refs.$opacity.val(layer.opacity || "1")
        }        
    }

    updateTransform (type) {
        var layer = editor.selection.layer;
        if (layer) {
            if (type == 'opacity') {
                var opacity = this.refs.$opacity.val()
                this.refs.$opacityRange.val(opacity)         
            } else if (type == 'range') {
                var opacity = this.refs.$opacityRange.val()
                this.refs.$opacity.val(opacity)
            }
            layer.opacity = opacity;                   
            editor.send(CHANGE_LAYER_TRANSFORM, layer)            
            
        }
    }

    [INPUT('$opacityRange')] () { this.updateTransform('range'); }
    [INPUT('$opacity')] () { this.updateTransform('opacity'); }
    
}