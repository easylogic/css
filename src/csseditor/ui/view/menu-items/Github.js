import MenuItem from "./MenuItem";

export default class Github extends MenuItem {
    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = props.title || 'Github';
        this.icon = 'github';
    }

    clickButton (e) {
        window.open('https://github.com/easylogic/css', 'github-window');
    }
}