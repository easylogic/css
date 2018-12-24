import BaseModule from "../../colorpicker/BaseModule";
import { UNIT_PX, UNIT_PERCENT, UNIT_COLOR, unit, stringUnit } from "../../util/css/types";
import { FILTER_DEFAULT_OBJECT, FILTER_DEFAULT_OBJECT_KEYS } from "./ItemTypes";
const filterInfo = {
    'filterBlur': { func: 'blur', title: 'Blur', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PX, defaultValue: 0 },
    'filterGrayscale' : { func: 'grayscale', title: 'Grayscale', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
    'filterHueRotate' : { func: 'hue-rotate', title: 'Hue', type: 'range', min: 0, max: 360, step: 1, unit: 'deg', defaultValue: 0 },
    'filterInvert' : { func: 'invert', title: 'Invert', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },    
    'filterBrightness': { func: 'brightness', title: 'Brightness', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterContrast': { func: 'contrast', title: 'Contrast', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterDropshadow': { func: 'drop-shadow', type: 'multi', title: 'Drop Shadow'},
    'filterDropshadowOffsetX': { title: 'Offset X', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'filterDropshadowOffsetY': { title: 'Offset Y', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'filterDropshadowBlurRadius': { title: 'Blur Radius', type: 'range', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'filterDropshadowColor': { title: 'Color', type: 'color', defaultValue: 'black', unit: UNIT_COLOR },
    'filterOpacity' : { func: 'opacity', title: 'Opacity', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterSaturate' : { func: 'saturate', title: 'Saturate', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'filterSepia' : { func: 'sepia', title: 'Sepia', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
}

const DROP_SHADOW_LIST = [
    'filterDropshadowOffsetX',
    'filterDropshadowOffsetY',
    'filterDropshadowBlurRadius',
    'filterDropshadowColor',
]

export default class FilterManager extends BaseModule {

    '*/filter/get' ($store, id) {
        return filterInfo[id];
    }    

    '*/filter/list' ($store, layerId) {
        var layer = $store.read('/item/get', layerId);
        var realFilters = {}
        
        FILTER_DEFAULT_OBJECT_KEYS.filter(key => layer[key]).forEach(key => {
            realFilters[key] = layer[key]
        })

        realFilters = Object.assign({}, $store.read('/clone', FILTER_DEFAULT_OBJECT), realFilters)

        var filterList = FILTER_DEFAULT_OBJECT_KEYS.map(key => {
            return {key, ...realFilters[key]}
        })

        filterList.sort( (a, b) => {
            return a.index > b.index ? 1 : -1; 
        })

        return filterList.map(it => it.key); 
    }


    '*/filter/toCSS' ($store, layer) {       
        var realFilters = {}
        
        FILTER_DEFAULT_OBJECT_KEYS.filter(key => layer[key]).forEach(key => {
            realFilters[key] = layer[key]
        })

        realFilters = Object.assign({}, $store.read('/clone', FILTER_DEFAULT_OBJECT), realFilters)

        var filterList = FILTER_DEFAULT_OBJECT_KEYS.map(key => {
            return {key, ...realFilters[key]}
        })

        filterList.sort( (a, b) => {
            return a.index > b.index ? 1 : -1; 
        })

        var filterString = filterList.filter(it => it.checked).map(it => {
            var viewObject = filterInfo[it.key];
            if (it.key == 'filterDropshadow') {

                var values = DROP_SHADOW_LIST.map(key => {
                    return stringUnit(layer[key] || FILTER_DEFAULT_OBJECT[key])
                }).join(' ')

                return `${viewObject.func}(${values})`
            } else {
                var values = stringUnit(it)
                return `${viewObject.func}(${values})`
            }
        }).join(' '); 
       
        return {
            filter: filterString
        }
    }

}