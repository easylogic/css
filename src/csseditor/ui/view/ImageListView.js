import UIElement, { EVENT } from '../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE, 
    CHANGE_IMAGE_ANGLE, 
    CHANGE_IMAGE_COLOR, 
    CHANGE_IMAGE_RADIAL_POSITION, 
    CHANGE_IMAGE_RADIAL_TYPE, 
    CHANGE_IMAGE_LINEAR_ANGLE, 
    CHANGE_COLOR_STEP, 
    CHANGE_SELECTION 
} from '../../types/event';
import { CLICK, DRAGSTART, DRAGEND, DRAGOVER, DROP, SELF, LOAD } from '../../../util/Event';

export default class ImageListView extends UIElement {

    template () {  
        return `<div class="image-list"> </div> `
    }

    makeItemNodeImage (item) {
        var selected = this.read('selection/check', item.id) ? 'selected' : '' 
        return `
            <div class='tree-item ${selected}' data-id="${item.id}" draggable="true" title="${item.type}" >
                <div class="item-view-container">
                    <div class="item-view"  style='${this.read('image/toString', item)}'></div>
                </div>
            </div>
            ` 
    }       

    [LOAD()] () {
        var id = this.read('selection/current/layer/id');

        if (!id) {
            return '';
        }

        return this.read('item/map/image/children', id, (item) => {
            return this.makeItemNodeImage(item)
        })
    }

    refresh () {
        this.load()
    }

    // individual effect
    [EVENT(
        CHANGE_IMAGE,
        CHANGE_IMAGE_ANGLE,
        CHANGE_IMAGE_COLOR,
        CHANGE_IMAGE_LINEAR_ANGLE,
        CHANGE_IMAGE_RADIAL_POSITION,
        CHANGE_IMAGE_RADIAL_TYPE,
        CHANGE_COLOR_STEP,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] (newValue) { this.refresh() }

    [CLICK('$el .tree-item') + SELF] (e) { 
        var id = e.$delegateTarget.attr('data-id')

        if (id) {
            this.dispatch('selection/one', id);
            this.refresh();
        }

    }
 

    [DRAGSTART('$el .tree-item')] (e) {
        this.draggedImage = e.$delegateTarget;
        this.draggedImage.css('opacity', 0.5);
        // e.preventDefault();
    }

    [DRAGEND('$el .tree-item')] (e) {

        if (this.draggedImage) {
            this.draggedImage.css('opacity', 1);        
        }
    }    

    [DRAGOVER('$el .tree-item')] (e) {
        e.preventDefault();        
    }        

    [DROP('$el .tree-item') + SELF] (e) {
        e.preventDefault();        

        var destId = e.$delegateTarget.attr('data-id')
        var sourceId = this.draggedImage.attr('data-id')

        this.draggedImage = null; 
        this.dispatch('item/move/in', destId, sourceId)
        this.refresh()
    }       
    
    [DROP()] (e) {
        e.preventDefault();        

        if (this.draggedImage) {
            var sourceId = this.draggedImage.attr('data-id')

            this.draggedImage = null; 
            this.dispatch('item/move/last', sourceId)
            this.refresh()
        }

    }           


}