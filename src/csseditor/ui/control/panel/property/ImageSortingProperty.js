import BaseProperty from "./BaseProperty";
import { CHANGE_SELECTION, CHANGE_EDITOR } from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { SELECTION_CURRENT_IMAGE } from "../../../../types/SelectionTypes";
import { IMAGE_TYPE_IS_STATIC, IMAGE_TYPE_IS_IMAGE } from "../../../../../util/css/make";

export default class ImageSortingProperty extends BaseProperty {

    getTitle () { return 'Image sorting'; }
    getBody () {
        return `<ImageSorting />`
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