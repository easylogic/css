import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR } from "../../../../types/event";
import { UNIT_PX, unitValue, pxUnit } from "../../../../../util/css/types";
import { INPUT } from "../../../../../util/Event";
import { EVENT } from "../../../../../colorpicker/UIElement";

export default class Position extends BasePropertyItem {
    template () {
        return `
            <div class='property-item position show'>
                <div class='title' ref="$title">Position</div>
                <div class='items'>            
                    <div>
                        <label>X</label>
                        <div>
                            <input type='number' ref="$x"> <span>${UNIT_PX}</span>
                        </div>
                        <label>Y</label>
                        <div>
                            <input type='number' ref="$y"> <span>${UNIT_PX}</span>
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
        this.read('selection/current/layer', (item) => {
            this.refs.$x.val(unitValue(item.x))
            this.refs.$y.val(unitValue(item.y))
        })
        
    }

    [INPUT('$x')] () {
        this.read('selection/current/layer', (item) => {
            item.x = pxUnit(this.refs.$x.int())
            this.dispatch('item/set', item)
        })
    }

    [INPUT('$y')] () {
        this.read('selection/current/layer', (item) => {
            item.y = pxUnit(this.refs.$y.int())
            this.dispatch('item/set', item)
        })
    }    
}