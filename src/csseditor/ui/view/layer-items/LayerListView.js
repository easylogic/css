import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF, DRAGSTART, DRAGEND, DRAGOVER, DROP, PREVENT } from "../../../../util/Event";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER } from "../../../types/event";
import { EMPTY_STRING } from "../../../../util/css/types";
import { html, isUndefined } from "../../../../util/functions/func";
import { editor } from "../../../../editor/editor";
import { ArtBoard } from "../../../../editor/ArtBoard";
import { Directory } from "../../../../editor/Directory";
import icon from "../../icon/icon";
import Dom from "../../../../util/Dom";
import { Layer } from "../../../../editor/Layer";

export default class LayerListView extends UIElement {

    template () { 
        return `
            <div class='layer-list-view'>
                <div class="layer-list-toolbar">
                    <span class='title'>Art Board</span>
                    <span class='layer-tools'>
                        <div class="button-group">
                            <button type="button" ref="$addArtBoard" title="add ArtBoard">${icon.add_note}</button>
                            <button type="button" ref="$addDirectory" title="add Directory">${icon.create_folder}</button>
                        </div>
                    </span> 
                </div>
                <div class="layer-list" ref="$layerList"></div>
            </div>
        `
    }

    makeItem (item, depth) {
        if (item.itemType == 'artboard') {
            return this.makeArtBoard(item, depth);
        } else if (item.itemType == 'directory') {
            return this.makeDirectory(item, depth);
        } else if (item.itemType == 'layer') {
            return this.makeLayer(item, depth);            
        }
    }
 
    
    makeArtBoard (item, depth) {
        var lock = item.lock ? 'lock' : EMPTY_STRING;
        var visible = item.visible ? 'visible' : EMPTY_STRING     
        var selected = item.selectedOne ? 'selected' : EMPTY_STRING;   
        return html`
            <div class='tree-item depth-${isUndefined(depth) ? 0 : depth} ${selected}' item-id="${item.id}" item-type='${item.itemType}'>
                <div class="item-depth"></div>
                <div class='item-icon-group'>${icon.chevron_right}</div>
                <div class="item-title"> ${item.title}</div>
                <div class='item-tools'>          
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible">${icon.visible}</button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">${icon.remove}</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">${icon.copy}</button>
                </div>                
            </div>
            <div class='tree-children'>
                ${item.children.map(child => this.makeItem(child, depth + 1))}
            </div>
            `
    }    

    makeDirectory (item, depth) {
        var lock = item.lock ? 'lock' : '';
        var visible = item.visible ? 'visible' : ''
        var selected = item.selected ? 'selected' : EMPTY_STRING;   
        var collapsed = item.collapsed ? 'collapsed': EMPTY_STRING        
        return html`
            <div class='tree-item depth-${depth} ${selected} ${collapsed}' item-id="${item.id}" item-type='${item.itemType}'>
                <div class="item-depth"></div>            
                <div class='item-icon-group'>${icon.chevron_right}</div>
                <div class='item-icon'>${icon.folder}</div>            
                <div class="item-title"> ${item.title}</div>
                <div class='item-tools'>          
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible">${icon.visible}</button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">${icon.remove}</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">${icon.copy}</button>
                </div>                
            </div>
            <div class='tree-children'>
                ${item.children.map(child => this.makeItem(child, depth + 1))}
            </div>
            `
    }    
    
    makeLayer (item, depth) {
        var lock = item.lock ? 'lock' : '';
        var visible = item.visible ? 'visible' : ''  
        var selected = item.selectedOne ? 'selected' : EMPTY_STRING;                 
        return html`
            <div class='tree-item depth-${depth} ${selected} ${item.index}' item-id="${item.id}" item-type='${item.itemType}' draggable="true">
                <div class="item-depth"></div>            
                <div class='item-icon'><span class='icon-${item.type}'></span></div>            
                <div class="item-title"> ${item.title}</div> 
                <div class='item-tools'>          
                    <button type="button" class='lock-item ${lock}' item-id='${item.id}' title="Visible">${icon.lock}</button>
                    <button type="button" class='visible-item ${visible}' item-id='${item.id}' title="Visible">${icon.visible}</button>
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">${icon.remove}</button>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">${icon.copy}</button>
                </div>                
            </div>
            `
    }        

