import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_BORDER
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { CLICK } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";

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
        CHANGE_LAYER_BORDER,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        this.read(SELECTION_CURRENT_LAYER, (item) => {
            this.refs.$color.css('background-color', item.borderColor)
            this.refs.$colortext.text(item.borderColor)
        })
    }

    [CLICK('$colorview')] () {
        this.read(SELECTION_CURRENT_LAYER, (item) => {
            this.emit('selectBorderColor', item.borderColor, 'borderColor', CHANGE_LAYER_BORDER);
        })        
        
    }
}