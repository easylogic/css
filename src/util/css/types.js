export const UNIT_PX_STRING = 'px';
export const UNIT_EM_STRING = 'em';
export const UNIT_PERCENT_STRING = '%';

export const UNIT_PX = 'px';
export const UNIT_EM = 'em';
export const UNIT_PERCENT = 'percent';

export const UNIT_STRINGS = {
    [UNIT_PX]: UNIT_PX_STRING,
    [UNIT_EM]: UNIT_EM_STRING,
    [UNIT_PERCENT]: UNIT_PERCENT_STRING
}

export function px(value) { return value + UNIT_PX_STRING; }
export function em(value) { return value + UNIT_EM_STRING; }
export function percent(value) { return value + UNIT_PERCENT_STRING; }

export function isPX(unit) { return unit === UNIT_PX; }
export function isEM(unit) { return unit === UNIT_EM; }
export function isPercent(unit) { return unit === UNIT_PERCENT; }


export function unitString(unit) {
    return UNIT_STRINGS[unit]
}

export function unit(value, unit) {
    return value + unitString(unit);
}