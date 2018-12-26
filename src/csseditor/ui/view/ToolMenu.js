import UIElement from '../../../colorpicker/UIElement';
import PageShowGrid from '../control/panel/items/PageShowGrid';
import { ITEM_TYPE_LAYER, ITEM_TYPE_CIRCLE } from '../../module/ItemTypes';
import { CLICK } from '../../../util/Event';

export default class ToolMenu extends UIElement {

    components () {
        return { PageShowGrid }
    }

    template () { 
        return `
            <div class='tool-menu'>        
                <div class="add-items">
                    <label>Layer </label>
                    <button type="button" class='add-layer rect' ref="$addLayer"></button>
                    <button type="button" class='add-layer circle' ref="$addLayerCircle"></button>
                    <button type="button" class='view-sample arrow' ref="$viewSample"></button>
                   
                </div>
                <div class="add-items">
                    <label>Gradient </label>
                    <div class='gradient-type' ref="$gradientType">
                        <div class="gradient-item linear" data-type="linear" title="Linear Gradient"></div>
                        <div class="gradient-item radial" data-type="radial" title="Radial Gradient"></div>
                        <div class="gradient-item conic" data-type="conic" title="Conic Gradient"></div>                            
                        <div class="gradient-item repeating-linear" data-type="repeating-linear" title="repeating Linear Gradient"></div>
                        <div class="gradient-item repeating-radial" data-type="repeating-radial" title="repeating Radial Gradient"></div>
                        <div class="gradient-item repeating-conic" data-type="repeating-conic" title="repeating Conic Gradient"></div>                            
                        <div class="gradient-item static" data-type="static" title="Static Color"></div>                                
                        <div class="gradient-item image" data-type="image" title="Background Image">
                            <div class="m1"></div>
                            <div class="m2"></div>
                            <div class="m3"></div> 
                        </div>                                                  
                        <div class="gradient-sample-list arrow" title="Gradient Sample View">
                        </div>     
                    </div>
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


    [CLICK('$check')] () {
        this.read('/selection/current/page', (item) => {
            this.run('/tool/set', 'show.grid', this.refs.$check.checked())
            this.dispatch('/tool/set', 'snap.grid', this.refs.$check.checked())
        })
    }

    [CLICK('$saveButton')] (e) {
        this.run('/storage/save');
    }

    [CLICK('$viewSample')] (e) {
        this.emit('togglePageSampleView');
    }    

    [CLICK('$exportButton')] (e) { 
        this.emit('showExport')
    }


    [CLICK('$addLayer')] (e) {
        this.read('/selection/current/page', (page) => {
            this.dispatch('/item/add', ITEM_TYPE_LAYER, true, page.id)
            this.dispatch('/history/push', 'Add a layer');
        });
    }

    [CLICK('$addLayerCircle')] (e) {
        this.read('/selection/current/page', (page) => {
            this.dispatch('/item/add', ITEM_TYPE_CIRCLE, true, page.id)
            this.dispatch('/history/push', 'Add a layer');
        });
    }


    [CLICK('$gradientType .gradient-item')] (e) {
        this.read('/selection/current/layer', (item) => {
            var type = e.$delegateTarget.attr('data-type')

            this.dispatch('/item/prepend/image', type, true, item.id)
            this.dispatch('/history/push', `Add ${type} gradient` );        
        }); 
    }       

    [CLICK('$el .gradient-sample-list')] (e) {
        this.emit('toggleGradientSampleView');
    } 
    

} 