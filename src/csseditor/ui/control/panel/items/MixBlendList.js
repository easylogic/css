import BasePropertyItem from './BasePropertyItem';
import { CHANGE_LAYER, EVENT_CHANGE_LAYER, EVENT_CHANGE_EDITOR } from '../../../../types/event';
import { PIPE, MULTI_EVENT } from '../../../../../colorpicker/UIElement';
import { CLICK } from '../../../../../util/Event';
import { SELF } from '../../../../../util/EventMachin';

export default class MixBlendList extends BasePropertyItem {

    template () { 
        return `
            <div class='property-item mix-blend-list'>
                <div class='title' ref="$title">Mix Blend - <span class='description' ref="$desc"></span></div>
                <div class='items max-height'>                    
                    <div class='mix-blend-list blend-list-tab'>
                        <div class="blend-list" ref="$mixBlendList"></div>            
                    </div>   
                </div>
            </div>
        `
    }

    'load $mixBlendList' () {
        var list = this.read('/blend/list')
        var item = this.read('/selection/current/layer')
        if (!item) { return ''; }

        return  `<div>${list.map((blend) => {

                    var selected = blend == item.mixBlendMode ? 'selected' : '' 
                    return `
                        <div class='blend-item ${selected}' data-mode="${blend}">
                            <div class="blend-item-view-container">
                                <div class="blend-item-blend-view"  style='${this.read('/blend/toStringWithoutDimension', item, blend)}'></div>
                                <div class="blend-item-text">${blend}</div>
                            </div>
                        </div>`
                }).join('')}</div>`
    }



    isShow () {
        var image = this.read('/selection/current/image')

        if (image) return false; 

        return true; 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if(isShow && this.parent.selectedTabId == 'mix') {
            this.load()

            this.read('/selection/current/layer', (layer) => {
                this.refs.$desc.text(layer.mixBlendMode)
            })        
        }
    }

    show () {
        this.refresh();
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_EDITOR
    )] () {
        this.refresh()
    }

    [PIPE(
        CLICK('$mixBlendList .blend-item'),
        SELF()
    )] (e) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER, {id, mixBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
    } 

}