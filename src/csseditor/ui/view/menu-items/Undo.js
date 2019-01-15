import MenuItem from "./MenuItem";

export default class Undo extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Undo';
        this.icon = 'undo';
    }

    clickButton (e) {
        this.dispatch('history/undo')
    }
}