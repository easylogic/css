import UIElement from "../../../../../colorpicker/UIElement";
import { CHANGE_PAGE_NAME, EVENT_CHANGE_EDITOR } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";

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

    [EVENT_CHANGE_EDITOR] () {
        this.refresh()
    }

    refresh() {
        this.read('/selection/current/page', (item) => {
            var name = '';
            if (item) {
                name = item.name ; 
                
            }
    
            this.refs.$name.val(name)
        });
        

    }

    [INPUT('$name')] () {
        this.read('/selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_NAME, {id, name: this.refs.$name.val()});
        });
    }
}