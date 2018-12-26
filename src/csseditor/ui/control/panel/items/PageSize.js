import UIElement from "../../../../../colorpicker/UIElement";
import { parseParamNumber } from "../../../../../util/gl/filter/util";
import { CHANGE_PAGE_SIZE, EVENT_CHANGE_EDITOR } from "../../../../types/event";
import { px } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";

export default class PageSize extends UIElement {
    template () {
        return `
            <div class='property-item size show'>
                <div class='items'>
                    <div>
                        <label>   Width</label>
                        
                        <div>
                            <input type='number' ref="$width"> <span>px</span>
                            <button type="button" ref="$rect">rect</button>
                        </div>
                    </div>
                    <div>
                        <label>Height</label>
                        <div>
                            <input type='number' ref="$height"> <span>px</span>
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
            this.refs.$width.val(parseParamNumber(item.width))
            this.refs.$height.val(parseParamNumber(item.height))
        })
        
    }

    [CLICK('$rect')] (e) {

        this.read('/selection/current/page', (item) => {
            var newValue = {
                id: item.id, 
                width: px( this.refs.$width.int() )
            }

            newValue.height = newValue.width; 

            this.commit(CHANGE_PAGE_SIZE, newValue);
        })
    }

    [INPUT('$width')] () {

        this.read('/selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_SIZE, { id, width: px(this.refs.$width.int() ) });
        })
    }

    [INPUT('$height')] () {

        this.read('/selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_SIZE, { id, height: px(this.refs.$height.int()) });            
        })
    }    
}