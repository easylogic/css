import BasePropertyItem from "./BasePropertyItem";
import { EVENT_CHANGE_EDITOR } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";

export default class ImageResource extends BasePropertyItem {
    template () {
        return `
            <div class='property-item image-resource show'>
                <div class='title'>Image Resource</div>            
                <div class='items' ref="$imageList">

                </div>
            </div>
        `
    }

    'load $imageList' () {
        return this.read('/svg/list').map((svg, index) => {
            if (typeof svg == 'object') {
                return `<div class='svg-item' data-key="${svg.key}">${svg.svg}</div>`
            }  else {
                return `<div class='svg-item' data-index="${index}">${svg}</div>`
            }
            
        })
    }

    refresh () {
        this.$el.toggle(this.isShow())
        this.load();
    }

    [EVENT_CHANGE_EDITOR] () {
        this.$el.toggle(this.isShow())
    }

    '@changeSvgList' () {
        this.refresh()
    }

    '@selectImage' () {
        this.$el.toggle(this.isShow())
    }    

    isShow () {
        var item = this.read('/selection/current/image')

        if (!item) return false; 

        return this.read('/image/type/isImage', item.type); 
    }

    [CLICK('$imageList .svg-item')] (e) {
        var index = e.$delegateTarget.attr('data-index')
        var key = e.$delegateTarget.attr('data-key')

        if (index) {
            this.read('/selection/current/image', (image) => {
                var file = this.read('/svg/get/blob', +index);
                this.read('/image/get/blob', [file], (newImage) => {
                    this.dispatch('/item/set/image/file', image.id, newImage)
                });
            })
        } else if (key) {

            this.read('/selection/current/image', (image) => {
                var file = this.read('/svg/get/blob', Number.MAX_SAFE_INTEGER, key);
                this.read('/image/get/blob', [file], (newImage) => {
                    this.dispatch('/item/set/image/file', image.id, newImage)
                });
            })
        } 

    }

}