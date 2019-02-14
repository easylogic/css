import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { unitValue } from "../../../../util/css/types";
import { LOAD, CLICK } from "../../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../../types/SelectionTypes";
import { LAYER_LIST_SAMPLE, LAYER_CACHE_TO_STRING } from "../../../types/LayerTypes";
import { COLLECT_LAYER_ONE } from "../../../types/CollectTypes";
import { ITEM_ADD_CACHE } from "../../../types/ItemRecoverTypes";
import { STORAGE_LOAD_LAYER, STORAGE_LAYERS, STORAGE_REMOVE_LAYER, STORAGE_ADD_LAYER } from "../../../types/StorageTypes";
import { repeat } from "../../../../util/functions/func";

export default class LayerSampleList extends UIElement {
 
    initialize () {
        super.initialize();

        this.list = this.read(LAYER_LIST_SAMPLE, this.props.type); 
        this.dispatch(STORAGE_LOAD_LAYER)

    }

    template () {

        return `
        <div class="layer-sample-list">
            <div class='layer-title'>User Layer</div>        
            <div class='cached-list' ref="$cachedList"></div>
        </div>
        `  
    }
 
    [LOAD('$cachedList')] () {

        const [ cache_to_string, storage_layers] = this.mapGetters(LAYER_CACHE_TO_STRING, STORAGE_LAYERS)
        
        var list = this.list.map( (item, index) => {

            var data = cache_to_string(item)

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

        var storageList = storage_layers().map( item => {
            var data = cache_to_string(item)

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

    [CLICK('$el .layer-sample-item .add-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')

        var newLayer = this.list[index];

        if (newLayer) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.dispatch(ITEM_ADD_CACHE, newLayer, layer.id );
            })
        }
    }    

    [CLICK('$el .layer-cached-item .add-item')] (e) {
        var newLayer = this.read(STORAGE_LAYERS, e.$delegateTarget.attr('data-sample-id'));
        
        if (newLayer) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.dispatch(ITEM_ADD_CACHE, newLayer, layer.id );
            })            
        }
    }

    [CLICK('$el .layer-cached-item .delete-item')] (e) {
        this.dispatch(STORAGE_REMOVE_LAYER, e.$delegateTarget.attr('data-sample-id'));
        this.refresh();
    }    

    [CLICK('$el .add-current-layer')] (e) {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var newLayer = this.read(COLLECT_LAYER_ONE, layer.id)

            this.dispatch(STORAGE_ADD_LAYER, newLayer);
            this.refresh();
        })
        
    }

} 