
import BasePropertyItem from './BasePropertyItem';
import { EVENT_CHANGE_IMAGE, CHANGE_IMAGE,  EVENT_CHANGE_SELECTION } from '../../../../types/event';

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

    [EVENT_CHANGE_IMAGE] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }

    [EVENT_CHANGE_SELECTION] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }


    'click $blendList .blend-item | self' (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
        
    }

}