
import BasePropertyItem from './BasePropertyItem';
import { 
    EVENT_CHANGE_BOXSHADOW, 
    CHANGE_BOXSHADOW,  
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER 
} from '../../../../types/event';
import { MULTI_EVENT } from '../../../../../colorpicker/UIElement';
import { ITEM_TYPE_BOXSHADOW } from '../../../../module/ItemTypes';
import { parseParamNumber } from '../../../../../util/filter/functions';

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

        var offsetX = parseParamNumber(item.offsetX);
        var offsetY = parseParamNumber(item.offsetY);
        var blurRadius = parseParamNumber(item.blurRadius);
        var spreadRadius = parseParamNumber(item.spreadRadius);

        var checked = this.read('/selection/check', item.id) ? 'checked': '';

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

    'load $boxShadowList' () {
        var item = this.read('/selection/current/layer')
        if (!item) { return ''; }

        var results =  this.read('/item/map/boxshadow/children', item.id, (item) => {
            return this.makeItemNodeBoxShadow(item)
        })

        results.push(this.makeField());

        return results;
    }



    isShow () {
        return true; 
        // return this.read('/selection/is/layer'); 
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if(isShow) {
            this.load()
        }
    }

    [EVENT_CHANGE_BOXSHADOW] (newValue) {
        this.refreshBoxShadow(newValue);
    }

    refreshBoxShadow(newValue) {
        var $el = this.refs.$boxShadowList.$(`[box-shadow-id="${newValue.id}"] .color`);
        if ($el) {
            $el.css('background-color', newValue.color);
        }
    }
  
    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_EDITOR
    )] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }

    'click $add' (e) {
        this.read('/selection/current/layer/id', (id) => {
            this.dispatch('/item/add', ITEM_TYPE_BOXSHADOW, false, id)
            this.dispatch('/history/push', `Add Box Shadow` );        
            this.refresh();
        }); 
    }

    'input $boxShadowList input[type=number]' (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type');
        var id = $el.parent().parent().attr('box-shadow-id')

        this.commit(CHANGE_BOXSHADOW, {id, [field]: $el.val() + 'px' })
    }

    'click $boxShadowList input[type=checkbox]' (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().parent().parent().attr('box-shadow-id')

        this.commit(CHANGE_BOXSHADOW, {id, inset: $el.el.checked })
    }

    'click $boxShadowList .delete-boxshadow' (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().attr('box-shadow-id')

        this.run('/item/initialize', id);
        this.emit(CHANGE_BOXSHADOW)
        this.refresh();
    }

    'click $boxShadowList .color' (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().attr('box-shadow-id')

        this.dispatch('/selection/one', id);
        this.emit('fillColorId', id, CHANGE_BOXSHADOW);
        this.refresh();
    }

}