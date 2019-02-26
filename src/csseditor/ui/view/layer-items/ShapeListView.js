import UIElement from "../../../../util/UIElement";
import { CLICK } from "../../../../util/Event";
import { SELECTION_CURRENT_PAGE_ID } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";
import { SHAPE_LIST, SHAPE_GET, SHAPE_TO_CSS_TEXT } from "../../../types/ShapeTypes";
import { ITEM_ADD_SHAPE } from "../../../types/ItemCreateTypes";
import { html } from "../../../../util/functions/func";


export default class ShapeListView extends UIElement {


    template () { 
        return html`
            <div class='shapes'>         
                <div class='layer-title'>Basic Layer</div>
                <div class="shapes-list" ref="$shapeList">
                    ${this.read(SHAPE_LIST).map(key => {
                        return `<button type="button" class='add-layer' data-shape='${key}'>
                            <div class='shape' style='${this.read(SHAPE_TO_CSS_TEXT, key)}'></div>
                        </button>`
                    })}
                </div>
            </div>
        `
    }

    [CLICK('$shapeList .add-layer')] (e) {
        var $button = e.$delegateTarget;
        var key = $button.attr('data-shape');

        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_SHAPE, this.read(SHAPE_GET, key), true, id)
            this.dispatch(HISTORY_PUSH, 'Add a shape');
        });
    }

} 