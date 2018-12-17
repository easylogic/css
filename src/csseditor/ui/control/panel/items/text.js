import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { 
    EVENT_CHANGE_EDITOR,
    EVENT_CHANGE_SELECTION,
    CHANGE_LAYER_TEXT,
    EVENT_CHANGE_LAYER_TEXT
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class Text extends BasePropertyItem {
    template () {
        return `
            <div class='property-item text show'>
                <div class='title' ref="$title">Content</div>
                <div class='items'>
                    <div>
                        <label>Text Color</label>
                        <div>
                            <span class='color' ref='$color'></span> 
                            <input type="text" class='color-text' ref='$colorText'/>
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
            this.refs.$colorText.val(layer.color);
            this.refs.$content.val(layer.content || '');
        })
    }

    'input $content' (e) {
        this.read('/selection/current/layer/id', id => {
            this.commit(CHANGE_LAYER_TEXT, {id, content: this.refs.$content.val()})
        })
    }

    'click $color' (e) {
        this.read('/selection/current/layer', item => {
            this.emit('textFillColorId', item.id, CHANGE_LAYER_TEXT);
        })
    }
}