import ImageLoader from '../../util/ImageLoader'
import BaseModule from "../../colorpicker/BaseModule";
import { ImageToRGB, palette } from '../../util/functions/image';
import { get, defaultValue, isFunction, isUndefined, isNumber, isNotUndefined } from '../../util/functions/func';
import { 
    IMAGE_ITEM_TYPE_LINEAR, 
    IMAGE_ITEM_TYPE_REPEATING_LINEAR, 
    IMAGE_ITEM_TYPE_RADIAL, 
    IMAGE_ITEM_TYPE_REPEATING_RADIAL, 
    IMAGE_ITEM_TYPE_CONIC, 
    IMAGE_ITEM_TYPE_REPEATING_CONIC, 
    IMAGE_ITEM_TYPE_IMAGE, 
    IMAGE_ITEM_TYPE_STATIC, 
    POSITION_CENTER,
    POSITION_TOP,
    POSITION_LEFT,
    POSITION_RIGHT,
    POSITION_BOTTOM,
    IMAGE_FILE_TYPE_JPG,
    IMAGE_FILE_TYPE_PNG,
    IMAGE_FILE_TYPE_GIF,
    IMAGE_FILE_TYPE_SVG
} from './ItemTypes';
import { px, isPX, isEM, em, percent, stringUnit, valueUnit, unitObject, percentUnit, EMPTY_STRING } from '../../util/css/types';
import { GETTER } from '../../util/Store';
import { IMAGE_GET_FILE, IMAGE_GET_URL, IMAGE_GET_BLOB, IMAGE_TYPE_IS_GRADIENT, IMAGE_TYPE_IS_NOT_GRADIENT, IMAGE_TYPE_IS_LINEAR, IMAGE_TYPE_IS_RADIAL, IMAGE_TYPE_IS_CONIC, IMAGE_TYPE_IS_IMAGE, IMAGE_TYPE_IS_STATIC, IMAGE_ANGLE, IMAGE_RADIAL_POSITION, IMAGE_BACKGROUND_SIZE_TO_CSS, IMAGE_TO_BACKGROUND_POSITION_STRING, IMAGE_TO_BACKGROUND_SIZE_STRING, IMAGE_TO_CSS, IMAGE_TO_IMAGE_STRING, IMAGE_TO_BACKGROUND_REPEAT_STRING, IMAGE_TO_BACKGROUND_BLEND_MODE_STRING, IMAGE_TO_STRING, IMAGE_TO_LINEAR, IMAGE_TO_RADIAL, IMAGE_TO_CONIC, IMAGE_TO_IMAGE, IMAGE_TO_STATIC, IMAGE_GET_UNIT_VALUE, IMAGE_GET_STEP_VALUE, IMAGE_TO_ITEM_STRING, IMAGE_TO_CONIC_ITEM_STRING, IMAGE_CACHE_TO_CSS, IMAGE_TO_LINEAR_RIGHT } from './ImageTypes';

const DEFINED_ANGLES = {
    'to top': 0,
    'to top right': 45,    
    'to right': 90,
    'to bottom right': 135,    
    'to bottom': 180,
    'to bottom left': 225,    
    'to left': 270,
    'to top left' : 315

}

const DEFINED_DIRECTIONS = {
    '0' : 'to top',
    '45': 'to top right',    
    '90': 'to right',
    '135': 'to bottom right',        
    '180': 'to bottom',
    '225': 'to bottom left',            
    '270': 'to left',
    '315': 'to top left'
}

const DEFINED_POSITIONS = {
    [POSITION_CENTER] : true, 
    [POSITION_TOP] : true, 
    [POSITION_LEFT] : true, 
    [POSITION_RIGHT] : true,
    [POSITION_BOTTOM] : true 
}

const IMAGE_LIST = [
    IMAGE_FILE_TYPE_JPG,
    IMAGE_FILE_TYPE_PNG,
    IMAGE_FILE_TYPE_GIF,
    IMAGE_FILE_TYPE_SVG
]

