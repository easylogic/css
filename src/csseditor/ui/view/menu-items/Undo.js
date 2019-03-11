import MenuItem from "./MenuItem";

export default class Undo extends MenuItem {
    getIcon() { return 'undo'; }
    getTitle () { return 'Undo'; }


    clickButton (e) {
    }
}