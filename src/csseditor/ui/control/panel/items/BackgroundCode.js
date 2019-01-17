import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION,
    CHANGE_IMAGE,
    CHANGE_IMAGE_COLOR,
    CHANGE_IMAGE_ANGLE,
    CHANGE_IMAGE_LINEAR_ANGLE,
    CHANGE_IMAGE_RADIAL_POSITION,
    CHANGE_IMAGE_RADIAL_TYPE,
    CHANGE_COLOR_STEP,
    SELECT_TAB_IMAGE
} from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { convertMatches, reverseMatches } from "../../../../../util/functions/parser";
import { LOAD } from "../../../../../util/Event";
import { SELECTION_CURRENT_IMAGE } from "../../../../module/SelectionTypes";
import { LAYER_IMAGE_TOIMAGECSS } from "../../../../module/LayerTypes";
import { EMPTY_STRING } from "../../../../../util/css/types";

export default class BackgroundCode extends BasePropertyItem {
    template () {
        return `
            <div class='property-item background-code show'>
                <div class='title' ref="$title">CSS code</div>
                <div class='items'>            
                    <div class="key-value-view" ref="$keys">

                    </div>
                </div>
            </div>
        `
    }

    [LOAD('$keys')] () {
        var image = this.read(SELECTION_CURRENT_IMAGE);

        if (!image) return EMPTY_STRING; 

        var obj = this.read(LAYER_IMAGE_TOIMAGECSS, image)

        return Object.keys(obj).map(key => {
            var value = obj[key]

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
        CHANGE_IMAGE_COLOR,
        CHANGE_IMAGE_ANGLE,
        CHANGE_IMAGE_LINEAR_ANGLE,
        CHANGE_IMAGE_RADIAL_POSITION,
        CHANGE_IMAGE_RADIAL_TYPE,
        CHANGE_COLOR_STEP,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        SELECT_TAB_IMAGE
    )] () { this.refresh() }    

    refresh() {

        if (this.parent.selectedTabId == 'css') {
            this.load();
        }

    }
    
}