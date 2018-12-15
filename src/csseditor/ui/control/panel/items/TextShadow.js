
import BasePropertyItem from './BasePropertyItem';
import { EVENT_CHANGE_IMAGE, CHANGE_IMAGE,  EVENT_CHANGE_SELECTION } from '../../../../types/event';
import { MULTI_EVENT } from '../../../../../colorpicker/UIElement';

export default class TextShadow extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item box-shadow'>
            <div class='title' ref="$title">
                Text Shadow 
                <span style="float:right;">
                    <button type="button">+</button>
                </span>
            </div>
            <div class='items'>         
                <div class="box-shadow-list" ref="$boxShadowList"></div>
            </div>
        </div>
        `
    }

    makeItemNodeBoxShadow (item) {
        return `
            <div class='box-shadow-item' box-shadow-id="${item.id}">
                <label><input type="checkbox" /></label>
                <div class="color" style="background-color: ${item.color};"></div>
                <div class="input">
                    <input class="x" type="number" min="0" max="100" value="${item.x}" /> <span class="unit">px</span>
                </div>
                <div class="input">
                    <input class="y" type="number" min="0" max="100" value="${item.y}" /> <span class="unit">px</span>
                </div>
                <div class="input">
                    <input class="blur" type="number" min="0" max="100" value="${item.blur}" /> <span class="unit">px</span>
                </div>
                <div class="input">
                    <input class="spread" type="number" min="0" max="100" value="${item.spread}" /> <span class="unit">px</span>
                </div>                                                
            </div>
        `
    }

    'load $boxShadowList' () {
        var list = this.read('/blend/list')

        var item = this.read('/selection/current/layer')
        if (!item) { return ''; }

        return this.read('/item/map/image/children', item.id, (item) => {
            return this.makeItemNodeBoxShadow(item)
        })
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


    'click $blendList .blend-item | self' (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
        
    }

}