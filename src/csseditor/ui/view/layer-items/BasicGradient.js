import UIElement from "../../../../colorpicker/UIElement";
import { CLICK } from "../../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";
import { ITEM_PREPEND_IMAGE } from "../../../types/ItemCreateTypes";

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
        this.read(SELECTION_CURRENT_LAYER, (item) => {
            var type = e.$delegateTarget.attr('data-type')

            this.dispatch(ITEM_PREPEND_IMAGE, type, true, item.id)
            this.dispatch(HISTORY_PUSH, `Add ${type} gradient` );        
        }); 
    }     

} 