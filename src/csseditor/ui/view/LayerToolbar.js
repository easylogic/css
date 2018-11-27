import UIElement from '../../../colorpicker/UIElement';

export default class LayerToolbar extends UIElement {

    template () {  
        return `
            <div class='layer-toolbar'>
                <label>Gradients</label>
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
                </div>
                <div class="gradient-sample-list" title="Gradient Sample View">
                    <div class="arrow">
                    </div> 
                </div>
                <label>Steps</label>
                <div class="button-group">
                    <button class="distance" ref="$ordering" title="Full Ordering">=|=</button>
                    <button class="distance" ref="$orderingLeft" title="Left Ordering">=|</button>
                    <button class="distance" ref="$orderingRight" title="Right Ordering">|=</button>
                </div>

                <div class="button-group">
                    <button class="cut" ref="$cutOff" title="Cut Off"></button>
                    <button class="cut on" ref="$cutOn" title="Cut On"></button>
                </div>                
            </div>
        `
    }

    refresh () {
        
    }

    '@changeEditor' () {
        this.refresh()
    }

    'click $gradientType .gradient-item' (e) {
        this.read('/item/current/layer', (item) => {

            var type = e.$delegateTarget.attr('data-type')

            this.dispatch('/item/prepend/image', type, true, item.id)
            this.refresh()
        }); 
    }       

    'click $el .gradient-sample-list' (e) {
        this.emit('toggleGradientSampleView');
    }

    'click $ordering' (e) {
        this.dispatch('/colorstep/ordering/equals')
    } 

    'click $orderingLeft' (e) {
        this.dispatch('/colorstep/ordering/equals/left')
    }    

    'click $orderingRight' (e) {
        this.dispatch('/colorstep/ordering/equals/right')
    }        

    'click $cutOff' (e) {
        this.dispatch('/colorstep/cut/off')
    }

    'click $cutOn' (e) {
        this.dispatch('/colorstep/cut/on')
    }    
}