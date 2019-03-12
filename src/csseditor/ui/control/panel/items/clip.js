import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_ARTBOARD, CHANGE_EDITOR } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class Clip extends UIElement {
    template () {
        return `
            <div class='property-item show'>
                <div class='items'>            
                    <div>
                        <label>Clip</label>
                        <div>
                            <input type='checkbox' ref="$check">
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_ARTBOARD,
        CHANGE_EDITOR
    )] () {
        this.refresh()
    }

    refresh() {
        var artboard = editor.selection.currentArtBoard;
        if (artboard) {
            this.refs.$check.checked(artboard.clip)
        }
    }

    [CLICK('$check')] () {
        editor.selection.updateArtBoard(CHANGE_ARTBOARD, {
            clip: this.refs.$check.checked()
        })
    }
}