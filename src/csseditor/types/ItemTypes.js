import { UNIT_PX, UNIT_DEG, UNIT_PERCENT, UNIT_COLOR, pxUnit, percentUnit, EMPTY_STRING } from "../../util/css/types";
import { isNotUndefined } from "../../util/functions/func";

export const ITEM_TYPE_PAGE = 'page';
export const ITEM_TYPE_LAYER = 'layer';
export const ITEM_TYPE_CIRCLE = 'circle';
export const ITEM_TYPE_SHAPE = 'shape';
export const ITEM_TYPE_GROUP = 'group';
export const ITEM_TYPE_IMAGE = 'image';
export const ITEM_TYPE_BOXSHADOW = 'boxshadow';
export const ITEM_TYPE_TEXTSHADOW = 'textshadow';
export const ITEM_TYPE_COLORSTEP = 'colorstep';

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

export const ITEM_SET = 'item/set';
export const ITEM_GET = 'item/get';
export const ITEM_CONVERT_STYLE = 'item/convert/style';
export const ITEM_SET_ALL = 'item/set/all';
export const ITEM_SORT = 'item/sort';
export const ITEM_REMOVE_CHILDREN = 'item/remove/children';
export const ITEM_REMOVE = 'item/remove';
export const ITEM_TOGGLE_VISIBLE = 'item/toggle/visible';
export const ITEM_REMOVE_ALL = 'item/remove/all';
export const ITEM_FOCUS = 'item/focus';
export const ITEM_LOAD = 'item/load';
export const ITEM_INIT_CHILDREN = 'item/init/children'

/* page is equal to artboard */ 
export const PAGE_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_PAGE,
    is: IS_OBJECT,
    name: EMPTY_STRING,
    parentId: EMPTY_STRING,
    index: 0,
    width: pxUnit(400),
    height: pxUnit(300)
}

export const FILTER_DEFAULT_OBJECT = {
    'filterBlur': { index: 0, value: 0, unit: UNIT_PX },
    'filterGrayscale': { index: 10, value: 0, unit: UNIT_PERCENT },
    'filterHueRotate': { index: 20, value: 0, unit: UNIT_DEG },
    'filterInvert': { index: 30, value: 0, unit: UNIT_PERCENT },
    'filterBrightness': { index: 40, value: 100, unit: UNIT_PERCENT },
    'filterContrast': { index: 50, value: 100, unit: UNIT_PERCENT },
    'filterDropshadow': { index: 60 },
    'filterDropshadowOffsetX': { value: 0, unit: UNIT_PX },
    'filterDropshadowOffsetY': { value: 0, unit: UNIT_PX },
    'filterDropshadowBlurRadius': { value: 0, unit: UNIT_PX },
    'filterDropshadowColor': { value: 'black', unit: UNIT_COLOR },
    'filterOpacity': { index: 70, value: 100, unit: UNIT_PERCENT },
    'filterSaturate': { index: 80, value: 100, unit: UNIT_PERCENT },
    'filterSepia': { index: 90, value: 0, unit: UNIT_PERCENT }
}

export const FILTER_DEFAULT_OBJECT_KEYS = Object.keys(FILTER_DEFAULT_OBJECT).filter(key => {
    return isNotUndefined( FILTER_DEFAULT_OBJECT[key].index)
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
    return isNotUndefined(BACKDROP_DEFAULT_OBJECT[key].index)
});

export const CLIP_PATH_DEFAULT_OBJECT = {
    clipPathType: 'none',
    clipPathSideType: CLIP_PATH_SIDE_TYPE_NONE,
    clipPathSvg: EMPTY_STRING,
    fitClipPathSize: false,   
    clipText: false,
    clipPathRadiusX: undefined,
    clipPathRadiusY: undefined,
    clipPathCenterX: undefined,
    clipPathCenterY: undefined
}

/* layer can has children layers. */
export const LAYER_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_LAYER,
    is: IS_OBJECT,
    type: SHAPE_TYPE_RECT,
    name: EMPTY_STRING,
    index: 0,    
    backgroundColor: 'rgba(0, 0, 0, 1)',
    parentId: EMPTY_STRING,
    mixBlendMode: 'normal',
    selected: true,
    visible: true,
    x: pxUnit(0),
    y: pxUnit(0),
    width: pxUnit(200),
    height: pxUnit(200),
    rotate: 0,
    opacity: 1,
    fontFamily: 'serif',
    fontSize: '13px',
    fontWeight: 400,
    wordBreak: 'break-word',
    wordWrap: 'break-word',
    lineHeight: 1.6,
    content: EMPTY_STRING,
    ...CLIP_PATH_DEFAULT_OBJECT,
    ...FILTER_DEFAULT_OBJECT,
    ...BACKDROP_DEFAULT_OBJECT
}


export const CIRCLE_DEFAULT_OBJECT = {...LAYER_DEFAULT_OBJECT, 
    type: SHAPE_TYPE_CIRCLE,
    borderRadius: percentUnit(100), 
    fixedRadius: true
}

export const POLYGON_DEFAULT_OBJECT = {...LAYER_DEFAULT_OBJECT, 
    type: SHAPE_TYPE_POLYGON,
    fixedShape: true
}

export const GROUP_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_GROUP,
    is: IS_OBJECT,
    name: EMPTY_STRING,
    index: 0,    
    parentId: EMPTY_STRING,
    selected: true,
    visible: true,
    x: pxUnit(0),
    y: pxUnit(0)
}

export const IMAGE_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_IMAGE,
    is: IS_ATTRIBUTE,
    type: IMAGE_ITEM_TYPE_STATIC,
    fileType: EMPTY_STRING,       // select file type as imagefile,  png, gif, jpg, svg if type is image 
    index: 0,    
    parentId: EMPTY_STRING,    
    angle: 90,
    color: 'red',
    radialType: 'ellipse',
    radialPosition: POSITION_CENTER,
    visible: true,
    isClipPath: false, 
    pattern: {},
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
    backgroundClip: null,
    backgroundImage: null,
    backgroundImageDataURI: null
}

export const BOXSHADOW_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_BOXSHADOW,
    is: IS_ATTRIBUTE,
    offsetX: pxUnit(0),
    offsetY: pxUnit(0),
    inset: false,
    blurRadius: pxUnit(0),
    spreadRadius: pxUnit(0),
    color: 'rgb(0, 0, 0)'
}


export const TEXTSHADOW_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_TEXTSHADOW,
    is: IS_ATTRIBUTE,
    offsetX: pxUnit(0),
    offsetY: pxUnit(0),
    blurRadius: pxUnit(0),
    color: 'rgb(0, 0, 0)'
}

export const COLORSTEP_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_COLORSTEP,
    is: IS_ATTRIBUTE,
    parentId: EMPTY_STRING,
    percent: 0,
    color: 'rgba(0, 0, 0, 0)'
}

export const DEFAULT_TOOL_SIZE = {
    'board.offset': { left: 0, top : 0},
    'page.offset': { left: 0, top : 0},
    'board.scrollTop': 0,
    'board.scrollLeft': 0
}

