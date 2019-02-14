import UIElement, { EVENT } from "../../../../colorpicker/UIElement";
import PageSampleList from "../../control/panel/PageSampleList";
import { LOAD, CLICK, SELF } from "../../../../util/Event";
import { CHANGE_PAGE, CHANGE_EDITOR } from "../../../types/event";
import { ITEM_GET } from "../../../types/ItemTypes";
import { ITEM_ADD_PAGE } from "../../../types/ItemCreateTypes";
import { SELECTION_ONE, SELECTION_CURRENT_PAGE } from "../../../types/SelectionTypes";
import { EMPTY_STRING } from "../../../../util/css/types";
import { ITEM_MAP_PAGE } from "../../../types/ItemSearchTypes";
import { STORAGE_SAVE } from "../../../types/StorageTypes";
import { html } from "../../../../util/functions/func";

export default class PageListView extends UIElement {

    components () {
        return { PageSampleList }
    }

    template () { 
        return `<div class='pages'>         
            <div class="page-list" ref="$pageList"></div>
            <PageSampleList />
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

    makeItemNodePage (item, index, selectedId) {
        var selected = item.id == selectedId ? 'selected' : EMPTY_STRING; 
        return `<div class='tree-item ${selected}' id="${item.id}" type='page'>
            <div class="item-preview"></div>
            <div class="item-title">${item.name || `Project ${index+1}`}</div>   
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
        this.refresh();
    }

    [CLICK('$saveButton')] (e) {
        this.run(STORAGE_SAVE);
    }

    [CLICK('$viewSample')] (e) {
        this.emit('togglePageSampleView');
    }    

    [CLICK('$exportButton')] (e) {
        this.emit('showExport')
    }

} 