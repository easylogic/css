import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";

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

    '@changeEditor' () {
        this.refresh()
    }

    refresh() {
        this.read('/item/current/layer', (item) => {
            this.refs.$x.val(parseParamNumber(item.x))
            this.refs.$y.val(parseParamNumber(item.y))
        })
        
    }

    'input $x' () {
        this.read('/item/current/layer', (item) => {
            item.x = this.refs.$x.int() + 'px'
            this.dispatch('/item/set', item)
        })
    }

    'input $y' () {
        this.read('/item/current/layer', (item) => {
            item.y = this.refs.$y.int() + 'px'
            this.dispatch('/item/set', item)
        })
    }    
}