import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    CHANGE_LAYER_TEXT,
    TEXT_FILL_COLOR
} from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { CLICK, INPUT, CHANGE } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";
import { EMPTY_STRING } from "../../../../../util/css/types";

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
        CHANGE_LAYER_TEXT
    )] () {
        this.refresh();
    }

    refresh () {
        this.read(SELECTION_CURRENT_LAYER, layer => {
            this.refs.$color.css('background-color', layer.color);
            this.refs.$colorText.val(layer.color || EMPTY_STRING);
            this.refs.$content.val(layer.content || EMPTY_STRING);
            this.refs.$clip.val(layer.backgroundClip)
            this.refs.$clipText.checked(layer.clipText || false); 
            
            this.$el.toggleClass('has-clip-text', layer.clipText || false)
        })
    }

    [INPUT('$content')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, id => {
            this.commit(CHANGE_LAYER_TEXT, {id, content: this.refs.$content.val()})
        })
    }

    [CLICK('$color')] (e) {
        this.read(SELECTION_CURRENT_LAYER, item => {
            this.emit(TEXT_FILL_COLOR, item.id, CHANGE_LAYER_TEXT);
        })
    }


    [CHANGE('$clip')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, backgroundClip: this.refs.$clip.val() }, true)
        });
    }

    [CLICK('$clipText')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, clipText: this.refs.$clipText.checked() }, true)
        });
    }
}