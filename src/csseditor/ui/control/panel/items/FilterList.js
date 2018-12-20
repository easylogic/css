import BasePropertyItem from "./BasePropertyItem";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_LAYER, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER_FILTER } from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { unitString, UNIT_COLOR } from "../../../../../util/css/types";

export default class FilterList extends BasePropertyItem {

    template () { 
        return `
            <div class='property-item filters show'>
                <div class='title' ref="$title">
                    Filter
                </div>
                <div class='items no-padding'>                    
                    <div class="filter-list" ref="$filterList">
                        
                    </div>
                </div>
            </div>
        `
    }

    makeInputItem (viewObject, dataObject) {

        var value = dataObject.value; 

        if (typeof value == 'undefined') {
            value = viewObject.defaultValue
        }        

        if (viewObject.type == 'range') {
            return `
                <div class='filter'>
                    <span class="area"></span>                
                    <span class="checkbox">
                        <input type="checkbox" ${dataObject.checked ? `checked="checked"` : ''} data-filter-id="${dataObject.id}" />
                    </span>
                    <span class='title' draggable="true">${viewObject.title}</span>
                    <span class='range'><input type="range" min="${viewObject.min}" max="${viewObject.max}" step="${viewObject.step}" value="${value}" ref="${dataObject.type}Range" data-filter-type="${dataObject.type}" data-filter-id="${dataObject.id}" /></span>
                    <span class='input-value'><input type="number" min="${viewObject.min}" max="${viewObject.max}" step="${viewObject.step}" value="${value}" ref="${dataObject.type}Number" data-filter-type="${dataObject.type}" data-filter-id="${dataObject.id}"/></span>
                    <span class='unit'>${unitString(viewObject.unit)}</span>
                </div>
            `
        } else if (viewObject.type == 'multi') {
            return `
            <div class='filter'>
                <span class="area"></span>
                <span class="checkbox">
                    <input type="checkbox" ${dataObject.checked ? `checked="checked"` : ''} data-filter-id="${dataObject.id}" />
                </span>
                <span class='title long' draggable="true">${viewObject.title}</span>
            </div>
            <div class='items'>
                ${viewObject.items.map(it => {
                    var value = dataObject[it.key] || it.defaultValue;

                    if (it.unit == UNIT_COLOR) {
                        return `
                        <div>
                            <span class='title'>${it.title}</span>
                            <span class='color'>
                                <span class="color-view drop-shadow" ref="$dropShadowColor" style="background-color: ${value}" ></span>
                                <span class="color-text" ref="$dropShadowColorText">${value}</span>
                            </span>
                        </div>
                        `
                    } else {

                        return `
                        <div>
                            <span class='title'>${it.title}</span>
                            <span class='range'><input type="range" min="${it.min}" max="${it.max}" step="${it.step}" value="${value}" ref="${it.key}Range" data-filter-type="${it.key}" data-filter-id="${dataObject.id}" /></span>
                            <span class='input-value'><input type="number" min="${it.min}" max="${it.max}" step="${it.step}" value="${value}"  ref="${it.key}Number" data-filter-type="${it.key}" data-filter-id="${dataObject.id}"/></span>
                            <span class='unit'>${unitString(it.unit)}</span>
                        </div>
                        `
                    }

                }).join('')}
            </div>
            `
        }

        return `<div></div>`
    }

    'load $filterList' () {

        var layer = this.read('/selection/current/layer');

        if (!layer) return '' 

        var filters = this.read('/filter/list', layer.id) 

        return filters.map(f => {
            var viewObject = this.read('/filter/get', f.type);
            var dataObject = f || {};
 
            return `
                <div class='filter-item'>
                    <div class="filter-item-input">
                        ${this.makeInputItem(viewObject, dataObject)}
                    </div>
                </div>`
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_FILTER
    )] () {
        this.refresh()
    }

    isShow () {
        return true; 
    }    

    refresh () {
        this.load()
    }

    getFilterList () {

        var layer = this.read('/selection/current/layer');

        if (!layer) return []

        return this.read('/item/map/filter/children', layer.id);
    }

    'click $filterList input[type=checkbox]' (e) {

    }

    'change:input $filterList input[type=range]' (e) {
        var $range = e.$delegateTarget;
        var type = $range.attr('data-filter-type');

        this.refs[`${type}Number`].val($range.val());

    }

    'input $filterList input[type=number]' (e) {
        var $range = e.$delegateTarget;
        var type = $range.attr('data-filter-type');

        this.refs[`${type}Range`].val($range.val());
    }    

    'click $el .drop-shadow' (e) {
        var color = e.$delegateTarget.css('background-color');
        this.emit('selectFillColor', color, this.updateDropShadowColor.bind(this));
    } 

    updateDropShadowColor (color) {
        this.refs.$dropShadowColor.css('background-color', color);
        this.refs.$dropShadowColorText.text(color);
    }

}