import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER_RADIUS, CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { value2px, pxUnit, unitValue } from "../../../../../util/css/types";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { defaultValue } from "../../../../../util/functions/func";
import { CHANGEINPUT } from "../../../../../util/Event";


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

    [ EVENT(
        CHANGE_LAYER_RADIUS,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    refresh() {
        this.read('selection/current/layer', (item) => {
            var maxWidth = unitValue(item.width);

            if (item.fixedRadius) {
                var borderRadius = defaultValue (item.borderRadius, pxUnit(0));
                var radius = value2px(borderRadius, maxWidth)
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
                    this.refs.$topLeftRadius.val(value2px(item.borderTopLeftRadius, maxWidth))
                    this.refs.$topLeftRadiusRange.val(value2px(item.borderTopLeftRadius, maxWidth))
                }
                if (item.borderTopRightRadius) {
                    this.refs.$topRightRadius.val(value2px(item.borderTopRightRadius, maxWidth))
                    this.refs.$topRightRadiusRange.val(value2px(item.borderTopRightRadius, maxWidth))
                }
                if (item.borderBottomLeftRadius) {
                    this.refs.$bottomLeftRadius.val(value2px(item.borderBottomLeftRadius, maxWidth))
                    this.refs.$bottomLeftRadiusRange.val(value2px(item.borderBottomLeftRadius, maxWidth))
                }
                if (item.borderBottomRightRadius) {
                    this.refs.$bottomRightRadius.val(value2px(item.borderBottomRightRadius, maxWidth))
                    this.refs.$bottomRightRadiusRange.val(value2px(item.borderBottomRightRadius, maxWidth))
                }
            }

        })
        
    }

    refreshValue () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_RADIUS, { 
                id, 
                borderTopLeftRadius: pxUnit( this.refs.$topLeftRadius.val()), 
                borderTopRightRadius: pxUnit( this.refs.$topRightRadius.val()), 
                borderBottomLeftRadius: pxUnit( this.refs.$bottomLeftRadius.val()), 
                borderBottomRightRadius: pxUnit( this.refs.$bottomRightRadius.val()), 
                fixedRadius: false 
            })
        })
    }

    [CHANGEINPUT('$topLeftRadiusRange')] () {
        this.refs.$topLeftRadius.val(this.refs.$topLeftRadiusRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$topRightRadiusRange')] () {
        this.refs.$topRightRadius.val(this.refs.$topRightRadiusRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$bottomLeftRadiusRange')] () {
        this.refs.$bottomLeftRadius.val(this.refs.$bottomLeftRadiusRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$bottomRightRadiusRange')] () {
        this.refs.$bottomRightRadius.val(this.refs.$bottomRightRadiusRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$topLeftRadius')] () {
        this.refs.$topLeftRadiusRange.val(this.refs.$topLeftRadius.val());
        this.refreshValue();
    }

    [CHANGEINPUT('$topRightRadius')] () {
        this.refs.$topRightRadiusRange.val(this.refs.$topRightRadius.val());        
        this.refreshValue();
    }

    [CHANGEINPUT('$bottomLeftRadius')] () {
        this.refs.$bottomLeftRadiusRange.val(this.refs.$bottomLeftRadius.val());        
        this.refreshValue();
    }

    [CHANGEINPUT('$bottomRightRadius')] () {
        this.refs.$bottomRightRadiusRange.val(this.refs.$bottomRightRadius.val());        
        this.refreshValue();
    }

    [EVENT('toggleRadius')] () {
        this.$el.toggleClass('show');
    }
}