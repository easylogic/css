import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import { CHANGE_PAGE, CHANGE_EDITOR, CHANGE_PAGE_SIZE } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";
import { SELECTION_CURRENT_PAGE, SELECTION_CURRENT_PAGE_ID } from "../../../../types/SelectionTypes";

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
        CHANGE_PAGE,
        CHANGE_EDITOR
    )] () {
        this.refresh()
    }

    refresh() {
        this.read(SELECTION_CURRENT_PAGE, (item) => {
            this.refs.$check.checked(item.clip)
        })        
    }

    [CLICK('$check')] () {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.commit(CHANGE_PAGE_SIZE, {id, clip: this.refs.$check.checked() } )
        })
    }
}