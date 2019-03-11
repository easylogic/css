import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF, DRAGSTART, DRAGEND, DRAGOVER, DROP } from "../../../../util/Event";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER } from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { html } from "../../../../util/functions/func";
import { editor } from "../../../../editor/editor";
import { ArtBoard } from "../../../../editor/ArtBoard";
import { Directory } from "../../../../editor/Directory";

export default class LayerListView extends UIElement {

    template () { 
        return `
            <div class='layer-list-view'>
                <div class="layer-list-toolbar">
                    <span class='title'>Art Board</span>
                    <span class='layer-tools'>
                        <div class="button-group">
                            <button type="button" ref="$addArtBoard">+</button>
                            <button type="button" ref="$addDirectory">+D</button>
                        </div>
                    </span>
                </div>
                <div class="layer-list" ref="$layerList"></div>
            </div>
        `
    }

    makeItem (item, index) {
        if (item.itemType == 'artboard') {
            return this.makeArtBoard(item, index);
        } else if (item.itemType == 'directory') {
            return this.makeDirectory(item, index);
        } else if (item.itemType == 'layer') {
            return this.makeLayer(item, index);            
        }
    }
 
    
    makeArtBoard (item) {
        var lock = item.lock ? 'lock' : '';
        var visible = item.visible ? 'visible' : ''        
        return html`
            <div class='tree-item depth-${item.depth}' id="${item.id}" item-type='${item.itemType}'>
                <div class="item-title"> ${item.title}</div>
                <div class='item-tools'>          
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible"></button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">+</button>
                </div>                
            </div>
            `
    }    

    makeDirectory (item) {
        var lock = item.lock ? 'lock' : '';
        var visible = item.visible ? 'visible' : ''
        return html`
            <div class='tree-item depth-${item.depth}' id="${item.id}" item-type='${item.itemType}'>
                <div class="item-title"> ${item.title}</div>
                <div class='item-tools'>          
                    <button type="button" class='lock-item ${lock}' item-id='${item.id}' title="Lock"></button>
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible"></button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">+</button>
                </div>                
            </div>
            `
    }    
    
    makeLayer (item) {
        var lock = item.lock ? 'lock' : '';
        var visible = item.visible ? 'visible' : ''        
        return html`
            <div class='tree-item depth-${item.depth}' id="${item.id}" item-type='${item.itemType}' draggable="draggable">
                <div class="item-title"> ${item.title}</div>
                <div class='item-tools'>          
                    <button type="button" class='lock-item ${lock}' item-id='${item.id}' title="Visible"></button>
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible"></button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">+</button>
                </div>                
            </div>
            `
    }        

    [LOAD('$layerList')] () {

        var project = editor.selection.currentProject || editor.selection.project;
        if (!project) return EMPTY_STRING

        return project.tree().map((item, index) => {
            return this.makeItem(item, index); 
        });
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

    [CLICK('$addArtBoard')] () {
        var project = editor.selection.currentProject;
        if (project) {
            var artboard = project.addArtBoard(new ArtBoard({
                name: 'New ArtBoard'
            }))
            artboard.select();
            editor.send(CHANGE_EDITOR)
        }
    }

    [CLICK('$addDirectory')] () {
        var currentItem = editor.selection.currentDirectory || editor.selection.currentArtBoard;
        if (currentItem) {
            var directory = currentItem.addDirectory(new Directory({
                name: 'New Directory'
            }))
            this.refresh();

        }
    }

    [CLICK('$layerList .tree-item') + SELF] (e) { 
    
        var id = e.$delegateTarget.attr('id');
        editor.selection.select(id)
        editor.send(CHANGE_SELECTION);
    }

    [DRAGSTART('$layerList .tree-item')] (e) {
        this.draggedLayer = e.$delegateTarget;
        this.draggedLayer.css('opacity', 0.5);
        e.dataTransfer.setData('text', e.$delegateTarget.attr('id'))
        // e.preventDefault();
        console.log('아이템 드래그 구현해주세요')
    }

    [DRAGEND('$layerList .tree-item')] (e) {
        console.log('아이템 드래그 구현해주세요')
        if (this.draggedLayer) {
            this.draggedLayer.css('opacity', 1);        
        }
    }    

    [DRAGOVER('$layerList .tree-item')] (e) {
        e.preventDefault();        
    }        

    [DROP('$layerList .tree-item') + SELF] (e) {
        e.preventDefault();        
        console.log('item drag 구현해주세요.')
    }       
    
    [DROP('$layerList')] (e) {
        e.preventDefault();        

        if (this.draggedLayer) {
            var sourceId = this.draggedLayer.attr('id')
            var item = editor.get(sourceId);
            item.moveLast();
        }

    }           

    [CLICK('$layerList .copy-item')] (e) {
        console.log('click copy', e);
        var id = e.$delegateTarget.attr('item-id');
        var item = editor.get(id);
        item.copy();
        editor.emit(CHANGE_EDITOR);
    }

    [CLICK('$layerList .delete-item')] (e) {
        console.log('click delete', e);        
        var id = e.$delegateTarget.attr('item-id');
        editor.remove(id);
        editor.emit(CHANGE_EDITOR, null, this);
    } 

    [CLICK('$layerList .visible-item')] (e) {
        console.log('click visible', e);                
        e.$delegateTarget.toggleClass('visible');
        var id = e.$delegateTarget.attr('item-id');
        var item = editor.get(id);
        item.toggle('visible');
        editor.emit(CHANGE_LAYER, null, this);
    }     

    [CLICK('$layerList .lock-item')] (e) {
        e.$delegateTarget.toggleClass('lock');
        var id = e.$delegateTarget.attr('item-id');
        var item = editor.get(id);
        item.toggle('lock');
        editor.emit(CHANGE_LAYER, null, this);
    }
}