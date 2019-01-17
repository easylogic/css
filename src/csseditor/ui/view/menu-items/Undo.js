import MenuItem from "./MenuItem";
import { HISTORY_UNDO } from "../../../types/HistoryTypes";

export default class Undo extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Undo';
        this.icon = 'undo';
    }

    clickButton (e) {
        this.dispatch(HISTORY_UNDO)
    }
}