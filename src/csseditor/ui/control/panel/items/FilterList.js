import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_EDITOR, CHANGE_LAYER, CHANGE_SELECTION, CHANGE_LAYER_FILTER } from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { unitString, isColorUnit, unitValue, EMPTY_STRING } from "../../../../../util/css/types";
import { FILTER_DEFAULT_OBJECT } from "../../../../types/ItemTypes";
import { CHANGEINPUT, INPUT, CLICK, LOAD } from "../../../../../util/Event";
import { isUndefined, clone } from "../../../../../util/functions/func";
import { SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";
import { FILTER_GET, FILTER_LIST } from "../../../../types/FilterTypes";

const DROPSHADOW_FILTER_KEYS = [
    'filterDropshadowOffsetX',
    'filterDropshadowOffsetY',
    'filterDropshadowBlurRadius',
    'filterDropshadowColor'
]

export default class FilterList extends BasePropertyItem {

    template () { 
        return `
            <div class='property-item filters'>
                <div class='title' ref="$title">
                    Filter
                </div>
                <div class='items no-padding'>                    
                    <div class="filter-list" ref="$filterList">
                        
                    </div>
                </div>
                <div class='items bar'></div>                
            </div>
        `
    }

    makeInputItem (key, viewObject, dataObject) {
        var value = dataObject[key] ? dataObject[key].value : undefined; 

        if (viewObject.type == 'range') { 
            if (isUndefined(value)) { 
                value = viewObject.defaultValue
            }        
    
            return `
                <div class='filter'>
                    <span class="area"></span>                
                    <span class="checkbox">
                        <input type="checkbox" ${dataObject.checked ? `checked="checked"` : EMPTY_STRING} data-key="${key}" />
                    </span>
                    <span class='title' draggable="true">${viewObject.title}</span>
                    <span class='range'><input type="range" min="${viewObject.min}" max="${viewObject.max}" step="${viewObject.step}" value="${value}" ref="${key}Range" data-key="${key}"/></span>
                    <span class='input-value'><input type="number" min="${viewObject.min}" max="${viewObject.max}" step="${viewObject.step}" value="${value}"  ref="${key}Number" data-key="${key}"/></span>
                    <span class='unit'>${unitString(viewObject.unit)}</span>
                </div>
            `
        } else if (viewObject.type == 'multi') {
            return `
            <div class='filter'>
                <span class="area"></span>
                <span class="checkbox">
                    <input type="checkbox" ${dataObject.checked ? `checked="checked"` : EMPTY_STRING} data-key="${key}" />
                </span>
                <span class='title long' draggable="true">${viewObject.title}</span>
            </div>
            <div class='items'>
                ${DROPSHADOW_FILTER_KEYS.map(subkey => {
                    
                    var it = this.read(FILTER_GET, subkey);
                    var value = isUndefined(dataObject[subkey]) ? it.defaultValue : unitValue(dataObject[subkey]);

                    if (isColorUnit(it)) {
                        return `
                        <div>
                            <span class='title'>${it.title}</span>
                            <span class='color'>
                                <span class="color-view drop-shadow" ref="$dropShadowColor" style="background-color: ${value}" data-key="${subkey}" ></span>
                                <span class="color-text" ref="$dropShadowColorText">${value}</span>
                            </span>
                        </div>
                        `
                    } else {

                        return `
                        <div>
                            <span class='title'>${it.title}</span>
                            <span class='range'><input type="range" min="${it.min}" max="${it.max}" step="${it.step}" value="${value}" ref="${subkey}Range"  data-key="${subkey}" /></span>
                            <span class='input-value'><input type="number" min="${it.min}" max="${it.max}" step="${it.step}" value="${value}" ref="${subkey}Number" data-key="${subkey}" /></span>
                            <span class='unit'>${unitString(it.unit)}</span>
                        </div>
                        `
                    }

                }).join(EMPTY_STRING)}
            </div>
            `
        }

        return `<div></div>`
    }

    [LOAD('$filterList')] () {

        var layer = this.read(SELECTION_CURRENT_LAYER);

        if (!layer) return EMPTY_STRING 

        var filterKeys = this.read(FILTER_LIST, layer.id) 

        return filterKeys.map(key => {
            var realKey = key
            var viewObject = this.read(FILTER_GET, realKey);
            var dataObject = layer || {}
             return `
                <div class='filter-item'>
                    <div class="filter-item-input">
                        ${this.makeInputItem(realKey, viewObject, dataObject)}
                    </div>
                </div>`
        })
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER_FILTER,
        CHANGE_LAYER
    )] () {
        this.refresh()
    }

    isShow () {
        return true; 
    }    

    refresh () {
        this.load()
    }


    updateFilterKeyValue (key, lastValue) {

        this.read(SELECTION_CURRENT_LAYER, layer => {
            var id = layer.id; 
            var value = layer[key] || clone(FILTER_DEFAULT_OBJECT[key]);
            value.value = lastValue 

            this.commit(CHANGE_LAYER_FILTER, {id, [key]: value })
        });
    }

    updateFilterKeyChecked (key, checked) {

        this.read(SELECTION_CURRENT_LAYER, layer => {
            var id = layer.id;             
            var value = layer[key] || clone(FILTER_DEFAULT_OBJECT[key]);
            value.checked = checked 

            this.commit(CHANGE_LAYER_FILTER, {id, [key]: value })
        });
    }

    [CLICK('$filterList input[type=checkbox]')] (e) {
        var $check = e.$delegateTarget;
        var key = $check.attr('data-key');
        this.updateFilterKeyChecked(key, $check.checked())
    }

    [CHANGEINPUT('$filterList input[type=range]')] (e) {
        var $range = e.$delegateTarget;
        var key = $range.attr('data-key');
        this.refs[`${key}Number`].val($range.val());      
        this.updateFilterKeyValue(key, $range.val());
    }

    [INPUT('$filterList input[type=number]')] (e) {
        var $number = e.$delegateTarget;
        var key = $number.attr('data-key');
        this.refs[`${key}Range`].val($number.val());            
        this.updateFilterKeyValue(key, $number.val());
    }    

    [CLICK('$el .drop-shadow')] (e) {
        var color = e.$delegateTarget.css('background-color');
        this.emit('selectFillColor', color, this.updateDropShadowColor.bind(this));
    } 

    updateDropShadowColor (color) {
        this.refs.$dropShadowColor.css('background-color', color);
        this.refs.$dropShadowColorText.text(color);

        var key = this.refs.$dropShadowColor.attr('data-key');

        this.updateFilterKeyValue(key, color);
    }


}