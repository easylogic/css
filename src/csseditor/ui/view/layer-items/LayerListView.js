import UIElement, { EVENT } from "../../../../util/UIElement";
import { LOAD, CLICK, SELF, DRAGSTART, DRAGEND, DRAGOVER, DROP, PREVENT } from "../../../../util/Event";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER, CHANGE_RECT } from "../../../types/event";
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
                    <span class='title' ref="$title"></span>
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
        var isArtBoard = item.itemType == 'artboard'
        var isDirectory = item.itemType == 'directory'
        var isLayer = item.itemType == 'layer' 

        var children = item.children; 

        var isGroup = isArtBoard || isDirectory || children.length;
        var hasLock = isDirectory || isLayer
        var isDraggable = isLayer;
        var hasIcon = isArtBoard || isDirectory || isLayer
        var hasVisible = isDirectory || isLayer


        var draggable = isDraggable ? 'draggable="true"' : EMPTY_STRING
        var lock = (hasLock && item.lock) ? 'lock' : EMPTY_STRING;
        var visible = item.visible ? 'visible' : EMPTY_STRING  
        var selected = item.selectedOne ? 'selected' : EMPTY_STRING;    

        var iconString = EMPTY_STRING
        if (isArtBoard) {
            iconString = `${icon.artboard}`
        } else if (isDirectory) {
            iconString = `${icon.folder}`
        } else if (isLayer) {
            iconString = `<span class='icon-${item.type}'></span>`
        }

        var label = ''
        var display = item.display.type;
        if (display == 'flex' || display == 'grid') {
            label = display;
        }


        return html`
            <div class='tree-item depth-${depth} ${selected} ${item.index}' item-id="${item.id}" item-type='${item.itemType}' ${draggable}>
                <div class="item-depth"></div>            
                ${isGroup && `<div class='item-icon-group'>${icon.chevron_right}</div>`}
                ${!isGroup && hasIcon && `<div class='item-icon'>${iconString}</div>`}
                <div class="item-title" data-label='${label}'> ${item.title}</div> 
                <div class='item-tools'>          
                    ${hasLock && `<button type="button" class='lock-item ${lock}' title="Visible">${icon.lock}</button>`}
                    ${hasVisible && `<button type="button" class='visible-item ${visible}' title="Visible">${icon.visible}</button>`}
                    <button type="button" class='delete-item' title="Remove">${icon.remove}</button>
                    <button type="button" class='copy-item' title="Copy">${icon.copy}</button>
                </div>                
            </div>
            ${isGroup && html`<div class='tree-children'>
                ${item.children.map(child => this.makeItem(child, depth + 1))}
            </div>`}
        ` 
    }       
    
    [LOAD('$title')] () {
        var project = editor.selection.currentProject
        var title = project ? project.title : 'ArtBoard';
        return `<span>${title}</span>`
    }

    [LOAD('$layerList')] () {

        var project = editor.selection.currentProject || editor.selection.project;
        if (!project) return EMPTY_STRING

        return project.artboards.map((item, index) => {
            return this.makeItem(item, 0, index); 
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
        CHANGE_EDITOR
    )] () { this.refresh(); }

    refreshLayer() {
        editor.selection.items.forEach(item => {
            var $item = this.refs.$layerList.$(`[item-id="${item.id}"]`);
            if ($item) {
                var label = '';
                var display = item.display.type;
                if (display == 'flex' || display == 'grid') {
                    label = display
                }
                $item.$('.item-title').attr('data-label', label);
            }
        })
    }

    [EVENT(CHANGE_LAYER, CHANGE_RECT)] () {
        this.refreshLayer();
    }

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
                var directory = currentItem.add(new Directory({
                    name: 'New Directory'
                }))    
            } else if (currentItem instanceof Layer) {
                var directory = currentItem.parentDirectory().add(new Directory({
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

    getItem (e) {
        var $dt = e.$delegateTarget.closest('tree-item')
        var id = $dt.attr('item-id')
        var item = editor.get(id);

        return {item, $dt} 
    }

    [CLICK('$layerList .copy-item')] (e) {
        var {item} = this.getItem(e)
        item.copy();

        editor.emit(CHANGE_EDITOR);
    }

    [CLICK('$layerList .delete-item')] (e) {
        var {item} = this.getItem(e)
        item.remove()
        editor.emit(CHANGE_EDITOR, null, this);
    } 

    [CLICK('$layerList .visible-item')] (e) {          
        var {item} = this.getItem(e)

        e.$delegateTarget.toggleClass('visible');
        item.toggle('visible');

        editor.emit(CHANGE_LAYER, null, this);
    }     

    [CLICK('$layerList .lock-item')] (e) {

        var {item} = this.getItem(e)

        e.$delegateTarget.toggleClass('lock');        
        item.toggle('lock');

        editor.emit(CHANGE_LAYER, null, this);
    }

    [CLICK('$layerList .item-icon-group')] (e) { 
        var {item, $dt} = this.getItem(e)
        item.collapsed = true; 
        $dt.toggleClass('collapsed');
    }


    [CLICK('$layerList .item-title')] (e) { 
        var {item} = this.getItem(e)
        this.toggleSelectedItem(item.id);
        item.select()
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

   
}