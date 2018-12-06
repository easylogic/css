import UIElement from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_PAGE, CHANGE_PAGE, EVENT_CHANGE_EDITOR, CHANGE_PAGE_SIZE } from "../../../../types/event";

export default class Clip extends UIElement {
    template () {
        return `
            <div class='property-item hidden'>
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
        this.read('/selection/current/page', (item) => {
            this.refs.$check.el.checked = !!item.clip
        })        
    }

    'click $check' () {
        this.read('/selection/current/page/id', (id) => {
            console.log(id, this.refs.$check.el.checked);
            this.commit(CHANGE_PAGE_SIZE, {id, clip: this.refs.$check.el.checked} )
        })
    }
}