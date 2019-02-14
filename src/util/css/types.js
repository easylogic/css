import { percent2px, em2px, px2percent, em2percent, percent2em, px2em, parseParamNumber } from "../filter/functions";
import { isString, isNotString, isNumber } from "../functions/func";

export const EMPTY_STRING = '' 
export const WHITE_STRING = ' ';

export const UNIT_VALUE = 'value';
export const UNIT_PX = 'px';
export const UNIT_EM = 'em';
export const UNIT_PERCENT = 'percent';
export const UNIT_DEG = 'deg';
export const UNIT_COLOR = 'color'

export const UNIT_VALUE_STRING = EMPTY_STRING;
export const UNIT_PX_STRING = 'px';
export const UNIT_EM_STRING = 'em';
export const UNIT_PERCENT_STRING = '%';
export const UNIT_DEG_STRING = '°';
export const UNIT_COLOR_STRING = EMPTY_STRING;

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

export function unitString(unit, defaultString = EMPTY_STRING) {
    return UNIT_STRINGS[unit] || defaultString
}

export function unit(value, unit) {
    return value + unitString(unit);
}

export function stringUnit(obj = pxUnit(0)) {
    return unit(obj.value, obj.unit);
}

export function unitValue(obj = pxUnit(0)) {
    if (isNumber(obj)) return obj; 
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
    if (isNotString(str)) return str; 
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

export function convertPercentUnit (obj) {
    if (isValueUnit(obj)) {
        if (obj.value == 'left' || obj.value == 'top') {
            return percentUnit(0);
        } else if (obj.value == 'right' || obj.value == 'bottom') {
            return percentUnit(100);
        } else if (obj.value == 'center') {
            return percentUnit(50);
        }
    }

    return obj; 
}

export const ITEM_TYPE_PAGE = 'page';
export const ITEM_TYPE_LAYER = 'layer';
export const ITEM_TYPE_CIRCLE = 'circle';
export const ITEM_TYPE_SHAPE = 'shape';
export const ITEM_TYPE_GROUP = 'group';
export const ITEM_TYPE_IMAGE = 'image';
export const ITEM_TYPE_BOXSHADOW = 'boxshadow';
export const ITEM_TYPE_TEXTSHADOW = 'textshadow';
export const ITEM_TYPE_COLORSTEP = 'colorstep';
export const ITEM_TYPE_TIMELINE = 'timeline';
export const ITEM_TYPE_KEYFRAME = 'keyframe';

export const IS_OBJECT = 'object';
export const IS_ATTRIBUTE = 'attribute';


export const SHAPE_TYPE_RECT = 'rect';
export const SHAPE_TYPE_CIRCLE = 'circle';
export const SHAPE_TYPE_POLYGON = 'polygon';

export const IMAGE_ITEM_TYPE_LINEAR = 'linear';
export const IMAGE_ITEM_TYPE_REPEATING_LINEAR = 'repeating-linear';
export const IMAGE_ITEM_TYPE_RADIAL = 'radial';
export const IMAGE_ITEM_TYPE_REPEATING_RADIAL = 'repeating-radial';
export const IMAGE_ITEM_TYPE_CONIC = 'conic';
export const IMAGE_ITEM_TYPE_REPEATING_CONIC = 'repeating-conic';
export const IMAGE_ITEM_TYPE_STATIC = 'static';
export const IMAGE_ITEM_TYPE_DIAMOND = 'diamond';
export const IMAGE_ITEM_TYPE_IMAGE = 'image';


export const CLIP_PATH_TYPE_NONE = 'none';
export const CLIP_PATH_TYPE_CIRCLE = 'circle';
export const CLIP_PATH_TYPE_ELLIPSE = 'ellipse';
export const CLIP_PATH_TYPE_INSET = 'inset';
export const CLIP_PATH_TYPE_POLYGON = 'polygon';
export const CLIP_PATH_TYPE_SVG = 'svg';

export const CLIP_PATH_SIDE_TYPE_NONE = 'none';
export const CLIP_PATH_SIDE_TYPE_CLOSEST = 'closest-side';
export const CLIP_PATH_SIDE_TYPE_FARTHEST = 'farthest-side';

export const POSITION_TOP = 'top'
export const POSITION_LEFT = 'left'
export const POSITION_RIGHT = 'right'
export const POSITION_BOTTOM = 'bottom'
export const POSITION_CENTER = 'center'

export const IMAGE_FILE_TYPE_JPG = 'jpg'
export const IMAGE_FILE_TYPE_GIF = 'gif'
export const IMAGE_FILE_TYPE_PNG = 'png'
export const IMAGE_FILE_TYPE_SVG = 'svg'

export const GUIDE_TYPE_VERTICAL = '|';
export const GUIDE_TYPE_HORIZONTAL = '-';

export const SEGMENT_TYPE_ROTATE = 'rotate';
export const SEGMENT_TYPE_MOVE = 'move';
export const SEGMENT_TYPE_TOP = 'to top';
export const SEGMENT_TYPE_LEFT = 'to left';
export const SEGMENT_TYPE_RIGHT = 'to right';
export const SEGMENT_TYPE_BOTTOM = 'to bottom';
export const SEGMENT_TYPE_TOP_RIGHT = 'to top right';
export const SEGMENT_TYPE_TOP_LEFT = 'to top left';
export const SEGMENT_TYPE_BOTTOM_RIGHT = 'to bottom right';
export const SEGMENT_TYPE_BOTTOM_LEFT = 'to bottom left';

export const SEGMENT_CHECK = {
    [SEGMENT_TYPE_MOVE]: {move: true},
    [SEGMENT_TYPE_TOP]: {yIndex : 0},
    [SEGMENT_TYPE_TOP_LEFT]: {yIndex : 0, xIndex: 0},
    [SEGMENT_TYPE_TOP_RIGHT]: {yIndex : 0, xIndex: 2},
    [SEGMENT_TYPE_LEFT]: {xIndex : 0},
    [SEGMENT_TYPE_RIGHT]: {xIndex : 2},
    [SEGMENT_TYPE_BOTTOM]: {yIndex : 2},
    [SEGMENT_TYPE_BOTTOM_LEFT]: {yIndex : 2, xIndex: 0},
    [SEGMENT_TYPE_BOTTOM_RIGHT]: {yIndex : 2, xIndex: 2}
}