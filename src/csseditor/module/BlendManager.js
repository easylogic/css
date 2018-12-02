import BaseModule from "../../colorpicker/BaseModule";

const blend_list = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 
    'lighten', 'color-dodge', 'color-burn', 'hard-light', 
    'soft-light', 'difference', 'exclusion', 'hue',
    'saturation', 'color', 'luminosity'
]

export default class BlendManager extends BaseModule {

    initialize() {
        super.initialize()

        this.$store.blendMode = '';
    }

    '*/blend/layer/toString' ($store, item, mixBlend = '', withStyle = true) {

        item = $store.read('/clone', item);

        item.mixBlendMode = mixBlend;

        return $store.read('/layer/toString', item, withStyle)
    }    

    '*/blend/image/toString' ($store, item, blend = '', withStyle = true) {

        item = $store.read('/clone', item);

        item.backgroundBlendMode = blend;

        // console.log($store.read('/image/toString', item, withStyle))

        return $store.read('/image/toString', item, withStyle)
    }        

    '*/blend/toStringWithoutDimension' ($store, item, mixBlend = '') {
        return $store.read('/blend/layer/toString', item, mixBlend, false)
    }        

    '*/blend/toStringWithoutDimensionForImage' ($store, item, blend = 'normal') {
        // console.log(item, blend);
        var cssText = $store.read('/blend/image/toString', item, blend, false);

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

    '*/blend/list' ($store) {
        return blend_list;
    }


}