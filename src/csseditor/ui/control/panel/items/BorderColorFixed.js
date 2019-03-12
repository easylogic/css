import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class BorderColorFixed extends BasePropertyItem {
    template () {
        return `
            <div class='property-item fixed-border-color show'>
                <div class='items'>            
                    <div>
                        <label >Color</label>
                        <div style='cursor:pointer;' ref="$colorview" title="Click me!!">
                            <span class='background-transparent'>
                                <span class='color' ref='$color'></span>
                            </span>
                            <span class='color-text' ref="$colortext"></span>
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
        var layer = editor.selection.currentLayer; 
        if (layer) {
            this.refs.$color.css('background-color', layer.borderColor)
            this.refs.$colortext.text(layer.borderColor)
        }
    }

    [CLICK('$colorview')] () {

        alert('컬러 피커를 뛰워주세요')
        
    }
}