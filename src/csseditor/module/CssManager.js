import BaseModule from "../../colorpicker/BaseModule";
import { parseParamNumber } from "../../util/gl/filter/util";
import { GETTER } from "../../util/Store";

var ordering = {
    'position': 1,
    'left': 2,
    'top': 2,
    'right': 2,
    'bottom': 2,
    'width': 3,
    'height': 3,

    'font-size': 4,
    'font-family': 4, 

    'opacity': 10,
    'border-radius': 10,

    'box-shadow': 15,
    'text-shadow': 15,
    'filter': 15,

    'background-clip': 50, 
    '-webkit-background-clip': 50, 

    'background-repeat': 100,
    'background-blend-mode': 100,
    'background-image' : 100,
    'background-size' : 100,
    'background-position' : 100,

    'transform': 1000

}

const MAX_ORDER = Number.MAX_SAFE_INTEGER;

export default class CssManager extends BaseModule {

    [GETTER('css/filtering')] ($store, style) {
        var newStyle = style; 

        if (newStyle['background-blend-mode'] == 'normal') {
            delete newStyle['background-blend-mode'];
        }

        if (newStyle['mix-blend-mode'] == 'normal') {
            delete newStyle['mix-blend-mode'];
        }        

        if (parseParamNumber(newStyle.opacity) == 1) {
            delete newStyle.opacity;
        }

        if (parseParamNumber(newStyle.left) == 0) {
            delete newStyle.left;
        }

        if (parseParamNumber(newStyle.top) == 0) {
            delete newStyle.top;
        }        

        if (newStyle.transform == 'none') {
            delete newStyle.transform;
        }

        if (newStyle['transform-style'] == 'float') {
            delete newStyle['transform-style'];
        }

        return newStyle; 
    }

    [GETTER('css/sorting')] ($store, style) {

        style = $store.read('css/filtering', style);

        var keys = Object.keys(style);

        keys.sort( ( a, b ) => {
            var aN = ordering[a] || MAX_ORDER 
            var bN = ordering[b] || MAX_ORDER 

            if (aN == bN) return 0; 

            return aN < bN ? -1 : 1; 
        })

        var newStyle = {} 
        keys.forEach(key => {
            newStyle[key] = style[key]; 
        })

        return newStyle;
    }    

    [GETTER('css/toString')] ($store, style) {
        var newStyle = $store.read('css/sorting', style);        

        return Object.keys(newStyle).filter(key => {
            return !!newStyle[key]
        }).map(key => {
            return `${key}: ${newStyle[key]}`
        }).join(';'); 
    }

    [GETTER('css/generate')] ($store, css) {
        var results = {};

        Object.keys(css).forEach(key => {
            if (!results[key]) {
                results[key] = [] 
            }

            results[key].push(css[key]);
        })

        Object.keys(results).forEach(key => {
            if (Array.isArray(results[key])) {
                results[key] = results[key].join(', ')
            }
        })

        return results;
    }
}