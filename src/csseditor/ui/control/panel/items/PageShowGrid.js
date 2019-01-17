import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import { CHANGE_EDITOR } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";
import { SELECTION_CURRENT_PAGE } from "../../../../types/SelectionTypes";

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
        this.read(SELECTION_CURRENT_PAGE, (item) => {
            this.refs.$check.checked(this.read('tool/get', 'show.grid'));
        })        
    }

    [CLICK('$check')] () {
        this.read(SELECTION_CURRENT_PAGE, (item) => {
            this.run('tool/set', 'show.grid', this.refs.$check.checked())
            this.dispatch('tool/set', 'snap.grid', this.refs.$check.checked())
        })
    }
}