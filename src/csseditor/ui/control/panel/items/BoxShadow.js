
import BasePropertyItem from './BasePropertyItem';
import { 
    CHANGE_BOXSHADOW, 
    CHANGE_SELECTION, 
    CHANGE_EDITOR, 
    CHANGE_LAYER 
} from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { ITEM_TYPE_BOXSHADOW } from '../../../../module/ItemTypes';
import { pxUnit, unitValue } from '../../../../../util/css/types';
import { CLICK, INPUT, LOAD } from '../../../../../util/Event';
import { ITEM_INITIALIZE, ITEM_ADD } from '../../../../module/ItemCreateTypes';
import { SELECTION_CURRENT_LAYER, SELECTION_CURRENT_LAYER_ID, SELECTION_ONE, SELECTION_CHECK } from '../../../../module/SelectionTypes';
import { HISTORY_PUSH } from '../../../../module/HistoryTypes';

export default class BoxShadow extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item box-shadow show'>
            <div class='title' ref="$title">
                Box Shadow 
                <span style="float:right;">
                    <button type="button" ref="$add">+</button>
                </span>
            </div>
            <div class='items'>         
                <div class="box-shadow-list" ref="$boxShadowList"></div>
            </div>
        </div>
        `
    }

    makeField () {
        return `
        <div class='box-shadow-item label'>  
                <div class="color"></div>
                <div class="select">
                    <label>Inset</label>
                </div>                      
                <div class="input">
                    <input class="x" type="text" value="X" />
                </div>                
                <div class="input">
                    <input class="y" type="text" value="Y" />
                </div>
                <div class="input">
                    <input class="blur" type="text" value="B" />
                </div>
                <div class="input">
                    <input class="spread" type="text" value="S" />
                </div>  
                <button type="button">X</button>                                              
            </div>
    `
    }

    makeItemNodeBoxShadow (item) {

        var offsetX = unitValue(item.offsetX);
        var offsetY = unitValue(item.offsetY);
        var blurRadius = unitValue(item.blurRadius);
        var spreadRadius = unitValue(item.spreadRadius);

        var checked = this.read(SELECTION_CHECK, item.id) ? 'checked': '';

        return `
            <div class='box-shadow-item ${checked}' box-shadow-id="${item.id}">  
                <div class="color" style="background-color: ${item.color};"></div>
                <div class="select">
                    <label><input type="checkbox" ${item.inset ? 'checked="checked"' : ''}/></label>
                </div>                          
                <div class="input">
                    <input type="number" min="-100" max="100" data-type='offsetX' value="${offsetX}" />
                </div>                

                <div class="input">
                    <input type="number" min="-100" max="100" data-type='offsetY' value="${offsetY}" />
                </div>
                <div class="input">
                    <input type="number" min="0" max="100" data-type='blurRadius' value="${blurRadius}" />
                </div>
                <div class="input">
                    <input type="number" min="0" max="100" data-type='spreadRadius' value="${spreadRadius}" />
                </div>  
                <button type="button" class='delete-boxshadow'>&times;</button>                                                                                                            
            </div>
        `
    }

    [LOAD('$boxShadowList')] () {
        var item = this.read(SELECTION_CURRENT_LAYER)
        if (!item) { return ''; }

        var results =  this.read('item/map/boxshadow/children', item.id, (item) => {
            return this.makeItemNodeBoxShadow(item)
        })

        results.push(this.makeField());

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

    [CLICK('$add')] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.dispatch(ITEM_ADD, ITEM_TYPE_BOXSHADOW, false, id)
            this.dispatch(HISTORY_PUSH, `Add Box Shadow` );        
            this.refresh();
        }); 
    }

    [INPUT('$boxShadowList input[type=number]')] (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type');
        var id = $el.parent().parent().attr('box-shadow-id')

        this.commit(CHANGE_BOXSHADOW, {id, [field]: pxUnit($el.int()) })
    }

    [CLICK('$boxShadowList input[type=checkbox]')] (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().parent().parent().attr('box-shadow-id')

        this.commit(CHANGE_BOXSHADOW, {id, inset: $el.checked() })
    }

    [CLICK('$boxShadowList .delete-boxshadow')] (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().attr('box-shadow-id')

        this.run(ITEM_INITIALIZE, id);
        this.emit(CHANGE_BOXSHADOW)
        this.refresh();
    }

    [CLICK('$boxShadowList .color')] (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().attr('box-shadow-id')

        this.dispatch(SELECTION_ONE, id);
        this.emit('fillColorId', id, CHANGE_BOXSHADOW);
        this.refresh();
    }

}