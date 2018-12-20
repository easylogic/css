import BaseModule from "../../colorpicker/BaseModule";
import { UNIT_PX, UNIT_PERCENT, UNIT_COLOR } from "../../util/css/types";
import { uuid } from "../../util/functions/math";
import { ITEM_TYPE_FILTER } from "./ItemTypes";
const filterInfo = {
    'blur': { title: 'Blur', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PX, defaultValue: 0 },
    'grayscale' : { title: 'Grayscale', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'hue-rotate' : { title: 'Hue', type: 'range', min: 0, max: 360, step: 1, unit: 'deg', defaultValue: 0 },
    'invert' : { title: 'Invert', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },    
    'brightness': { title: 'Brightness', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'contrast': { title: 'Contrast', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'drop-shadow': { 
        type: 'multi',
        title: 'Drop Shadow', 
        offsetX: 0,
        offsetY: 0,
        blurRadius: 0,
        color: 'rgba(0, 0, 0, 0)',
        items: [
            { title: 'Offset X', type: 'range', key: 'offsetX', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
            { title: 'Offset Y', type: 'range', key: 'offsetY', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
            { title: 'Blur Radius', type: 'range',key: 'blurRadius', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
            { title: 'Color', type: 'color', key: 'color', defaultValue: 'black', unit: UNIT_COLOR }
        ]  
    },
    'opacity' : { title: 'Opacity', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'saturate' : { title: 'Saturate', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'sepia' : { title: 'Sepia', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
}

const defaultFilterList = Object.keys(filterInfo).map( (type, index) => {
    return { 
        itemType: ITEM_TYPE_FILTER, 
        index: index * 100,
        type, 
        id: uuid(),
        value: filterInfo[type].defaultValue 
    }
});

export default class FilterManager extends BaseModule {
   

    '*/filter/keys' ($store) {
        return filterKeys;
    }

    '*/filter/get' ($store, id) {
        return filterInfo[id];
    }    

    '*/filter/list' ($store, layerId) {
        var list = $store.read('/item/map/filter/children', layerId);

        if (list.length == 0) {
            return defaultFilterList;
        }

        return list; 

    }


    '*/filter/toCSS' ($store, filters, defaultDataObject = {}) {       
        
        if (!filters) return null;
        if (!Object.keys(filters).length) return null;

        return Object.keys(filters).map(id => {
            var dataObject = filters[id] || defaultDataObject;
            
            // 적용하는 필터가 아니면 제외 한다. 
            if (!dataObject.checked) return '';

            var viewObject = $store.read('/layer/get/filter', id);

            var value = dataObject.value; 

            if (typeof value == 'undefined') {
                value = viewObject.defaultValue;
            }

            return `${id}(${value}${viewObject.unit})`
        }).join(' ')
    }

    '*/filter/toString' ($store, layer, filterId = '', onlyFilter = false) {

        if (!layer) return '';
        if (!filterId && !layer.filters) return ''

        var obj = $store.read('/layer/toCSS', layer, true) || { filters: []};
        var filters = {}

        if (!filterId) {
            filters = layer.filters || {}
        } else {
            filters[filterId] = Object.assign({}, layer.filters[filterId] || {})
            filters[filterId].checked = true; 
        } 

        if (onlyFilter) {
            delete obj.width;
            delete obj.height;
            delete obj.left;
            delete obj.top;
        }

        obj.filter = $store.read('/layer/make/filter', filters )

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')
    }    


}