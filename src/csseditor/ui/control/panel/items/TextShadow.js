
import BasePropertyItem from './BasePropertyItem';
import { 
    CHANGE_TEXTSHADOW, 
    CHANGE_SELECTION, 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    TEXT_FILL_COLOR
} from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { ITEM_TYPE_TEXTSHADOW } from '../../../../types/ItemTypes';
import { px, unitValue, pxUnit, EMPTY_STRING } from '../../../../../util/css/types';
import { CLICK, INPUT, LOAD, POINTERMOVE, POINTEREND, POINTERSTART } from '../../../../../util/Event';
import { ITEM_INITIALIZE, ITEM_ADD } from '../../../../types/ItemCreateTypes';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER, SELECTION_CHECK, SELECTION_ONE } from '../../../../types/SelectionTypes';
import { HISTORY_PUSH } from '../../../../types/HistoryTypes';
import { ITEM_MAP_TEXTSHADOW_CHILDREN } from '../../../../types/ItemSearchTypes';

export default class TextShadow extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item text-shadow show'>
            <div class='title' ref="$title">
                Text Shadow 
                <span style="float:right;">
                    <button type="button" ref="$add">+</button>
                </span>
            </div>
            <div class='items'>         
                <div class="text-shadow-list" ref="$textShadowList"></div>
            </div>
        </div>
        `
    }

    makeItemNodetextShadow (item) {

        var offsetX = unitValue(item.offsetX);
        var offsetY = unitValue(item.offsetY);
        var blurRadius = unitValue(item.blurRadius);
        var checked = this.read(SELECTION_CHECK, item.id) ? 'checked': EMPTY_STRING;

        return `
            <div class='text-shadow-item ${checked}' text-shadow-id="${item.id}">  
                <div>
                    <label>Color</label>
                    <div class='value-field'>
                        <div class="color" style="background-color: ${item.color};"></div>
                        <button type="button" class='delete-boxshadow'>&times;</button>   
                    </div>                                          
                </div>                            
                <div>
                    <label>X offset</label>
                    <div class="input">
                        <input type="number" min="-100" max="100" data-type='offsetX' value="${offsetX}" />
                    </div>
                </div>
                <div>
                    <label>Y Offset</label>                
                    <div class="input">
                        <input type="number" min="-100" max="100" data-type='offsetY' value="${offsetY}" />
                    </div>
                </div>
                <div class='empty'></div>        
                <div>
                    <label>Blur Radius</label>                
                    <div class="input">
                        <input type="number" min="0" max="100" data-type='blurRadius' value="${blurRadius}" />                    
                        <input type="range" min="0" max="100" data-type='blurRadiusRange' value="${blurRadius}" />
                    </div>
                </div>
                <div class='drag-area'><div class='drag-pointer' style='left: ${offsetX + 40}px; top: ${offsetY + 40}px;'></div></div>
            </div>
        `
    }

    [LOAD('$textShadowList')] () {
        var item = this.read(SELECTION_CURRENT_LAYER)
        if (!item) { return EMPTY_STRING; }

        var results =  this.read(ITEM_MAP_TEXTSHADOW_CHILDREN, item.id, (item) => {
            return this.makeItemNodetextShadow(item)
        })

        return results;
    }



    isShow () {
        return true; 
        // return this.read(SELECTION_IS_LAYER); 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if(isShow) {
            this.load()
        }
    }
    getTextShadowId($el) {
        return $el.closest('text-shadow-item').attr('text-shadow-id')
    }    

    [EVENT(CHANGE_TEXTSHADOW)] (newValue) {
        this.refreshTextShadow(newValue);
    }

    refreshTextShadow(newValue) {
        var $el = this.refs.$textShadowList.$(`[text-shadow-id="${newValue.id}"] .color`);
        if ($el) {
            $el.css('background-color', newValue.color);
        }
    }
  
    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION,
        CHANGE_EDITOR
    )] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }

    [CLICK('$add')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.dispatch(ITEM_ADD, ITEM_TYPE_TEXTSHADOW, false, id)
            this.dispatch(HISTORY_PUSH, `Add Text Shadow` );        
            this.refresh();
        }); 
    }

    [INPUT('$textShadowList input[type=number]')] (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type');
        var id = this.getTextShadowId($el)
        var $range = $el.parent().$(`[data-type=${field}Range]`);
        
        if ($range) {
            $range.val($el.val());
        }
        this.commit(CHANGE_TEXTSHADOW, {id, [field]: pxUnit($el.int()) })
    }

    [INPUT('$textShadowList input[type=range]')] (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type').replace('Range', '');
        var id = this.getTextShadowId($el)

        $el.parent().$(`[data-type=${field}]`).val($el.val());
        this.commit(CHANGE_TEXTSHADOW, {id, [field]: pxUnit($el.int()) })
    }    

    [CLICK('$textShadowList .delete-textshadow')] (e) {
        var $el = e.$delegateTarget;
        var id = this.getTextShadowId($el)

        this.run(ITEM_INITIALIZE, id);
        this.emit(CHANGE_TEXTSHADOW)
        this.refresh();
    }

    [CLICK('$textShadowList .color')] (e) {
        var $el = e.$delegateTarget;
        var id = this.getTextShadowId($el)

        this.dispatch(SELECTION_ONE, id);
        this.emit(TEXT_FILL_COLOR, id, CHANGE_TEXTSHADOW);
        this.refresh();
    }


    refreshUI (e) {
        var x = e.xy.x;
        var y = e.xy.y; 

        var rect = this.selectedPointArea.rect();

        if (x < rect.left) x = rect.left; 
        if (y < rect.top) y = rect.top; 
        if (x > rect.right) x = rect.right; 
        if (y > rect.bottom) y = rect.bottom; 

        x = x - rect.left; 
        y = y - rect.top; 

        this.refreshOffsetValue(x - 40, y - 40);
        this.selectedDragPointer.px('left', x);
        this.selectedDragPointer.px('top', y);

    }

    refreshOffsetValue(x, y) {
        var id = this.getTextShadowId(this.selectedPointArea)

        var textShadowItem = this.refs.$textShadowList.$(`[text-shadow-id="${id}"]`);

        textShadowItem.$("[data-type=offsetX]").val(x);
        textShadowItem.$("[data-type=offsetY]").val(y);

        this.commit(CHANGE_TEXTSHADOW, {id, offsetX: pxUnit(x), offsetY: pxUnit(y) })
    }

    // Event Bindings 
    [POINTEREND('document')] (e) {
        this.isDown = false ;
        this.selectedPointArea = false;
    }

    [POINTERMOVE('document')] (e) {
        if (this.isDown) {
            this.refreshUI(e);
        }
    }

    [POINTERSTART('$textShadowList .drag-area')] (e) {
        e.preventDefault();
        this.isDown = true; 
        this.selectedPointArea = e.$delegateTarget;
        this.selectedDragPointer = this.selectedPointArea.$('.drag-pointer')
    }

}