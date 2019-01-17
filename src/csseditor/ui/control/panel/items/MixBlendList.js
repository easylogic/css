import BasePropertyItem from './BasePropertyItem';
import { CHANGE_LAYER, CHANGE_EDITOR } from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { CLICK, SELF, LOAD } from '../../../../../util/Event';
import { BLEND_LIST, BLEND_TOSTRING_WITHOUT_DIMENSION } from '../../../../module/BlendTypes';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from '../../../../module/SelectionTypes';
import { EMPTY_STRING } from '../../../../../util/css/types';

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

    [LOAD('$mixBlendList')] () {
        var list = this.read(BLEND_LIST)
        var item = this.read(SELECTION_CURRENT_LAYER)
        if (!item) { return EMPTY_STRING; }

        return  `<div>${list.map((blend) => {

                    var selected = blend == item.mixBlendMode ? 'selected' : EMPTY_STRING 
                    return `
                        <div class='blend-item ${selected}' data-mode="${blend}">
                            <div class="blend-item-view-container">
                                <div class="blend-item-blend-view"  style='${this.read(BLEND_TOSTRING_WITHOUT_DIMENSION, item, blend)}'></div>
                                <div class="blend-item-text">${blend}</div>
                            </div>
                        </div>`
                }).join(EMPTY_STRING)}</div>`
    }



    isShow () {
        var image = this.read(SELECTION_CURRENT_IMAGE)

        if (image) return false; 

        return true; 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if(isShow && this.parent.selectedTabId == 'mix') {
            this.load()

            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.refs.$desc.text(layer.mixBlendMode)
            })        
        }
    }

    show () {
        this.refresh();
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_EDITOR
    )] () {
        this.refresh()
    }

    [CLICK('$mixBlendList .blend-item') + SELF] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER, {id, mixBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
    } 

}