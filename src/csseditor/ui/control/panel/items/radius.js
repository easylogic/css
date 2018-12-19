import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { EVENT_CHANGE_LAYER_RADIUS, CHANGE_LAYER_RADIUS, EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../../../types/event";
import { px } from "../../../../../util/css/types";


export default class Radius extends BasePropertyItem {
    template () {
        return `
            <div class='property-item radius'>
                <div class='items'>         
                    <div>
                        <label >Top Left</label>
                        <div>
                            <input type='range' ref="$topLeftRadiusRange" min="0" max="500">                        
                            <input type='number' min="0" max="500" ref="$topLeftRadius"> <span>px</span>
                        </div>
                    </div>
                    <div>
                        <label>Top Right</label>
                        <div>
                            <input type='range' ref="$topRightRadiusRange" min="0" max="500">                                                
                            <input type='number' min="0" max="500" ref="$topRightRadius"> <span>px</span>
                        </div>
                    </div>          
                    <div>
                        <label>Btm Left</label>
                        <div>
                            <input type='range' ref="$bottomLeftRadiusRange" min="0" max="500">                                                
                            <input type='number' min="0" max="500" ref="$bottomLeftRadius"> <span>px</span>
                        </div>
                    </div>
                    <div>
                        <label>Btm Right</label>
                        <div>
                            <input type='range' ref="$bottomRightRadiusRange" min="0" max="500">                                                
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
                this.refs.$topLeftRadiusRange.val(radius)
                this.refs.$topRightRadiusRange.val(radius)
                this.refs.$bottomLeftRadiusRange.val(radius)
                this.refs.$bottomRightRadiusRange.val(radius)
                this.refs.$topLeftRadius.val(radius)
                this.refs.$topRightRadius.val(radius)
                this.refs.$bottomLeftRadius.val(radius)
                this.refs.$bottomRightRadius.val(radius)

            } else {
                if (item.borderTopLeftRadius) {
                    this.refs.$topLeftRadius.val(parseParamNumber(item.borderTopLeftRadius))
                    this.refs.$topLeftRadiusRange.val(parseParamNumber(item.borderTopLeftRadius))
                }
                if (item.borderTopRightRadius) {
                    this.refs.$topRightRadius.val(parseParamNumber(item.borderTopRightRadius))
                    this.refs.$topRightRadiusRange.val(parseParamNumber(item.borderTopRightRadius))
                }
                if (item.borderBottomLeftRadius) {
                    this.refs.$bottomLeftRadius.val(parseParamNumber(item.borderBottomLeftRadius))
                    this.refs.$bottomLeftRadiusRange.val(parseParamNumber(item.borderBottomLeftRadius))
                }
                if (item.borderBottomRightRadius) {
                    this.refs.$bottomRightRadius.val(parseParamNumber(item.borderBottomRightRadius))
                    this.refs.$bottomRightRadiusRange.val(parseParamNumber(item.borderBottomRightRadius))
                }
            }

        })
        
    }

    refreshValue () {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_RADIUS, { 
                id, 
                borderTopLeftRadius: px( this.refs.$topLeftRadius.val()), 
                borderTopRightRadius: px( this.refs.$topRightRadius.val()), 
                borderBottomLeftRadius: px( this.refs.$bottomLeftRadius.val()), 
                borderBottomRightRadius: px( this.refs.$bottomRightRadius.val()), 
                fixedRadius: false 
            })
        })
    }

    'input:change $topLeftRadiusRange' () {
        this.refs.$topLeftRadius.val(this.refs.$topLeftRadiusRange.val());
        this.refreshValue();        
    }

    'input:change $topRightRadiusRange' () {
        this.refs.$topRightRadius.val(this.refs.$topRightRadiusRange.val());
        this.refreshValue();        
    }

    'input:change $bottomLeftRadiusRange' () {
        this.refs.$bottomLeftRadius.val(this.refs.$bottomLeftRadiusRange.val());
        this.refreshValue();        
    }

    'input:change $bottomRightRadiusRange' () {
        this.refs.$bottomRightRadius.val(this.refs.$bottomRightRadiusRange.val());
        this.refreshValue();        
    }

    'input:change $topLeftRadius' () {
        this.refs.$topLeftRadiusRange.val(this.refs.$topLeftRadius.val());
        this.refreshValue();
    }

    'input:change $topRightRadius' () {
        this.refs.$topRightRadiusRange.val(this.refs.$topRightRadius.val());        
        this.refreshValue();
    }

    'input:change $bottomLeftRadius' () {
        this.refs.$bottomLeftRadiusRange.val(this.refs.$bottomLeftRadius.val());        
        this.refreshValue();
    }

    'input:change $bottomRightRadius' () {
        this.refs.$bottomRightRadiusRange.val(this.refs.$bottomRightRadius.val());        
        this.refreshValue();
    }

    '@toggleRadius' () {
        this.$el.toggleClass('show');
    }
}