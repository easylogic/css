import MenuItem from "./MenuItem";
import { ITEM_ADD_RECT } from "../../../types/ItemCreateTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";

export default class Rect extends MenuItem {
    getIcon() { return 'rect'; }
    getTitle () { return 'Rect'; }
    clickButton (e) {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_RECT, true, id)
            this.dispatch(HISTORY_PUSH, 'Add a layer');
        });
    }
}