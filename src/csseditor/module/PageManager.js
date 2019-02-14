import BaseModule from "../../colorpicker/BaseModule";
import { stringUnit, isPercentUnit, EMPTY_STRING, WHITE_STRING } from "../../util/css/types";
import { GETTER } from "../../util/Store";
import { ITEM_GET, ITEM_CONVERT_STYLE } from "../types/ItemTypes";
import { PAGE_TO_STRING, PAGE_TO_CSS, PAGE_COLORVIEW_TO_CSS, PAGE_CACHE_TO_CSS, PAGE_CACHE_TO_STRING } from "../types/PageTypes";
import { CSS_SORTING, CSS_TO_STRING } from "../../util/css/make";
import { keyMap } from "../../util/functions/func";

export default class PageManager extends BaseModule {

    [GETTER(PAGE_TO_STRING)] ($store, id) {

        var page = this.get(id);
        var obj = $store.read(PAGE_TO_CSS, page) || {};

        keyMap(obj, (key,value) => {
            return `${key}: ${value};`
        }).join(WHITE_STRING)
    }

    [GETTER(PAGE_TO_CSS)] ($store, page = {}) {
        var sample = $store.read(ITEM_CONVERT_STYLE, page || {}) 
        var css ={
            overflow: sample.clip ? 'hidden' : EMPTY_STRING,
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
 
        return CSS_SORTING(css); 

    }

    [GETTER(PAGE_COLORVIEW_TO_CSS)] ($store, page = {}) {
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
 
        return CSS_SORTING(css); 

    }    

    [GETTER(PAGE_CACHE_TO_CSS)] ($store, page = {}) {
        var sample = $store.read(ITEM_CONVERT_STYLE, page || {}) 

        var css ={
            overflow: sample.clip ? 'hidden' : EMPTY_STRING,
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


        return CSS_SORTING(css); 
    }    

    [GETTER(PAGE_CACHE_TO_STRING)] ($store, page) {
        var obj = $store.read(PAGE_CACHE_TO_CSS,  page) || {};

        return {
            css: CSS_TO_STRING(obj),
            obj
        }
    }    


}