const LINEAR_GRADIENT_LIST = [IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_REPEATING_LINEAR];
const RADIAL_GRADIENT_LIST = [IMAGE_ITEM_TYPE_RADIAL, IMAGE_ITEM_TYPE_REPEATING_RADIAL];
const CONIC_GRADIENT_LIST = [IMAGE_ITEM_TYPE_CONIC, IMAGE_ITEM_TYPE_REPEATING_CONIC];
const IMAGE_GRADIENT_LIST = [IMAGE_ITEM_TYPE_IMAGE];
const STATIC_GRADIENT_LIST = [IMAGE_ITEM_TYPE_STATIC];

export default class ImageManager extends BaseModule { 
 
    [GETTER(IMAGE_GET_FILE)] ($store, files, callback, colorCount = 16) {
        (files || []).forEach(file => {
            var fileType = file.name.split('.').pop();
            if (IMAGE_LIST.includes(fileType)) {

                if (isFunction(callback)) {
                    new ImageLoader(file).getImage(image => {

                        ImageToRGB(file, { maxWidth: 100 }, (results) => {
                            callback ({
                                datauri: image.src,                 // export 용 
                                colors: palette(results, colorCount),    
                                url: URL.createObjectURL(file),     // 화면 제어용 
                                fileType 
                            })
                            
                        })
                    })

                }
            }
        });
    }

    [GETTER(IMAGE_GET_URL)] ($store, urls, callback, colorCount = 16) {
        (urls || []).forEach(url => {
            var fileType = url.split('.').pop();
            if (IMAGE_LIST.includes(fileType)) {

                if (isFunction(callback)) {
                    ImageToRGB(url, { maxWidth: 100 }, (results) => {
                        callback ({
                            colors: palette(results, colorCount),    
                            url,
                            fileType 
                        })
                        
                    })
                }
            }
        });
    }    

    [GETTER(IMAGE_GET_BLOB)] ($store, blobs, callback) {
        (blobs || []).forEach(file => {
            if (isFunction(callback)) {
                new ImageLoader(file, { 
                    forceDataURI: true
                }).getImage(image => {
                    var url = file; 
                    var svg = EMPY; 
                    var svgContent = image.src.split('data:image/svg+xml;charset=utf-8;base64,'); 

                    if (svgContent.length > 1) {
                        svg = atob(svgContent[1]);
                    }

                    if (url instanceof Blob) {
                        url = URL.createObjectURL(file)
                    }

                    callback ({
                        datauri: image.src,                 // export 용 
                        url     // 화면 제어용 
                    })
                })
            }
        });
    }    

    [GETTER(IMAGE_TYPE_IS_GRADIENT)] ($store, type) {
        return $store.read(IMAGE_TYPE_IS_LINEAR, type) || $store.read(IMAGE_TYPE_IS_RADIAL, type) || $store.read(IMAGE_TYPE_IS_CONIC, type);
    }

    [GETTER(IMAGE_TYPE_IS_NOT_GRADIENT)] ($store, type) {
        return $store.read(IMAGE_TYPE_IS_GRADIENT, type) == false;
    }    

    [GETTER(IMAGE_TYPE_IS_LINEAR)] ($store, type) {
        return LINEAR_GRADIENT_LIST.includes(type)
    }

    [GETTER(IMAGE_TYPE_IS_RADIAL)] ($store, type) {
        return RADIAL_GRADIENT_LIST.includes(type)
    }    

    [GETTER(IMAGE_TYPE_IS_CONIC)] ($store, type) {
        return CONIC_GRADIENT_LIST.includes(type)
    }        

    [GETTER(IMAGE_TYPE_IS_IMAGE)] ($store, type) {
        return IMAGE_GRADIENT_LIST.includes(type)
    }

    [GETTER(IMAGE_TYPE_IS_STATIC)] ($store, type) {
        return STATIC_GRADIENT_LIST.includes(type)
    }    

    [GETTER(IMAGE_ANGLE)] ($store, angle = EMPTY_STRING) {
        return isUndefined(DEFINED_ANGLES[angle]) ? angle : (DEFINED_ANGLES[angle] || 0);
    }

