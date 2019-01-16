import MenuItem from "./MenuItem";
import { ITEM_TYPE_LAYER } from "../../../module/ItemTypes";
import { ITEM_ADD_LAYER } from "../../../module/ItemCreateTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../../../module/SelectionTypes";
import { HISTORY_PUSH } from "../../../module/HistoryTypes";

export default class Rect extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || '+ Rect';
        this.icon = 'rect';
    }

    clickButton (e) {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_LAYER, ITEM_TYPE_LAYER, true, id)
            this.dispatch(HISTORY_PUSH, 'Add a layer');
        });
    }
}