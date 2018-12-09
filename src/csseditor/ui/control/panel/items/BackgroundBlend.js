
import BasePropertyItem from './BasePropertyItem';
import { EVENT_CHANGE_IMAGE, CHANGE_IMAGE,  EVENT_CHANGE_SELECTION } from '../../../../types/event';

export default class BackgroundBlend extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item blend show'>
            <div class='items max-height'>         
                <div>
                    <label>Blend Mode</label>
                    <div class='size-list' ref="$size">
                        <select ref="$blend">
                        ${this.read('/blend/list').map(blend => {
                            return `<option value="${blend}">${blend}</option>`
                        }).join('')}
                        </select>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    isShow () {
        return this.read('/selection/is/image'); 
    }    

    refresh () {

        this.read('/selection/current/image', (image) => {
            this.refs.$blend.val(image.backgroundBlendMode)
        })

    }

    [EVENT_CHANGE_IMAGE] () {
        this.refresh()
    }

    [EVENT_CHANGE_SELECTION] () {
        this.refresh()
    }

    'change $blend' (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: this.refs.$blend.val() }, true)
        });
    }

}