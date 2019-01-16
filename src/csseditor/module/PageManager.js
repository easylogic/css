import BaseModule from "../../colorpicker/BaseModule";
import { stringUnit, isPercentUnit } from "../../util/css/types";
import { GETTER } from "../../util/Store";
import { ITEM_GET, ITEM_CONVERT_STYLE } from "./ItemTypes";
import { CSS_TOSTRING } from "./CssTypes";

export default class PageManager extends BaseModule {

    [GETTER('page/toString')] ($store, id) {

        var page = $store.read(ITEM_GET, id);
        var obj = $store.read('page/toCSS', page) || {};

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')
    }

    [GETTER('page/toCSS')] ($store, page = {}) {
        var sample = $store.read(ITEM_CONVERT_STYLE, page || {}) 

        var css ={
            overflow: sample.clip ? 'hidden' : '',
            'transform-style': sample.preserve ? 'preserve-3d' : 'flat',
            width: stringUnit(sample.width),
            height: stringUnit(sample.height)
        } 

        if (sample.perspective) {
            css.perspective = stringUnit(sample.perspective);
        }

        if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY) ) {
            css['perspective-origin'] = `${stringUnit(sample.perspectiveOriginPositionX)} ${stringUnit(sample.perspectiveOriginPositionY)}`;
        }        
 
        return $store.read('css/sorting', css); 

    }

    [GETTER('page/colorview/toCSS')] ($store, page = {}) {
        var sample = $store.read(ITEM_CONVERT_STYLE, page || {}) 

        var css ={
            'transform-style': sample.preserve ? 'preserve-3d' : 'flat'
        } 

        if (sample.perspective) {
            css.perspective = stringUnit(sample.perspective);
        }

        if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY) ) {
            css['perspective-origin'] = `${stringUnit(sample.perspectiveOriginPositionX)} ${stringUnit(sample.perspectiveOriginPositionY)}`;
        }        
 
        return $store.read('css/sorting', css); 

    }    

    [GETTER('page/cache/toCSS')] ($store, page = {}) {
        var sample = $store.read(ITEM_CONVERT_STYLE, page || {}) 

        var css ={
            overflow: sample.clip ? 'hidden' : '',
            'transform-style': sample.preserve ? 'preserve-3d' : 'flat',
            width: stringUnit(sample.width),
            height: stringUnit(sample.height)
        } 


        if (sample.perspective) {
            css.perspective = stringUnit(sample.perspective);
        }

        if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY) ) {
            css['perspective-origin'] = `${stringUnit(sample.perspectiveOriginPositionX)} ${stringUnit(sample.perspectiveOriginPositionY)}`;
        }        


        return $store.read('css/sorting', css); 
    }    

    [GETTER('page/cache/toString')] ($store, page) {
        var obj = $store.read('page/cache/toCSS',  page) || {};

        return {
            css: $store.read(CSS_TOSTRING, obj),
            obj
        }
    }    


}