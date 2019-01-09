export function debounce (callback, delay) {

    var t = undefined;

    return function (...args) {
        if (t) {
            clearTimeout(t);
        }

        t = setTimeout(function () {
            callback(...args);
        }, delay || 300);
    }
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
    return typeof value == 'undefined' || value == null;
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

export default {
    debounce
}