import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_ARTBOARD, CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class PageName extends UIElement {
    template () {
        return `
            <div class='property-item name show'>
                <div class='items'>            
                    <div>
                        <label>Name</label>
                        <div>
                            <input type='text' ref="$name" style="width: 100px;"> 
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_ARTBOARD,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    refresh() {
        var artboard = editor.selection.currentArtBoard;
        if (artboard) {
            this.refs.$name.val(artboard.name)
        }
    }

    [INPUT('$name')] () {
        editor.selection.updateArtBoard(CHANGE_ARTBOARD, {
            name: this.refs.$name.val()
        })
    }
}