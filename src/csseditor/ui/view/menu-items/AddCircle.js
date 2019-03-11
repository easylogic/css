import MenuItem from "./MenuItem";
import { editor } from "../../../../editor/editor";
import { Circle } from "../../../../editor/shape/Circle";

export default class AddCircle extends MenuItem {

    getIcon() { return 'circle'; }
    getTitle () { return 'Circle'; }

    clickButton (e) {
        editor.selection.add(new Circle()) 
    }
} 