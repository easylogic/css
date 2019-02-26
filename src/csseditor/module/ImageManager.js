import ImageLoader from '../../util/ImageLoader'
import { ImageToRGB, palette } from '../../util/functions/image';
import { isFunction, keyMap} from '../../util/functions/func';
import { GETTER } from '../../util/Store';
import { 
    IMAGE_GET_FILE, 
    IMAGE_GET_URL, 
    IMAGE_GET_BLOB, 
    IMAGE_TO_STRING, 
    IMAGE_TO_LINEAR_RIGHT
} from '../types/ImageTypes';
import { ITEM_MAP_COLORSTEP_CHILDREN } from '../types/ItemSearchTypes';
import { IMAGE_TO_LINEAR, IMAGE_TO_CSS } from '../../util/css/make';
import { IMAGE_FILE_TYPE_JPG, IMAGE_FILE_TYPE_PNG, IMAGE_FILE_TYPE_GIF, IMAGE_FILE_TYPE_SVG, WHITE_STRING } from '../../util/css/types';
import BaseModule from '../../util/BaseModule';

const IMAGE_LIST = [
    IMAGE_FILE_TYPE_JPG,
    IMAGE_FILE_TYPE_PNG,
    IMAGE_FILE_TYPE_GIF,
    IMAGE_FILE_TYPE_SVG
]

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


    [GETTER(IMAGE_TO_STRING)] ($store, image = null) {
        var newItem = {...image}
        newItem.colorsteps =  newItem.colorsteps || $store.read(ITEM_MAP_COLORSTEP_CHILDREN, newItem.id)
        var obj = IMAGE_TO_CSS(newItem)

        return keyMap(obj, (key, value) => {
            return `${key}: ${value};`
        }).join(WHITE_STRING)

    } 


    [GETTER(IMAGE_TO_LINEAR_RIGHT)] ($store, image) {
        var colorsteps =  image.colorsteps || $store.read(ITEM_MAP_COLORSTEP_CHILDREN, image.id)
        return IMAGE_TO_LINEAR({...image, type: 'linear', angle : 'to right', colorsteps})
    }

}