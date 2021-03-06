import BaseProperty from "./BaseProperty";
import { CLICK } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER_ID } from "../../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../../types/HistoryTypes";
import { ITEM_ADD_TEXTSHADOW } from "../../../../types/ItemCreateTypes";

export default class TextShadowProperty extends BaseProperty {

    getTitle () { return 'Text Shadow'; }
    getTools () {
        return `<button type="button" ref="$add">+</button>`;
    }
    getBody () {
        return `<TextShadow ref="$textShadow" />`
    }

    [CLICK('$add')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.dispatch(ITEM_ADD_TEXTSHADOW, false, id)
            this.dispatch(HISTORY_PUSH, `Add Text Shadow` );
        }); 
    }
}