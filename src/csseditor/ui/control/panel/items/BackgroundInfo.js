
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';

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
        return this.read('selection/is/image'); 
    }    

    refresh () {

        this.read('selection/current/image', (image) => {
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