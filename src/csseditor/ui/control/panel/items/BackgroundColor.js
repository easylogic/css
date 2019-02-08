import { CHANGE_LAYER_BACKGROUND_COLOR, CHANGE_EDITOR } from "../../../../types/event";
import BasePropertyItem from "./BasePropertyItem";
import { CLICK } from "../../../../../util/Event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";

export default class BackgroundColor extends BasePropertyItem {
    template () {
        return `
            <div class='property-item background-color show'>
                <div class='items'>            
                    <div>
                        <label > Background Color</label>                    
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

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }

    [EVENT(CHANGE_LAYER_BACKGROUND_COLOR)] (newValue) {
        this.refs.$color.css('background-color', newValue.backgroundColor)
        this.refs.$colortext.text(newValue.backgroundColor)
    }

    refresh() {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            this.refs.$color.css('background-color', layer.backgroundColor)
            this.refs.$colortext.text(layer.backgroundColor)
        });
    }

    [CLICK('$colorview')] () {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            this.emit('selectLayerColor', layer.backgroundColor, 'backgroundColor', CHANGE_LAYER_BACKGROUND_COLOR);
        })
    }

}