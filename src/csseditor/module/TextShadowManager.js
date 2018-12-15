import BaseModule from "../../colorpicker/BaseModule";

export default class TextShadowManager extends BaseModule { 

    '*/textshadow/toCSS' ($store, item = null, isExport = false) {

        var results = {} 
        var textshadow = $store.read('/textshadow/totextShadowString', item, isExport)

        if (textshadow) {
            results['text-shadow'] = textshadow; 
        }       

        return results
    }

    '*/textshadow/cache/toCSS' ($store, item = {}) {
       
        var results = {} 
        var textshadow = $store.read('/textshadow/toTextShadowString', item, isExport)

        if (textshadow) {
            results['text-shadow'] = textshadow; 
        }     
        
        return results;

    }

    '*/textshadow/toString' ($store, image = null) {

        var obj = $store.read('/textshadow/toCSS', image)

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')

    } 

    '*/textshadow/toTextShadowString' ($store, item = undefined ) {

        if (!item) return '';

        results = []

        results.push(
            item.offsetX || '0px',
            item.offsetY || '0px',
            item.blurRadius || '0px',
            item.color
        )

        return results.join(' '); 
    }

}