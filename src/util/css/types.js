import { percent2px, em2px, px2percent, em2percent, percent2em, px2em, parseParamNumber } from "../filter/functions";

export const UNIT_VALUE = 'value';
export const UNIT_PX = 'px';
export const UNIT_EM = 'em';
export const UNIT_PERCENT = 'percent';
export const UNIT_DEG = 'deg';
export const UNIT_COLOR = 'color'

export const UNIT_VALUE_STRING = '';
export const UNIT_PX_STRING = 'px';
export const UNIT_EM_STRING = 'em';
export const UNIT_PERCENT_STRING = '%';
export const UNIT_DEG_STRING = '°';
export const UNIT_COLOR_STRING = '';

export const UNIT_STRINGS = {
    [UNIT_VALUE]: UNIT_VALUE_STRING,
    [UNIT_PX]: UNIT_PX_STRING,
    [UNIT_EM]: UNIT_EM_STRING,
    [UNIT_PERCENT]: UNIT_PERCENT_STRING,
    [UNIT_DEG]: UNIT_DEG,
    [UNIT_COLOR]: UNIT_COLOR_STRING
}

export function value(value) { return value }
export function px(value) { return value + UNIT_PX_STRING; }
export function em(value) { return value + UNIT_EM_STRING; }
export function percent(value) { return value + UNIT_PERCENT_STRING; }
export function deg(value) { return value + UNIT_DEG; }
export function color(value) { return value + UNIT_COLOR_STRING; }

export function isPX(unit) { return unit === UNIT_PX; }
export function isEM(unit) { return unit === UNIT_EM; }
export function isPercent(unit) { return unit === UNIT_PERCENT; }
export function isDeg(unit) { return unit === UNIT_DEG; }
export function isColor(unit) { return unit === UNIT_COLOR; }

export function unitString(unit, defaultString = '') {
    return UNIT_STRINGS[unit] || defaultString
}

export function unit(value, unit) {
    return value + unitString(unit);
}

export function stringUnit(obj) {
    return unit(obj.value, obj.unit);
}

export function unitValue(obj) {
    return obj.value; 
}

export function isUnit (obj, unit) {
    return obj && obj.unit == unit; 
}

export function isPxUnit(obj) {
    return isUnit(obj, UNIT_PX)
}

export function isPercentUnit(obj) {
    return isUnit(obj, UNIT_PERCENT)
}

export function isEmUnit(obj) {
    return isUnit(obj, UNIT_EM)
}

export function isColorUnit(obj) {
    return isUnit(obj, UNIT_COLOR)
}

export function isDegUnit(obj) {
    return isUnit(obj, UNIT_DEG);
}

export function isValueUnit(obj) {
    return isUnit(obj, UNIT_VALUE);
}

export function unitObject(value, unit) {
    return {unit, value}
} 

export function valueUnit (value) {
    return { unit: UNIT_VALUE, value }
}

export function percentUnit (value) {
    return { unit: UNIT_PERCENT, value }
}

export function pxUnit (value) {
    return { unit: UNIT_PX, value }
}

export function degUnit (value) {
    return { unit: UNIT_DEG, value }
}

export function emUnit (value) {
    return { unit: UNIT_EM, value }
}

export function colorUnit (value) {
    return { unit: UNIT_COLOR, value }
}

export function string2unit (str) {
    if (typeof str != 'string') return str; 
    if (str.includes(UNIT_PX)) {
        return pxUnit(parseParamNumber(str))
    } else if (str.includes(UNIT_PERCENT_STRING)) {
        return percentUnit(parseParamNumber(str))
    } else if (str.includes(UNIT_EM)) {
        return emUnit(parseParamNumber(str))        
    } else if (str.includes(UNIT_DEG)) {
        return degUnit(parseParamNumber(str))
    }

    return pxUnit(parseParamNumber(str))
}

export function value2px (obj, maxValue, fontSize = 16) {
    if (isPxUnit(obj)) {
        return obj.value; 
    } else if (isPercentUnit(obj)) {
        return percent2px(obj.value, maxValue);
    } else if (isEmUnit(obj)) {
        return em2px(obj.value, maxValue, fontSize);
    }
}

export function value2percent (obj, maxValue, fontSize = 16) {
    if (isPxUnit(obj)) {
        return px2percent(obj.value, maxValue); 
    } else if (isPercentUnit(obj)) {
        return obj.value;
    } else if (isEmUnit(obj)) {
        return em2percent(obj.value, maxValue, fontSize);
    }
}

export function value2em (obj, maxValue, fontSize = 16) {
    if (isPxUnit(obj)) {
        return px2em(obj.value, maxValue); 
    } else if (isPercentUnit(obj)) {
        return percent2em(obj.value, maxValue, fontSize); 
    } else if (isEmUnit(obj)) {
        return obj.value;
    }
}