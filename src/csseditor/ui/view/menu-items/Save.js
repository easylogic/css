import MenuItem from "./MenuItem";
import { STORAGE_SAVE } from "../../../types/StorageTypes";

export default class Save extends MenuItem {
    getIcon() { return 'save'; }
    getTitle () { return 'Save'; }

    clickButton (e) {
        this.run(STORAGE_SAVE);
    }
}