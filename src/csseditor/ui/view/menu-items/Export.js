import MenuItem from "./MenuItem";

export default class Export extends MenuItem {

    getIcon() { return 'export'; }
    getTitle () { return 'Export'; }


    clickButton (e) {
        this.emit('showExport')
    }
}