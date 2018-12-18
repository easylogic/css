import BasePropertyItem from "./BasePropertyItem";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_LAYER, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER_FILTER } from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

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

    makeInputItem (id, viewObject, dataObject) {

        var value = dataObject.value; 

        if (typeof value == 'undefined') {
            value = viewObject.defaultValue
        }        

        if (viewObject.type == 'range') {
            return `
                <div>
                    <span class='title'>
                        <label><input type="checkbox" ${dataObject.checked ? `checked="checked"` : ''} data-filter-id="${id}" /> ${viewObject.title} </label>
                    </span>
                    <span class='range'><input type="range" min="${viewObject.min}" max="${viewObject.max}" step="${viewObject.step}" value="${value}" data-filter-id="${id}" /></span>
                    <span class='input'><input type="number" min="${viewObject.min}" max="${viewObject.max}" step="${viewObject.step}" value="${value}" data-filter-id="${id}"/></span>
                    <span class='unit'>${viewObject.unit}</span>
                </div>
            `
        }

        return `<div>

        </div>`
    }

    'load $filterList' () {

        var layer = this.read('/selection/current/layer');

        if (!layer) return '' 

        var defaultFilterList = this.read('/layer/filter/list') 
        var filters = this.getFilterList();


        return defaultFilterList.map(f => {
            var viewObject = filters[f.type];
            var dataObject = f || {};
 
            return `
                <div class='filter-item'>
                    <div class="filter-item-input">
                        ${this.makeInputItem(id, viewObject, dataObject)}
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

        var filters = layer.filters || []

        if (Array.isArray(filters) == false) {
            return [];
        }

        return filters;
    }

    'click $filterList input[type=checkbox]' (e) {
        var filterId = e.$delegateTarget.attr('data-filter-id');

        this.read('/selection/current/layer', (layer) => {
            var newValue = {id: layer.id, filters: layer.filters || []}
            if (!newValue.filters[filterId]) {
                newValue.filters[filterId] = { checked: false}
            }

            newValue.filters[filterId].checked = e.$delegateTarget.el.checked;

            this.commit(CHANGE_LAYER_FILTER, newValue);
            this.refreshFilterList()
        })
    }

    'change:input $filterList input[type=range]' (e) {
        var filterId = e.$delegateTarget.attr('data-filter-id');

        this.read('/selection/current/layer', (layer) => {
            var newValue = {id: layer.id, filters: layer.filters || []}


            if (!newValue.filters[filterId]) {
                newValue.filters[filterId] = {}
            }

            newValue.filters[filterId].value = e.$delegateTarget.val();

            this.commit(CHANGE_LAYER_FILTER, newValue);
            this.refreshFilter(newValue);
        })
    }

    'input $filterList input[type=number]' (e) {
        var filterId = e.$delegateTarget.attr('data-filter-id');

        this.read('/selection/current/layer', (layer) => {

            var newValue = {id: layer.id, filters: layer.filters || []}
            newValue.filters[filterId].value = e.$delegateTarget.val();


            if (!newValue.filters[filterId]) {
                newValue.filters[filterId] = {}
            }

            this.commit(CHANGE_LAYER_FILTER, newValue);
        })
    }    

}