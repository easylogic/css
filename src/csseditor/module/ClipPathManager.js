import BaseModule from "../../colorpicker/BaseModule";
import { parseParamNumber } from "../../util/filter/functions";
import Dom from "../../util/Dom";
import layerList from './layers/index';
import { ITEM_TYPE_BOXSHADOW, ITEM_TYPE_TEXTSHADOW, ITEM_TYPE_IMAGE } from "./ItemTypes";
import { percent } from "../../util/css/types";

export default class ClipPathManager extends BaseModule {
   
    '*/clip-path/make/circle' ($store, layer) {

        if (!layer.clipPathCenter) return ;
        if (!layer.clipPathRadius) return ;

        var width = parseParamNumber(layer.width);
        var height = parseParamNumber(layer.height);


        var placeCenter = [
            percent(Math.floor(layer.clipPathCenter[0]/width*100)), // centerX 
            percent( Math.floor(layer.clipPathCenter[1]/height*100)) // centerY
        ]

        var radiusSize = Math.sqrt(
            Math.pow( Math.abs(layer.clipPathRadius[0] - layer.clipPathCenter[0]), 2)  
            + 
            Math.pow( Math.abs (layer.clipPathRadius[1] - layer.clipPathCenter[1]), 2)
        )/Math.sqrt(2);

        var dist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))/Math.sqrt(2)
        var radiusPercent = percent( Math.floor((radiusSize) / dist * 100) );  

        return `circle(${radiusPercent} at ${placeCenter.join(' ')})`;
    }

    '*/clip-path/make/svg' ($store, layer) {
        if (layer.clipPathSvg) {
            return `url(#clippath-${layer.id})`
        }
    }

    '*/clip-path/toCSS' ($store, layer) {
        var clipPath = null;
        if (layer.clipPathType == 'none') {
            clipPath = 'none';
        } else if (layer.clipPathType == 'circle') {
            clipPath = $store.read('/clip-path/make/circle', layer); 
        } else {
            clipPath = $store.read('/clip-path/make/svg', layer);
        }

        return {
            'clip-path': clipPath
        }
    }


}