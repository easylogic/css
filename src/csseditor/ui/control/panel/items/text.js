import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR,
    EVENT_CHANGE_SELECTION,
    CHANGE_LAYER_TEXT,
    EVENT_CHANGE_LAYER_TEXT,
    TEXT_FILL_COLOR
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class Text extends BasePropertyItem {
    template () {
        return `
            <div class='property-item text show'>
                <div class='title' ref="$title">Content</div>
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
                        <div class='size-list'>
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

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_TEXT
    )] () {
        this.refresh();
    }

    refresh () {
        this.read('/selection/current/layer', layer => {
            this.refs.$color.css('background-color', layer.color);
            this.refs.$colorText.val(layer.color || '');
            this.refs.$content.val(layer.content || '');
            this.refs.$clip.val(layer.backgroundClip)
            this.refs.$clipText.checked(layer.clipText || false); 
            
            this.$el.toggleClass('has-clip-text', layer.clipText || false)
        })
    }

    'input $content' (e) {
        this.read('/selection/current/layer/id', id => {
            this.commit(CHANGE_LAYER_TEXT, {id, content: this.refs.$content.val()})
        })
    }

    'click $color' (e) {
        this.read('/selection/current/layer', item => {
            this.emit(TEXT_FILL_COLOR, item.id, CHANGE_LAYER_TEXT);
        })
    }


    'change $clip' (e) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, backgroundClip: this.refs.$clip.val() }, true)
        });
    }

    'click $clipText' (e) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, clipText: this.refs.$clipText.checked() }, true)
        });
    }
}