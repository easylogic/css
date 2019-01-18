
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER } from '../../../../types/event';
import { CHANGE } from '../../../../../util/Event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { BLEND_LIST } from '../../../../types/BlendTypes';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER } from '../../../../types/SelectionTypes';
import { EMPTY_STRING } from '../../../../../util/css/types';

export default class LayerBlend extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item blend show'>
            <div class='items max-height'>         
                <div>
                    <label>Blend</label>
                    <div class='size-list full-size' ref="$size">
                        <select ref="$blend">
                        ${this.read(BLEND_LIST).map(blend => {
                            return `<option value="${blend}">${blend}</option>`
                        }).join(EMPTY_STRING)}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    isShow () {
        return this.read(SELECTION_IS_LAYER); 
    }    

    refresh () {

        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            this.refs.$blend.val(layer.mixBlendMode)
        })

    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$blend')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER, {id, mixBlendMode: this.refs.$blend.val() })
        });
    }

}