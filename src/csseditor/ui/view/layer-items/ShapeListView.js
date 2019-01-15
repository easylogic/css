import UIElement from "../../../../colorpicker/UIElement";
import { ITEM_TYPE_LAYER, ITEM_TYPE_CIRCLE } from "../../../module/ItemTypes";
import { CLICK } from "../../../../util/Event";


export default class ShapeListView extends UIElement {


    template () { 
        return `
            <div class='shapes'>         
                <h1>Basic Layer</h1>            
                <div class="shapes-list" ref="$shapeList">
                    <button type="button" class='add-layer rect' ref="$addLayer"></button>
                    <button type="button" class='add-layer circle' ref="$addLayerCircle"></button>
                </div>
            </div>
        `
    }



    [CLICK('$addLayer')] (e) {
        this.read('selection/current/page', (page) => {
            this.dispatch('item/add', ITEM_TYPE_LAYER, true, page.id)
            this.dispatch('history/push', 'Add a layer');
        });
    }

    [CLICK('$addLayerCircle')] (e) {
        this.read('selection/current/page', (page) => {
            this.dispatch('item/add', ITEM_TYPE_CIRCLE, true, page.id)
            this.dispatch('history/push', 'Add a layer');
        });
    }

} 