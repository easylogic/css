import UIElement from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_EDITOR } from "../../../../types/event";

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

    '@changeTool' () {
        this.refresh()
    }

    [EVENT_CHANGE_EDITOR] () {
        this.refresh()
    }    

    refresh() {
        this.read('/selection/current/page', (item) => {
            this.refs.$check.checked(this.read('/tool/get', 'show.grid'));
        })        
    }

    'click $check' () {
        this.read('/selection/current/page', (item) => {
            this.run('/tool/set', 'show.grid', this.refs.$check.checked())
            this.dispatch('/tool/set', 'snap.grid', this.refs.$check.checked())
        })
    }
}