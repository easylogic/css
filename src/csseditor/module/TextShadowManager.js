import BaseModule from "../../colorpicker/BaseModule";
import { GETTER } from "../../util/Store";
import { stringUnit, EMPTY_STRING, WHITE_STRING } from "../../util/css/types";
import { keyMap } from "../../util/functions/func";

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

        keyMap(obj, (key, value) => {
            return `${key}: ${value};`
        }).join(WHITE_STRING)
    } 

    [GETTER('textshadow/toTextShadowString')] ($store, item = undefined ) {

        if (!item) return EMPTY_STRING;

        var results = []

        results.push(
            stringUnit(item.offsetX),
            stringUnit(item.offsetY),
            stringUnit(item.blurRadius),
            item.color
        )

        return results.join(WHITE_STRING); 
    }

}