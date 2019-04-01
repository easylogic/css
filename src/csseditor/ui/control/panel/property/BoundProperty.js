import BaseProperty from "./BaseProperty";
import { EVENT } from "../../../../../util/UIElement";
import { CHANGE_RECT, CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_INSPECTOR } from "../../../../types/event";
import { INPUT, CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";
import { Layer } from "../../../../../editor/items/Layer";
import {ArtBoard} from '../../../../../editor/items/ArtBoard';
import { Display } from "../../../../../editor/css-property/Display";

export default class BoundProperty extends BaseProperty {

    getBody () {
        return `
            <div class='property-item display-manager'>
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
                <div class='items display-list' ref='$displayList' selected-type='inline'>
                    <div class='display' display-type='block'>BLOCK</div>
                    <div class='display' display-type='flex'>FLEX</div>
                    <div class='display' display-type='grid'>GRID</div>
                </div>
                <div class='items flex-list' ref='$flexList' selected-type='row'>
                    <div class='display' display-type='row'>row</div>
                    <div class='display' display-type='row-reverse'>row-reverse</div>
                    <div class='display' display-type='column'>column</div>
                    <div class='display' display-type='column-reverse'>column-reverse</div>
                </div>                
                <div class='items flex-wrap' ref='$flexWrap' selected-type='row'>
                    <div class='display' display-type='nowrap'>nowrap</div>
                    <div class='display' display-type='wrap'>wrap</div>
                    <div class='display' display-type='wrap-reverse'>wrap-reverse</div>
                </div>                             
                <div class='items justify-content' ref='$justifyContent' selected-type='flex-start'>
                    <div class='display' display-type='flex-start'>flex-start</div>
                    <div class='display' display-type='flex-end'>flex-end</div>
                    <div class='display' display-type='center'>center</div>
                    <div class='display' display-type='space-between'>space-between</div>
                    <div class='display' display-type='space-around'>space-around</div>
                </div>                                                
            </div> 
        `
    }


    [EVENT(
        CHANGE_RECT,
        CHANGE_LAYER,
        CHANGE_ARTBOARD,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] ()  { this.refresh() }

    refresh() {
        var item = editor.selection.currentRect;
        if (!item) return; 

        this.refs.$width.val(item.width.value)
        this.refs.$height.val(item.height.value)
        this.refs.$x.val(item.x.value)
        this.refs.$y.val(item.y.value)

        if (item.display) {
            this.refs.$displayList.attr('selected-type', item.display.type);

            if (item.display.type == 'flex') {
                this.refs.$flexList.attr('selected-type', item.display.direction);
                this.refs.$justifyContent.attr('selected-type', item.display.justifyContent);
            }
        }

    }

    [CLICK('$justifyContent .display')] (e) {
        var display = e.$delegateTarget.attr('display-type')
        var current = editor.selection.current;

        if (current) {
            this.refs.$justifyContent.attr('selected-type', display);
            current.display.justifyContent = display;
 
            this.emit(CHANGE_INSPECTOR);
        }
    }

    [CLICK('$flexList .display')] (e) {
        var display = e.$delegateTarget.attr('display-type')
        var current = editor.selection.current;

        if (current) {
            this.refs.$flexList.attr('selected-type', display);
            current.display.direction = display;

            this.emit(CHANGE_INSPECTOR);
        }
    }


    [CLICK('$flexWrap .display')] (e) {
        var display = e.$delegateTarget.attr('display-type')
        var current = editor.selection.current;

        if (current) {
            this.refs.$flexWrap.attr('selected-type', display);
            current.display.wrap = display;

            this.emit(CHANGE_INSPECTOR);
        }
    }


    [CLICK('$displayList .display')] (e) {
        var display = e.$delegateTarget.attr('display-type')
        var current = editor.selection.current;

        if (current) {
            this.refs.$displayList.attr('selected-type', display);
            current.changeDisplay(display)

            this.emit(CHANGE_INSPECTOR);
        }
    }    
 
    [CLICK('$rect')] (e) {
        var widthValue = this.refs.$width.int()
        this.refs.$height.val(widthValue);
        editor.selection.updateRect(CHANGE_RECT, {
            width : Length.px(widthValue),
            height: Length.px(widthValue)
        }, this)
    }

    [INPUT('$width')] () {
        editor.selection.updateRect(CHANGE_RECT, {
            width : Length.px(this.refs.$width.int())
        }, this)
    }

    [INPUT('$height')] () {      
        editor.selection.updateRect(CHANGE_RECT, {
            height : Length.px(this.refs.$height.int())
        }, this)
    }    


    [INPUT('$x')] () {
        editor.selection.updateRect(CHANGE_RECT, {
            x : Length.px(this.refs.$x.int())
        }, this)
    }

    [INPUT('$y')] () {
        editor.selection.updateRect(CHANGE_RECT, {
            y : Length.px(this.refs.$y.int())
        }, this)        
    }        
}