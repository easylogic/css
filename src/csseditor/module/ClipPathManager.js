import BaseModule from "../../util/BaseModule";
import { percent, stringUnit, percentUnit, value2px, unitValue, EMPTY_STRING, CLIP_PATH_SIDE_TYPE_NONE, CLIP_PATH_SIDE_TYPE_CLOSEST, CLIP_PATH_SIDE_TYPE_FARTHEST, CLIP_PATH_TYPE_CIRCLE, CLIP_PATH_TYPE_ELLIPSE, CLIP_PATH_TYPE_INSET, CLIP_PATH_TYPE_POLYGON, CLIP_PATH_TYPE_SVG, CLIP_PATH_TYPE_NONE } from "../../util/css/types";
import { defaultValue } from "../../util/functions/func";
import clipPathList from './clip-path/index'
import { GETTER } from "../../util/Store";
import { CLIPPATH_MAKE_CIRCLE, CLIPPATH_SAMPLE_LIST, CLIPPATH_SAMPLE_GET, CLIPPATH_MAKE_ELLIPSE, CLIPPATH_MAKE_INSET, CLIPPATH_MAKE_POLYGON, CLIPPATH_MAKE_SVG, CLIPPATH_TO_CSS } from "../types/ClipPathTypes";

const SQRT_2 = Math.sqrt(2);

export default class ClipPathManager extends BaseModule {
   
    [GETTER(CLIPPATH_SAMPLE_LIST)] ($store) {
        return clipPathList
    }

    [GETTER(CLIPPATH_SAMPLE_GET)] ($store, index) {
        return clipPathList[index]
    }    

    caculateClosestFromCenter (centerX, centerY, width, height) {
        var list = [
            [centerX, 0],
            [centerX, height],
            [0, centerY],
            [width, centerY]
        ]

        return Math.min(...list.map(it => {
            var x = Math.pow( Math.abs(centerX - it[0]), 2);
            var y = Math.pow( Math.abs(centerY - it[1]), 2);
            return Math.sqrt( x + y) /SQRT_2
        }))
    }

    caculateFarthestFromCenter (centerX, centerY, width, height) {
        var list = [
            [centerX, 0],
            [centerX, height],
            [0, centerY],
            [width, centerY]
        ]

        return Math.max(...list.map(it => {
            var x = Math.pow( Math.abs(centerX - it[0]), 2);
            var y = Math.pow( Math.abs(centerY - it[1]), 2);
            return Math.sqrt( x + y)/SQRT_2
        }))
    }

