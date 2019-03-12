import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    CHANGE_LAYER,
    // TEXT_FILL_COLOR
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { CLICK, INPUT, CHANGE } from "../../../../../util/Event";
import { EMPTY_STRING } from "../../../../../util/css/types";
import { editor } from "../../../../../editor/editor";

export default class Text extends BasePropertyItem {
    template () {
        return `
            <div class='property-item text show'>
                <div class='items'>
                    <div class="not-clip">
                        <label>Text Color</label>
                        <div>
                            <span class='color' ref='$color'></span> 
                            <input type="text" class='color-text' ref='$colorText'/>
                        </div>
                    </div>
                    <div class="not-clip">
                        <label>Clip Area</label>
                        <div class='size-list full-size'>
                            <select ref="$clip">
                                <option value="content-box">content-box</option>
                                <option value="border-box">border-box</option>
                                <option value="padding-box">padding-box</option>
                                <option value="text">text</option>
                            </select>
                        </div>
                    </div>    
                    <div class="not-clip">
                        <label></label>
                        <div class='size-list'>
                            <label><input type="checkbox" ref="$clipText" /> only text </label>
                        </div>
                    </div>    

                    <div>
                        <textarea class='content' ref="$content"></textarea>
                    </div>
                </div>            
            </div>
        `
    }  

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER
    )] () {
        this.refresh();
    }

    refresh () {
        var layer = editor.selection.layer;
        if (layer) {
            this.refs.$color.css('background-color', layer.color);
            this.refs.$colorText.val(layer.color || EMPTY_STRING);
            this.refs.$content.val(layer.content || EMPTY_STRING);
            this.refs.$clip.val(layer.backgroundClip)
            this.refs.$clipText.checked(layer.clipText || false); 
            
            this.$el.toggleClass('has-clip-text', layer.clipText || false)
        }
    }

    [INPUT('$content')] (e) {
        var layer = editor.selection.layer;
        if (layer) {
            layer.content = this.refs.$content
            editor.send(CHANGE_LAYER, layer)
        }
    }

    [CLICK('$color')] (e) {
        var layer = editor.selection.layer; 
        if (layer) {
            // editor.send(TEXT_FILL_COLOR, layer.id, CHANGE_LAYER);
        }
    }


    [CHANGE('$clip')] (e) {
        var layer = editor.selection.layer; 
        if (layer) {
            layer.backgroundClip = this.refs.$clip;
            editor.send(CHANGE_LAYER, layer);
        }
    }

    [CLICK('$clipText')] (e) {
        var layer = editor.selection.layer;
        if (layer) {
            layer.clipText = this.refs.$clipText
            editor.send(CHANGE_LAYER, layer);
        }
    }
}