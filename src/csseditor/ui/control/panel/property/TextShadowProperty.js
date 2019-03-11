import BaseProperty from "./BaseProperty";
import { CLICK } from "../../../../../util/Event";
import { CHANGE_EDITOR } from "../../../../types/event";
import { TextShadow } from "../../../../../editor/css-property/TextShadow";

export default class TextShadowProperty extends BaseProperty {

    getTitle () { return 'Text Shadow'; }
    getTools () {
        return `<button type="button" ref="$add">+</button>`;
    }
    getBody () {
        return `<TextShadow ref="$textShadow" />`
    }

    [CLICK('$add')] (e) {
        var layer = editor.selection.layer; 
        if (layer) {
            var textShadow = layer.addTextShadow(new TextShadow())
            editor.send(CHANGE_EDITOR, textShadow)
        }
    }
}