
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER, CHANGE_LAYER_BORDER, CHANGE_EDITOR, CHANGE_LAYER_RADIUS } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { SELECTION_CURRENT_LAYER } from '../../../../types/SelectionTypes';
import { html } from '../../../../../util/functions/func';
import { LAYER_BORDER_PREVIEW } from '../../../../../util/css/make';

export default class LayerBorderPreview extends BasePropertyItem {

    template () { 
        return html`
        <div class='property-item border-preview show'>
            <div class='items'>         
                <div style='margin-bottom:10px'>
                    <div class='border-preview' ref="$borderPreview"></div>
                </div>
            </div>
        </div>
        `
    }

    refresh () {

        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            this.refs.$borderPreview.cssText(`width: 100%;height: 100px; ${LAYER_BORDER_PREVIEW(layer)}`)
        })

    }

    [EVENT(
        CHANGE_LAYER_BORDER,
        CHANGE_LAYER_RADIUS,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

}