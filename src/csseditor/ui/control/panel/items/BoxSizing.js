
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { CHANGE } from '../../../../../util/Event';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER } from '../../../../types/SelectionTypes';

export default class BoxSizing extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item box-sizing show'>
            <div class='items'>         
                <div>
                    <label>Box Sizing</label>
                    <div class='size-list full-size'>
                        <select ref="$boxSizing">
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
            this.refs.$boxSizing.val(layer.boxSizing)
        })

    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$boxSizing')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER, {id, boxSizing: this.refs.$boxSizing.val() }, true)
        });
    }

}