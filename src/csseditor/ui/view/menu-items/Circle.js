import MenuItem from "./MenuItem";
import { ITEM_ADD_CIRCLE } from "../../../types/ItemCreateTypes";
import { SELECTION_CURRENT_PAGE_ID } from "../../../types/SelectionTypes";
import { HISTORY_PUSH } from "../../../types/HistoryTypes";

export default class Circle extends MenuItem {

    getIcon() { return 'circle'; }
    getTitle () { return 'Circle'; }

    clickButton (e) {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.dispatch(ITEM_ADD_CIRCLE, true, id)
            this.dispatch(HISTORY_PUSH, 'Add a layer');
        });
    }
}