import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER,
    EVENT_CHANGE_SELECTION,
    EVENT_CHANGE_LAYER_BACKGROUND_COLOR,
    EVENT_CHANGE_LAYER_CLIPPATH,
    EVENT_CHANGE_LAYER_FILTER,
    EVENT_CHANGE_LAYER_RADIUS,
    EVENT_CHANGE_LAYER_ROTATE,
    EVENT_CHANGE_LAYER_OPACITY,
    EVENT_CHANGE_LAYER_TRANSFORM,
    EVENT_CHANGE_LAYER_TRANSFORM_3D,
    EVENT_CHANGE_BOXSHADOW,
    EVENT_CHANGE_TEXTSHADOW,
    EVENT_CHANGE_LAYER_SIZE,
    EVENT_CHANGE_LAYER_POSITION,
    EVENT_CHANGE_LAYER_MOVE
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { convertMatches, reverseMatches } from "../../../../../util/functions/parser";

export default class LayerCode extends BasePropertyItem {
    template () {
        return `
            <div class='property-item layer-code show'>
                <div class='title' ref="$title">CSS code</div>
                <div class='items'>            
                    <div class="key-value-view" ref="$keys">

                    </div>
                </div>
            </div>
        `
    }

    'load $keys' () {
        var layer = this.read('/selection/current/layer');

        if (!layer) return ''; 

        return this.read('/layer/toExport', layer, true).split(';').map(it => {
            var [key, value] = it.split(':');

            if (key == 'background-image') {
                var ret = convertMatches(value) ;

                var str = ret.str.split(',').join(',\n  ')

                str = str.replace(/\(/g, '(\n')
                str = str.replace(/\)/g, '\n)')

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
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_SIZE,
        EVENT_CHANGE_LAYER_POSITION,
        EVENT_CHANGE_LAYER_MOVE,
        EVENT_CHANGE_LAYER_BACKGROUND_COLOR,
        EVENT_CHANGE_LAYER_CLIPPATH,
        EVENT_CHANGE_LAYER_FILTER,
        EVENT_CHANGE_LAYER_RADIUS,
        EVENT_CHANGE_LAYER_ROTATE,
        EVENT_CHANGE_LAYER_OPACITY,
        EVENT_CHANGE_LAYER_TRANSFORM,
        EVENT_CHANGE_LAYER_TRANSFORM_3D,
        EVENT_CHANGE_BOXSHADOW,
        EVENT_CHANGE_TEXTSHADOW,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    getLayerCssCode (item) {
        var css = this.read('/layer/toExport', item, true).split(';').map(it => {
            return it + ';';
        }).join('\n');

        return css; 
    }

    refresh() {
        this.load();
    }
    
}