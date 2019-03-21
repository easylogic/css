
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER } from '../../../../types/event';
import { CHANGE } from '../../../../../util/Event';
import { EVENT } from '../../../../../util/UIElement';
import { html } from '../../../../../util/functions/func';
import { editor } from '../../../../../editor/editor';
import { BLEND_LIST } from '../../../../../editor/items/Layer';

export default class LayerBlend extends BasePropertyItem {

    template () { 
        return html`
        <div class='property-item blend show'>
            <div class='items max-height'>         
                <div>
                    <label>Blend</label>
                    <div class='size-list full-size' ref="$size">
                        <select ref="$blend">
                        ${BLEND_LIST.map(blend => {
                            return `<option value="${blend}">${blend}</option>`
                        })}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    isShow () {
        return editor.selection.layer; 
    }    

    refresh () {
        var layer = editor.selection.layer;
        if (layer) {
            this.refs.$blend.val(layer.mixBlendMode)
        }

    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$blend')] (e) {
        var layer = editor.selection.layer;
        if (layer) {
            layer.mixBlendMode = this.refs.$blend.val()
            editor.send(CHANGE_LAYER, layer)
        }
    }

}