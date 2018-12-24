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

    if (typeof callback == 'function') {
        return callback(returnValue);
    }

    return returnValue; 
}

export function defaultValue (value, defaultValue) {
    return typeof value == 'undefined' ? defaultValue : value;
}

export default {
    debounce
}