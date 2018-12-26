
import BasePropertyItem from './BasePropertyItem';
import { EVENT_CHANGE_IMAGE, CHANGE_IMAGE,  EVENT_CHANGE_SELECTION } from '../../../../types/event';
import { MULTI_EVENT, PIPE } from '../../../../../colorpicker/UIElement';
import { CLICK } from '../../../../../util/Event';
import { SELF } from '../../../../../util/EventMachin';

export default class BlendList extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item blend'>
            <div class='title' ref="$title">Blend Mode - <span class='description' ref="$desc"></span></div>
            <div class='items max-height'>         
                <div class="blend-list" ref="$blendList"></div>
            </div>
        </div>
        `
    }

    onToggleShow () {
        this.refresh();
    }

    'load $blendList' () {
        var list = this.read('/blend/list')

        var item = this.read('/selection/current/image')
        if (!item) { return ''; }

        return  `<div>${list.map((blend) => {

                    var selected = blend == item.backgroundBlendMode ? 'selected' : '' 
                    return `
                        <div class='blend-item ${selected}' data-mode="${blend}">
                            <div class="blend-item-view-container" style="background-image: url(/resources/image/grapes.jpg);background-blend-mode: ${blend};">
                                <div class="blend-item-blend-view"  style='${this.read('/blend/toStringWithoutDimensionForImage', item, blend)}'></div>
                                <div class="blend-item-text">${blend}</div>
                            </div>
                        </div>` 
                }).join('')}</div>`
    }



    isShow () {
        return this.read('/selection/is/image'); 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        this.read('/selection/current/image', (image) => {
            this.refs.$desc.text(image.backgroundBlendMode || 'normal')
        })

        if(isShow && this.$el.hasClass('show')) {
            this.load()
        }
    }

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_SELECTION
    )] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }


    [PIPE(
        CLICK('$blendList .blend-item'),
        SELF()
    )] (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
        
    }

}