import MenuItem from "./MenuItem";

export default class Export extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Export';
        this.icon = 'export';
    }

    clickButton (e) {
        this.emit('showExport')
    }
}