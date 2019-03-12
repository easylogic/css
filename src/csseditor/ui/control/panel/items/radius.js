import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER, CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { defaultValue } from "../../../../../util/functions/func";
import { CHANGEINPUT } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";


export default class Radius extends BasePropertyItem {
    template () {
        return `
            <div class='property-item radius show'>
                <div class='items'>         
                    <div>
                        <label >Top Left</label>
                        <div>
                            <input type='range' ref="$topLeftRadiusRange" min="0" max="500">                        
                            <input type='number' class='middle' min="0" max="500" ref="$topLeftRadius"> <span>px</span>
                        </div>
                    </div>
                    <div>
                        <label>Top Right</label>
                        <div>
                            <input type='range' ref="$topRightRadiusRange" min="0" max="500">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$topRightRadius"> <span>px</span>
                        </div>
                    </div>          
                    <div>
                        <label>Btm Left</label>
                        <div>
                            <input type='range' ref="$bottomLeftRadiusRange" min="0" max="500">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$bottomLeftRadius"> <span>px</span>
                        </div>
                    </div>
                    <div>
                        <label>Btm Right</label>
                        <div>
                            <input type='range' ref="$bottomRightRadiusRange" min="0" max="500">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$bottomRightRadius"> <span>px</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [ EVENT(
        CHANGE_LAYER,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    refresh() {
        var layer = editor.selection.layer;
        if (layer) {
            var maxWidth = +(layer.width);

            if (layer.fixedRadius) {
                var borderRadius = defaultValue (layer.borderRadius, Length.px(0));
                var radius = +borderRadius.toPx(maxWidth)
                this.refs.$topLeftRadiusRange.val(radius)
                this.refs.$topRightRadiusRange.val(radius)
                this.refs.$bottomLeftRadiusRange.val(radius)
                this.refs.$bottomRightRadiusRange.val(radius)
                this.refs.$topLeftRadius.val(radius)
                this.refs.$topRightRadius.val(radius)
                this.refs.$bottomLeftRadius.val(radius)
                this.refs.$bottomRightRadius.val(radius)

            } else {
                

                if (layer.borderTopLeftRadius) {
                    var value = +layer.borderTopLeftRadius.toPx(maxWidth)
                    this.refs.$topLeftRadius.val(value)
                    this.refs.$topLeftRadiusRange.val(value)
                }
                if (layer.borderTopRightRadius) {
                    var value = layer.borderTopRightRadius.toPx(maxWidth)
                    this.refs.$topRightRadius.val(+value)
                    this.refs.$topRightRadiusRange.val(+value)
                }
                if (layer.borderBottomLeftRadius) {
                    var value = +layer.borderBottomLeftRadius.toPx(maxWidth);
                    this.refs.$bottomLeftRadius.val(value)
                    this.refs.$bottomLeftRadiusRange.val(value)
                }
                if (layer.borderBottomRightRadius) {
                    var value = +layer.borderBottomRightRadius.toPx(maxWidth)
                    this.refs.$bottomRightRadius.val(value)
                    this.refs.$bottomRightRadiusRange.val(value)
                }
            }
        }
        
    }

    refreshValue () {
        var layer = editor.selection.layer; 
        if (layer) {
            layer.reset({
                borderTopLeftRadius: Length.px( this.refs.$topLeftRadius.val()), 
                borderTopRightRadius: Length.px( this.refs.$topRightRadius.val()), 
                borderBottomLeftRadius: Length.px( this.refs.$bottomLeftRadius.val()), 
                borderBottomRightRadius: Length.px( this.refs.$bottomRightRadius.val()), 
                fixedRadius: false 
            })
            editor.send(CHANGE_LAYER, layer);
        }
    }

    [CHANGEINPUT('$topLeftRadiusRange')] () {
        this.refs.$topLeftRadius.val(this.refs.$topLeftRadiusRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$topRightRadiusRange')] () {
        this.refs.$topRightRadius.val(this.refs.$topRightRadiusRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$bottomLeftRadiusRange')] () {
        this.refs.$bottomLeftRadius.val(this.refs.$bottomLeftRadiusRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$bottomRightRadiusRange')] () {
        this.refs.$bottomRightRadius.val(this.refs.$bottomRightRadiusRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$topLeftRadius')] () {
        this.refs.$topLeftRadiusRange.val(this.refs.$topLeftRadius);
        this.refreshValue();
    }

    [CHANGEINPUT('$topRightRadius')] () {
        this.refs.$topRightRadiusRange.val(this.refs.$topRightRadius);        
        this.refreshValue();
    }

    [CHANGEINPUT('$bottomLeftRadius')] () {
        this.refs.$bottomLeftRadiusRange.val(this.refs.$bottomLeftRadius);        
        this.refreshValue();
    }

    [CHANGEINPUT('$bottomRightRadius')] () {
        this.refs.$bottomRightRadiusRange.val(this.refs.$bottomRightRadius);        
        this.refreshValue();
    }

    [EVENT('toggleRadius')] () {
        this.$el.toggleClass('show');
    }
}