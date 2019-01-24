import MenuItem from "./MenuItem";
import { HISTORY_UNDO } from "../../../types/HistoryTypes";

export default class Undo extends MenuItem {
    getIcon() { return 'undo'; }
    getTitle () { return 'Undo'; }


    clickButton (e) {
        this.dispatch(HISTORY_UNDO)
    }
}