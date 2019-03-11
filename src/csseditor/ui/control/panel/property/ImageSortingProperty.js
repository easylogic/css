import BaseProperty from "./BaseProperty";
import { CHANGE_SELECTION, CHANGE_EDITOR } from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { editor } from "../../../../../editor/editor";

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