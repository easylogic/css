import UIElement from '../../../colorpicker/UIElement';
import ImageListView from './ImageListView';

export default class LayerToolbar extends UIElement {

    template () {  
        return `
            <div class='layer-toolbar'>            
                <div class="panel-toolbar">
                    <div class="button-group">
                        <button class="page-panel-button" ref="$togglePagePanel" title="Toggle Page">Page</button>
                        <button class="layer-panel-button" ref="$toggleLayerPanel" title="Toggle Layer">Layer</button>
                    </div>
                    <label>&nbsp;</label>
                    <div class="button-group">
                        <button class="dodo" ref="$undo" title="Undo">Undo</button>
                        <button class="dodo" ref="$redo" title="Redo">Redo</button>
                    </div> 
                </div>

                <label>
                    2. Add Gradient 
                </label>
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
                    <ImageListView></ImageListView>               
                </div>
               
                <div class="button-group group-align" ref="$groupAlign">
                    <button type="button" title="left" data-value="left"></button>
                    <button type="button" title="center" data-value="center"></button>
                    <button type="button" title="right" data-value="right"></button>
                    <button type="button" title="top" data-value="top"></button>
                    <button type="button" title="middle" data-value="middle"></button>
                    <button type="button" title="bottom" data-value="bottom"></button>
                    <button type="button" title="vertical" data-value="vertical"></button>
                    <button type="button" title="horizontal" data-value="horizontal"></button>
                </div>
                                
            </div>
        `
    }

    components () {
        return { ImageListView }
    }

    'click $groupAlign button' (e) {
        this.dispatch('/ordering/type', e.$delegateTarget.attr('data-value'))
    }

    'click $gradientType .gradient-item' (e) {
        this.read('/selection/current/layer', (item) => {
            var type = e.$delegateTarget.attr('data-type')

            this.dispatch('/item/prepend/image', type, true, item.id)
            this.dispatch('/history/push', `Add ${type} gradient` );        
        }); 
    }       

    'click $el .gradient-sample-list' (e) {
        this.emit('toggleGradientSampleView');
    } 

    'click $undo' (e) {
        this.dispatch('/history/undo')
    }

    'click $redo' (e) {
        this.dispatch('/history/redo')
    }    

    'click $togglePagePanel' () {
        this.emit('togglePagePanel');
    }

    'click $toggleLayerPanel' () {
        this.emit('toggleLayerPanel');
    }    
}