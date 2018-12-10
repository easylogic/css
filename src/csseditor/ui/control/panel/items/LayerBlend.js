
import BasePropertyItem from './BasePropertyItem';
import { EVENT_CHANGE_SELECTION, CHANGE_LAYER, EVENT_CHANGE_LAYER } from '../../../../types/event';

export default class LayerBlend extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item blend show'>
            <div class='items max-height'>         
                <div>
                    <label>Blend</label>
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
        return this.read('/selection/is/layer'); 
    }    

    refresh () {

        this.read('/selection/current/layer', (layer) => {
            this.refs.$blend.val(layer.mixBlendMode)
        })

    }

    [EVENT_CHANGE_LAYER] () {
        this.refresh()
    }

    [EVENT_CHANGE_SELECTION] () {
        this.refresh()
    }

    'change $blend' (e) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER, {id, mixBlendMode: this.refs.$blend.val() })
        });
    }

}