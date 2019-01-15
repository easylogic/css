import MenuItem from "./MenuItem";

export default class Save extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Save';
        this.icon = 'save';
    }

    clickButton (e) {
        this.run('storage/save');
    }
}