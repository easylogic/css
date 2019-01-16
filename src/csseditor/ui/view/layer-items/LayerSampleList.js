import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { unitValue } from "../../../../util/css/types";
import { LOAD, CLICK } from "../../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../../module/SelectionTypes";
import { LAYER_LIST_SAMPLE, LAYER_CACHE_TOSTRING } from "../../../module/LayerTypes";
import { COLLECT_LAYER_ONE } from "../../../module/CollectTypes";

export default class LayerSampleList extends UIElement {
 
    initialize () {
        super.initialize();

        this.list = this.read(LAYER_LIST_SAMPLE, this.props.type); 
        this.dispatch('storage/load/layer')

    }

    template () {

        return `
        <div class="layer-sample-list">
            <h1>User Layer</h1>        
            <div class='cached-list' ref="$cachedList"></div>

        </div>
        `  
    }
 
    [LOAD('$cachedList')] () {
        
        var list = this.list.map( (item, index) => {

            var data = this.read(LAYER_CACHE_TOSTRING, item)

            var rateX = 60 / unitValue(data.obj.width);
            var rateY = 62 / unitValue(data.obj.height);

            var transform = `transform: scale(${rateX} ${rateY})`

            return `
            <div class='layer-sample-item'  data-sample-id="${item.id}">
                <div class="layer-view" style="${data.css}; ${transform}"></div>

                <div class='item-tools'>
                    <button type="button" class='add-item'  data-index="${index}" title="Addd">&times;</button>
                </div>          
            </div>`
        })

        var storageList = this.read('storage/layers').map( item => {
            var data = this.read(LAYER_CACHE_TOSTRING, item)

            var rateX = 60 / unitValue(item.layer.width);
            var rateY = 62 / unitValue(item.layer.height);

            var minRate = Math.min(rateY, rateX);            

            var transform = `transform-origin: left top;transform: scale(${minRate})`


            return `
                <div class='layer-cached-item' data-sample-id="${item.id}">
                    <div class="layer-view" style="${data.css}; ${transform}"></div>
                    <div class='item-tools'>
                        <button type="button" class='add-item'  data-sample-id="${item.id}" title="Add">&times;</button>                
                        <button type="button" class='delete-item'  data-sample-id="${item.id}" title="Delete">&times;</button>
                    </div>          
                </div>
            `
        })

        var results = [
            ...list, 
            ...storageList, 
            `<button type="button" class="add-current-layer" title="Cache a layer">+</button>`
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

    [CLICK('$el .layer-sample-item .add-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')

        var newLayer = this.list[index];

        if (newLayer) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.dispatch('item/addCache', newLayer, layer.id );
            })
        }
    }    

    [CLICK('$el .layer-cached-item .add-item')] (e) {
        var newLayer = this.read('storage/layers', e.$delegateTarget.attr('data-sample-id'));
        
        if (newLayer) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.dispatch('item/addCache', newLayer, layer.id );
            })            
        }
    }

    [CLICK('$el .layer-cached-item .delete-item')] (e) {
        this.dispatch('storage/remove/layer', e.$delegateTarget.attr('data-sample-id'));
        this.refresh();
    }    

    [CLICK('$el .add-current-layer')] (e) {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var newLayer = this.read(COLLECT_LAYER_ONE, layer.id)

            this.dispatch('storage/add/layer', newLayer);
            this.refresh();
        })
        
    }

} 