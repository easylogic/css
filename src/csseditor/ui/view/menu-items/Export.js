import MenuItem from "./MenuItem";
import icon from "../../icon/icon";

export default class Export extends MenuItem {

    getIconString() { return icon.publish; }
    getTitle () { return 'Export'; }


    clickButton (e) {
        this.emit('showExport')
    }
}