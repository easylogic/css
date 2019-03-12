import MenuItem from "./MenuItem";
import icon from "../../icon/icon";

export default class Undo extends MenuItem {
    getIconString() {
        return icon.undo
    }
    getTitle () { return 'Undo'; }


    clickButton (e) {
    }
}