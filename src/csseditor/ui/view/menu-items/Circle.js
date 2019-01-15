import MenuItem from "./MenuItem";
import { ITEM_TYPE_CIRCLE } from "../../../module/ItemTypes";

export default class Circle extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || '+ Circle';
        this.icon = 'circle';
    }

    clickButton (e) {
        this.read('selection/current/page', (page) => {
            this.dispatch('item/add', ITEM_TYPE_CIRCLE, true, page.id)
            this.dispatch('history/push', 'Add a layer');
        });
    }
}