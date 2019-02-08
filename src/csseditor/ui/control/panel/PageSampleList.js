import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import { CLICK, LOAD } from "../../../../util/Event";
import { unitValue, pxUnit } from "../../../../util/css/types";
import { defaultValue, repeat, html } from "../../../../util/functions/func";
import { ITEM_CONVERT_STYLE } from "../../../types/ItemTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../../../types/SelectionTypes";
import { LAYER_CACHE_TO_STRING } from "../../../types/LayerTypes";
import { COLLECT_PAGE_ONE } from "../../../types/CollectTypes";
import { ITEM_ADD_CACHE } from "../../../types/ItemRecoverTypes";
import { CHANGE_PAGE } from "../../../types/event";
import { PAGE_CACHE_TO_STRING } from "../../../types/PageTypes";
import { STORAGE_LOAD_PAGE, STORAGE_PAGES, STORAGE_REMOVE_PAGE, STORAGE_ADD_PAGE } from "../../../types/StorageTypes";


export default class PageSampleList extends UIElement {
 
    initialize () {
        super.initialize();

        this.list = [] 
        this.dispatch(STORAGE_LOAD_PAGE)

    }

    template () {

        return `<div class="page-sample-list"><div class='cached-list' ref="$cachedList"></div></div>`  
    }

    [LOAD('$cachedList')] () {
        
        var list = this.list.map( (page, index) => {
            var data = this.read(PAGE_CACHE_TO_STRING, page)

            var rateX = 72 / unitValue(defaultValue(data.obj.width, pxUnit(400)));
            var rateY = 70 / unitValue(defaultValue(data.obj.height, pxUnit(300)));            

            var transform = `transform: scale(${rateX} ${rateY})`

            return html`
            <div class='page-sample-item'  data-sample-id="${page.id}">
                <div class="page-view" style="${data.css}; ${transform}">
                ${page.layers.map(layer => {
                    var data = this.read(LAYER_CACHE_TO_STRING, layer)
                    return `<div class="layer-view" style="${data.css}"></div>`
                })}
                </div>

                <div class='item-tools'>
                    <button type="button" class='add-item'  data-index="${index}" title="Addd">&times;</button>
                </div>           
            </div>`
        })

        var storageList = this.read(STORAGE_PAGES).map( page => {
            var samplePage = this.read(ITEM_CONVERT_STYLE, page.page);

            var data = this.read(PAGE_CACHE_TO_STRING, samplePage)
            var rateX = 72 / unitValue(defaultValue(samplePage.width, pxUnit(400)));
            var rateY = 70 / unitValue(defaultValue(samplePage.height, pxUnit(300)));

            var minRate = Math.min(rateY, rateX);

            var transform = `left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%) scale(${minRate})`

            return html`
                <div class='page-cached-item' data-sample-id="${page.id}">
                    <div class="page-view" style="${data.css}; ${transform}">
                    ${page.layers.map(layer => {
                        var data = this.read(LAYER_CACHE_TO_STRING, layer)
                        return `<div class="layer-view" style="${data.css}"></div>`
                    })}
                    </div>
                    <div class='item-tools'>
                        <button type="button" class='add-item'  data-sample-id="${page.id}" title="Add">&times;</button>                
                        <button type="button" class='delete-item'  data-sample-id="${page.id}" title="Delete">&times;</button>
                    </div>          
                </div>
            `
        })

        var results = [
            ...list, 
            ...storageList, 
            `<button type="button" class="add-current-page" title="Cache a page">+</button>`
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

    [CLICK('$el .page-sample-item .add-item')] (e) {
        var index = +e.$delegateTarget.attr('data-index')

        var newPage = this.list[index];

        if (newPage) {
            this.read(SELECTION_CURRENT_PAGE_ID, id => {
                this.dispatch(ITEM_ADD_CACHE, newPage, id );
                this.emit(CHANGE_PAGE);                
            })
        }
    }    

    [CLICK('$el .page-cached-item .add-item')] (e) {
        var newPage = this.read(STORAGE_PAGES, e.$delegateTarget.attr('data-sample-id'));
        if (newPage) {
            this.read(SELECTION_CURRENT_PAGE_ID, id => {
                this.dispatch(ITEM_ADD_CACHE, newPage, id );
                this.emit(CHANGE_PAGE);
            })
            
        }
    }

    [CLICK('$el .page-cached-item .delete-item')] (e) {
        this.dispatch(STORAGE_REMOVE_PAGE, e.$delegateTarget.attr('data-sample-id'));
        this.refresh();
    }    

    [CLICK('$el .add-current-page')] (e) {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            var newPage = this.read(COLLECT_PAGE_ONE, id)

            this.dispatch(STORAGE_ADD_PAGE, newPage);
            this.refresh();
        })
        
    }

} 