
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { CHANGE } from '../../../../../util/Event';
import { editor } from '../../../../../editor/editor';

export default class BackgroundClip extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item clip-area show'>
            <div class='items'>         
                <div>
                    <label>Clip Area</label>
                    <div class='size-list full-size'>
                        <select ref="$clip">
                            <option value="content-box">content-box</option>
                            <option value="border-box">border-box</option>
                            <option value="padding-box">padding-box</option>
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
        var layer = editor.selection.currentLayer;
        if (layer) {
            this.refs.$clip.val(layer.backgroundClip)
        }
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$clip')] (e) {
        var layer = editor.selection.currentLayer;
        if (layer) {
            layer.backgroundClip = this.refs.$clip;
            editor.send(CHANGE_LAYER, layer);
        }
    }

}