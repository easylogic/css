import BaseModule from "../../colorpicker/BaseModule";
import { UNIT_PX, UNIT_PERCENT, UNIT_COLOR, unit } from "../../util/css/types";
import { BACKDROP_DEFAULT_OBJECT_KEYS, BACKDROP_DEFAULT_OBJECT, ITEM_GET } from "./ItemTypes";
import { GETTER } from "../../util/Store";
import { BACKDROP_GET, BACKDROP_LIST, BACKDROP_TOCSS } from "./BackdropTypes";
import { clone } from "../../util/functions/func";
const backdropInfo = {
    'backdropBlur': { func: 'blur', title: 'Blur', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PX, defaultValue: 0 },
    'backdropGrayscale' : { func: 'grayscale', title: 'Grayscale', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
    'backdropHueRotate' : { func: 'hue-rotate', title: 'Hue', type: 'range', min: 0, max: 360, step: 1, unit: 'deg', defaultValue: 0 },
    'backdropInvert' : { func: 'invert', title: 'Invert', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },    
    'backdropBrightness': { func: 'brightness', title: 'Brightness', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropContrast': { func: 'contrast', title: 'Contrast', type: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropDropshadow': { func: 'drop-shadow', type: 'multi', title: 'Drop Shadow'},
    'backdropDropshadowOffsetX': { title: 'Offset X', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'backdropDropshadowOffsetY': { title: 'Offset Y', type: 'range', min: -100, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'backdropDropshadowBlurRadius': { title: 'Blur Radius', type: 'range', min: 0, max: 100, step: 1, defaultValue: 0, unit: UNIT_PX },
    'backdropDropshadowColor': { title: 'Color', type: 'color', defaultValue: 'black', unit: UNIT_COLOR },
    'backdropOpacity' : { func: 'opacity', title: 'Opacity', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropSaturate' : { func: 'saturate', title: 'Saturate', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 100 },
    'backdropSepia' : { func: 'sepia', title: 'Sepia', type: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: 0 },
}

const DROP_SHADOW_LIST = [
    'backdropDropshadowOffsetX',
    'backdropDropshadowOffsetY',
    'backdropDropshadowBlurRadius',
    'backdropDropshadowColor',
]

export default class BackdropManager extends BaseModule {
   
    [GETTER(BACKDROP_GET)] ($store, id) {
        return backdropInfo[id];
    }    

    [GETTER(BACKDROP_LIST)] ($store, layerId) {
        var layer = $store.read(ITEM_GET, layerId);
        var realFilters = {}
        
        BACKDROP_DEFAULT_OBJECT_KEYS.filter(key => layer[key]).forEach(key => {
            realFilters[key] = layer[key]
        })

        realFilters = Object.assign( clone(BACKDROP_DEFAULT_OBJECT), realFilters)

        var filterList = BACKDROP_DEFAULT_OBJECT_KEYS.map(key => {
            return {key, ...realFilters[key]}
        })

        filterList.sort( (a, b) => {
            return a.index > b.index ? 1 : -1; 
        })

        return filterList.map(it => it.key); 
    }


    [GETTER(BACKDROP_TOCSS)] ($store, layer) {       
        var realFilters = {}
        
        BACKDROP_DEFAULT_OBJECT_KEYS.filter(key => layer[key]).forEach(key => {
            realFilters[key] = layer[key]
        })

        realFilters = Object.assign( clone(BACKDROP_DEFAULT_OBJECT), realFilters)

        var filterList = BACKDROP_DEFAULT_OBJECT_KEYS.map(key => {
            return {key, ...realFilters[key]}
        })

        filterList.sort( (a, b) => {
            return a.index > b.index ? 1 : -1; 
        })

        var filterString = filterList.filter(it => it.checked).map(it => {
            var viewObject = backdropInfo[it.key];
            if (it.key == 'backdropDropshadow') {

                var values = DROP_SHADOW_LIST.map(key => {
                    var value = layer[key] || BACKDROP_DEFAULT_OBJECT[key]

                    return unit(value.value, value.unit, true)
                }).join(' ')

                return `${viewObject.func}(${values})`
            } else {
                var values = unit(it.value, it.unit, true)
                return `${viewObject.func}(${values})`
            }
        }).join(' '); 
       
        return {
            'backdrop-filter' : filterString,
            '-webkit-backdrop-filter' : filterString,
        }
    }

}