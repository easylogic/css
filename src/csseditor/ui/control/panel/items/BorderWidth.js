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
                            <input type='range' ref="$topWidthRange" min="0" max="500" value="0">                        
                            <input type='number' class='middle' min="0" max="500" ref="$topWidth" value="0"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Right</label>
                        <div>
                            <input type='range' ref="$rightWidthRange" min="0" max="500" value="0">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$rightWidth" value="0"> <span>${UNIT_PX}</span>
                        </div>
                    </div>          
                    <div>
                        <label>Bottom</label>
                        <div>
                            <input type='range' ref="$bottomWidthRange" min="0" max="500" value="0">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$bottomWidth" value="0"> <span>${UNIT_PX}</span>
                        </div>
                    </div>
                    <div>
                        <label>Left</label>
                        <div>
                            <input type='range' ref="$leftWidthRange" min="0" max="500" value="0">                                                
                            <input type='number' class='middle' min="0" max="500" ref="$leftWidth" value="0"> <span>${UNIT_PX}</span>
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

            if (item.fixedBorderWidth) {
                var borderWidth = defaultValue (item.borderWidth, pxUnit(0));
                var border = unitValue(borderWidth);

                this.refs.$topWidthRange.val(border)
                this.refs.$rightWidthRange.val(border)
                this.refs.$leftWidthRange.val(border)                
                this.refs.$bottomWidthRange.val(border)
                this.refs.$topWidth.val(border)
                this.refs.$rightWidth.val(border)
                this.refs.$leftWidth.val(border)
                this.refs.$bottomWidth.val(border)

            } else {

                var value = defaultValue(item.borderTopWidth, pxUnit(0));

                this.refs.$topWidth.val(unitValue(value))
                this.refs.$topWidthRange.val(unitValue(value))

                var value = defaultValue(item.borderRightWidth, pxUnit(0));                
                this.refs.$rightWidth.val(unitValue(value))
                this.refs.$rightWidthRange.val(unitValue(value))

                var value = defaultValue(item.borderLeftWidth, pxUnit(0));
                this.refs.$leftWidth.val(unitValue(value))
                this.refs.$leftWidthRange.val(unitValue(value))

                var value = defaultValue(item.borderBottomWidth, pxUnit(0));
                this.refs.$bottomWidth.val(unitValue(value))
                this.refs.$bottomWidthRange.val(unitValue(value))
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
        this.refs.$topWidth.val(this.refs.$topWidthRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$rightWidthRange')] () {
        this.refs.$rightWidth.val(this.refs.$rightWidthRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$leftWidthRange')] () {  
        this.refs.$leftWidth.val(this.refs.$leftWidthRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$bottomWidthRange')] () {
        this.refs.$bottomWidth.val(this.refs.$bottomWidthRange);
        this.refreshValue();        
    }

    [CHANGEINPUT('$topWidth')] () {
        this.refs.$topWidthRange.val(this.refs.$topWidth);
        this.refreshValue();
    }

    [CHANGEINPUT('$rightWidth')] () {
        this.refs.$rightWidthRange.val(this.refs.$rightWidth);        
        this.refreshValue();
    }

    [CHANGEINPUT('$leftWidth')] () {
        this.refs.$leftWidthRange.val(this.refs.$leftWidth);        
        this.refreshValue();
    }

    [CHANGEINPUT('$bottomWidth')] () {
        this.refs.$bottomWidthRange.val(this.refs.$bottomWidth);        
        this.refreshValue();
    }

    [EVENT('toggleBorderWidth')] () {
        this.$el.toggleClass('show');
    }
}