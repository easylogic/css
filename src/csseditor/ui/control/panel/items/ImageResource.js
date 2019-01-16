import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR } from "../../../../types/event";
import { CLICK, LOAD } from "../../../../../util/Event";
import { isObject } from "../../../../../util/functions/func";
import { EVENT } from "../../../../../colorpicker/UIElement";

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

    [LOAD('$imageList')] () {
        return this.read('svg/list').map((svg, index) => {
            if (isObject(svg)) {
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

    [EVENT(CHANGE_EDITOR)] () {
        this.$el.toggle(this.isShow())
    }

    [EVENT('changeSvgList')] () {
        this.refresh()
    }

    [EVENT('selectImage')] () {
        this.$el.toggle(this.isShow())
    }    

    isShow () {
        var item = this.read(SELECTION_CURRENT_IMAGE)

        if (!item) return false; 

        return this.read('image/type/isImage', item.type); 
    }

    [CLICK('$imageList .svg-item')] (e) {
        var [index, key] = e.$delegateTarget.attrs('data-index', 'data-key')

        if (index) {
            this.read(SELECTION_CURRENT_IMAGE, (image) => {
                var file = this.read('svg/get/blob', +index);
                this.read('image/get/blob', [file], (newImage) => {
                    this.dispatch('item/set/image/file', image.id, newImage)
                });
            })
        } else if (key) {

            this.read(SELECTION_CURRENT_IMAGE, (image) => {
                var file = this.read('svg/get/blob', Number.MAX_SAFE_INTEGER, key);
                this.read('image/get/blob', [file], (newImage) => {
                    this.dispatch('item/set/image/file', image.id, newImage)
                });
            })
        } 

    }

}