import UIElement from '../../../colorpicker/UIElement';
import PageShowGrid from '../control/panel/items/PageShowGrid';
import { ITEM_TYPE_LAYER, ITEM_TYPE_CIRCLE } from '../../module/ItemTypes';

export default class ToolMenu extends UIElement {

    components () {
        return { PageShowGrid }
    }

    template () { 
        return `
            <div class='tool-menu'>        
                <div class="add-items">
                    1. Add Layer 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;
                    <button type="button" class='add-layer rect' ref="$addLayer"></button>
                    <button type="button" class='add-layer circle' ref="$addLayerCircle"></button>
                    <button type="button" class='view-sample arrow' ref="$viewSample"></button>
                   
                </div>
                <div class='items'>
                    <label>Show Grid <input type='checkbox' ref="$check"></label>                
                    <button type="button" ref="$exportButton">Export</button>                
                    <button type="button" ref="$saveButton">Save</button>
                    <a class="button" href="https://github.com/easylogic/css" target="_github_">Github</a>
                </div>
            </div>
        `
    }



    'click $check' () {
        this.read('/selection/current/page', (item) => {
            this.dispatch('/tool/set', 'show.grid', this.refs.$check.el.checked)
        })
    }

    'click $saveButton' (e) {
        this.run('/storage/save');
    }

    'click $viewSample' (e) {
        this.emit('togglePageSampleView');
    }    

    'click $exportButton' (e) { 
        this.emit('showExport')
    }


    'click $addLayer' (e) {
        this.read('/selection/current/page', (page) => {
            this.dispatch('/item/add', ITEM_TYPE_LAYER, true, page.id)
            this.dispatch('/history/push', 'Add a layer');
        });
    }

    'click $addLayerCircle' (e) {
        this.read('/selection/current/page', (page) => {
            this.dispatch('/item/add', ITEM_TYPE_CIRCLE, true, page.id)
            this.dispatch('/history/push', 'Add a layer');
        });
    }
    

} 