import MenuItem from "./MenuItem";

export default class Redo extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Redo';
        this.icon = 'redo';
    }

    clickButton (e) {
        this.dispatch('history/redo')
    }
}