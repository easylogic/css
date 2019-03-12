import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION,
    CHANGE_IMAGE,
    CHANGE_COLORSTEP,
    SELECT_TAB_IMAGE
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { convertMatches, reverseMatches } from "../../../../../util/functions/parser";
import { LOAD } from "../../../../../util/Event";
import { EMPTY_STRING } from "../../../../../util/css/types";
import { keyMap } from "../../../../../util/functions/func";
import { editor } from "../../../../../editor/editor";

export default class BackgroundCode extends BasePropertyItem {
    template () {
        return `
            <div class='property-item background-code show'>
                <div class='items'><div class="key-value-view" ref="$keys"></div></div>
            </div>
        `
    }

    [LOAD('$keys')] () {
        var image = editor.selection.currentBackgroundImage;
        if (!image) return EMPTY_STRING; 

        var obj = image.toCSS()

        return keyMap(obj, (key, value) => {
            if (key == 'background-image') {
                var ret = convertMatches(value) ;

                var str = ret.str.split(',').join(',\n  ')

                str = str.replace('(', '(\n')
                str = str.replace(')', '\n)')

                value = reverseMatches(str, ret.matches)
            }

            return `
                <div class="key-value-item">
                    <div class="key">${key}:</div>
                    <pre class="value">${value};</pre>
                </div>
            `;
        })
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_COLORSTEP,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        SELECT_TAB_IMAGE
    )] () { this.refresh() }    

    refresh() {

        if (editor.config.get('tool.tabs.image.selectedId') == 'css') {
            this.load();
        }

    }
    
}