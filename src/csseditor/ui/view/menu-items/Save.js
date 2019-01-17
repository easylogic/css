import MenuItem from "./MenuItem";
import { STORAGE_SAVE } from "../../../types/StorageTypes";

export default class Save extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Save';
        this.icon = 'save';
    }

    clickButton (e) {
        this.run(STORAGE_SAVE);
    }
}