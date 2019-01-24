import MenuItem from "./MenuItem";
import { HISTORY_REDO } from "../../../types/HistoryTypes";

export default class Redo extends MenuItem {
    getIcon() { return 'redo'; }
    getTitle () { return 'Redo'; }

    clickButton (e) {
        this.dispatch(HISTORY_REDO)
    }
}