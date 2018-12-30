
import BasePropertyItem from './BasePropertyItem';
import { EVENT_CHANGE_IMAGE,  EVENT_CHANGE_SELECTION } from '../../../../types/event';
import { MULTI_EVENT } from '../../../../../colorpicker/UIElement';

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

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_SELECTION
    )] () {
        this.refresh()
    }
}