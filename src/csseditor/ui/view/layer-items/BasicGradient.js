import UIElement from "../../../../colorpicker/UIElement";
import { CLICK } from "../../../../util/Event";

export default class BasicGradient extends UIElement  {

    template () {

        return `
        <div class="gradient-sample-list">
            <h1>Basic gradient</h1>
            <div class='gradient-type' ref="$gradientType">
                <div>
                    <div class="gradient-item linear" data-type="linear" title="Linear"></div>
                    <div class="gradient-item radial" data-type="radial" title="Radial"></div>
                    <div class="gradient-item conic" data-type="conic" title="Conic"></div>                            
                    <div class="gradient-item static" data-type="static" title="Static"></div>                                                    
                </div>
                <div>
                    <div class="gradient-item repeating-linear" data-type="repeating-linear" title="Linear"></div>
                    <div class="gradient-item repeating-radial" data-type="repeating-radial" title="Radial"></div>
                    <div class="gradient-item repeating-conic" data-type="repeating-conic" title="Conic"></div>                            

                    <div class="gradient-item image" data-type="image" title="Image">
                        <div>
                            <div class="m1"></div>
                            <div class="m2"></div>
                            <div class="m3"></div> 
                        </div>
                    </div>                                                  
                </div>
            </div>
        </div>
        `  
    }

    [CLICK('$gradientType .gradient-item')] (e) {
        this.read('selection/current/layer', (item) => {
            var type = e.$delegateTarget.attr('data-type')

            this.dispatch('item/prepend/image', type, true, item.id)
            this.dispatch('history/push', `Add ${type} gradient` );        
        }); 
    }     

} 