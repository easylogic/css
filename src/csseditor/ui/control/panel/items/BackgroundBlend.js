
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { CHANGE } from '../../../../../util/Event';
import { html } from '../../../../../util/functions/func';
import { editor } from '../../../../../editor/editor';
import { BLEND_LIST } from '../../../../../editor/Layer';

export default class BackgroundBlend extends BasePropertyItem {

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
        return editor.selection.backgroundImage; 
    }    

    refresh () {
        var image = editor.selection.backgroundImage;
        if (image) {
            this.refs.$blend.val(image.blendMode)
        }
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$blend')] (e) {
        var image = editor.selection.backgroundImage;
        if (image) {
            image.blendMode = this.refs.$blend.val()
            editor.send(CHANGE_IMAGE, image)
        }
    }

}