    [GETTER(IMAGE_RADIAL_POSITION)] ($store, position = EMPTY_STRING) {
        return position  //|| $store.read('image/get', 'radialPosition');
    }

    [GETTER(IMAGE_BACKGROUND_SIZE_TO_CSS)] ($store, image = null, isExport = false) {

        var results = {} 
        var backgroundPosition = $store.read(IMAGE_TO_BACKGROUND_POSITION_STRING, image, isExport)
        var backgroundSize = $store.read(IMAGE_TO_BACKGROUND_SIZE_STRING, image, isExport)
        if (backgroundSize) {
            results['background-size'] = backgroundSize;
        }

        if (backgroundPosition) {
            results['background-position'] = backgroundPosition;
        }                   
        results['background-image'] = 'linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))';
        results['background-repeat'] = 'no-repeat';        

        return results 
    }

    [GETTER(IMAGE_TO_CSS)] ($store, image = null, isExport = false) {

        var results = {} 
        var backgroundImage = $store.read(IMAGE_TO_IMAGE_STRING, image, isExport)
        var backgroundPosition = $store.read(IMAGE_TO_BACKGROUND_POSITION_STRING, image, isExport)
        var backgroundSize = $store.read(IMAGE_TO_BACKGROUND_SIZE_STRING, image, isExport)
        var backgroundRepeat = $store.read(IMAGE_TO_BACKGROUND_REPEAT_STRING, image, isExport)
        var backgroundBlendMode = $store.read(IMAGE_TO_BACKGROUND_BLEND_MODE_STRING, image, isExport)

        if (backgroundImage) {
            results['background-image'] = backgroundImage;  // size, position, origin, attachment and etc 
        }

        if (backgroundSize) {
            results['background-size'] = backgroundSize;
        }

        if (backgroundPosition) {
            results['background-position'] = backgroundPosition;
        }        

        if (backgroundRepeat) {
            results['background-repeat'] = backgroundRepeat;
        }      
        
        if (backgroundBlendMode) {
            results['background-blend-mode'] = backgroundBlendMode;
        }              

        return results
    }    

    [GETTER(IMAGE_CACHE_TO_CSS)] ($store, item = {}) {
        var image = Object.assign({}, item.image, {colorsteps: item.colorsteps}); 

        var results = {} 
        var backgroundImage = $store.read(IMAGE_TO_IMAGE_STRING, image)
        var backgroundPosition = $store.read(IMAGE_TO_BACKGROUND_POSITION_STRING, image)
        var backgroundSize = $store.read(IMAGE_TO_BACKGROUND_SIZE_STRING, image)
        var backgroundRepeat = $store.read(IMAGE_TO_BACKGROUND_REPEAT_STRING, image)
        var backgroundBlendMode = $store.read(IMAGE_TO_BACKGROUND_BLEND_MODE_STRING, image)

        if (backgroundImage) {
            results['background-image'] = backgroundImage;  // size, position, origin, attachment and etc 
        }

        if (backgroundSize) {
            results['background-size'] = backgroundSize;
        }

        if (backgroundPosition) {
            results['background-position'] = backgroundPosition;
        }        

        if (backgroundRepeat) {
            results['background-repeat'] = backgroundRepeat;
        }        

        if (backgroundBlendMode) {
            results['background-blend-mode'] = backgroundBlendMode;
        }                

        return results
    }

    [GETTER(IMAGE_TO_STRING)] ($store, image = null) {

        var obj = $store.read(IMAGE_TO_CSS, image)

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')

    } 

