import BaseModule from "../../colorpicker/BaseModule";
import Dom from "../../util/Dom";
import layerList from './layers/index';
import { ITEM_TYPE_BOXSHADOW, ITEM_TYPE_TEXTSHADOW, ITEM_TYPE_IMAGE, ITEM_CONVERT_STYLE, IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_REPEATING_LINEAR } from "../types/ItemTypes";
import { stringUnit, EMPTY_STRING } from "../../util/css/types";
import { isNotUndefined, isArray, cleanObject, combineKeyArray, clone } from "../../util/functions/func";
import { GETTER } from "../../util/Store";
import { BACKDROP_TO_CSS } from "../types/BackdropTypes";
import { CSS_TO_STRING, CSS_GENERATE } from "../types/CssTypes";
import { CLIPPATH_TO_CSS } from "../types/ClipPathTypes";
import { LAYER_LIST_SAMPLE, LAYER_TO_STRING, LAYER_TO_CSS, LAYER_CACHE_TO_STRING, LAYER_CACHE_TO_CSS, LAYER_TOEXPORT, LAYER_MAKE_CLIPPATH, LAYER_MAKE_FILTER, LAYER_MAKE_BACKDROP, LAYER_TO_IMAGE_CSS, LAYER_CACHE_TO_IMAGE_CSS, LAYER_IMAGE_TO_IMAGE_CSS, LAYER_MAKE_MAP, LAYER_MAKE_BOXSHADOW, LAYER_MAKE_FONT, LAYER_MAKE_IMAGE, LAYER_MAKE_TEXTSHADOW, LAYER_MAKE_TRANSFORM_ROTATE, LAYER_MAKE_TRANSFORM, LAYER_TO_STRING_CLIPPATH, LAYER_GET_CLIPPATH, LAYER_MAKE_BORDER_RADIUS, LAYER_BOUND_TO_CSS, LAYER_MAKE_MAP_IMAGE, LAYER_MAKE_BORDER, LAYER_MAKE_BORDER_COLOR, LAYER_MAKE_BORDER_STYLE } from "../types/LayerTypes";
import { IMAGE_TO_CSS} from "../types/ImageTypes";
import { ITEM_FILTER_CHILDREN, ITEM_EACH_CHILDREN, ITEM_EACH_TYPE_CHILDREN, ITEM_MAP_IMAGE_CHILDREN } from "../types/ItemSearchTypes";
import { FILTER_TO_CSS } from "../types/FilterTypes";
import { PATTERN_MAKE } from "../types/PatternTypes";

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

        return $store.read(CSS_TO_STRING, obj);
    }

    [GETTER(LAYER_CACHE_TO_STRING)] ($store, layer, opt = {}) {
        var obj = $store.read(LAYER_CACHE_TO_CSS, layer) || {};
        obj.position = 'absolute';
        return {
            css: $store.read(CSS_TO_STRING, obj),
            obj
        }
    }    

    [GETTER(LAYER_TOEXPORT)] ($store, layer, withStyle = true) {

        var obj = $store.read(LAYER_TO_CSS, layer, withStyle, null, true) || {};
        obj.position = obj.position || 'absolute';

        return $store.read(CSS_TO_STRING, obj);
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
        $store.read(ITEM_EACH_CHILDREN, layer.id, (item)  => {
            var css = $store.read(IMAGE_TO_CSS, item, isExport);

            Object.keys(css).forEach(key => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(css[key]);
            })
        })

        return combineKeyArray(results);
    }


    [GETTER(LAYER_CACHE_TO_IMAGE_CSS)] ($store, images) {    
        var results = {}

        images.forEach(item => {
            var image = {...item.image, colorsteps: item.colorsteps}
            var css = $store.read(IMAGE_TO_CSS, image);

            Object.keys(css).forEach(key => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(css[key]);
            })
        })

        return combineKeyArray(results);
    }    

    [GETTER(LAYER_IMAGE_TO_IMAGE_CSS)] ($store, image) {    
        var images = this.generateImagePattern($store, [image]);        
        return $store.read(CSS_GENERATE, this.generateImageCSS($store, images));
    }    

    [GETTER(LAYER_MAKE_MAP)] ($store, layer, itemType, isExport) {
        var results = {}
        $store.read(`item/map/${itemType}/children`, layer.id, (item)  => {
            var css = $store.read(`${itemType}/toCSS`, item, isExport);

            Object.keys(css).forEach(key => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(css[key]);
            })
        })

        Object.keys(results).forEach(key => {
            if (isArray(results[key])) {
                results[key] = results[key].join(', ')
            }
        })

        return results;
    }



    generateImageCSS ($store, images, isExport) {
        var results = {}

        images.forEach(item  => {

            var css = $store.read(IMAGE_TO_CSS, item, isExport);

            Object.keys(css).forEach(key => {
                if (!results[key]) {
                    results[key] = [] 
                }

                results[key].push(css[key]);
            })
        })

        Object.keys(results).forEach(key => {
            if (isArray(results[key])) {
                results[key] = results[key].join(', ')
            }
        })

        return results;
    }

    generateImagePattern ($store, images) {
        var results = [];

        images.forEach(item => {
            var patternedItems = $store.read(PATTERN_MAKE, item);
            if (patternedItems) {
                results.push(...patternedItems);
            } else {
                results.push(item);
            }
        });

        return results;
    }


    [GETTER(LAYER_MAKE_MAP_IMAGE)] ($store, layer, isExport) {
        var images = this.generateImagePattern($store, $store.read(ITEM_MAP_IMAGE_CHILDREN, layer.id).filter(it => {
            return it.visible;
        }));

        return this.generateImageCSS($store, images, isExport);
    }

    [GETTER(LAYER_MAKE_BOXSHADOW)] ($store, layer, isExport) {
        return $store.read(LAYER_MAKE_MAP, layer, ITEM_TYPE_BOXSHADOW, isExport);
    }

    [GETTER(LAYER_MAKE_FONT)] ($store, layer, isExport) {
        var results = {}

        if (layer.color) {
            results['color'] = layer.color;
        }

        if (layer.fontSize) {
            results['font-size'] = stringUnit(layer.fontSize);
        }

        if (layer.fontFamily) {
            results['font-family'] = layer.fontFamily;
        }

        if (layer.fontWeight) {
            results['font-weight'] = layer.fontWeight;
        }        

        if (isNotUndefined(layer.lineHeight)) {
            results['line-height']  = stringUnit(layer.lineHeight)
        }

        results['word-wrap'] = layer.wordWrap || 'break-word';
        results['word-break'] = layer.wordBreak || 'break-word';

        if (layer.clipText) {
            results['color'] = 'transparent';
            results['background-clip'] = 'text';
            results['-webkit-background-clip'] = 'text';
        }

        return results;
    }

    [GETTER(LAYER_MAKE_IMAGE)] ($store, layer, isExport) {
        return $store.read(LAYER_MAKE_MAP_IMAGE, layer, isExport);
    }    

    [GETTER(LAYER_MAKE_TEXTSHADOW)] ($store, layer, isExport) {
        return $store.read(LAYER_MAKE_MAP, layer, ITEM_TYPE_TEXTSHADOW, isExport);
    }    

    [GETTER(LAYER_MAKE_TRANSFORM_ROTATE)] ($store, layer) {

        var results = [] 

        if (layer.rotate) {
            results.push(`rotate(${layer.rotate}deg)`)
        }
        
        return {
            transform: (results.length ? results.join(' ') : 'none')
        }
    }

    [GETTER(LAYER_MAKE_TRANSFORM)] ($store, layer) {

        var results = [] 

        if (layer.perspective) {
            results.push(`perspective(${layer.perspective}px)`)
        }

        if (layer.rotate) {
            results.push(`rotate(${layer.rotate}deg)`)
        }

        if (layer.skewX) {
            results.push(`skewX(${layer.skewX}deg)`)
        }        

        if (layer.skewY) {
            results.push(`skewY(${layer.skewY}deg)`)
        }                

        if (layer.scale) {
            results.push(`scale(${layer.scale})`)
        }                        

        if (layer.translateX) {
            results.push(`translateX(${layer.translateX}px)`)
        }                                

        if (layer.translateY) {
            results.push(`translateY(${layer.translateY}px)`)
        }

        if (layer.translateZ) { 
            results.push(`translateZ(${layer.translateZ}px)`)
        }

        if (layer.rotateX) {
            results.push(`rotateX(${layer.rotateX}deg)`)
        }                                

        if (layer.rotateY) {
            results.push(`rotateY(${layer.rotateY}deg)`)
        }                                

        if (layer.rotateZ) {
            results.push(`rotateZ(${layer.rotateZ}deg)`)
        }      
        
        if (layer.scaleX) {
            results.push(`scaleX(${layer.scaleX})`)
        }  

        if (layer.scaleY) {
            results.push(`scaleY(${layer.scaleY})`)
        }  
        
        if (layer.scaleZ) {
            results.push(`scaleZ(${layer.scaleZ})`)
        }          
        
        return {
            transform: (results.length ? results.join(' ') : 'none')
        }
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

    [GETTER(LAYER_MAKE_BORDER_RADIUS)] ($store, layer) {
        var css = {};

        if (layer.borderRadius) css['border-radius'] = stringUnit(layer.borderRadius)
        if (layer.borderTopLeftRadius) css['border-top-left-radius'] = stringUnit(layer.borderTopLeftRadius);
        if (layer.borderTopRightRadius) css['border-top-right-radius'] = stringUnit(layer.borderTopRightRadius);
        if (layer.borderBottomLeftRadius) css['border-bottom-left-radius'] = stringUnit(layer.borderBottomLeftRadius);
        if (layer.borderBottomRightRadius) css['border-bottom-right-radius'] = stringUnit(layer.borderBottomRightRadius);        

        return css;
    }

    [GETTER(LAYER_MAKE_BORDER_COLOR)] ($store, layer) {
        var css = {};

        if (layer.borderColor) css['border-color'] = layer.borderColor
        if (layer.borderTopColor) css['border-top-color'] = layer.borderTopColor;
        if (layer.borderRightColor) css['border-right-color'] = layer.borderRightColor;
        if (layer.borderBottomColor) css['border-bottom-color'] = layer.borderBottomColor;
        if (layer.borderLeftColor) css['border-left-color'] = layer.borderLeftColor;        

        return css;
    }

    [GETTER(LAYER_MAKE_BORDER_STYLE)] ($store, layer) {
        var css = {};

        if (layer.borderStyle) css['border-style'] = layer.borderStyle
        if (layer.borderTopStyle) css['border-top-style'] = layer.borderTopStyle;
        if (layer.borderRightStyle) css['border-right-style'] = layer.borderRightStyle;
        if (layer.borderBottomStyle) css['border-bottom-style'] = layer.borderBottomStyle;
        if (layer.borderLeftStyle) css['border-left-style'] = layer.borderLeftStyle;

        return css;
    }


    [GETTER(LAYER_MAKE_BORDER)] ($store, layer) {
        var css = {};

        if (layer.borderWidth) {
            css['border-width'] = stringUnit(layer.borderWidth)
            css['border-style'] = 'solid';
        }

        if (layer.borderTopWidth) {
            css['border-top-width'] = stringUnit(layer.borderTopWidth);
            css['border-top-style'] = 'solid';
        }

        if (layer.borderRightWidth) {
            css['border-right-width'] = stringUnit(layer.borderRightWidth);
            css['border-right-style'] = 'solid';
        }

        if (layer.borderLeftWidth) {
            css['border-left-width'] = stringUnit(layer.borderLeftWidth);
            css['border-left-style'] = 'solid'
        }

        if (layer.borderBottomWidth) {
            css['border-bottom-width'] = stringUnit(layer.borderBottomWidth);
            css['border-bottom-style'] = 'solid'
        }
        return css;
    }

    [GETTER(LAYER_BOUND_TO_CSS)] ($store, layer) {
        var css = {};

        if (!layer) return css; 

        css.left = stringUnit(layer.x)
        css.top = stringUnit(layer.y)
        css.width = stringUnit(layer.width)
        css.height = stringUnit(layer.height)
        css['z-index'] = layer.index;

        return css;
    }

    [GETTER(LAYER_TO_CSS)] ($store, layer = null, withStyle = true, image = null, isExport = false) {
        var css = {};

        if (withStyle) {
            css = {...css, ...$store.read(LAYER_BOUND_TO_CSS, layer)};
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
            ...$store.read(LAYER_MAKE_BORDER, layer),
            ...$store.read(LAYER_MAKE_BORDER_RADIUS, layer),
            ...$store.read(LAYER_MAKE_BORDER_COLOR, layer),
            ...$store.read(LAYER_MAKE_BORDER_STYLE, layer),
            ...$store.read(LAYER_MAKE_TRANSFORM, layer),
            ...$store.read(LAYER_MAKE_CLIPPATH, layer),
            ...$store.read(LAYER_MAKE_FILTER, layer),
            ...$store.read(LAYER_MAKE_BACKDROP, layer),            
            ...$store.read(LAYER_MAKE_FONT, layer),            
            ...$store.read(LAYER_MAKE_BOXSHADOW, layer),
            ...$store.read(LAYER_MAKE_TEXTSHADOW, layer),
            ...imageCSS
        }

        return cleanObject(results);
    }


    [GETTER(LAYER_CACHE_TO_CSS)] ($store, item = null) {
        var layer = {...$store.read(ITEM_CONVERT_STYLE, item.layer),  images: item.images };
        var css = {}

        css = {...$store.read(LAYER_BOUND_TO_CSS, layer)}

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
            ...$store.read(LAYER_MAKE_BORDER, layer),
            ...$store.read(LAYER_MAKE_BORDER_RADIUS, layer),
            ...$store.read(LAYER_MAKE_BORDER_COLOR, layer),
            ...$store.read(LAYER_MAKE_BORDER_STYLE, layer),            
            ...$store.read(LAYER_MAKE_TRANSFORM, layer),
            ...$store.read(LAYER_MAKE_CLIPPATH, layer),
            ...$store.read(LAYER_MAKE_FILTER, layer),
            ...$store.read(LAYER_MAKE_BACKDROP, layer),            
            ...$store.read(LAYER_MAKE_FONT, layer),            
            ...$store.read(LAYER_MAKE_BOXSHADOW, layer),
            ...$store.read(LAYER_MAKE_TEXTSHADOW, layer),
            ...$store.read(LAYER_CACHE_TO_IMAGE_CSS, layer.images)
        }

        return cleanObject(results);
    }

}