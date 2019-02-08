
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { CHANGE } from '../../../../../util/Event';
import { BLEND_LIST } from '../../../../types/BlendTypes';
import { SELECTION_CURRENT_IMAGE, SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE_ID } from '../../../../types/SelectionTypes';
import { html } from '../../../../../util/functions/func';

export default class BackgroundBlend extends BasePropertyItem {

    template () { 
        return html`
        <div class='property-item blend show'>
            <div class='items max-height'>         
                <div>
                    <label>Blend</label>
                    <div class='size-list full-size' ref="$size">
                        <select ref="$blend">
                        ${this.read(BLEND_LIST).map(blend => {
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
        return this.read(SELECTION_IS_IMAGE); 
    }    

    refresh () {

        this.read(SELECTION_CURRENT_IMAGE, (image) => {
            this.refs.$blend.val(image.backgroundBlendMode)
        })

    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$blend')] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: this.refs.$blend.val() }, true)
        });
    }

}