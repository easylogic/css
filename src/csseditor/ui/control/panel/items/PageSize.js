import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import { CHANGE_PAGE_SIZE, CHANGE_EDITOR } from "../../../../types/event";
import { UNIT_PX, pxUnit, unitValue } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";

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
        CHANGE_PAGE_SIZE
    )] () {
        this.refresh()
    }

    refresh() {
        this.read('selection/current/page', (item) => {
            this.refs.$width.val(unitValue(item.width))
            this.refs.$height.val(unitValue(item.height))
        })
        
    }

    [CLICK('$rect')] (e) {

        this.read('selection/current/page', (item) => {
            var newValue = {
                id: item.id, 
                width: pxUnit( this.refs.$width.int() )
            }

            newValue.height = newValue.width; 

            this.commit(CHANGE_PAGE_SIZE, newValue);
        })
    }

    [INPUT('$width')] () {

        this.read('selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_SIZE, { id, width: pxUnit(this.refs.$width.int() ) });
        })
    }

    [INPUT('$height')] () {

        this.read('selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_SIZE, { id, height: pxUnit(this.refs.$height.int()) });            
        })
    }    
}