    [GETTER(CLIPPATH_MAKE_CIRCLE)] ($store, layer) {

        var width = unitValue(layer.width);
        var height = unitValue(layer.height);

        var dist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))/Math.sqrt(2);

        var clipPathCenterX = defaultValue (layer.clipPathCenterX, percentUnit(50)); 
        var clipPathCenterY = defaultValue(layer.clipPathCenterY, percentUnit(50)); 
        var clipPathRadiusX = defaultValue(layer.clipPathRadiusX, percentUnit(100)); 
        var clipPathRadiusY = defaultValue(layer.clipPathRadiusY, percentUnit(100));         
        var clipPathSideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE);         

        var placeCenterX = stringUnit(clipPathCenterX); // centerX 
        var placeCenterY = stringUnit(clipPathCenterY); // centerY

        if (clipPathSideType == CLIP_PATH_SIDE_TYPE_NONE) {
            var radiusSize = Math.sqrt(
                Math.pow( Math.abs( 
                    value2px(clipPathRadiusX, width) - value2px (clipPathCenterX, width)
                ), 2)  
                + 
                Math.pow( Math.abs ( 
                    value2px( clipPathRadiusY, height) - value2px( clipPathCenterY, height)
                ), 2)
            );
            var radiusString = percent( Math.floor((radiusSize) / dist * 100) );  
        } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_CLOSEST) {
            var radiusString = CLIP_PATH_SIDE_TYPE_CLOSEST
        } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_FARTHEST ) {
            var radiusString = CLIP_PATH_SIDE_TYPE_FARTHEST
        }
        return `circle(${radiusString} at ${placeCenterX} ${placeCenterY})`;
    }


    [GETTER(CLIPPATH_MAKE_ELLIPSE)] ($store, layer) {
        var width = unitValue(layer.width);
        var height = unitValue(layer.height);


        var clipPathCenterX = defaultValue (layer.clipPathCenterX, percentUnit(50)); 
        var clipPathCenterY = defaultValue(layer.clipPathCenterY, percentUnit(50)); 
        var clipPathRadiusX = defaultValue(layer.clipPathRadiusX, percentUnit(100)); 
        var clipPathRadiusY = defaultValue(layer.clipPathRadiusY, percentUnit(100));         
        var clipPathSideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE);         

        var placeCenterX = stringUnit(clipPathCenterX); // centerX 
        var placeCenterY = stringUnit(clipPathCenterY); // centerY

        var dist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))/Math.sqrt(2)        

        if (clipPathSideType == CLIP_PATH_SIDE_TYPE_NONE) {
            var radiusSizeX = Math.abs(
                value2px(clipPathRadiusX, width)- value2px(clipPathCenterX, width)
            );

            var radiusPercentX = stringUnit( percentUnit( Math.floor((radiusSizeX) / dist * 100) ) );  
    
            var radiusSizeY = Math.abs(
                value2px(clipPathRadiusY, height) - value2px(clipPathCenterY, height)
            );
            var radiusPercentY = stringUnit( percentUnit( Math.floor((radiusSizeY) / dist * 100) ) );
            
            var radiusString = `${radiusPercentX} ${radiusPercentY}`
        } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_CLOSEST) {
            var radiusString = CLIP_PATH_SIDE_TYPE_CLOSEST
        } else if (clipPathSideType == CLIP_PATH_SIDE_TYPE_FARTHEST ) {
            var radiusString = CLIP_PATH_SIDE_TYPE_FARTHEST
        }        

        return `ellipse(${radiusString} at ${placeCenterX} ${placeCenterY})`;
    }  
    


    [GETTER(CLIPPATH_MAKE_INSET)] ($store, layer) {

        var clipPathInsetTop = defaultValue (layer.clipPathInsetTop, percentUnit(0)); 
        var clipPathInsetLeft = defaultValue(layer.clipPathInsetLeft, percentUnit(0)); 
        var clipPathInsetRight = defaultValue(layer.clipPathInsetRight, percentUnit(0)); 
        var clipPathInsetBottom = defaultValue(layer.clipPathInsetBottom, percentUnit(0)); 

        var top = stringUnit (clipPathInsetTop);
        var left = stringUnit (clipPathInsetLeft);
        var right = stringUnit (clipPathInsetRight);
        var bottom = stringUnit (clipPathInsetBottom);
    
        var insetString = `${top} ${right} ${bottom} ${left}`

        return `inset(${insetString})`;
    } 
    
    [GETTER(CLIPPATH_MAKE_POLYGON)] ($store, layer) {

        var clipPathPolygonFillRule = layer.clipPathPolygonFillRule || EMPTY_STRING; 

        var fillRule = EMPTY_STRING; 
        if (clipPathPolygonFillRule != EMPTY_STRING) {
            fillRule = clipPathPolygonFillRule + ',';
        }

        var clipPathPolygonPoints = defaultValue (layer.clipPathPolygonPoints, []); 
    
        var polygonString = clipPathPolygonPoints.map(it => {
            return `${stringUnit(it.x)} ${stringUnit(it.y)}`
        }).join(', ');

        return `polygon(${fillRule} ${polygonString})`;
    }     

    [GETTER(CLIPPATH_MAKE_SVG)] ($store, layer) {
        if (layer.clipPathSvg) {
            return `url(#clippath-${layer.id})`
        }
    }

    [GETTER(CLIPPATH_TO_CSS)] ($store, layer) {
        var clipPath = null;
        if (layer.clipPathType == CLIP_PATH_TYPE_NONE) {
            clipPath = CLIP_PATH_TYPE_NONE;
        } else if (layer.clipPathType == CLIP_PATH_TYPE_CIRCLE) {
            clipPath = $store.read(CLIPPATH_MAKE_CIRCLE, layer); 
        } else if (layer.clipPathType == CLIP_PATH_TYPE_ELLIPSE) {
            clipPath = $store.read(CLIPPATH_MAKE_ELLIPSE, layer);             
        } else if (layer.clipPathType == CLIP_PATH_TYPE_INSET) {
            clipPath = $store.read(CLIPPATH_MAKE_INSET, layer);
        } else if (layer.clipPathType == CLIP_PATH_TYPE_POLYGON) {
            clipPath = $store.read(CLIPPATH_MAKE_POLYGON, layer);
        } else if (layer.clipPathType == CLIP_PATH_TYPE_SVG) {
            clipPath = $store.read(CLIPPATH_MAKE_SVG, layer);
        }

        return {
            'clip-path': clipPath
        }
    }


}