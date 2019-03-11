import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_TOOL } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class PageShowGrid extends UIElement {
    template () {
        return `
            <div class='property-item hidden'>
                <div class='items'>            
                    <div>
                        <label>Show Grid</label>
                        <div>
                            <input type='checkbox' ref="$check">
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [EVENT('changeTool')] () {
        this.refresh()
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }    

    refresh() {
        this.refs.$check.checked(editor.config.get('show.grid'));   
    }

    [CLICK('$check')] () {

        editor.config.set('show.grid', this.refs.$check.checked())
        editor.config.set('snap.grid', this.refs.$check.checked())

        editor.send(CHANGE_TOOL);
    }
}