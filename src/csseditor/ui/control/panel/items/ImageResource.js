import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR } from "../../../../types/event";
import { CLICK, LOAD } from "../../../../../util/Event";
import { isObject } from "../../../../../util/functions/func";
import { EVENT } from "../../../../../util/UIElement";
import { IMAGE_GET_BLOB } from "../../../../types/ImageTypes";
import { ITEM_SET_IMAGE_FILE } from "../../../../types/ItemCreateTypes";
import { SVG_LIST, SVG_GET_BLOB } from "../../../../types/SVGTypes";
import { IMAGE_TYPE_IS_IMAGE } from "../../../../../util/css/make";

export default class ImageResource extends BasePropertyItem {
    template () {
        return `
            <div class='property-item image-resource show'>
                <div class='title'>Image Resource</div>            
                <div class='items' ref="$imageList"></div>
            </div>
        `
    }

    [LOAD('$imageList')] () {
        return this.read(SVG_LIST).map((svg, index) => {
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

        return IMAGE_TYPE_IS_IMAGE(item.type); 
    }

    [CLICK('$imageList .svg-item')] (e) {
        var [index, key] = e.$delegateTarget.attrs('data-index', 'data-key')

        if (index) { 
            this.read(SELECTION_CURRENT_IMAGE, (image) => {
                var file = this.read(SVG_GET_BLOB, +index);
                this.read(IMAGE_GET_BLOB, [file], (newImage) => {
                    this.dispatch(ITEM_SET_IMAGE_FILE, image.id, newImage)
                });
            })
        } else if (key) {

            this.read(SELECTION_CURRENT_IMAGE, (image) => {
                var file = this.read(SVG_GET_BLOB, Number.MAX_SAFE_INTEGER, key);
                this.read(IMAGE_GET_BLOB, [file], (newImage) => {
                    this.dispatch(ITEM_SET_IMAGE_FILE, image.id, newImage)
                });
            })
        } 

    }

}