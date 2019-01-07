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
import { px, isPX, isEM, em, percent, stringUnit, valueUnit, unitObject, percentUnit } from '../../util/css/types';
import { GETTER } from '../../util/Store';

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

export default class ImageManager extends BaseModule { 
 
    [GETTER('image/get/file')] ($store, files, callback, colorCount = 16) {
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

    [GETTER('image/get/url')] ($store, urls, callback, colorCount = 16) {
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

    [GETTER('image/get/blob')] ($store, blobs, callback) {
        (blobs || []).forEach(file => {
            if (isFunction(callback)) {
                new ImageLoader(file, { 
                    forceDataURI: true
                }).getImage(image => {
                    var url = file; 
                    var svg = ''; 
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

    [GETTER('image/type/isGradient')] ($store, type) {
        return $store.read('image/type/isLinear', type) || $store.read('image/type/isRadial', type) || $store.read('image/type/isConic', type);
    }

    [GETTER('image/type/isNotGradient')] ($store, type) {
        return $store.read('image/type/isGradient', type) == false;
    }    

    [GETTER('image/type/isLinear')] ($store, type) {
        return [IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_REPEATING_LINEAR].includes(type)
    }

    [GETTER('image/type/isRadial')] ($store, type) {
        return [IMAGE_ITEM_TYPE_RADIAL, IMAGE_ITEM_TYPE_REPEATING_RADIAL].includes(type)
    }    

    [GETTER('image/type/isConic')] ($store, type) {
        return [IMAGE_ITEM_TYPE_CONIC, IMAGE_ITEM_TYPE_REPEATING_CONIC].includes(type)
    }        

    [GETTER('image/type/isImage')] ($store, type) {
        return [IMAGE_ITEM_TYPE_IMAGE].includes(type)
    }

    [GETTER('image/type/isStatic')] ($store, type) {
        return [IMAGE_ITEM_TYPE_STATIC].includes(type)
    }    

    [GETTER('image/angle')] ($store, angle = '') {
        return isUndefined(DEFINED_ANGLES[angle]) ? angle : (DEFINED_ANGLES[angle] || 0);
    }

    [GETTER('image/radialPosition')] ($store, position = '') {
        return position || $store.read('image/get', 'radialPosition');
    }

    [GETTER('image/toCSS')] ($store, image = null, isExport = false) {

        var results = {} 
        var backgroundImage = $store.read('image/toImageString', image, isExport)
        var backgroundPosition = $store.read('image/toBackgroundPositionString', image, isExport)
        var backgroundSize = $store.read('image/toBackgroundSizeString', image, isExport)
        var backgroundRepeat = $store.read('image/toBackgroundRepeatString', image, isExport)
        var backgroundBlendMode = $store.read('image/toBackgroundBlendModeString', image, isExport)

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

    [GETTER('image/cache/toCSS')] ($store, item = {}) {
        var image = Object.assign({}, item.image, {colorsteps: item.colorsteps}); 

        var results = {} 
        var backgroundImage = $store.read('image/toImageString', image)
        var backgroundPosition = $store.read('image/toBackgroundPositionString', image)
        var backgroundSize = $store.read('image/toBackgroundSizeString', image)
        var backgroundRepeat = $store.read('image/toBackgroundRepeatString', image)
        var backgroundBlendMode = $store.read('image/toBackgroundBlendModeString', image)        

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

    [GETTER('image/toString')] ($store, image = null) {

        var obj = $store.read('image/toCSS', image)

        return Object.keys(obj).map(key => {
            return `${key}: ${obj[key]};`
        }).join(' ')

    } 

    [GETTER('image/toImageString')] ($store, image, isExport = false) {
        var type = image.type

        if (type == IMAGE_ITEM_TYPE_LINEAR || type == IMAGE_ITEM_TYPE_REPEATING_LINEAR) {
            return $store.read('image/toLinear', image, isExport)
        } else if (type == IMAGE_ITEM_TYPE_RADIAL || type == IMAGE_ITEM_TYPE_REPEATING_RADIAL) {
            return $store.read('image/toRadial', image, isExport)
        } else if (type == IMAGE_ITEM_TYPE_CONIC || type == IMAGE_ITEM_TYPE_REPEATING_CONIC ) {
            return $store.read('image/toConic', image, isExport)            
        } else if (type == IMAGE_ITEM_TYPE_IMAGE ) {
            return $store.read('image/toImage', image, isExport)
        } else if (type == IMAGE_ITEM_TYPE_STATIC ) {
            return $store.read('image/toStatic', image, isExport)
        }
    }

    [GETTER('image/toBackgroundSizeString')] ($store, image) {

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
    

    [GETTER('image/toBackgroundPositionString')] ($store, image) {

        var x = defaultValue(image.backgroundPositionX, valueUnit(POSITION_CENTER))
        var y = defaultValue(image.backgroundPositionY, valueUnit(POSITION_CENTER))

        if (x === 0) x = percentUnit(0);
        if (y === 0) y = percentUnit(0);

        return `${stringUnit(x)} ${stringUnit(y)}`;
    }      
    
    [GETTER('image/toBackgroundRepeatString')] ($store, image) {
        if (image.backgroundRepeat) {
            return image.backgroundRepeat;
        }
    }       

    [GETTER('image/toBackgroundBlendModeString')] ($store, image) {
        if (image.backgroundBlendMode) {
            return image.backgroundBlendMode || 'normal';
        }
    }           

    [GETTER('image/get/unitValue')] ($store, step) {
        if (isPX(step.unit)) {
            return px(step.px);
        } else if (isEM(step.unit)) {
            return em(step.em);
        }

        return percent(step.percent)
    }

    [GETTER('image/get/stepValue')] ($store, step) {
        if (isPX(step.unit)) {
            return step.px;
        } else if (isEM(step.unit)) {
            return step.em;
        }

        return step.percent
    }    

    [GETTER('image/toItemString')] ($store, image = undefined ) {

        if (!image) return '';

        var colorsteps =  image.colorsteps || $store.read('item/map/children', image.id)

        if (!colorsteps) return '';

        var colors = [...colorsteps]
        if (!colors.length) return ''; 
        
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


    [GETTER('image/toConicItemString')] ($store, image = undefined ) {

        if (!image) return '';

        var colorsteps =  image.colorsteps || $store.read('item/map/children', image.id, (step) => step )

        if (!colorsteps) return '';

        var colors = [...colorsteps].map( (it, index) => {
            it.index = index; 
            return it;
        })
        if (!colors.length) return ''; 
        
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

    [GETTER('image/toLinear')] ($store, image = {}) {
        var colors = $store.read('image/toItemString', image)

        if (colors == '') return '' 

        var opt = ''
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

    [GETTER('image/toStatic')] ($store, image = {}) {
        return $store.read('image/toLinear', {
            type: 'linear',
            angle: 0,
            colorsteps: [ 
                { color: image.color, percent: 0} ,
                { color: image.color, percent: 100} ,
            ]
        })
    }

    [GETTER('image/toLinearRight')] ($store, image) {
        return $store.read('image/toLinear', Object.assign({}, image, { type: 'linear', angle : 'to right'}))
    }

    [GETTER('image/toRadial')] ($store, image = {}) {
        var colors = $store.read('image/toItemString', image)

        if (colors == '') return '' 
        var opt = ''
        var radialType = image.radialType;
        var radialPosition = image.radialPosition;
        var gradientType = image.type

        radialPosition = (DEFINED_POSITIONS[radialPosition]) ? radialPosition : radialPosition.join(' ')

        opt = radialPosition ? `${radialType} at ${radialPosition}` : radialType;

        return `${gradientType}-gradient(${opt}, ${colors})`
    }

    [GETTER('image/toConic')] ($store, image = {}) {
        var colors = $store.read('image/toConicItemString', image)

        if (colors == '') return '' 
        var opt = []
        var conicAngle = image.angle;
        var conicPosition = image.radialPosition;
        var gradientType = image.type

        conicPosition = (DEFINED_POSITIONS[conicPosition]) ? conicPosition : conicPosition.join(' ')

        if (isNotUndefined(conicAngle)) {
            conicAngle = get(DEFINED_ANGLES, conicAngle, (it) => +it) 
            opt.push(`from ${conicAngle}deg`)
        }

        if (conicPosition) {
            opt.push(`at ${conicPosition}`)
        };

        var optString = opt.length ? opt.join(' ') + ',' : '';

        return `${gradientType}-gradient(${optString} ${colors})`
    }    

    [GETTER('image/toImage')] ($store, image = null, isExport = false) {
        var url = image.backgroundImage

        if (!isExport && url) {
            return `url(${url})`
        } else if (isExport) {
            return `url(${image.backgroundImageDataURI})`
        }
        
        return null;
    }
}