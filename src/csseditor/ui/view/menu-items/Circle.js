import MenuItem from "./MenuItem";
import { ITEM_TYPE_CIRCLE } from "../../../types/ItemTypes";
import { ITEM_ADD_LAYER } from "../../../types/ItemCreateTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";

export default class Circle extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || '+ Circle';
        this.icon = 'circle';
    }

    clickButton (e) {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_LAYER, ITEM_TYPE_CIRCLE, true, id)
            this.dispatch(HISTORY_PUSH, 'Add a layer');
        });
    }
}