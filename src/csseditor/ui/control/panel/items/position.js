import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { CHANGE_EDITOR } from "../../../../types/event";
import { px } from "../../../../../util/css/types";
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
                            <input type='number' ref="$x"> <span>px</span>
                        </div>
                        <label>Y</label>
                        <div>
                            <input type='number' ref="$y"> <span>px</span>
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
            this.refs.$x.val(parseParamNumber(item.x))
            this.refs.$y.val(parseParamNumber(item.y))
        })
        
    }

    [INPUT('$x')] () {
        this.read('selection/current/layer', (item) => {
            item.x = px(this.refs.$x.int())
            this.dispatch('item/set', item)
        })
    }

    [INPUT('$y')] () {
        this.read('selection/current/layer', (item) => {
            item.y = px(this.refs.$y.int())
            this.dispatch('item/set', item)
        })
    }    
}