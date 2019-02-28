import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF } from "../../../../util/Event";
import { CHANGE_PAGE, CHANGE_EDITOR } from "../../../types/event";
import { ITEM_ADD_PAGE } from "../../../types/ItemCreateTypes";
import { SELECTION_ONE, SELECTION_CURRENT_PAGE } from "../../../types/SelectionTypes";
import { EMPTY_STRING, unitValue, pxUnit, string2unit, stringUnit } from "../../../../util/css/types";
import { ITEM_MAP_PAGE } from "../../../types/ItemSearchTypes";
import { html } from "../../../../util/functions/func";
import { COLLECT_PAGE_ONE } from "../../../types/CollectTypes";
import { PAGE_CACHE_TO_STRING } from "../../../types/PageTypes";
import { LAYER_CACHE_TO_STRING } from "../../../types/LayerTypes";
import { RESIZE_WINDOW } from "../../../types/ToolTypes";
import { PAGE_NAME } from "../../../../util/css/make";

export default class PageListView extends UIElement {

    template () { 
        return `<div class='pages'>         
            <div class="page-list" ref="$pageList"></div>
        </div>`
    }

    makeItemNode (node, index) {
        var item = this.get( node.id);

        var page = this.read(SELECTION_CURRENT_PAGE)

        var selectedId = EMPTY_STRING 

        if (page) selectedId = page.id; 

        if (item.itemType == 'page') {
            return this.makeItemNodePage(item, index, selectedId);
        }

    }

    makePagePreview (id) {

        var page = this.read(COLLECT_PAGE_ONE, id);
        var data = this.read(PAGE_CACHE_TO_STRING, page)

        var width = string2unit(data.obj.width);
        var height = string2unit(data.obj.height);

        if (unitValue(width) == 0) width = pxUnit(228* 4);
        if (unitValue(height) == 0) height = pxUnit(120 * 4); 

        var rateX = 228 / unitValue(width);
        var rateY = 120 / unitValue(height);

        var transform = `transform: scale(${rateX}, ${rateY});  transform-origin: 0px 0px;`

        return html`
            <div style="${data.css}; position:relative; width: ${stringUnit(width)}; height: ${stringUnit(height)}; ${transform}">
            ${page.layers.map(layer => {
                var data = this.read(LAYER_CACHE_TO_STRING, layer)
                return `<div class="layer-view" style="${data.css}"></div>`
            })}
            </div>`
    }

    makeItemNodePage (item, index, selectedId) {
        var selected = item.id == selectedId ? 'selected' : EMPTY_STRING; 
        var preview = this.makePagePreview(item.id);
        var title = PAGE_NAME(item)
        return `<div class='tree-item ${selected}' id="${item.id}" type='page'>
            <div class="item-preview">${preview}</div>
            <div class="item-title">${title}</div>   
        </div>`
    }

    [LOAD('$pageList')] () {
        var str = this.read(ITEM_MAP_PAGE, (item, index) => {
            return this.makeItemNode(item, index); 
        });

        str.push(`<button type="button" class='add-page' title="Add a page"></button>`)

        return html`${str}`; 
    }

    refresh () { 
        this.load()
    }


    [EVENT(CHANGE_PAGE)] () {
        this.refresh()
        this.emit(CHANGE_EDITOR)
    }

    [CLICK('$pageList .add-page')] (e) {
        this.dispatch(ITEM_ADD_PAGE, true);
        this.refresh();
    }

    [CLICK('$pageList .tree-item') + SELF] (e) { 

        this.run(SELECTION_ONE, e.$delegateTarget.attr('id')); 
        this.emit(CHANGE_EDITOR);      
        this.emit(RESIZE_WINDOW)        
        this.refresh();
    }
} 