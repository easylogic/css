import UIElement, { EVENT } from "../../../../util/UIElement";
import { unitValue } from "../../../../util/css/types";
import { LOAD, CLICK } from "../../../../util/Event";
import { LAYER_LIST_SAMPLE, LAYER_CACHE_TO_STRING } from "../../../types/LayerTypes";
import { STORAGE_LOAD_LAYER, STORAGE_LAYERS } from "../../../types/StorageTypes";
import { repeat } from "../../../../util/functions/func";
import { editor } from "../../../../editor/editor";
import { Rect } from "../../../../editor/shape/Rect";

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
            editor.selection.addCurrent(newLayer);
        }
    }    

    [CLICK('$el .layer-cached-item .add-item')] (e) {
        var newLayer = editor.storage.get(e.$delegateTarget.attr('data-sample-id'));
        
        if (newLayer) {
            editor.selection.addCurrent(newLayer);
        }
    }

    [CLICK('$el .layer-cached-item .delete-item')] (e) {
        var sampleId = e.$delegateTarget.attr('data-sample-id')
        editor.storage.layerList.remove(sampleId)
    }    

    [CLICK('$el .add-current-layer')] (e) {
        var rect = new Rect()
        editor.selection.addCurrent(rect)
        rect.select()
    }

} 