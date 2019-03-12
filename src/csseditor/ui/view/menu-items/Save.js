import MenuItem from "./MenuItem";
import { STORAGE_SAVE } from "../../../types/StorageTypes";
import icon from "../../icon/icon";

export default class Save extends MenuItem {
    getIconString() { return icon.save; }
    getTitle () { return 'Save'; }

    clickButton (e) {
        this.run(STORAGE_SAVE);
    }
}