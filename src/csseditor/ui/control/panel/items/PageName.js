import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import { CHANGE_PAGE_NAME, CHANGE_EDITOR } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";
import { SELECTION_CURRENT_PAGE, SELECTION_CURRENT_PAGE_ID } from "../../../../module/SelectionTypes";

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

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }

    refresh() {
        this.read(SELECTION_CURRENT_PAGE, (item) => {
            var name = '';
            if (item) {
                name = item.name ; 
                
            }
    
            this.refs.$name.val(name)
        });
        

    }

    [INPUT('$name')] () {
        this.read(SELECTION_CURRENT_PAGE_ID, (id) => {
            this.commit(CHANGE_PAGE_NAME, {id, name: this.refs.$name.val()});
        });
    }
}