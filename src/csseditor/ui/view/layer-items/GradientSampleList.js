import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, CLICK } from "../../../../util/Event";
import { ITEM_CONVERT_STYLE } from "../../../types/ItemTypes";
import { COLLECT_IMAGE_ONE } from "../../../types/CollectTypes";
import { SELECTION_CURRENT_IMAGE_ID } from "../../../types/SelectionTypes";
import { IMAGE_TO_STRING } from "../../../types/ImageTypes";
import { STORAGE_LOAD_IMAGE, STORAGE_IMAGES, STORAGE_ADD_IMAGE } from "../../../types/StorageTypes";
import { repeat } from "../../../../util/filter/functions";


export default class GradientSampleList extends UIElement  {
 
    initialize () {
        super.initialize();

        this.list = this.read('gradient/list/sample', this.props.type); 
        this.dispatch(STORAGE_LOAD_IMAGE)

    }

    template () {

        return `
        <div class="gradient-sample-list">
            <div class='layer-title'>User gradient</div>
            <div class='cached-list' ref="$cachedList"></div>
        </div>
        `  
    }

    [LOAD('$cachedList')] () {

        var list = this.list.map( (item, index) => {
            var newImage = {...item.image, colorsteps: item.colorsteps }
            return `
            <div class='gradient-sample-item' data-index="${index}">
                <div class='preview' style='${this.read(IMAGE_TO_STRING, newImage)}'></div>                
                <div class='item-tools'>
                    <button type="button" class='add-item'  data-index="${index}" title="Addd">&times;</button>                
                    <button type="button" class='change-item'  data-index="${index}" title="Change"></button>
                </div>          
            </div>`
        })

        var storageList = this.read(STORAGE_IMAGES).map( (item, index) => {
            var newImage = {...item.image, colorsteps: item.colorsteps }
            return `
                <div class='gradient-cached-item' data-index="${index}">
                    <div class='preview' style='${this.read(IMAGE_TO_STRING, newImage)}'></div>                
                    <div class='item-tools'>
                        <button type="button" class='add-item'  data-index="${index}" title="Add">&times;</button>                
                        <button type="button" class='change-item'  data-index="${index}" title="Change"></button>
                    </div>          
                </div>
            `
        })

        var results = [
            ...list, 
            ...storageList, 
            `<button type="button" class="add-current-image" title="Cache a image">+</button>`
        ]

        var emptyCount = 5 - results.length % 5 
        
        var arr = repeat(emptyCount);

        arr.forEach(it => {
            results.push(`<div class='empty'></div>`)
        })

        return results;

    }

    refresh () {
        this.load();
    }

    [EVENT('changeStorage')] () {
        this.refresh()
    }

    [CLICK('$el .gradient-sample-item .change-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')

        this.dispatch('gradient/select', this.props.type,  index );
    }

    [CLICK('$el .gradient-sample-item .add-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')

        this.dispatch('gradient/add', this.props.type,  index );
    }    

    [CLICK('$el .gradient-cached-item .add-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')
        var image = this.read(STORAGE_IMAGES, index);
        var newImage = {...image.image, colorsteps: image.colorsteps }

        this.dispatch('gradient/image/add', this.read(ITEM_CONVERT_STYLE, newImage) );
    }

    [CLICK('$el .gradient-cached-item .change-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')
        var image = this.read(STORAGE_IMAGES, index);
        var newImage = { ...image.image, colorsteps: image.colorsteps }

        this.dispatch('gradient/image/select', this.read(ITEM_CONVERT_STYLE, newImage));
    }

    [CLICK('$el .add-current-image')] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            var newImage = this.read(COLLECT_IMAGE_ONE, id)

            this.dispatch(STORAGE_ADD_IMAGE, newImage);
            this.refresh();
        })
        
    }


} 