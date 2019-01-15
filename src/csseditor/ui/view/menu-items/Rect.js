import MenuItem from "./MenuItem";
import { ITEM_TYPE_LAYER } from "../../../module/ItemTypes";

export default class Rect extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || '+ Rect';
        this.icon = 'rect';
    }

    clickButton (e) {
        this.read('selection/current/page', (page) => {
            this.dispatch('item/add', ITEM_TYPE_LAYER, true, page.id)
            this.dispatch('history/push', 'Add a layer');
        });
    }
}