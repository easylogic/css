import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { CLICK, CHANGEINPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { defaultValue } from "../../../../../util/functions/func";
import { Length } from "../../../../../editor/unit/Length";

export default class BorderFixed extends BasePropertyItem {
    template () {
        return `
            <div class='property-item fixed-border'>
                <div class='items'>            
                    <div>
                        <label > <button type="button" ref="$borderLabel">*</button> Width</label>
                        <div>
                            <input type='range' ref="$borderWidthRange" min="0" max="360">
                            <input type='number' class='middle' ref="$borderWidth" min="0" max="360"> <span>px</span>
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
    )] () { this.refresh() }    

    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {
            var layer = editor.selection.currentLayer; 
            if (layer) {
                var borderWidth = defaultValue(layer.borderWidth, Length.px(0))
                this.refs.$borderWidthRange.val(+borderWidth)
                this.refs.$borderWidth.val(+borderWidth)
            }
        }
    }

    isShow () {
        var layer = editor.selection.currentLayer

        if (!layer) return false; 

        return true;
    }

    updateTransform (type) {
        var items = {}
        if (type == 'border') {
            var borderWidthValue = this.refs.$borderWidth.val()
            this.refs.$borderWidthRange.val(borderWidthValue)                
            items = {
                fixedBorderWidth: true, 
                borderWidth: Length.px( borderWidthValue )
            }

        } else if (type == 'range') {
            var borderWidthValue = this.refs.$borderWidthRange.val()
            this.refs.$borderWidth.val(borderWidthValue)                
            items = {
                fixedBorderWidth: true, 
                borderWidth: Length.px( borderWidthValue )
            }

        }
            

        editor.selection.updateLayer(CHANGE_LAYER, items);
    }

    [CHANGEINPUT('$borderWidthRange')] () { this.updateTransform('range'); }
    [CHANGEINPUT('$borderWidth')] () { this.updateTransform('border'); }
    [CLICK('$borderLabel')] () {
        this.emit('toggleBorderWidth');
    }
}