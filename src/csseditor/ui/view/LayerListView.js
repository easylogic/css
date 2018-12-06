import UIElement from '../../../colorpicker/UIElement';
import MiniLayerView from './MiniLayerView';
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_LAYER_BACKGROUND_COLOR, 
    EVENT_CHANGE_LAYER_CLIPPATH, 
    EVENT_CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_LAYER_RADIUS, 
    EVENT_CHANGE_LAYER_SIZE, 
    EVENT_CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_LAYER_FILTER, 
    EVENT_CHANGE_LAYER_TRANSFORM_3D,
    EVENT_CHANGE_IMAGE,
    EVENT_CHANGE_IMAGE_ANGLE,
    EVENT_CHANGE_IMAGE_LINEAR_ANGLE,
    EVENT_CHANGE_IMAGE_RADIAL_POSITION,
    EVENT_CHANGE_IMAGE_RADIAL_TYPE,
    EVENT_CHANGE_IMAGE_COLOR,
    EVENT_CHANGE_COLOR_STEP,
    EVENT_CHANGE_SELECTION,
} from '../../types/event';

export default class LayerListView extends UIElement {

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

        if (item.itemType == 'layer') {
            return this.makeItemNodeLayer(item, index);
        }

    }

   
    makeItemNodeImage (item) {
        var selected = this.read('/selection/check', item.id) ? 'selected' : ''; 
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
 
    
    makeItemNodeLayer (item, index = 0) {
        var selected = this.read('/selection/check', item.id) ? 'selected' : ''; 
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
                    ${this.read('/item/map/image/children', item.id, (item) => {
                        return this.makeItemNodeImage(item)
                    }).join('')}
                </div>
            </div>       
            `
    }    

    'load $layerList' () {
        var page = this.read('/selection/current/page')

        if (!page) {
            return '';
        }

        return this.read('/item/map/children', page.id, (item, index) => {
            return this.makeItemNode(item, index); 
        }).reverse();
    }

    refreshSelection() {

    }

    refresh () {
        this.load()

        var image = this.read('/selection/current/image');

        this.$el.toggleClass('show-mini-view', !image);

        this.$el.$(".selected").el.scrollIntoView();
    }

    refreshLayer () {
        this.read('/selection/current/layer', (item) => {
            this.$el.$(`[id="${item.id}"] .item-view`).cssText(this.read('/layer/toString', item, false))
        })
    }

    refreshImage() {
        this.read('/selection/current/image', (item) => {
            this.$el.$(`[id="${item.id}"] .item-view`).cssText(this.read('/image/toString', item))
        })
    }

    // indivisual effect 
    [EVENT_CHANGE_LAYER] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_BACKGROUND_COLOR] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_CLIPPATH] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_FILTER] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_POSITION] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_RADIUS] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_SIZE] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_TRANSFORM] () { this.refreshLayer() }
    [EVENT_CHANGE_LAYER_TRANSFORM_3D] () { this.refreshLayer() }

    [EVENT_CHANGE_COLOR_STEP] (newValue) { this.refreshLayer(); this.refreshImage() }
    [EVENT_CHANGE_IMAGE] () { this.refreshLayer(); this.refreshImage() }
    [EVENT_CHANGE_IMAGE_ANGLE] () { this.refreshLayer(); this.refreshImage() }
    [EVENT_CHANGE_IMAGE_COLOR] () { this.refreshLayer(); this.refreshImage() }
    [EVENT_CHANGE_IMAGE_LINEAR_ANGLE] () { this.refreshLayer(); this.refreshImage() }
    [EVENT_CHANGE_IMAGE_RADIAL_POSITION] () { this.refreshLayer(); this.refreshImage() }
    [EVENT_CHANGE_IMAGE_RADIAL_TYPE] () { this.refreshLayer(); this.refreshImage() }

    // all effect 
    [EVENT_CHANGE_EDITOR] () { this.refresh() }
    [EVENT_CHANGE_SELECTION] () { this.refresh(); }

    'click $addLayer' (e) {
        this.read('/selection/current/page', (page) => {
            this.dispatch('/item/add', 'layer', true, page.id)
            this.dispatch('/history/push', 'Add a layer');
            this.refresh();    
        });
    }

    'click $layerList .tree-item | self' (e) { 
        this.dispatch('/selection/one', e.$delegateTarget.attr('id'));        
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

    'drop $layerList .tree-item | self' (e) {
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

            this.dispatch('/history/push', `Change gradient position `);         
            this.refresh()            
        } else if (destItem.itemType == sourceItem.itemType ) {
            if (e.ctrlKey) {
                this.dispatch('/item/copy/in', destId, sourceId)
            } else {
                this.dispatch('/item/move/in', destId, sourceId)
            }
            this.dispatch('/history/push', `Change item position `);         
            this.refresh()            
        }

    }       
    
    'drop $layerList' (e) {
        e.preventDefault();        

        if (this.draggedLayer) {
            var sourceId = this.draggedLayer.attr('id')

            this.draggedLayer = null; 
            this.dispatch('/item/move/last', sourceId)
            this.dispatch('/history/push', `Change layer position `);                     
            this.refresh()
        }

    }           

    'click $layerList .copy-image-item' (e) {
        this.dispatch('/item/addCopy', e.$delegateTarget.attr('item-id'))
        this.dispatch('/history/push', `Add a gradient`);                 
        this.refresh()
    }

    'click $layerList .copy-item' (e) {
        this.dispatch('/item/addCopy', e.$delegateTarget.attr('item-id'))
        this.dispatch('/history/push', `Copy a layer`);                         
        this.refresh()
    }

    'click $layerList .delete-item' (e) {
        this.dispatch('/item/remove', e.$delegateTarget.attr('item-id'))
        this.dispatch('/history/push', `Remove item`);                         
        this.refresh()
    } 

    'click $viewSample' (e) {
        this.emit('toggleLayerSampleView');
    }

    'click $layerList .gradient-collapse-button | self' (e) {
        e.$delegateTarget.parent().toggleClass('collapsed')
        var item = this.read('/item/get', e.$delegateTarget.attr('item-id'))

        item.gradientCollapsed = e.$delegateTarget.parent().hasClass('collapsed');
        this.run('/item/set', item);
    }
}