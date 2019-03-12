import MenuItem from "./MenuItem";
import icon from "../../icon/icon";

export default class Redo extends MenuItem {
    getIconString() {
        return icon.redo
    }
    getTitle () { return 'Redo'; }

    clickButton (e) {

    }
}