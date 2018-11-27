
import BasePropertyItem from './BasePropertyItem';

export default class BlendList extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item blend show'>
            <div class='title' ref="$title">Blend - <span class='description' ref="$desc"></span></div>
            <div class='items max-height'>         
                <div class="blend-list" ref="$blendList"></div>
            </div>
        </div>
        `
    }


    'load $blendList' () {
        var list = this.read('/blend/list')

        var item = this.read('/item/current/image')
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
        var image = this.read('/item/current/image')

        if (image) return true; 

        return false; 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if(isShow) {
            this.load()

            this.read('/item/current/image', (image) => {
                this.refs.$desc.html(image.backgroundBlendMode || 'normal')
            })
        }
    }

    '@changeEditor' () {
        this.refresh()
    }


    'click.self $blendList .blend-item' (e) {
        var item = this.read('/item/current/image');

        if (!item) return; 

        item.backgroundBlendMode = e.$delegateTarget.attr('data-mode')

        this.dispatch('/item/set', item, true)
        this.refresh();
    }

}