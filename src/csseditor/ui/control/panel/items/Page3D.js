import UIElement from "../../../../../colorpicker/UIElement";
import { parseParamNumber } from "../../../../../util/gl/filter/util";
import { CHANGE_PAGE_SIZE, EVENT_CHANGE_EDITOR, CHANGE_PAGE } from "../../../../types/event";
import { px } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";

export default class Page3D extends UIElement {
    template () {
        return `
            <div class='property-item size show'>
                <div class='items'>
                    <div>
                        <label> 3D </label>
                        
                        <div>
                            <label><input type='checkbox' ref="$preserve"> preserve-3d </label>
                        </div>
                    </div>                                 
                </div>
            </div>
        `
    }

    [EVENT_CHANGE_EDITOR] () {
        this.refresh()
    }

    refresh() {
        this.read('/selection/current/page', (item) => {
            this.refs.$preserve.checked(!!item.preserve)
        })
        
    }

    [CLICK('$preserve')] (e) {

        this.read('/selection/current/page/id', (id) => {
            var preserve = this.refs.$preserve.checked();

            this.commit(CHANGE_PAGE, {id, preserve});
        })
    }
}