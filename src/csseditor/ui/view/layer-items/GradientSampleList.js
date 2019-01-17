import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { LOAD, CLICK } from "../../../../util/Event";
import { ITEM_CONVERT_STYLE } from "../../../module/ItemTypes";
import { COLLECT_IMAGE_ONE } from "../../../module/CollectTypes";
import { SELECTION_CURRENT_IMAGE_ID } from "../../../module/SelectionTypes";
import { IMAGE_TO_STRING } from "../../../module/ImageTypes";


export default class GradientSampleList extends UIElement  {
 
    initialize () {
        super.initialize();

        this.list = this.read('gradient/list/sample', this.props.type); 
        this.dispatch('storage/load/image')

    }

    template () {

        return `
        <div class="gradient-sample-list">
            <h1>User gradient</h1>            
            <div class='cached-list' ref="$cachedList"></div>
        </div>
        `  
    }

    [LOAD('$cachedList')] () {

        var list = this.list.map( (item, index) => {
            var newImage = Object.assign({}, item.image, { colorsteps: item.colorsteps })
            return `
            <div class='gradient-sample-item' data-index="${index}">
                <div class='preview' style='${this.read(IMAGE_TO_STRING, newImage)}'></div>                
                <div class='item-tools'>
                    <button type="button" class='add-item'  data-index="${index}" title="Addd">&times;</button>                
                    <button type="button" class='change-item'  data-index="${index}" title="Change"></button>
                </div>          
            </div>`
        })

        var storageList = this.read('storage/images').map( (item, index) => {
            var newImage = Object.assign({}, item.image, { colorsteps: item.colorsteps })
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
        
        var arr = [...Array(emptyCount)];

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
        var image = this.read('storage/images', index);
        var newImage = Object.assign({}, image.image, { colorsteps: image.colorsteps })        

        this.dispatch('gradient/image/add', this.read(ITEM_CONVERT_STYLE, newImage) );
    }

    [CLICK('$el .gradient-cached-item .change-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')
        var image = this.read('storage/images', index);
        var newImage = Object.assign({}, image.image, { colorsteps: image.colorsteps })        

        this.dispatch('gradient/image/select', this.read(ITEM_CONVERT_STYLE, newImage));
    }

    [CLICK('$el .add-current-image')] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            var newImage = this.read(COLLECT_IMAGE_ONE, id)

            this.dispatch('storage/add/image', newImage);
            this.refresh();
        })
        
    }


} 