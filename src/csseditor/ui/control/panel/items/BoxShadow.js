
import BasePropertyItem from './BasePropertyItem';
import { 
    CHANGE_BOXSHADOW, 
    CHANGE_SELECTION, 
    CHANGE_EDITOR, 
    CHANGE_LAYER 
} from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { pxUnit, unitValue, EMPTY_STRING } from '../../../../../util/css/types';
import { CLICK, INPUT, LOAD, POINTEREND, POINTERMOVE, POINTERSTART, MOVE, END } from '../../../../../util/Event';
import { ITEM_INITIALIZE} from '../../../../types/ItemCreateTypes';
import { SELECTION_CURRENT_LAYER, SELECTION_ONE, SELECTION_CHECK } from '../../../../types/SelectionTypes';
import { ITEM_MAP_BOXSHADOW_CHILDREN } from '../../../../types/ItemSearchTypes';

export default class BoxShadow extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item box-shadow show'>
            <div class='items'>         
                <div class="box-shadow-list" ref="$boxShadowList"></div>
            </div>
        </div>
        `
    }

    makeItemNodeBoxShadow (item) {

        var offsetX = unitValue(item.offsetX);
        var offsetY = unitValue(item.offsetY);
        var blurRadius = unitValue(item.blurRadius);
        var spreadRadius = unitValue(item.spreadRadius);

        var checked = this.read(SELECTION_CHECK, item.id) ? 'checked': EMPTY_STRING;

        return `
            <div class='box-shadow-item ${checked}' box-shadow-id="${item.id}">  
                <div>
                    <label>Color</label>
                    <div class='value-field'>
                        <div class="color" style="background-color: ${item.color};"></div>
                        <button type="button" class='delete-boxshadow'>&times;</button>   
                    </div>                                          
                </div>                            
                <div>
                    <label>Type</label>
                    <div class="select">
                        <label><input type="radio" name="${item.id}"  ${item.inset === false ? 'checked="checked"' : EMPTY_STRING} value="false" /> Outset</label>
                        <label><input type="radio" name="${item.id}" ${item.inset ? 'checked="checked"' : EMPTY_STRING} value="true" /> Inset</label>
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
                <div>
                    <label>Spread Radius</label>                
                    <div class="input">
                        <input type="number" min="0" max="100" data-type='spreadRadius' value="${spreadRadius}" />                    
                        <input type="range" min="0" max="100" data-type='spreadRadiusRange' value="${spreadRadius}" />
                    </div>  
                </div>
                <div class='drag-area'><div class='drag-pointer' style='left: ${offsetX + 40}px; top: ${offsetY + 40}px;'></div></div>
            </div>
        `
    }

    [LOAD('$boxShadowList')] () {
        var item = this.read(SELECTION_CURRENT_LAYER)
        if (!item) { return EMPTY_STRING; }

        var results =  this.read(ITEM_MAP_BOXSHADOW_CHILDREN, item.id, (item) => {
            return this.makeItemNodeBoxShadow(item)
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

    getBoxShadowId($el) {
        return $el.closest('box-shadow-item').attr('box-shadow-id')
    }    

    [EVENT(CHANGE_BOXSHADOW)] (newValue) {
        this.refreshBoxShadow(newValue);
    }

    refreshBoxShadow(newValue) {
        var $el = this.refs.$boxShadowList.$(`[box-shadow-id="${newValue.id}"] .color`);
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
    [INPUT('$boxShadowList input[type=number]')] (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type');
        var id = this.getBoxShadowId($el)

        var $range = $el.parent().$(`[data-type=${field}Range]`);
        
        if ($range) {
            $range.val($el.val());
        }
        this.commit(CHANGE_BOXSHADOW, {id, [field]: pxUnit($el.int()) })
    }

    [INPUT('$boxShadowList input[type=range]')] (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type').replace('Range', EMPTY_STRING);
        var id = this.getBoxShadowId($el)

        $el.parent().$(`[data-type=${field}]`).val($el.val());
        this.commit(CHANGE_BOXSHADOW, {id, [field]: pxUnit($el.int()) })
    }    

    [CLICK('$boxShadowList input[type=radio]')] (e) {
        var $el = e.$delegateTarget;
        var id = this.getBoxShadowId($el)

        this.commit(CHANGE_BOXSHADOW, {id, inset: $el.val() === 'true' })
    }

    [CLICK('$boxShadowList .delete-boxshadow')] (e) {
        var $el = e.$delegateTarget;
        var id = this.getBoxShadowId($el)

        this.run(ITEM_INITIALIZE, id);
        this.emit(CHANGE_BOXSHADOW)
        this.refresh();
    }


    [CLICK('$boxShadowList .color')] (e) {
        var $el = e.$delegateTarget;
        var id = this.getBoxShadowId($el)
        
        this.dispatch(SELECTION_ONE, id);
        this.emit('fillColorId', id, CHANGE_BOXSHADOW);
        this.refresh();
    }


    refreshUI () {
        var {x, y} = this.config('pos');

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
        var id = this.getBoxShadowId(this.selectedPointArea)

        var boxShadowItem = this.refs.$boxShadowList.$(`[box-shadow-id="${id}"]`);

        boxShadowItem.$("[data-type=offsetX]").val(x);
        boxShadowItem.$("[data-type=offsetY]").val(y);

        this.commit(CHANGE_BOXSHADOW, {id, offsetX: pxUnit(x), offsetY: pxUnit(y) })
    }

    // Event Bindings 
    end () {
        this.selectedPointArea = false;
    }

    move () {
        this.refreshUI(true);
    }

    [POINTERSTART('$boxShadowList .drag-area') + MOVE() + END()] (e) {
        e.preventDefault();
        this.selectedPointArea = e.$delegateTarget;
        this.selectedDragPointer = this.selectedPointArea.$('.drag-pointer')
    }

}