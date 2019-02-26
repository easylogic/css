import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF, DRAGSTART, DRAGEND, DRAGOVER, DROP } from "../../../../util/Event";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../types/event";
import { ITEM_REMOVE, ITEM_FOCUS, ITEM_TOGGLE_VISIBLE, ITEM_TOGGLE_LOCK } from "../../../types/ItemTypes";
import { SELECTION_CURRENT_PAGE, SELECTION_ONE, SELECTION_CHECK } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";
import { EMPTY_STRING } from "../../../../util/css/types";
import { ITEM_MOVE_IN_LAYER, ITEM_MOVE_IN, ITEM_MOVE_LAST } from "../../../types/ItemMoveTypes";
import { ITEM_ADD_COPY, ITEM_COPY_IN, ITEM_COPY_IN_LAYER } from "../../../types/ItemRecoverTypes";
import { ITEM_MAP_IMAGE_CHILDREN, ITEM_MAP_CHILDREN } from "../../../types/ItemSearchTypes";
import { html } from "../../../../util/functions/func";

export default class LayerListView extends UIElement {

    template () { 
        return `<div class='layers show-mini-view'><div class="layer-list" ref="$layerList"></div></div>`
    }

    makeItemNode (node, index) {
        var item = this.get( node.id);

        if (item.itemType == 'layer') {
            return this.makeItemNodeLayer(item, index);
        }

    }

   
    makeItemNodeImage (item) {
        var selected = this.read(SELECTION_CHECK, item.id) ? 'selected' : EMPTY_STRING; 
        return `
            <div class='tree-item image ${selected}' id="${item.id}" draggable="true" >
                <div class="item-title">&lt;${item.type}&gt;</div>                
                <div class='item-tools'>
                    <button type="button" class='visible-item ${item.visible ? 'visible': EMPTY_STRING}' item-id='${item.id}' title="Visible"></button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                    <button type="button" class='copy-image-item' item-id='${item.id}' title="Copy">+</button>
                </div>            
            </div>
            ` 
    }         
 
    
    makeItemNodeLayer (item, index = 0) {
        var selected = this.read(SELECTION_CHECK, item.id) ? 'selected' : EMPTY_STRING; 
        var lock = item.lock ? 'lock': EMPTY_STRING
        var visible = item.visible ? 'visible': EMPTY_STRING
        return html`
            <div class='tree-item ${selected}' id="${item.id}" item-type='layer' draggable="true">
                <div class="item-title"> ${index+1}. ${item.name || `Layer `}</div>
                <div class='item-tools'>
                    <button type="button" class='lock-item ${lock}' item-id='${item.id}' title="Lock a layer"></button>                
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible"></button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">+</button>
                </div>                
            </div>
            <div class="gradient-list-group" >
                <div class="tree-item-children">
                    ${this.read(ITEM_MAP_IMAGE_CHILDREN, item.id, (item) => this.makeItemNodeImage(item))}
                </div>
            </div>       
            `
    }    

    [LOAD('$layerList')] () {
        var page = this.read(SELECTION_CURRENT_PAGE)

        if (!page) {
            return EMPTY_STRING;
        }

        return this.read(ITEM_MAP_CHILDREN, page.id, (item, index) => {
            return this.makeItemNode(item, index); 
        }).reverse();
    }

    refreshSelection() {

    }

    refresh () {
        this.load()
    }

    refreshSelection (id) {
        var $selected = this.$el.$(".selected")

        if ($selected) {
            $selected.removeClass('selected')
        }

        this.$el.$(`[id="${id}"]`).addClass('selected');
    }

    // all effect 
    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh(); }

    [CLICK('$layerList .tree-item') + SELF] (e) { 
        var id = e.$delegateTarget.attr('id');
        this.dispatch(SELECTION_ONE, id);        
        this.run(ITEM_FOCUS, id);
        this.refreshSelection(id);
    }

    [DRAGSTART('$layerList .tree-item')] (e) {
        this.draggedLayer = e.$delegateTarget;
        this.draggedLayer.css('opacity', 0.5);
        e.dataTransfer.setData('text', e.$delegateTarget.attr('id'))
        // e.preventDefault();
    }

    [DRAGEND('$layerList .tree-item')] (e) {

        if (this.draggedLayer) {
            this.draggedLayer.css('opacity', 1);        
        }
    }    

    [DRAGOVER('$layerList .tree-item')] (e) {
        e.preventDefault();        
    }        

    [DROP('$layerList .tree-item') + SELF] (e) {
        e.preventDefault();        

        var destId = e.$delegateTarget.attr('id')
        var sourceId = this.draggedLayer.attr('id')

        var sourceItem = this.get( sourceId);
        var destItem = this.get( destId);

        this.draggedLayer = null;         
        if (destItem.itemType == 'layer' && sourceItem.itemType == 'image') {
            if (e.ctrlKey) {
                this.dispatch(ITEM_COPY_IN_LAYER, destId, sourceId)
            } else {
                this.dispatch(ITEM_MOVE_IN_LAYER, destId, sourceId)
            }

            this.dispatch(HISTORY_PUSH, `Change gradient position `);         
            this.refresh()            
        } else if (destItem.itemType == sourceItem.itemType ) {
            if (e.ctrlKey) {
                this.dispatch(ITEM_COPY_IN, destId, sourceId)
            } else {
                this.dispatch(ITEM_MOVE_IN, destId, sourceId)
            }
            this.dispatch(HISTORY_PUSH, `Change item position `);         
            this.refresh()            
        }

    }       
    
    [DROP('$layerList')] (e) {
        e.preventDefault();        

        if (this.draggedLayer) {
            var sourceId = this.draggedLayer.attr('id')

            this.draggedLayer = null; 
            this.dispatch(ITEM_MOVE_LAST, sourceId)
            this.dispatch(HISTORY_PUSH, `Change layer position `);                     
            this.refresh()
        }

    }           

    [CLICK('$layerList .copy-image-item')] (e) {
        this.dispatch(ITEM_ADD_COPY, e.$delegateTarget.attr('item-id'))
        this.dispatch(HISTORY_PUSH, `Add a gradient`);                 
        this.refresh()
    }

    [CLICK('$layerList .copy-item')] (e) {
        this.dispatch(ITEM_ADD_COPY, e.$delegateTarget.attr('item-id'))
        this.dispatch(HISTORY_PUSH, `Copy a layer`);                         
        this.refresh()
    }

    [CLICK('$layerList .delete-item')] (e) {
        this.dispatch(ITEM_REMOVE, e.$delegateTarget.attr('item-id'))
        this.dispatch(HISTORY_PUSH, `Remove item`);                         
        this.refresh()
    } 

    [CLICK('$layerList .visible-item')] (e) {
        e.$delegateTarget.toggleClass('visible');
        this.dispatch(ITEM_TOGGLE_VISIBLE, e.$delegateTarget.attr('item-id'))
    }     

    [CLICK('$layerList .lock-item')] (e) {
        e.$delegateTarget.toggleClass('lock');
        this.dispatch(ITEM_TOGGLE_LOCK, e.$delegateTarget.attr('item-id'))
    }         

    [CLICK('$viewSample')] (e) {
        this.emit('toggleLayerSampleView');
    }
}