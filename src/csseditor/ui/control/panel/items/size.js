import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_SIZE, 
    CHANGE_EDITOR,
    CHANGE_SELECTION
} from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { px } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";

export default class Size extends BasePropertyItem {
    template () {
        return `
            <div class='property-item size show'>
                <div class='items'>
                    <div>
                        <label><button type="button" ref="$rect">*</button>Width</label>
                        <div>
                            <div class='input two'> 
                                <input type='number' ref="$width"> <span>px</span>
                            </div>
                        </div>
                        <label class='second'>height</label>
                        <div>
                            <div class="input two">
                                <input type='number' ref="$height"> <span>px</span>
                            </div>
                        </div>                        
                    </div>   
                    <div>
                        <label>X</label>
                        <div>
                            <div class='input two'> 
                                <input type='number' ref="$x"> <span>px</span>
                            </div>
                        </div>
                        <label class='second'>Y</label>
                        <div>
                            <div class='input two'>
                                <input type='number' ref="$y"> <span>px</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER_POSITION,
        CHANGE_LAYER_SIZE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] ()  { this.refresh() }

    refresh() {
        var item = this.read('selection/current')
        if (!item) return; 
        if (!item.length) return; 

        item = item[0];
        if (this.read('selection/is/image')) return; 
        if (item.width) {
            this.refs.$width.val(parseParamNumber(item.width))
        }

        if (item.height) {
            this.refs.$height.val(parseParamNumber(item.height))
        }

        if (item.x) {
            this.refs.$x.val(parseParamNumber(item.x))
        }

        if (item.y) {
            this.refs.$y.val(parseParamNumber(item.y))
        }        
        
    }

    [CLICK('$rect')] (e) {

        this.read('selection/current/layer/id', (id) => {
            var width = px(this.refs.$width.int())
            var height = width;
            this.commit(CHANGE_LAYER_SIZE, {id, width, height});
            this.refs.$height.val(this.refs.$width.val());            
        })

    }

    [INPUT('$width')] () {
        this.read('selection/current/layer/id', (id) => {
            var width = px (this.refs.$width.int())
            this.commit(CHANGE_LAYER_SIZE, {id, width});
        })        
    }

    [INPUT('$height')] () {
        this.read('selection/current/layer/id', (id) => {
            var height = px(this.refs.$height.int())
            this.commit(CHANGE_LAYER_SIZE, {id, height});
        })        
    }    


    [INPUT('$x')] () {
        this.read('selection/current/layer/id', (id) => {
            var x = px (this.refs.$x.int())
            this.commit(CHANGE_LAYER_POSITION, {id, x});
        })
    }

    [INPUT('$y')] () {
        this.read('selection/current/layer/id', (id) => {
            var y = px (this.refs.$y.int())
            this.commit(CHANGE_LAYER_POSITION, {id, y});
        })
    }        
}