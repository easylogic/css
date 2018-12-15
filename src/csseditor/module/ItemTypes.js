export const ITEM_TYPE_PAGE = 'page';
export const ITEM_TYPE_LAYER = 'layer';
export const ITEM_TYPE_CIRCLE = 'circle';
export const ITEM_TYPE_GROUP = 'group';
export const ITEM_TYPE_IMAGE = 'image';
export const ITEM_TYPE_FILTER = 'filter';
export const ITEM_TYPE_BACKDROP_FILTER = 'backdrop-filter';
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


export const LAYER_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_LAYER,
    name: '',
    index: 0,    
    backgroundColor: 'rgba(0, 0, 0, 1)',
    parentId: '',
    mixBlendMode: 'normal',
    selected: true,
    visible: true,
    clipPathSvg: '',
    clipPathWidth: '',
    clipPathHeight: '',
    fitClipPathSize: false,
    x: '0px',
    y: '0px',
    width: '200px',
    height: '200px',
    rotate: 0,
    opacity: 1,
    filters: []
}

export const CIRCLE_DEFAULT_OBJECT = Object.assign({}, LAYER_DEFAULT_OBJECT, {
    borderRadius: '100px',
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

export const FILTER_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_FILTER,
    type: 'blur',
    value: 0
}


export const BACKDROPFILTER_DEFAULT_OBJECT = {
    itemType: ITEM_TYPE_BACKDROP_FILTER,
    type: 'blur',
    value: 0
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