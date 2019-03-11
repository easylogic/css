import BaseProperty from "./BaseProperty";
import { EVENT } from "../../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { editor } from "../../../../../editor/editor";

export default class ColorStepProperty extends BaseProperty {

    getTitle () { return 'Color steps'; }
    getBody () {
        return `<ColorStepsInfo />`
    }

    [EVENT(
        CHANGE_SELECTION,
        CHANGE_EDITOR
    )] () {
        var isShow = this.isShow()

        this.toggle(isShow)
    }

    isShow () { 
        var image = editor.selection.backgroundImage;
        if (image) {
            var gradient = image.image;
            if (gradient.isStatic() || gradient.isImage()) {
                return false; 
            }
        }

        return true; 
    }
}