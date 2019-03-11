import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR, CHANGE_LAYER, CHANGE_SELECTION } from "../../../../types/event";
import { UNIT_PX } from "../../../../../util/css/types";
import { INPUT } from "../../../../../util/Event";
import { EVENT } from "../../../../../util/UIElement";
import { editor } from "../../../../../editor/editor";

export default class Position extends BasePropertyItem {
    template () {
        return `
            <div class='property-item position show'>
                <div class='title' ref="$title">Position</div>
                <div class='items'>            
                    <div>
                        <label>X</label>
                        <div>
                            <input type='number' ref="$x"> <span>${UNIT_PX}</span>
                        </div>
                        <label>Y</label>
                        <div>
                            <input type='number' ref="$y"> <span>${UNIT_PX}</span>
                        </div>
                    </div>               
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_EDITOR, 
        CHANGE_LAYER, 
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    refresh() {
        var layer = editor.selection.layer;
        if (layer) {
            this.refs.$x.val(+layer.x)
            this.refs.$y.val(+layer.y)
        }        
    }

    [INPUT('$x')] () {
        var layer = editor.selection.layer;
        if (layer) {
            layer.x = Length.px(this.refs.$x.int())
            editor.send(CHANGE_LAYER, layer);
        }        
    }

    [INPUT('$y')] () {
        var layer = editor.selection.layer;
        if (layer) {
            layer.y = Length.px(this.refs.$y.int())
            editor.send(CHANGE_LAYER, layer);
        }
    }    
}