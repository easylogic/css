
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_SELECTION, CHANGE_LAYER } from '../../../../types/event';
import { EVENT } from '../../../../../util/UIElement';
import { CHANGE } from '../../../../../util/Event';
import { editor } from '../../../../../editor/editor';

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
        return editor.selection.currentLayer;
    }    

    refresh () {
        var layer = editor.selection.currentLayer;
        if (layer) {
            this.refs.$boxSizing.val(layer.boxSizing)
        }
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    [CHANGE('$boxSizing')] (e) {
        editor.selection.updateLayer(CHANGE_LAYER, {
            boxSizing: this.refs.$boxSizing.val()
        })
    }

}