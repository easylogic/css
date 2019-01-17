import MenuItem from "./MenuItem";
import { HISTORY_REDO } from "../../../types/HistoryTypes";

export default class Redo extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Redo';
        this.icon = 'redo';
    }

    clickButton (e) {
        this.dispatch(HISTORY_REDO)
    }
}