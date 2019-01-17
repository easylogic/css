import UIElement from "../../../../colorpicker/UIElement";
import { ITEM_TYPE_LAYER, ITEM_TYPE_CIRCLE } from "../../../types/ItemTypes";
import { CLICK } from "../../../../util/Event";
import { ITEM_ADD_LAYER } from "../../../types/ItemCreateTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";


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
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_LAYER, ITEM_TYPE_LAYER, true, id)
            this.dispatch(HISTORY_PUSH, 'Add a layer');
        });
    }

    [CLICK('$addLayerCircle')] (e) {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_LAYER, ITEM_TYPE_CIRCLE, true, id)
            this.dispatch(HISTORY_PUSH, 'Add a layer');
        });
    }

} 