import { CHANGE_LAYER_BACKGROUND_COLOR, CHANGE_EDITOR } from "../../../../types/event";
import BasePropertyItem from "./BasePropertyItem";
import { CLICK } from "../../../../../util/Event";
import { EVENT } from "../../../../../colorpicker/UIElement";

export default class BackgroundColor extends BasePropertyItem {
    template () {
        return `
            <div class='property-item background-color show'>
                <div class='title' ref="$title">Background Color</div>            
                <div class='items'>            
                    <div>
                        <div style='cursor:pointer;' ref="$colorview" title="Click me!!">
                            <span class='color' ref="$color"></span>
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
        this.read('selection/current/layer', (layer) => {
            this.refs.$color.css('background-color', layer.backgroundColor)
            this.refs.$colortext.text(layer.backgroundColor)
        });
    }

    [CLICK('$colorview')] () {
        this.emit('toggleLayerColorPicker')
    }

}