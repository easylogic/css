import UIElement from '../../../colorpicker/UIElement';
import MiniLayerView from './MiniLayerView';

export default class LayerList extends UIElement {

    template () { 
        return `
            <div class='layers'>
                <div class='title'> 
                    <h1>Layers</h1>
                    <div class="tools">
                        <button type="button" class='add-layer' ref="$addLayer">+</button>
                        <button type="button" class='view-sample' ref="$viewSample">
                            <div class="arrow"></div>
                        </button>
                    </div>
                </div>             
                <div class="layer-list" ref="$layerList"></div>
                <MiniLayerView></MiniLayerView>
            </div>
        `
    }

    components () {
        return { MiniLayerView }
    }

    makeItemNode (node, index) {
        var item = this.read('/item/get', node.id);

        var layer = this.read('/item/current/layer')

        var selectedId = '' 
        if (layer) selectedId = layer.id ; 

        if (item.itemType == 'layer') {
            return this.makeItemNodeLayer(item, selectedId, index);
        }

    }

   
    makeItemNodeImage (item) {
        var selected = item.selected ? 'selected' : '' 
        return `
            <div class='tree-item ${selected}' id="${item.id}" draggable="true" >
                <div class="item-view-container">
                    <div class="item-view"  style='${this.read('/image/toString', item)}'></div>
                </div>
                <div class="item-title"> 
                    &lt;${item.type}&gt;
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                </div>                
                <div class='item-tools'>
                    <button type="button" class='copy-image-item' item-id='${item.id}' title="Copy">+</button>
                </div>            
            </div>
            ` 
    }        
 
    makeItemNodeLayer (item, selectedId, index = 0) {
        var selected = item.id == selectedId ? 'selected' : ''; 
        var collapsed = item.gradientCollapsed ? 'collapsed' : ''; 
        return `
            <div class='tree-item ${selected}' id="${item.id}" type='layer' draggable="true">
                <div class="item-view-container">
                    <div class="item-view"  style='${this.read('/layer/toString', item, false)}'></div>
                </div>
                <div class="item-title"> 
                    ${index+1}. ${item.name || `Layer `} 
                    <button type="button" class='delete-item' item-id='${item.id}' title="Remove">&times;</button>
                </div>
                <div class='item-tools'>
                    <button type="button" class='copy-item' item-id='${item.id}' title="Copy">+</button>
                </div>                            
            </div>
            <div class="gradient-list-group ${collapsed}" >
                <div class='gradient-collapse-button' item-id="${item.id}"></div>            
                <div class="tree-item-children">
                    ${this.read('/item/map/children', item.id, (item) => {
                        return this.makeItemNodeImage(item)
                    }).join('')}
                </div>
            </div>
            `
    }    

    'load $layerList' () {
        var page = this.read('/item/current/page')

        if (!page) {
            return '';
        }

        return this.read('/item/map/children', page.id, (item, index) => {
            return this.makeItemNode(item, index); 
        })
    }

    refresh () {
        this.load()

        var image = this.read('/item/current/image');

        this.$el.toggleClass('show-mini-view', !image);
    }

    '@changeEditor' () {
        this.refresh()
    }

    'click $addLayer' (e) {
        this.read('/item/current/page', (page) => {
            this.dispatch('/item/add', 'layer', true, page.id)
            this.refresh();    
        });
    }

    'click.self $layerList .tree-item' (e) { 

        this.dispatch('/item/select', e.$delegateTarget.attr('id'));
        this.refresh();
    }

    'dragstart $layerList .tree-item' (e) {
        this.draggedLayer = e.$delegateTarget;
        this.draggedLayer.css('opacity', 0.5);
        // e.preventDefault();
    }

    'dragend $layerList .tree-item' (e) {

        if (this.draggedLayer) {
            this.draggedLayer.css('opacity', 1);        
        }
    }    

    'dragover $layerList .tree-item' (e) {
        e.preventDefault();        
    }        

    'drop.self $layerList .tree-item' (e) {
        e.preventDefault();        

        var destId = e.$delegateTarget.attr('id')
        var sourceId = this.draggedLayer.attr('id')

        var sourceItem = this.read('/item/get', sourceId);
        var destItem = this.read('/item/get', destId);

        this.draggedLayer = null;         
        if (destItem.itemType == 'layer' && sourceItem.itemType == 'image') {
            if (e.ctrlKey) {
                this.dispatch('/item/copy/in/layer', destId, sourceId)
            } else {
                this.dispatch('/item/move/in/layer', destId, sourceId)
            }

            this.refresh()            
        } else if (destItem.itemType == sourceItem.itemType ) {
            if (e.ctrlKey) {
                this.dispatch('/item/copy/in', destId, sourceId)
            } else {
                this.dispatch('/item/move/in', destId, sourceId)
            }

            this.refresh()            
        }

    }       
    
    'drop $layerList' (e) {
        e.preventDefault();        

        if (this.draggedLayer) {
            var sourceId = this.draggedLayer.attr('id')

            this.draggedLayer = null; 
            this.dispatch('/item/move/last', sourceId)
            this.refresh()
        }

    }           

    'click $layerList .copy-image-item' (e) {
        this.dispatch('/item/addCopy', e.$delegateTarget.attr('item-id'))
        this.refresh()
    }

    'click $layerList .copy-item' (e) {
        this.dispatch('/item/addCopy', e.$delegateTarget.attr('item-id'))
        this.refresh()
    }

    'click $layerList .delete-item' (e) {
        this.dispatch('/item/remove', e.$delegateTarget.attr('item-id'))
        this.refresh()
    }

    'click $viewSample' (e) {
        this.emit('toggleLayerSampleView');
    }

    'click.self $layerList .gradient-collapse-button' (e) {
        e.$delegateTarget.parent().toggleClass('collapsed')
        var item = this.read('/item/get', e.$delegateTarget.attr('item-id'))

        item.gradientCollapsed = e.$delegateTarget.parent().hasClass('collapsed');
        this.run('/item/set', item);
    }
}