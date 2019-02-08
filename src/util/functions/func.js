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

export function flatKeyValue (obj, rootKey = '') {
    var values = {};

    Object.keys(obj).forEach(key => {
        var realKey = key; 
        if (rootKey !== '') {
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


export const html = (strings, ...args) => {

    return strings.map((it, index) => {
        
        var results = args[index] || ''

        if (isFunction(results)) {
            results = results()
        } else if (isArray(results)) {
            results = results.join('')
        }

        return it + results;
    }).join('')
}