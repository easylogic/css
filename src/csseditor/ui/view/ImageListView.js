import UIElement, { MULTI_EVENT } from '../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_IMAGE, 
    EVENT_CHANGE_IMAGE_ANGLE, 
    EVENT_CHANGE_IMAGE_COLOR, 
    EVENT_CHANGE_IMAGE_RADIAL_POSITION, 
    EVENT_CHANGE_IMAGE_RADIAL_TYPE, 
    EVENT_CHANGE_IMAGE_LINEAR_ANGLE, 
    EVENT_CHANGE_COLOR_STEP, 
    EVENT_CHANGE_SELECTION 
} from '../../types/event';

export default class ImageListView extends UIElement {

    template () {  
        return `<div class="image-list"> </div> `
    }

    makeItemNodeImage (item) {
        var selected = this.read('/selection/check', item.id) ? 'selected' : '' 
        return `
            <div class='tree-item ${selected}' data-id="${item.id}" draggable="true" title="${item.type}" >
                <div class="item-view-container">
                    <div class="item-view"  style='${this.read('/image/toString', item)}'></div>
                </div>
            </div>
            ` 
    }       

    'load $el' () {
        var id = this.read('/selection/current/layer/id');

        if (!id) {
            return '';
        }

        return this.read('/item/map/children', id, (item) => {
            return this.makeItemNodeImage(item)
        })
    }

    refresh () {
        this.load()
    }

    // individual effect
    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_IMAGE_ANGLE,
        EVENT_CHANGE_IMAGE_COLOR,
        EVENT_CHANGE_IMAGE_LINEAR_ANGLE,
        EVENT_CHANGE_IMAGE_RADIAL_POSITION,
        EVENT_CHANGE_IMAGE_RADIAL_TYPE,
        EVENT_CHANGE_COLOR_STEP,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] (newValue) { this.refresh() }

    'click $el .tree-item | self' (e) { 
        var id = e.$delegateTarget.attr('data-id')

        if (id) {
            this.dispatch('/selection/one', id);
            this.refresh();
        }

    }
 

    'dragstart $el .tree-item' (e) {
        this.draggedImage = e.$delegateTarget;
        this.draggedImage.css('opacity', 0.5);
        // e.preventDefault();
    }

    'dragend $el .tree-item' (e) {

        if (this.draggedImage) {
            this.draggedImage.css('opacity', 1);        
        }
    }    

    'dragover $el .tree-item' (e) {
        e.preventDefault();        
    }        

    'drop $el .tree-item | self' (e) {
        e.preventDefault();        

        var destId = e.$delegateTarget.attr('data-id')
        var sourceId = this.draggedImage.attr('data-id')

        this.draggedImage = null; 
        this.dispatch('/item/move/in', destId, sourceId)
        this.refresh()
    }       
    
    'drop $el' (e) {
        e.preventDefault();        

        if (this.draggedImage) {
            var sourceId = this.draggedImage.attr('data-id')

            this.draggedImage = null; 
            this.dispatch('/item/move/last', sourceId)
            this.refresh()
        }

    }           


}