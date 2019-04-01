import { EMPTY_STRING, WHITE_STRING } from "../css/types";

export function debounce (callback, delay) {

    var t = undefined;

    return function ($1, $2, $3, $4, $5) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback($1, $2, $3, $4, $5);
        }, delay || 300);
    }
}

export function keyEach (obj, callback) {
    Object.keys(obj).forEach( (key, index) => {
        callback (key, obj[key], index);
    })
}

export function keyMap (obj, callback) {
    return Object.keys(obj).map( (key, index) => {
        return callback (key, obj[key], index);
    })
}

export function get(obj, key, callback) {
    
    var returnValue = defaultValue(obj[key], key);

    if (isFunction( callback ) ) {
        return callback(returnValue);
    }

    return returnValue; 
}

export function defaultValue (value, defaultValue) {
    return typeof value == 'undefined' ? defaultValue : value;
}

export function isUndefined (value) {
    return typeof value == 'undefined' || value === null;
}

export function isNotUndefined (value) {
    return isUndefined(value) === false;
}

export function isArray (value) {
    return Array.isArray(value);
}

export function isBoolean (value) {
    return typeof value == 'boolean'
}

export function isString (value) {
    return typeof value == 'string'
}

export function isNotString (value) {
    return isString(value) === false;
}

export function isObject (value) {
    return typeof value == 'object' && !isArray(value) && value !== null; 
}

export function isFunction (value) {
    return typeof value == 'function'
}

export function isNumber (value) {
    return typeof value == 'number';
}

export function clone (obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function cleanObject (obj) {
    var realObject = {}
    Object.keys(obj).filter(key => {
        return !!obj[key]
    }).forEach(key => {
        realObject[key] = obj[key]
    });

    return realObject;
}

export function combineKeyArray (obj) {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            obj[key] = obj[key].join(', ')
        }
    })

    return obj;
}

export function flatKeyValue (obj, rootKey = EMPTY_STRING) {
    var values = {};

    Object.keys(obj).forEach(key => {
        var realKey = key; 
        if (rootKey !== EMPTY_STRING) {
            realKey = `${rootKey}.${key}`
        }

        if (isObject(obj[key])) {
            values = {...values, ...flatKeyValue(obj[key], realKey) }
        } else {
            values[realKey] = obj[key];
        }
    })

    return values; 
}

export function repeat (count) {
    return [...Array(count)];
}


const short_tag_regexp = /\<(\w*)([^\>]*)\/\>/gim;

const HTML_TAG = {
    'image': true,
    'input': true,
    'br': true
}


export const html = (strings, ...args) => {

    var results =  strings.map((it, index) => {
        
        var results = args[index] || EMPTY_STRING

        if (isFunction(results)) {
            results = results()
        }

        if (!isArray(results)) {
            results = [results]
        }

        results = results.map(r => {
            if (isObject(r)) {
                return Object.keys(r).map(key => {
                    return `${key}="${r[key]}"`
                }).join(WHITE_STRING)
            }

            return r
        }).join(EMPTY_STRING)

        return it + results;
    }).join(EMPTY_STRING);

    results = results.replace(short_tag_regexp, function (match, p1) {
        if (HTML_TAG[p1.toLowerCase()]) {
            return match;
        } else {
            return match.replace('/>', `></${p1}>`)
        }
    })

    return results; 
}