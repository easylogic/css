import BaseProperty from "./BaseProperty";
import { CLICK } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER_ID } from "../../../../types/SelectionTypes";
import { ITEM_TYPE_BOXSHADOW } from "../../../../types/ItemTypes";
import { HISTORY_PUSH } from "../../../../types/HistoryTypes";
import { ITEM_ADD } from "../../../../types/ItemCreateTypes";

export default class BoxShadowProperty extends BaseProperty {

    getTitle () { return 'Box Shadow'; }
    getTools () {
        return `<button type="button" ref="$add">+</button>`;
    }
    getBody () {
        return `<BoxShadow />`
    }

    [CLICK('$add')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.dispatch(ITEM_ADD, ITEM_TYPE_BOXSHADOW, false, id)
            this.dispatch(HISTORY_PUSH, `Add Box Shadow` );
        }); 
    }
}