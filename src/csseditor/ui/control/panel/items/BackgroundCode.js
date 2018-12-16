import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION,
    EVENT_CHANGE_IMAGE,
    EVENT_CHANGE_IMAGE_COLOR,
    EVENT_CHANGE_IMAGE_ANGLE,
    EVENT_CHANGE_IMAGE_LINEAR_ANGLE,
    EVENT_CHANGE_IMAGE_RADIAL_POSITION,
    EVENT_CHANGE_IMAGE_RADIAL_TYPE,
    EVENT_CHANGE_COLOR_STEP
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { convertMatches, reverseMatches } from "../../../../../util/functions/parser";

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

    'load $keys' () {
        var image = this.read('/selection/current/image');

        if (!image) return ''; 

        var obj = this.read('/layer/image/toImageCSS', image)

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

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_IMAGE_COLOR,
        EVENT_CHANGE_IMAGE_ANGLE,
        EVENT_CHANGE_IMAGE_LINEAR_ANGLE,
        EVENT_CHANGE_IMAGE_RADIAL_POSITION,
        EVENT_CHANGE_IMAGE_RADIAL_TYPE,
        EVENT_CHANGE_COLOR_STEP,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {

        if (this.parent.selectedTabId == 'css') {
            this.load();
        }

    }
    
}