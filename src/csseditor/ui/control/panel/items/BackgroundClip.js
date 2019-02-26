
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { CHANGE } from '../../../../../util/Event';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER } from '../../../../types/SelectionTypes';

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
        return this.read(SELECTION_IS_LAYER); 
    }    

    refresh () {

        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            this.refs.$clip.val(layer.backgroundClip)
        })

    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$clip')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER, {id, backgroundClip: this.refs.$clip.val() }, true)
        });
    }

}