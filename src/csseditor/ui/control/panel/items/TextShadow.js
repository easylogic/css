
import BasePropertyItem from './BasePropertyItem';
import { 
    EVENT_CHANGE_TEXTSHADOW, 
    CHANGE_TEXTSHADOW,  
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    TEXT_FILL_COLOR
} from '../../../../types/event';
import { MULTI_EVENT } from '../../../../../colorpicker/UIElement';
import { ITEM_TYPE_TEXTSHADOW } from '../../../../module/ItemTypes';
import { parseParamNumber } from '../../../../../util/filter/functions';
import { px } from '../../../../../util/css/types';
import { CLICK, INPUT } from '../../../../../util/Event';

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

    makeField () {
        return `
        <div class='text-shadow-item label'>  
                <div class="color"></div>                     
                <div class="input">
                    <input class="x" type="text" value="X" />
                </div>                
                <div class="input">
                    <input class="y" type="text" value="Y" />
                </div>
                <div class="input">
                    <input class="blur" type="text" value="B" />
                </div>
                <button type="button">&times;</button>                                              
            </div>
    `
    }

    makeItemNodetextShadow (item) {

        var offsetX = parseParamNumber(item.offsetX);
        var offsetY = parseParamNumber(item.offsetY);
        var blurRadius = parseParamNumber(item.blurRadius);
        var checked = this.read('/selection/check', item.id) ? 'checked': '';

        return `
            <div class='text-shadow-item ${checked}' text-shadow-id="${item.id}">  
                <div class="color" style="background-color: ${item.color};"></div>                      
                <div class="input">
                    <input type="number" min="-100" max="100" data-type='offsetX' value="${offsetX}" />
                </div>                

                <div class="input">
                    <input type="number" min="-100" max="100" data-type='offsetY' value="${offsetY}" />
                </div>
                <div class="input">
                    <input type="number" min="0" max="100" data-type='blurRadius' value="${blurRadius}" />
                </div>
                <button type="button" class='delete-textshadow'>&times;</button>                                                                                                            
            </div>
        `
    }

    'load $textShadowList' () {
        var item = this.read('/selection/current/layer')
        if (!item) { return ''; }

        var results =  this.read('/item/map/textshadow/children', item.id, (item) => {
            return this.makeItemNodetextShadow(item)
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

    [EVENT_CHANGE_TEXTSHADOW] (newValue) {
        this.refreshTextShadow(newValue);
    }

    refreshTextShadow(newValue) {
        var $el = this.refs.$textShadowList.$(`[text-shadow-id="${newValue.id}"] .color`);
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

    [CLICK('$add')] (e) {
        this.read('/selection/current/layer/id', (id) => {
            this.dispatch('/item/add', ITEM_TYPE_TEXTSHADOW, false, id)
            this.dispatch('/history/push', `Add text Shadow` );        
            this.refresh();
        }); 
    }

    [INPUT('$textShadowList input[type=number]')] (e) {
        var $el = e.$delegateTarget;
        var field = $el.attr('data-type');
        var id = $el.parent().parent().attr('text-shadow-id')

        this.commit(CHANGE_TEXTSHADOW, {id, [field]: px($el.val()) })
    }

    [CLICK('$textShadowList .delete-textshadow')] (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().attr('text-shadow-id')

        this.run('/item/initialize', id);
        this.emit(CHANGE_TEXTSHADOW)
        this.refresh();
    }

    [CLICK('$textShadowList .color')] (e) {
        var $el = e.$delegateTarget;
        var id = $el.parent().attr('text-shadow-id')

        this.dispatch('/selection/one', id);
        this.emit(TEXT_FILL_COLOR, id, CHANGE_TEXTSHADOW);
        this.refresh();
    }

}