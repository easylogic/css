
import Dom from "../../util/Dom";
import layerList from './layers/index';
import { EMPTY_STRING, ITEM_TYPE_BOXSHADOW, ITEM_TYPE_TEXTSHADOW } from "../../util/css/types";
import { isArray, cleanObject, combineKeyArray, keyEach } from "../../util/functions/func";
import { GETTER } from "../../util/Store";
import { BACKDROP_TO_CSS } from "../types/BackdropTypes";
import { CLIPPATH_TO_CSS } from "../types/ClipPathTypes";
import { LAYER_LIST_SAMPLE, LAYER_TO_STRING, LAYER_TO_CSS, LAYER_CACHE_TO_STRING, LAYER_CACHE_TO_CSS, LAYER_TOEXPORT, LAYER_MAKE_CLIPPATH, LAYER_MAKE_FILTER, LAYER_MAKE_BACKDROP, LAYER_TO_IMAGE_CSS, LAYER_IMAGE_TO_IMAGE_CSS, LAYER_MAKE_MAP, LAYER_MAKE_BOXSHADOW, LAYER_MAKE_IMAGE, LAYER_MAKE_TEXTSHADOW, LAYER_TO_STRING_CLIPPATH, LAYER_GET_CLIPPATH, LAYER_MAKE_MAP_IMAGE} from "../types/LayerTypes";
import { ITEM_FILTER_CHILDREN, ITEM_MAP_IMAGE_CHILDREN, ITEM_MAP_COLORSTEP_CHILDREN } from "../types/ItemSearchTypes";
import { FILTER_TO_CSS } from "../types/FilterTypes";
import { MAKE_BORDER_WIDTH, MAKE_BORDER_RADIUS, MAKE_BORDER_COLOR, MAKE_BORDER_STYLE, MAKE_TRANSFORM, BOUND_TO_CSS, CSS_TO_STRING, CSS_GENERATE, IMAGE_TO_CSS, generateImagePattern, LAYER_MAKE_FONT, LAYER_CACHE_TO_IMAGE_CSS } from "../../util/css/make";
import { ITEM_CONVERT_STYLE } from "../types/ItemTypes";
import BaseModule from "../../util/BaseModule";

export default class LayerManager extends BaseModule {
   
    [GETTER(LAYER_LIST_SAMPLE)] ($store, type = 'all') {
 
        var results = [] 

        results = layerList.map(it => ({...it}))

        return results;
    }

    [GETTER(LAYER_TO_STRING)] ($store, layer, withStyle = true, image = null) {

        var obj = $store.read(LAYER_TO_CSS, layer, withStyle, image) || {};

        if (image) {
            delete obj['background-color'];
            delete obj['mix-blend-mode'];
            delete obj['filter'];
        }

        return CSS_TO_STRING(obj);
    }

    [GETTER(LAYER_CACHE_TO_STRING)] ($store, layer, opt = {}) {
        var obj = $store.read(LAYER_CACHE_TO_CSS, layer) || {};
        obj.position = 'absolute';
        return {
            css: CSS_TO_STRING(obj),
            obj
        }
    }    

    [GETTER(LAYER_TOEXPORT)] ($store, layer, withStyle = true) {

        var obj = $store.read(LAYER_TO_CSS, layer, withStyle, null, true) || {};
        obj.position = obj.position || 'absolute';

        return CSS_TO_STRING(obj);
    }    

    [GETTER(LAYER_MAKE_CLIPPATH)] ($store, layer) {
        return $store.read(CLIPPATH_TO_CSS, layer);
    }

    [GETTER(LAYER_MAKE_FILTER)] ($store, layer) {       
        return $store.read(FILTER_TO_CSS, layer);
    }

    [GETTER(LAYER_MAKE_BACKDROP)] ($store, layer) {       
        return $store.read(BACKDROP_TO_CSS, layer);
    }    

    [GETTER(LAYER_TO_IMAGE_CSS)] ($store, layer, isExport = false) {    
        var results = {}
        $store.read(ITEM_MAP_IMAGE_CHILDREN, layer.id, (item)  => {
            var newItem = {...item}
            newItem.colorsteps =  newItem.colorsteps || $store.read(ITEM_MAP_COLORSTEP_CHILDREN, newItem.id)

            var css = IMAGE_TO_CSS(newItem, isExport);

            keyEach(css, (key, value) => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(value);
            })
        })

