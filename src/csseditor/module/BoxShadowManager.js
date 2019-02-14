import BaseModule from "../../colorpicker/BaseModule";
import { GETTER } from "../../util/Store";
import { stringUnit, EMPTY_STRING, WHITE_STRING } from "../../util/css/types";
import { keyMap } from "../../util/functions/func";

export default class BoxShadowManager extends BaseModule { 

    [GETTER('boxshadow/toCSS')] ($store, item = null, isExport = false) {

        var results = {} 
        var boxshadow = $store.read('boxshadow/toBoxShadowString', item, isExport)

        if (boxshadow) {
            results['box-shadow'] = boxshadow; 
        }       

        return results
    }

    [GETTER('boxshadow/cache/toCSS')] ($store, item = {}) {
       
        var results = {} 
        var boxshadow = $store.read('boxshadow/toBoxShadowString', item, isExport)

        if (boxshadow) {
            results['box-shadow'] = boxshadow; 
        }     
        
        return results;

    }

    [GETTER('boxshadow/toString')] ($store, image = null) {

        var obj = $store.read('boxshadow/toCSS', image)

        return keyMap(obj, (key, value) => {
            return `${key}: ${value};`
        }).join(WHITE_STRING)
    } 

    [GETTER('boxshadow/toBoxShadowString')] ($store, item = undefined ) {

        if (!item) return EMPTY_STRING;

        var results = [EMPTY_STRING]

        if (item.inset) {
            results.push('inset')
        }

        results.push(
            stringUnit(item.offsetX),
            stringUnit(item.offsetY),
            stringUnit(item.blurRadius),
            stringUnit(item.spreadRadius),
            item.color
        )

        return results.join(WHITE_STRING); 
    }

}