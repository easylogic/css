import BaseModule from "../../colorpicker/BaseModule";
import { GETTER } from "../../util/Store";
import { BLEND_LAYER_TO_STRING, BLEND_IMAGE_TO_STRING, BLEND_TO_STRING_WITHOUT_DIMENSION, BLEND_TO_STRING_WITHOUT_DIMENSION_FOR_IMAGE, BLEND_LIST } from "../types/BlendTypes";
import { clone } from "../../util/functions/func";
import { LAYER_TO_STRING } from "../types/LayerTypes";
import { IMAGE_TO_STRING } from "../types/ImageTypes";
import { EMPTY_STRING } from "../../util/css/types";

const blend_list = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 
    'lighten', 'color-dodge', 'color-burn', 'hard-light', 
    'soft-light', 'difference', 'exclusion', 'hue',
    'saturation', 'color', 'luminosity'
]

export default class BlendManager extends BaseModule {

    initialize() {
        super.initialize()

        this.$store.blendMode = EMPTY_STRING;
    }

    [GETTER(BLEND_LAYER_TO_STRING)] ($store, item, mixBlend = EMPTY_STRING, withStyle = true) {

        var newItem = {...item};

        newItem.mixBlendMode = mixBlend;

        return $store.read(LAYER_TO_STRING, newItem, withStyle)
    }    

    [GETTER(BLEND_IMAGE_TO_STRING)] ($store, item, blend = EMPTY_STRING, withStyle = true) {

        var newItem = {...item};

        newItem.backgroundBlendMode = blend;

        return $store.read(IMAGE_TO_STRING, newItem, withStyle)
    }        

    [GETTER(BLEND_TO_STRING_WITHOUT_DIMENSION)] ($store, item, mixBlend = EMPTY_STRING) {
        return $store.read(BLEND_LAYER_TO_STRING, item, mixBlend, false)
    }        

    [GETTER(BLEND_TO_STRING_WITHOUT_DIMENSION_FOR_IMAGE)] ($store, item, blend = 'normal') {
        // console.log(item, blend);
        var cssText = $store.read(BLEND_IMAGE_TO_STRING, item, blend, false);

        cssText = cssText.split(';').map(it => {
            return it.split(':').map(it => it.trim())
        }).map(a => {
            if (a[0] == 'background-image') {
                a[1] += ',url(/resources/image/grapes.jpg)'
            } else if (a[0] == 'background-size') {
                a[1] += ',auto'
            } else if (a[0] == 'background-repeat') {
                a[1] += ',no-repeat'
            } else if (a[0] == 'background-position') {
                a[1] += ',center center'
            } else if (a[0] == 'background-blend-mode') {
                a[1] += ',normal'                
            }

            return a.join(':');
        }).join(';');

        return cssText; 
    }        

    [GETTER(BLEND_LIST)] ($store) {
        return blend_list;
    }


}