    [LOAD('$layerList')] () {

        var project = editor.selection.currentProject || editor.selection.project;
        if (!project) return EMPTY_STRING

        return project.artboards.map((item, index) => {
            return this.makeItem(item, 0, index); 
        });
    }

    refresh () {
        console.log('load');
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
        CHANGE_EDITOR
    )] () { this.refresh(); }

    [EVENT(CHANGE_SELECTION)] () {
        var current = editor.selection.current;
        if (current) {
            this.toggleSelectedItem(current.id);
        }
    }

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
        var currentItem = editor.selection.current;
        if (currentItem) {

            if (currentItem instanceof ArtBoard || currentItem instanceof Directory) {
                var directory = currentItem.addDirectory(new Directory({
                    name: 'New Directory'
                }))    
            } else if (currentItem instanceof Layer) {
                var directory = currentItem.parent().addDirectory(new Directory({
                    name: 'New Directory',
                    index: currentItem.index + 1 
                }))    
            }
            directory.select()
            this.refresh()
            editor.send(CHANGE_SELECTION);

        }
    }

    toggleSelectedItem (id) {
        var selected = this.refs.$layerList.$('.selected');
        if (selected) {
            selected.removeClass('selected')
        }

        var item = this.refs.$layerList.$(`[item-id="${id}"]`);
        if (item) {
            item.addClass('selected');
        }
    }

    [CLICK('$layerList .tree-item > .item-icon-group')] (e) { 
        var $dt = e.$delegateTarget.closest('tree-item')
        var id = $dt.attr('item-id')
        var item = editor.get(id);
        item.collapsed = true; 
        $dt.toggleClass('collapsed');
    }


    [CLICK('$layerList .tree-item > .item-title')] (e) { 
        var id = e.$delegateTarget.closest('tree-item').attr('item-id')
        this.toggleSelectedItem(id);
        editor.selection.select(id)
        editor.send(CHANGE_SELECTION, null, this);
    }

    [DRAGSTART('$layerList .tree-item')] (e) {
        this.draggedLayer = e.$delegateTarget;
        this.draggedLayerId = e.$delegateTarget.attr('item-id')
        this.draggedLayer.css('opacity', 0.5).css('background-color', 'yellow');
        e.dataTransfer.setData('text', e.$delegateTarget.attr('item-id'))
        this.$el.addClass('dragging')
    }

    [DRAGEND('$layerList .tree-item')] (e) {
        if (this.draggedLayer) {
            this.draggedLayer.css('opacity', 1).css('background-color', '');       
            this.draggedLayer = null; 
            this.draggedLayerId = null;            
        }
        this.$el.removeClass('dragging')        
    }    

    [DRAGOVER('$layerList .tree-item') + PREVENT] (e) {
        // PREVENT
    }        

    [DROP('$layerList .tree-item') + SELF + PREVENT] (e) {
        var $item = e.$delegateTarget;
        if (this.draggedLayerId) {
            var source = editor.get(this.draggedLayerId);
            var target = editor.get($item.attr('item-id'));

            target.insertLast(source);
            source.select()

            editor.send(CHANGE_EDITOR);
        }

        this.$el.removeClass('dragging')
    }       

    [CLICK('$layerList .copy-item')] (e) {
        var id = e.$delegateTarget.attr('item-id');
        var item = editor.get(id);
        item.copy();
        editor.emit(CHANGE_EDITOR);
    }

    [CLICK('$layerList .delete-item')] (e) {
        var id = e.$delegateTarget.attr('item-id');
        var item = editor.get(id);
        item.remove()
        editor.emit(CHANGE_EDITOR, null, this);
    } 

    [CLICK('$layerList .visible-item')] (e) {          

        var id = e.$delegateTarget.attr('item-id');
        var item = editor.get(id);

        e.$delegateTarget.toggleClass('visible');
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