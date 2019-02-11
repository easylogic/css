import BaseProperty from "./BaseProperty";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { IMAGE_TYPE_IS_STATIC, IMAGE_TYPE_IS_IMAGE } from "../../../../../util/css/make";
import { SELECTION_CURRENT_IMAGE } from "../../../../types/SelectionTypes";

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
        var image = this.read(SELECTION_CURRENT_IMAGE);
        if (image) {
            if (IMAGE_TYPE_IS_STATIC(image.type) || IMAGE_TYPE_IS_IMAGE(image.type)) {
                return false; 
            }
        }

        return true; 
    }
}