    [GETTER(IMAGE_TO_IMAGE_STRING)] ($store, image, isExport = false) {
        var type = image.type

        if (type == IMAGE_ITEM_TYPE_LINEAR || type == IMAGE_ITEM_TYPE_REPEATING_LINEAR) {
            return $store.read(IMAGE_TO_LINEAR, image, isExport)
        } else if (type == IMAGE_ITEM_TYPE_RADIAL || type == IMAGE_ITEM_TYPE_REPEATING_RADIAL) {
            return $store.read(IMAGE_TO_RADIAL, image, isExport)
        } else if (type == IMAGE_ITEM_TYPE_CONIC || type == IMAGE_ITEM_TYPE_REPEATING_CONIC ) {
            return $store.read(IMAGE_TO_CONIC, image, isExport)            
        } else if (type == IMAGE_ITEM_TYPE_IMAGE ) {
            return $store.read(IMAGE_TO_IMAGE, image, isExport)
        } else if (type == IMAGE_ITEM_TYPE_STATIC ) {
            return $store.read(IMAGE_TO_STATIC, image, isExport)
        }
    }

    [GETTER(IMAGE_TO_BACKGROUND_SIZE_STRING)] ($store, image) {

        if (image.backgroundSize == 'contain' || image.backgroundSize == 'cover') {
            return image.backgroundSize; 
        } else if (image.backgroundSizeWidth && image.backgroundSizeHeight) {
            return [
                stringUnit(image.backgroundSizeWidth), 
                stringUnit(image.backgroundSizeHeight)
            ].join(' ')
        } else if (image.backgroundSizeWidth) {
            return stringUnit(image.backgroundSizeWidth);
        }

        return 'auto'
    }  
    

    [GETTER(IMAGE_TO_BACKGROUND_POSITION_STRING)] ($store, image) {

        var x = defaultValue(image.backgroundPositionX, valueUnit(POSITION_CENTER))
        var y = defaultValue(image.backgroundPositionY, valueUnit(POSITION_CENTER))

        if (x === 0) x = percentUnit(0);
        if (y === 0) y = percentUnit(0);

        return `${stringUnit(x)} ${stringUnit(y)}`;
    }      
    
    [GETTER(IMAGE_TO_BACKGROUND_REPEAT_STRING)] ($store, image) {
        if (image.backgroundRepeat) {
            return image.backgroundRepeat;
        }
    }       

    [GETTER(IMAGE_TO_BACKGROUND_BLEND_MODE_STRING)] ($store, image) {
        if (image.backgroundBlendMode) {
            return image.backgroundBlendMode || 'normal';
        }
    }           

    [GETTER(IMAGE_GET_UNIT_VALUE)] ($store, step) {
        if (isPX(step.unit)) {
            return px(step.px);
        } else if (isEM(step.unit)) {
            return em(step.em);
        }

        return percent(step.percent)
    }

    [GETTER(IMAGE_GET_STEP_VALUE)] ($store, step) {
        if (isPX(step.unit)) {
            return step.px;
        } else if (isEM(step.unit)) {
            return step.em;
        }

        return step.percent
    }    

    [GETTER(IMAGE_TO_ITEM_STRING)] ($store, image = undefined ) {

        if (!image) return EMPTY_STRING;

        var colorsteps =  image.colorsteps || $store.read('item/map/children', image.id)

        if (!colorsteps) return EMPTY_STRING;

        var colors = [...colorsteps]
        if (!colors.length) return EMPTY_STRING; 
        
        var newColors = []
        colors.forEach( (c, index) => {
            if (c.cut && index > 0) {
                newColors.push({ 
                    color: c.color,
                    unit : colors[index-1].unit,
                    percent : colors[index-1].percent,
                    px : colors[index-1].px,
                    em : colors[index-1].em
                });
            }

            newColors.push(c);
        })        
        
        colors = newColors.map(f => {

            var value = stringUnit( percentUnit(f.percent) )
            return `${f.color} ${value}`
        }).join(',')

        return colors; 
    }


