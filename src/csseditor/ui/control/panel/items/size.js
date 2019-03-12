import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER, 
    CHANGE_EDITOR,
    CHANGE_SELECTION
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { UNIT_PX } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";

export default class Size extends BasePropertyItem {
    template () {
        return `
            <div class='property-item size show'>
                <div class='items'>
                    <div>
                        <label><button type="button" ref="$rect">*</button>Width</label>
                        <div>
                            <div class='input two'> 
                                <input type='number' ref="$width"> <span>${UNIT_PX}</span>
                            </div>
                        </div>
                        <label class='second'>height</label>
                        <div>
                            <div class="input two">
                                <input type='number' ref="$height"> <span>${UNIT_PX}</span>
                            </div>
                        </div>                        
                    </div>   
                    <div>
                        <label>X</label>
                        <div>
                            <div class='input two'> 
                                <input type='number' ref="$x"> <span>${UNIT_PX}</span>
                            </div>
                        </div>
                        <label class='second'>Y</label>
                        <div>
                            <div class='input two'>
                                <input type='number' ref="$y"> <span>${UNIT_PX}</span>
                            </div>
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
    )] ()  { this.refresh() }

    refresh() {
        var item = editor.selection.layer;
        if (!item) return; 

        if (item.width) {
            this.refs.$width.val(+item.width)
        }

        if (item.height) {
            this.refs.$height.val(+(item.height))
        }

        if (item.x) {
            this.refs.$x.val(+(item.x))
        }

        if (item.y) {
            this.refs.$y.val(+(item.y))
        }        
    }

    [CLICK('$rect')] (e) {
        var widthValue = this.refs.$width.int()
        this.refs.$height.val(widthValue); 
        editor.selection.updateLayer(CHANGE_LAYER, {
            width : Length.px(widthValue),
            height: Length.px(widthValue)
        }, this)
    }

    [INPUT('$width')] () {
        editor.selection.updateLayer(CHANGE_LAYER, {
            width : Length.px(this.refs.$width.int())
        }, this)
    }

    [INPUT('$height')] () {      
        editor.selection.updateLayer(CHANGE_LAYER, {
            height : Length.px(this.refs.$height.int())
        }, this)
    }    


    [INPUT('$x')] () {
        editor.selection.updateLayer(CHANGE_LAYER, {
            x : Length.px(this.refs.$x.int())
        }, this)
    }

    [INPUT('$y')] () {
        editor.selection.updateLayer(CHANGE_LAYER, {
            y : Length.px(this.refs.$y.int())
        }, this)        
    }        
}