        return combineKeyArray(results);
    }


    [GETTER(LAYER_IMAGE_TO_IMAGE_CSS)] ($store, image) {    
        var images = generateImagePattern([image]);        
        return CSS_GENERATE(this.generateImageCSS($store, images));
    }    

    [GETTER(LAYER_MAKE_MAP)] ($store, layer, itemType, isExport) {
        var results = {}
        $store.read(`item/map/${itemType}/children`, layer.id, (item)  => {
            var css = $store.read(`${itemType}/toCSS`, item, isExport);

            keyEach(css, (key, value) => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(value);
            })            
        })

        keyEach(results, (key, value) => {
            if (isArray(results[key])) {
                results[key] = value.join(', ')
            }
        })

        return results;
    }



    generateImageCSS ($store, images, isExport) {
        var results = {}

        images.forEach(item  => {
            var newItem = {...item}
            newItem.colorsteps =  newItem.colorsteps || $store.read(ITEM_MAP_COLORSTEP_CHILDREN, newItem.id)
            var css = IMAGE_TO_CSS(newItem, isExport);
            
            keyEach(css, (key, value) => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(value);
            })
        })

        keyEach(results, (key, value) => {
            if (isArray(value)) {
                results[key] = value.join(', ')
            }            
        })

        return results;
    }



    [GETTER(LAYER_MAKE_MAP_IMAGE)] ($store, layer, isExport) {
        var images = generateImagePattern($store.read(ITEM_MAP_IMAGE_CHILDREN, layer.id).filter(it => {
            return it.visible;
        }));

        return this.generateImageCSS($store, images, isExport);
    }

    [GETTER(LAYER_MAKE_BOXSHADOW)] ($store, layer, isExport) {
        return $store.read(LAYER_MAKE_MAP, layer, ITEM_TYPE_BOXSHADOW, isExport);
    }

    [GETTER(LAYER_MAKE_IMAGE)] ($store, layer, isExport) {
        return $store.read(LAYER_MAKE_MAP_IMAGE, layer, isExport);
    }    

    [GETTER(LAYER_MAKE_TEXTSHADOW)] ($store, layer, isExport) {
        return $store.read(LAYER_MAKE_MAP, layer, ITEM_TYPE_TEXTSHADOW, isExport);
    }    

    [GETTER(LAYER_TO_STRING_CLIPPATH)] ($store, layer) {
        
        if (['circle'].includes(layer.clipPathType)) return EMPTY_STRING; 
        if (!layer.clipPathSvg) return EMPTY_STRING; 

        let transform = EMPTY_STRING;

        if (layer.fitClipPathSize) {
            const widthScale = layer.width.value / layer.clipPathSvgWidth;
            const heightScale = layer.height.value / layer.clipPathSvgHeight;
    
            transform = `scale(${widthScale} ${heightScale})`    
        }

        var $div = new Dom ('div');
        var paths = $div.html(layer.clipPathSvg).$('svg').html();
        var svg = `<svg height="0" width="0"><defs><clipPath id="clippath-${layer.id}" ${transform ? `transform="${transform}"` : ""} >${paths}</clipPath></defs></svg>`

        return svg 
    }

    [GETTER(LAYER_GET_CLIPPATH)] ($store, layer) {
        var items = $store.read(ITEM_FILTER_CHILDREN, layer.id, function (image) {
            return image.isClipPath
        }).map(id => {
            return $store.items[id]
        })

        return items.length ? items[0] : null;
    }

    [GETTER(LAYER_TO_CSS)] ($store, layer = null, withStyle = true, image = null, isExport = false) {
        var css = {};

        if (withStyle) {
            css = {...css, ...BOUND_TO_CSS(layer)};
        }

        css['box-sizing'] = layer.boxSizing || 'border-box';        
        css['visibility'] = layer.visible ? 'visible' : 'hidden';        

        if (layer.backgroundColor) {
            css['background-color'] = layer.backgroundColor
        }         
        
        if (layer.mixBlendMode) {
            css['mix-blend-mode'] = layer.mixBlendMode || ""
        }

        if (layer.backgroundClip && !layer.clipText) {
            css['background-clip'] = layer.backgroundClip || ""
            css['-webkit-background-clip'] = layer.backgroundClip || ""            
        }        

        if (layer.opacity) {
            css['opacity'] = layer.opacity;
        }

        var imageCSS = (image) ? $store.read(LAYER_IMAGE_TO_IMAGE_CSS, image) : $store.read(LAYER_MAKE_IMAGE, layer, isExport)

        var results = {...css, 
            ...MAKE_BORDER_WIDTH(layer),
            ...MAKE_BORDER_RADIUS(layer),
            ...MAKE_BORDER_COLOR(layer),
            ...MAKE_BORDER_STYLE(layer),
            ...MAKE_TRANSFORM(layer),
            ...$store.read(LAYER_MAKE_CLIPPATH, layer),
            ...$store.read(LAYER_MAKE_FILTER, layer),
            ...$store.read(LAYER_MAKE_BACKDROP, layer),            
            ...LAYER_MAKE_FONT(layer),              
            ...$store.read(LAYER_MAKE_BOXSHADOW, layer),
            ...$store.read(LAYER_MAKE_TEXTSHADOW, layer),
            ...imageCSS
        }

        return cleanObject(results);
    }


    [GETTER(LAYER_CACHE_TO_CSS)] ($store, item = null) {
        var layer = {...$store.read(ITEM_CONVERT_STYLE, item.layer),  images: item.images };
        var css = {}

        css = {...BOUND_TO_CSS(layer)}

        css['box-sizing'] = layer.boxSizing || 'border-box';
        css['visibility'] = layer.visible ? 'visible' : 'hidden';        

        if (layer.backgroundColor) {
            css['background-color'] = layer.backgroundColor
        }         
        
        if (layer.mixBlendMode) {
            css['mix-blend-mode'] = layer.mixBlendMode
        }

        if (layer.backgroundClip && !layer.clipText) {
            css['background-clip'] = layer.backgroundClip || ""
            css['-webkit-background-clip'] = layer.backgroundClip || ""
        }                

        if (layer.opacity) {
            css['opacity'] = layer.opacity;
        }

        var results = {
            ...css, 
            ...MAKE_BORDER_WIDTH(layer),
            ...MAKE_BORDER_RADIUS(layer),
            ...MAKE_BORDER_COLOR(layer),
            ...MAKE_BORDER_STYLE(layer),          
            ...MAKE_TRANSFORM(layer),
            ...$store.read(LAYER_MAKE_CLIPPATH, layer),
            ...$store.read(LAYER_MAKE_FILTER, layer),
            ...$store.read(LAYER_MAKE_BACKDROP, layer),            
            ...LAYER_MAKE_FONT(layer),            
            ...$store.read(LAYER_MAKE_BOXSHADOW, layer),
            ...$store.read(LAYER_MAKE_TEXTSHADOW, layer),
            ...LAYER_CACHE_TO_IMAGE_CSS(layer.images)
        }

        return cleanObject(results);
    }

}