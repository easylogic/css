import UIElement from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_PAGE, CHANGE_PAGE, EVENT_CHANGE_EDITOR, CHANGE_PAGE_SIZE } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";

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

    [EVENT_CHANGE_PAGE] () {
        this.refresh()
    }

    [EVENT_CHANGE_EDITOR] () {
        this.refresh()
    }

    refresh() {
        this.read('selection/current/page', (item) => {
            this.refs.$check.checked(item.clip)
        })        
    }

    [CLICK('$check')] () {
        this.read('selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_SIZE, {id, clip: this.refs.$check.checked() } )
        })
    }
}