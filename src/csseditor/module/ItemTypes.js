import { UNIT_PX, UNIT_DEG, UNIT_PERCENT, UNIT_COLOR, pxUnit } from "../../util/css/types";

export const ITEM_TYPE_PAGE = 'page';
export const ITEM_TYPE_LAYER = 'layer';
export const ITEM_TYPE_CIRCLE = 'circle';
export const ITEM_TYPE_GROUP = 'group';
export const ITEM_TYPE_IMAGE = 'image';
export const ITEM_TYPE_BOXSHADOW = 'boxshadow';
export const ITEM_TYPE_TEXTSHADOW = 'textshadow';
export const ITEM_TYPE_COLORSTEP = 'colorstep';

export const PAGE_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_PAGE,
    name: '',
    parentId: '',
    index: 0,
    width: '400px',
    height: '300px'
}

export const FILTER_DEFAULT_OBJECT = {
    'filterBlur': { index: 0, value: 0, unit: UNIT_PX },
    'filterGrayscale': { index: 10, value: 0, unit: UNIT_PERCENT },
    'filterHueRotate': { index: 20, value: 0, unit: UNIT_DEG },
    'filterInvert': { index: 30, value: 0, unit: UNIT_PERCENT },
    'filterBrightness': { index: 40, value: 100, unit: UNIT_PERCENT },
    'filterContrast': { index: 50, value: 100, unit: UNIT_PERCENT },
    'filterDropshadow': { index: 60 },
    'filterDropshadowOffsetX': { value: 10, unit: UNIT_PX },
    'filterDropshadowOffsetY': { value: 20, unit: UNIT_PX },
    'filterDropshadowBlurRadius': { value: 30, unit: UNIT_PX },
    'filterDropshadowColor': { value: 'black', unit: UNIT_COLOR },
    'filterOpacity': { index: 70, value: 100, unit: UNIT_PERCENT },
    'filterSaturate': { index: 80, value: 100, unit: UNIT_PERCENT },
    'filterSepia': { index: 90, value: 0, unit: UNIT_PERCENT }
}

export const FILTER_DEFAULT_OBJECT_KEYS = Object.keys(FILTER_DEFAULT_OBJECT).filter(key => {
    return typeof FILTER_DEFAULT_OBJECT[key].index != 'undefined'
});

export const BACKDROP_DEFAULT_OBJECT = {
    'backdropBlur': { index: 0, value: 0, unit: UNIT_PX },
    'backdropGrayscale': { index: 10, value: 0, unit: UNIT_PERCENT },
    'backdropHueRotate': { index: 20, value: 0, unit: UNIT_DEG },
    'backdropInvert': { index: 30, value: 0, unit: UNIT_PERCENT },
    'backdropBrightness': { index: 40, value: 100, unit: UNIT_PERCENT },
    'backdropContrast': { index: 50, value: 100, unit: UNIT_PERCENT },
    'backdropDropshadow': { index: 60 },
    'backdropDropshadowOffsetX': { value: 10, unit: UNIT_PX },
    'backdropDropshadowOffsetY': { value: 20, unit: UNIT_PX },
    'backdropDropshadowBlurRadius': { value: 30, unit: UNIT_PX },
    'backdropDropshadowColor': { value: 'black', unit: UNIT_COLOR },
    'backdropOpacity': { index: 70, value: 100, unit: UNIT_PERCENT },
    'backdropSaturate': { index: 80, value: 100, unit: UNIT_PERCENT },
    'backdropSepia': { index: 90, value: 0, unit: UNIT_PERCENT }
}

export const BACKDROP_DEFAULT_OBJECT_KEYS = Object.keys(BACKDROP_DEFAULT_OBJECT).filter(key => {
    return typeof BACKDROP_DEFAULT_OBJECT[key].index != 'undefined'
});

export const CLIP_PATH_DEFAULT_OBJECT = {
    clipPathType: 'none',
    clipPathSideType: CLIP_PATH_SIDE_TYPE_NONE,
    clipPathSvg: '',
    fitClipPathSize: false,   
    clipText: false,
    clipPathRadiusX: undefined,
    clipPathRadiusY: undefined,
    clipPathCenterX: undefined,
    clipPathCenterY: undefined
}

export const LAYER_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_LAYER,
    name: '',
    index: 0,    
    backgroundColor: 'rgba(0, 0, 0, 1)',
    parentId: '',
    mixBlendMode: 'normal',
    selected: true,
    visible: true,
    x: '0px',
    y: '0px',
    width: '200px',
    height: '200px',
    rotate: 0,
    opacity: 1,
    fontFamily: 'serif',
    fontSize: '13px',
    fontWeight: 400,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    lineHeight: 1.6,
    content: '',
    ...CLIP_PATH_DEFAULT_OBJECT,
    ...FILTER_DEFAULT_OBJECT,
    ...BACKDROP_DEFAULT_OBJECT
}


export const CIRCLE_DEFAULT_OBJECT = Object.assign({}, LAYER_DEFAULT_OBJECT, {
    borderRadius: pxUnit(100),
    fixedRadius: true
})

export const GROUP_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_GROUP,
    name: '',
    index: 0,    
    parentId: '',
    selected: true,
    visible: true,
    x: '0px',
    y: '0px'
}

export const IMAGE_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_IMAGE,
    type: 'static',
    fileType: '',       // select file type as imagefile,  png, gif, jpg, svg if type is image 
    index: 0,    
    parentId: '',    
    angle: 90,
    color: 'red',
    radialType: 'ellipse',
    radialPosition: 'center',
    visible: true,
    isClipPath: false, 
    backgroundRepeat: null,
    backgroundSize: null,
    backgroundSizeWidth: 0,
    backgroundSizeHeight: 0,
    backgroundOrigin: null, 
    backgroundPositionX: undefined,
    backgroundPositionY: undefined,
    backgroundBlendMode: 'normal',
    backgroundColor: null,
    backgroundAttachment: null,
    backgroundClip: null
}

export const BOXSHADOW_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_BOXSHADOW,
    offsetX: 0,
    offsetY: 0,
    inset: false,
    blurRadius: 0,
    spreadRadius: 0,
    color: 'gray'
}


export const TEXTSHADOW_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_TEXTSHADOW,
    offsetX: 0,
    offsetY: 0,
    blurRadius: 0,
    color: 'gray'
}

export const COLORSTEP_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_COLORSTEP,
    parentId: '',
    percent: 0,
    color: 'rgba(0, 0, 0, 0)'
}


export const IMAGE_ITEM_TYPE_LINEAR = 'linear';
export const IMAGE_ITEM_TYPE_REPEATING_LINEAR = 'repeating-linear';
export const IMAGE_ITEM_TYPE_RADIAL = 'radial';
export const IMAGE_ITEM_TYPE_REPEATING_RADIAL = 'repeating-radial';
export const IMAGE_ITEM_TYPE_CONIC = 'conic';
export const IMAGE_ITEM_TYPE_REPEATING_CONIC = 'repeating-conic';
export const IMAGE_ITEM_TYPE_STATIC = 'static';
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
