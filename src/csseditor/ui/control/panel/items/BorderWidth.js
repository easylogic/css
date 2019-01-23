import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER_RADIUS, CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_BORDER } from "../../../../types/event";
import { value2px, pxUnit, unitValue, UNIT_PX } from "../../../../../util/css/types";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { defaultValue } from "../../../../../util/functions/func";
import { CHANGEINPUT } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";


export default class BorderWidth extends BasePropertyItem {
    template () {
        return `
            <div class='property-item border'>
                <div class='items'>         
                    <div>
                        <label >Top</label>
                        <div>
                            <input type='range' ref="$topWidthRange" min="0" max="500">                        
                            <input type='number' class='middle' min="0" max="500" ref="$topWidth"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Right</label>
                        <div>
                            <input type='range' ref="$rightWidthRange" min="0" max="500">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$rightWidth"> <span>${UNIT_PX}</span>
                        </div>
                    </div>          
                    <div>
                        <label>Bottom</label>
                        <div>
                            <input type='range' ref="$bottomWidthRange" min="0" max="500">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$bottomWidth"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Left</label>
                        <div>
                            <input type='range' ref="$leftWidthRange" min="0" max="500">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$leftWidth"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [ EVENT(
        CHANGE_LAYER_BORDER,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    refresh() {
        this.read(SELECTION_CURRENT_LAYER, (item) => {
            var maxWidth = unitValue(item.width);

            if (item.fixedBorderWidth) {
                var borderWidth = defaultValue (item.borderWidth, pxUnit(0));
                var border = value2px(borderWidth, maxWidth)
                this.refs.$topWidthRange.val(border)
                this.refs.$rightWidthRange.val(border)
                this.refs.$leftWidthRange.val(border)                
                this.refs.$bottomWidthRange.val(border)
                this.refs.$topWidth.val(border)
                this.refs.$rightWidth.val(border)
                this.refs.$leftWidth.val(border)
                this.refs.$bottomWidth.val(border)

            } else {
                if (item.borderTopWidth) {
                    this.refs.$topWidth.val(value2px(item.borderTopWidth, maxWidth))
                    this.refs.$topWidthRange.val(value2px(item.borderTopWidth, maxWidth))
                }
                if (item.borderRightWidth) {
                    this.refs.$rightWidth.val(value2px(item.borderRightWidth, maxWidth))
                    this.refs.$rightWidthRange.val(value2px(item.borderRightWidth, maxWidth))
                }
                if (item.borderLeftWidth) {
                    this.refs.$leftWidth.val(value2px(item.borderLeftWidth, maxWidth))
                    this.refs.$leftWidthRange.val(value2px(item.borderLeftWidth, maxWidth))
                }
                if (item.borderBottomWidth) {
                    this.refs.$bottomWidth.val(value2px(item.borderBottomWidth, maxWidth))
                    this.refs.$bottomWidthRange.val(value2px(item.borderBottomWidth, maxWidth))
                }
            }

        })
        
    }

    refreshValue () {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_BORDER, { 
                id, 
                borderTopWidth: pxUnit( this.refs.$topWidth.val()), 
                borderRightWidth: pxUnit( this.refs.$rightWidth.val()), 
                borderLeftWidth: pxUnit( this.refs.$leftWidth.val()), 
                borderBottomWidth: pxUnit( this.refs.$bottomWidth.val()), 
                fixedBorderWidth: false 
            })
        })
    }

    [CHANGEINPUT('$topWidthRange')] () {
        this.refs.$topWidth.val(this.refs.$topWidthRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$rightWidthRange')] () {
        this.refs.$rightWidth.val(this.refs.$rightWidthRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$leftWidthRange')] () {  
        this.refs.$leftWidth.val(this.refs.$leftWidthRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$bottomWidthRange')] () {
        this.refs.$bottomWidth.val(this.refs.$bottomWidthRange.val());
        this.refreshValue();        
    }

    [CHANGEINPUT('$topWidth')] () {
        this.refs.$topWidthRange.val(this.refs.$topWidth.val());
        this.refreshValue();
    }

    [CHANGEINPUT('$rightWidth')] () {
        this.refs.$rightWidthRange.val(this.refs.$rightWidth.val());        
        this.refreshValue();
    }

    [CHANGEINPUT('$leftWidth')] () {
        this.refs.$leftWidthRange.val(this.refs.$leftWidth.val());        
        this.refreshValue();
    }

    [CHANGEINPUT('$bottomWidth')] () {
        this.refs.$bottomWidthRange.val(this.refs.$bottomWidth.val());        
        this.refreshValue();
    }

    [EVENT('toggleBorderWidth')] () {
        this.$el.toggleClass('show');
    }
}