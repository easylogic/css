import BaseModule from "../../colorpicker/BaseModule";
import { stringUnit, isPercentUnit } from "../../util/css/types";

export default class PageManager extends BaseModule {

    '*/page/toString' ($store, id) {

        var page = $store.read('/item/get', id);
        var obj = $store.read('/page/toCSS', page) || {};

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')
    }

    '*/page/toCSS' ($store, page = {}) {
        var sample = $store.read('/item/convert/style', page || {}) 

        var css ={
            overflow: sample.clip ? 'hidden' : '',
            'transform-style': sample.preserve ? 'preserve-3d' : 'flat',
            width: sample.width,
            height: sample.height
        } 

        if (sample.perspective) {
            css.perspective = stringUnit(sample.perspective);
        }

        if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY) ) {
            css['perspective-origin'] = `${stringUnit(sample.perspectiveOriginPositionX)} ${stringUnit(sample.perspectiveOriginPositionY)}`;
        }        
 
        return $store.read('/css/sorting', css); 

    }

    '*/page/colorview/toCSS' ($store, page = {}) {
        var sample = $store.read('/item/convert/style', page || {}) 

        var css ={
            'transform-style': sample.preserve ? 'preserve-3d' : 'flat'
        } 

        if (sample.perspective) {
            css.perspective = stringUnit(sample.perspective);
        }

        if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY) ) {
            css['perspective-origin'] = `${stringUnit(sample.perspectiveOriginPositionX)} ${stringUnit(sample.perspectiveOriginPositionY)}`;
        }        
 
        return $store.read('/css/sorting', css); 

    }    

    '*/page/cache/toCSS' ($store, page = {}) {
        var sample = $store.read('/item/convert/style', page || {}) 

        var css ={
            overflow: sample.clip ? 'hidden' : '',
            'transform-style': sample.preserve ? 'preserve-3d' : 'flat',
            width: sample.width,
            height: sample.height
        } 


        if (sample.perspective) {
            css.perspective = stringUnit(sample.perspective);
        }

        if (isPercentUnit(sample.perspectiveOriginPositionX) && isPercentUnit(sample.perspectiveOriginPositionY) ) {
            css['perspective-origin'] = `${stringUnit(sample.perspectiveOriginPositionX)} ${stringUnit(sample.perspectiveOriginPositionY)}`;
        }        


        return $store.read('/css/sorting', css); 
    }    

    '*/page/cache/toString' ($store, page) {
        var obj = $store.read('/page/cache/toCSS',  page) || {};

        return {
            css: $store.read('/css/toString', obj),
            obj
        }
    }    


}