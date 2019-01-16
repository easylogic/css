
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { SELECTION_CURRENT_IMAGE, SELECTION_IS_IMAGE } from '../../../../module/SelectionTypes';

export default class BackgroundInfo extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item background-info show'>
            <div class='title' ref="$title">Background Image</div>        
            <div class='items max-height'>         
                <div>
                    <label>Gradient</label>
                    <div>
                        <div class="gradient" ref="$typeView"></div>
                        <label ref="$type"></label>
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
            this.refs.$type.text(image.type)
            this.refs.$typeView.attr('data-type', image.type)
        })

    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }
}