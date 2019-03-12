import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_ARTBOARD, CHANGE_EDITOR } from "../../../../types/event";
import { UNIT_PX } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class PageSize extends UIElement {
    template () {
        return `
            <div class='property-item size show'>
                <div class='items'>
                    <div>
                        <label>   Width</label>
                        <div>
                            <input type='number' ref="$width"> <span>${UNIT_PX}</span>
                            <button type="button" ref="$rect">rect</button>
                        </div>
                    </div>
                    <div>
                        <label>Height</label>
                        <div>
                            <input type='number' ref="$height"> <span>${UNIT_PX}</span>
                        </div>
                    </div>             
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_ARTBOARD
    )] () {
        this.refresh()
    }

    refresh() {
        var artboard = editor.selection.currentArtBoard;
        if (artboard) {                    
            this.refs.$width.val(+(artboard.width))
            this.refs.$height.val(+(artboard.height))
        }
        
    }

    [CLICK('$rect')] (e) {
        var artboard = editor.selection.currentArtBoard;
        if (artboard) {
            artboard.reset({
                width: Length.px( this.refs.$width.int() ),
                height: Length.px( this.refs.$width.int() )
            });
            editor.send(CHANGE_ARTBOARD, artboard)
        }
    }
 
    [INPUT('$width')] () {
        var artboard = editor.selection.currentArtBoard;
        if (artboard) {
            artboard.width = Length.px(this.refs.$width.int())
            editor.send(CHANGE_ARTBOARD, artboard);
        }
    }

    [INPUT('$height')] () {
        var artboard = editor.selection.currentArtBoard;
        if (artboard) {
            artboard.height = Length.px(this.refs.$height.int())
            editor.send(CHANGE_ARTBOARD, artboard);
        }
    }    
}