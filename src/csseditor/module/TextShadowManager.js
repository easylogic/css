import BaseModule from "../../colorpicker/BaseModule";
import { GETTER } from "../../util/Store";

export default class TextShadowManager extends BaseModule { 

    [GETTER('textshadow/toCSS')] ($store, item = null, isExport = false) {

        var results = {} 
        var textshadow = $store.read('textshadow/toTextShadowString', item, isExport)

        if (textshadow) {
            results['text-shadow'] = textshadow; 
        }       

        return results
    }

    [GETTER('textshadow/cache/toCSS')] ($store, item = {}) {
       
        var results = {} 
        var textshadow = $store.read('textshadow/toTextShadowString', item, isExport)

        if (textshadow) {
            results['text-shadow'] = textshadow; 
        }     
        
        return results;

    }

    [GETTER('textshadow/toString')] ($store, image = null) {

        var obj = $store.read('textshadow/toCSS', image)

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')

    } 

    [GETTER('textshadow/toTextShadowString')] ($store, item = undefined ) {

        if (!item) return '';

        var results = []

        results.push(
            item.offsetX || '0px',
            item.offsetY || '0px',
            item.blurRadius || '0px',
            item.color
        )

        return results.join(' '); 
    }

}