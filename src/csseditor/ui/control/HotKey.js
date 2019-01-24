import UIElement from "../../../colorpicker/UIElement";
import { KEYDOWN} from "../../../util/Event";
import { HOTKEY_EXECUTE } from "../../types/HotkeyTypes";

export default class HotKey extends UIElement {

    [KEYDOWN('document')] (e) {
        this.dispatch(HOTKEY_EXECUTE, e);
    }    

}