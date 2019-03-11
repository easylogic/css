import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_RADIUS 
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { defaultValue } from "../../../../../util/functions/func";
import { CLICK, INPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";

export default class RadiusFixed extends BasePropertyItem {
    template () {
        return `
            <div class='property-item fixed-radius'>
                <div class='items'>            
                    <div>
                        <label > <button type="button" ref="$radiusLabel">*</button> Radius</label>
                        <div>
                            <input type='range' ref="$radiusRange" min="0" max="360">
                            <input type='number' class='middle' ref="$radius" min="0" max="360"> <span>px</span>
                        </div>
                    </div>                                                                           
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_RADIUS,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            var layer = editor.selection.layer;
            if (layer) {
                var radius = defaultValue(layer.borderRadius, Length.px(0) )
                this.refs.$radiusRange.val(radius.value)
                this.refs.$radius.val(radius.value)
            }
        }
    }

    isShow () {
        var layer = editor.selection.layer;

        if (!layer) return false; 
        if (layer.type == 'circle') return false;

        return true;
    }

    updateTransform (type) {
        var layer = editor.selection.layer;
        if (layer) {

            if (type == 'radius') {
                var borderRadiusValue = this.refs.$radius.val()
                layer.reset({
                    fixedRadius: true, 
                    borderRadius: Length.px( borderRadiusValue )
                })
                editor.send(CHANGE_LAYER_RADIUS, layer)
                this.refs.$radiusRange.val(borderRadiusValue)
            } else if (type == 'range') {
                var borderRadiusValue = this.refs.$radiusRange.val()
                layer.reset({
                    fixedRadius: true, 
                    borderRadius: Length.px( borderRadiusValue )
                })
                editor.send(CHANGE_LAYER_RADIUS, layer)
                this.refs.$radius.val(borderRadiusValue)
            }
        }
       
    }

    [INPUT('$radiusRange')] () { this.updateTransform('range'); }
    [INPUT('$radius')] () { this.updateTransform('radius'); }
    [CLICK('$radiusLabel')] () {
        this.emit('toggleRadius');
    }
}