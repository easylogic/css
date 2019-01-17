
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { CLICK, SELF, LOAD } from '../../../../../util/Event';
import { BLEND_LIST, BLEND_TO_STRING_WITHOUT_DIMENSION_FOR_IMAGE } from '../../../../types/BlendTypes';
import { EMPTY_STRING } from '../../../../../util/css/types';

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

    [LOAD('$blendList')] () {
        var list = this.read(BLEND_LIST)

        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) { return EMPTY_STRING; }

        return  `<div>${list.map((blend) => {

                    var selected = blend == item.backgroundBlendMode ? 'selected' : EMPTY_STRING 
                    return `
                        <div class='blend-item ${selected}' data-mode="${blend}">
                            <div class="blend-item-view-container" style="background-image: url(/resources/image/grapes.jpg);background-blend-mode: ${blend};">
                                <div class="blend-item-blend-view"  style='${this.read(BLEND_TO_STRING_WITHOUT_DIMENSION_FOR_IMAGE, item, blend)}'></div>
                                <div class="blend-item-text">${blend}</div>
                            </div>
                        </div>` 
                }).join(EMPTY_STRING)}</div>`
    }



    isShow () {
        return this.read(SELECTION_IS_IMAGE); 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        this.read(SELECTION_CURRENT_IMAGE, (image) => {
            this.refs.$desc.text(image.backgroundBlendMode || 'normal')
        })

        if(isShow && this.$el.hasClass('show')) {
            this.load()
        }
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_SELECTION
    )] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }


    [CLICK('$blendList .blend-item') + SELF] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
        
    }

}