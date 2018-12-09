import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { EVENT_CHANGE_LAYER_RADIUS, CHANGE_LAYER_RADIUS, EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../../../types/event";


export default class Radius extends BasePropertyItem {
    template () {
        return `
            <div class='property-item radius'>
                <div class='items'>         
                    <div>
                        <label style="width:80px;" >T Left</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$topLeftRadius"> <span>px</span>
                        </div>
                        <label style="width:50px;">Right</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$topRightRadius"> <span>px</span>
                        </div>
                    </div>          
                    <div>
                        <label style="width:80px;">B Left</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$bottomLeftRadius"> <span>px</span>
                        </div>
                        <label style="width:50px;">Right</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$bottomRightRadius"> <span>px</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [EVENT_CHANGE_LAYER_RADIUS] () { this.refresh(); }
    [EVENT_CHANGE_EDITOR] () { this.refresh() }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }

    refresh() {
        this.read('/selection/current/layer', (item) => {

            if (item.fixedRadius) {
                var radius = parseParamNumber(item.borderRadius || '0px')
                this.refs.$topLeftRadius.val(radius)
                this.refs.$topRightRadius.val(radius)
                this.refs.$bottomLeftRadius.val(radius)
                this.refs.$bottomRightRadius.val(radius)
            } else {
                if (item.borderTopLeftRadius) {
                    this.refs.$topLeftRadius.val(parseParamNumber(item.borderTopLeftRadius))
                }
                if (item.borderTopRightRadius) {
                    this.refs.$topRightRadius.val(parseParamNumber(item.borderTopRightRadius))
                }
                if (item.borderBottomLeftRadius) {
                    this.refs.$bottomLeftRadius.val(parseParamNumber(item.borderBottomLeftRadius))
                }
                if (item.borderBottomRightRadius) {
                    this.refs.$bottomRightRadius.val(parseParamNumber(item.borderBottomRightRadius))
                }
            }

        })
        
    }

    refreshValue () {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_RADIUS, { 
                id, 
                borderTopLeftRadius:  this.refs.$topLeftRadius.val() + 'px', 
                borderTopRightRadius:  this.refs.$topRightRadius.val() + 'px', 
                borderBottomLeftRadius:  this.refs.$bottomLeftRadius.val() + 'px', 
                borderBottomRightRadius:  this.refs.$bottomRightRadius.val() + 'px', 
                fixedRadius: false 
            })
        })
    }

    'input:change $topLeftRadius' () {
        this.refreshValue();
    }

    'input:change $topRightRadius' () {
        this.refreshValue();
    }

    'input:change $bottomLeftRadius' () {
        this.refreshValue();
    }

    'input:change $bottomRightRadius' () {
        this.refreshValue();
    }

    '@toggleRadius' () {
        this.$el.toggleClass('show');
    }
}