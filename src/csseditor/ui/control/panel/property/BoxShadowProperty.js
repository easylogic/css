import BaseProperty from "./BaseProperty";
import { CLICK } from "../../../../../util/Event";
import { BoxShadow } from "../../../../../editor/css-property/BoxShadow";
import { CHANGE_EDITOR } from "../../../../types/event";

export default class BoxShadowProperty extends BaseProperty {

    getTitle () { return 'Box Shadow'; }
    getTools () {
        return `<button type="button" ref="$add">+</button>`;
    }
    getBody () {
        return `<BoxShadow />`
    }

    [CLICK('$add')] (e) {
        var layer = editor.selection.layer; 
        if (layer) {
            var boxShadow = layer.addBoxShadow(new BoxShadow());
            editor.send(CHANGE_EDITOR, boxShadow);
        }
    }
}