    [GETTER(IMAGE_TO_CONIC_ITEM_STRING)] ($store, image = undefined ) {

        if (!image) return EMPTY_STRING;

        var colorsteps =  image.colorsteps || $store.read('item/map/children', image.id, (step) => step )

        if (!colorsteps) return EMPTY_STRING;

        var colors = [...colorsteps].map( (it, index) => {
            it.index = index; 
            return it;
        })
        if (!colors.length) return EMPTY_STRING; 
        
        colors.sort((a, b) => {
            if (a.percent == b.percent) {
                if (a.index > b.index) return 1;
                if (a.index < b.index) return 0; 
                return 0;
            }
            return a.percent > b.percent ? 1 : -1;
        })


        var newColors = []
        colors.forEach( (c, index) => {
            if (c.cut && index > 0) {
                newColors.push(Object.assign({}, c, { percent : colors[index-1].percent} ));
            }

            newColors.push(c);
        })      
        
        colors = newColors.map(f => {
            var deg = Math.floor(f.percent * 3.6);
            return `${f.color} ${deg}deg`
        }).join(',')

        return colors; 
    }    

    [GETTER(IMAGE_TO_LINEAR)] ($store, image = {}) {
        var colors = $store.read(IMAGE_TO_ITEM_STRING, image)

        if (colors == EMPTY_STRING) return EMPTY_STRING 

        var opt = EMPTY_STRING
        var angle = image.angle
        var gradientType = image.type

        opt = angle;

        if (isNumber(opt)) {
            opt = DEFINED_DIRECTIONS[`${opt}`] || opt 
        }

        if (isNumber(opt)) {
            opt = opt > 360 ? opt % 360 : opt;
            
            opt = `${opt}deg`
        }

        return `${gradientType}-gradient(${opt}, ${colors})`
    }

    [GETTER(IMAGE_TO_STATIC)] ($store, image = {}) {
        return $store.read(IMAGE_TO_LINEAR, {
            type: 'linear',
            angle: 0,
            colorsteps: [ 
                { color: image.color, percent: 0} ,
                { color: image.color, percent: 100} ,
            ]
        })
    }

    [GETTER(IMAGE_TO_LINEAR_RIGHT)] ($store, image) {
        return $store.read(IMAGE_TO_LINEAR, Object.assign({}, image, { type: 'linear', angle : 'to right'}))
    }

    [GETTER(IMAGE_TO_RADIAL)] ($store, image = {}) {
        var colors = $store.read(IMAGE_TO_ITEM_STRING, image)

        if (colors == EMPTY_STRING) return EMPTY_STRING 
        var opt = EMPTY_STRING
        var radialType = image.radialType;
        var radialPosition = image.radialPosition || [POSITION_CENTER, POSITION_CENTER];
        var gradientType = image.type

        radialPosition = (DEFINED_POSITIONS[radialPosition]) ? radialPosition : radialPosition.join(' ')

        opt = radialPosition ? `${radialType} at ${radialPosition}` : radialType;

        return `${gradientType}-gradient(${opt}, ${colors})`
    }

    [GETTER(IMAGE_TO_CONIC)] ($store, image = {}) {
        var colors = $store.read(IMAGE_TO_CONIC_ITEM_STRING, image)

        if (colors == EMPTY_STRING) return EMPTY_STRING 
        var opt = []
        var conicAngle = image.angle;
        var conicPosition = image.radialPosition  || [POSITION_CENTER, POSITION_CENTER];
        var gradientType = image.type

        conicPosition = (DEFINED_POSITIONS[conicPosition]) ? conicPosition : conicPosition.join(' ')

        if (isNotUndefined(conicAngle)) {
            conicAngle = get(DEFINED_ANGLES, conicAngle, (it) => +it) 
            opt.push(`from ${conicAngle}deg`)
        }

        if (conicPosition) {
            opt.push(`at ${conicPosition}`)
        };

        var optString = opt.length ? opt.join(' ') + ',' : EMPTY_STRING;

        return `${gradientType}-gradient(${optString} ${colors})`
    }    

    [GETTER(IMAGE_TO_IMAGE)] ($store, image = null, isExport = false) {
        var url = image.backgroundImage

        if (!isExport && url) {
            return `url(${url})`
        } else if (isExport) {
            return `url(${image.backgroundImageDataURI})`
        }
        
        return null;
    }
}