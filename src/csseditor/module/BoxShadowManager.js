import BaseModule from "../../colorpicker/BaseModule";

export default class BoxShadowManager extends BaseModule { 

    '*/boxshadow/toCSS' ($store, item = null, isExport = false) {

        var results = {} 
        var boxshadow = $store.read('/boxshadow/toBoxShadowString', item, isExport)

        if (boxshadow) {
            results['box-shadow'] = boxshadow; 
        }       

        return results
    }

    '*/boxshadow/cache/toCSS' ($store, item = {}) {
       
        var results = {} 
        var boxshadow = $store.read('/boxshadow/toBoxShadowString', item, isExport)

        if (boxshadow) {
            results['box-shadow'] = boxshadow; 
        }     
        
        return results;

    }

    '*/boxshadow/toString' ($store, image = null) {

        var obj = $store.read('/boxshadow/toCSS', image)

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')

    } 

    '*/boxshadow/toBoxShadowString' ($store, item = undefined ) {

        if (!item) return '';

        var results = ['']

        if (item.inset) {
            results[0] = 'inset'
        }

        results.push(
            item.offsetX || '0px',
            item.offsetY || '0px',
            item.blurRadius || '0px',
            item.spreadRadius || '0px',
            item.color
        )

        return results.join(' '); 
    }

}