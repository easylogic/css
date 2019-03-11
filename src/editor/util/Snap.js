import BaseModule from "../../util/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { unitValue, pxUnit, SEGMENT_TYPE_MOVE, GUIDE_TYPE_VERTICAL, GUIDE_TYPE_HORIZONTAL, SEGMENT_TYPE_TOP, SEGMENT_TYPE_TOP_LEFT, SEGMENT_TYPE_TOP_RIGHT, SEGMENT_TYPE_BOTTOM, SEGMENT_TYPE_BOTTOM_LEFT, SEGMENT_TYPE_BOTTOM_RIGHT, SEGMENT_TYPE_LEFT, SEGMENT_TYPE_RIGHT, SEGMENT_CHECK } from "../../util/css/types";
import { ITEM_SET } from "../types/ItemTypes";
import { isNotUndefined, isUndefined } from "../../util/functions/func";
import { SELECTION_CURRENT_PAGE, SELECTION_RECT, SELECTION_CHECK } from "../types/SelectionTypes";
import { ITEM_MAP_LAYER_CHILDREN } from "../types/ItemSearchTypes";
import { GUIDE_RECT_POINT, GUIDE_COMPARE, GUIDE_SNAP_LAYER, GUIDE_SNAP_CACULATE } from "../types/GuideTypes";
import { editor } from "../editor";

var MAX_DIST = 1; 
const ZERO_DIST = 0; 

export class Snap {

    static rectPoint (obj, segmentType = SEGMENT_TYPE_MOVE) {
        var id = obj.id; 
        var x = obj.screenX.value;
        var y = obj.screenY.value;
        var x2 = obj.screenX2.value;
        var y2 = obj.screenY2.value;        
        var centerX = obj.centerX.value;
        var centerY = obj.centerY.value; 
        var width = obj.width.value
        var height = obj.height.value

        var startX = x; 
        var endX = x2; 
        var startY = y; 
        var endY = y2; 
        var pointX = [];
        var pointY = [];

        var segment = SEGMENT_CHECK[segmentType];

        if (!segment) return {pointX, pointY}

        if (segment.move) {
            pointX = [
                {x, y: centerY, startX, endX, centerX, id, width, height, isLeft: true },
                {x: centerX, y: centerY, startX, endX, centerX, id, width, height, isCenter: true },
                {x: x2, y: centerY, startX, endX, centerX, id, width, height, isRight: true }
            ]
    
            pointY = [
                {x: centerX, y, startY, endY, centerY, id, width, height, isTop: true },
                {x: centerX, y: centerY, startY, endY, centerY, id, width, height, isCenter: true },
                {x: centerX, y: y2, startY, endY, centerY, id, width, height, isBottom: true }
            ]
    
            return { pointX, pointY }
        } else {
            if (segment.xIndex === 0) pointX.push({x, y: centerY, startX, endX, centerX, id, width, height, isLeft: true });
            if (segment.xIndex === 1) pointX.push({x: centerX, y: centerY, startX, endX, centerX, id, width, height, isCenter: true });
            if (segment.xIndex === 2) pointX.push({x: x2, y: centerY, startX, endX, centerX, id, width, height, isRight: true });
    
            if (segment.yIndex === 0) pointY.push({x: centerX, y, startY, endY, centerY, id, width, height, isTop: true })
            if (segment.yIndex === 1) pointY.push({x: centerX, y: centerY, startY, endY, centerY, id, width, height, isCenter: true })
            if (segment.yIndex === 2) pointY.push({x: centerX, y: y2, startY, endY, centerY, id, width, height, isBottom: true })
    
            return { pointX, pointY }
        }

    }

    [GETTER(GUIDE_COMPARE)] ($store, A, B, dist = MAX_DIST) {
        // x 축 비교 , x 축이 dist 안에 있으면 합격 
        var results = [] 
        for(var index = 0, len = A.pointX.length; index < len; index++) {
            var AX = A.pointX[index];

            if (isUndefined(AX)) continue;
            
            for(var targetIndex = 0, len = B.pointX.length; targetIndex < len; targetIndex++) {
                var BX = B.pointX[targetIndex]
                var tempDist = (AX.isCenter || BX.isCenter) ? ZERO_DIST : dist; 

                if (Math.abs(AX.x - BX.x) <= tempDist) {

                    results.push({ 
                        type: GUIDE_TYPE_VERTICAL, 
                        x: BX.x, 
                        y: AX.y, 
                        index, 
                        targetIndex,
                        startX: BX.startX, 
                        endX: BX.endX, 
                        centerX: BX.centerX,
                        sourceId: AX.id,  
                        targetId: BX.id,
                        sourceX: AX.startX,
                        width: AX.width,
                        height: AX.height
                    })
                }
            }
        }

        // y 축 비교,    
        for(var index = 0, len = A.pointY.length; index < len; index++) {
            var AY = A.pointY[index];

            if (isUndefined(AY)) continue;            
            
            for(var targetIndex = 0, len = B.pointY.length; targetIndex < len; targetIndex++) {
                var BY = B.pointY[targetIndex]
                var tempDist = (AY.isCenter || BY.isCenter) ? ZERO_DIST : dist; 

                // console.log('x축', AX.x, BX.x, Math.abs(AX.x - BX.x),  dist)
                if (Math.abs(AY.y - BY.y) <= tempDist) {
                    results.push({ 
                        type: GUIDE_TYPE_HORIZONTAL, 
                        x: AY.x, 
                        y: BY.y, 
                        index, 
                        targetIndex,
                        startY: BY.startY, 
                        endY: BY.endY, 
                        centerY: BY.centerY, 
                        sourceId: AY.id,  
                        targetId: BY.id,
                        sourceY: AY.startY,                        
                        width: AY.width,
                        height: AY.height
                    })
                }
            }
        }

        return results;
    }

    static getLayers (dist = MAX_DIST, segmentType = SEGMENT_TYPE_MOVE) {

        var layers = editor.layers;
        var selectionRect = editor.selection.rect();


        var points = []

        layers.forEach(B => {
            points.push(...$store.read(GUIDE_COMPARE, selectionRect, B, dist));
        })

        return points

    } 

    static caculate (dist = MAX_DIST, segmentType = SEGMENT_TYPE_MOVE) {

        var list = Snap.getLayers(dist, segmentType);

        if (list.length) {

            list.forEach(rect => {
                
                if (segmentType ==  SEGMENT_TYPE_MOVE) {
                    this.moveSnap($store, rect, segmentType);
                } else {
                    this.sizeSnap($store, rect, segmentType);
                }
            })
        }

    }

    sizeSnap($store, rect, segmentType) {
        var positionObject = null;
        if (rect.type == GUIDE_TYPE_HORIZONTAL) {
            var y;

            if (
                segmentType == SEGMENT_TYPE_TOP 
                || segmentType == SEGMENT_TYPE_TOP_LEFT
                || segmentType == SEGMENT_TYPE_TOP_RIGHT
            ) {
                y = rect.y;
                var height = rect.height + ( rect.sourceY - y);

                positionObject = { id: rect.sourceId, y: pxUnit(y), height: pxUnit(height) };
            }  else if (                
                segmentType == SEGMENT_TYPE_BOTTOM
                || segmentType == SEGMENT_TYPE_BOTTOM_LEFT
                || segmentType == SEGMENT_TYPE_BOTTOM_RIGHT
            ) {
                var height = rect.y - rect.sourceY; 

                positionObject = { id: rect.sourceId, height: pxUnit(height) };
            }

        }
        else if (rect.type == GUIDE_TYPE_VERTICAL) {
            var x;
            if (
                segmentType == SEGMENT_TYPE_LEFT
                || segmentType == SEGMENT_TYPE_TOP_LEFT 
                || segmentType == SEGMENT_TYPE_BOTTOM_LEFT
            ) {
                x = rect.x;
                var width = rect.width +  (rect.sourceX - x);

                positionObject = { id: rect.sourceId, x: pxUnit(x), width: pxUnit(width) };
            }  else if (                
                segmentType == SEGMENT_TYPE_RIGHT
                || segmentType == SEGMENT_TYPE_TOP_RIGHT
                || segmentType == SEGMENT_TYPE_BOTTOM_RIGHT
            ) {
                var width = rect.x - rect.sourceX; 

                positionObject = { id: rect.sourceId, width: pxUnit(width) };
            }
        }
        if (isNotUndefined(positionObject)) {
            $store.run(ITEM_SET, positionObject);
        }
    }


    moveSnap($store, rect) {
        var positionObject = null;
        if (rect.type == GUIDE_TYPE_HORIZONTAL) {
            var y;
            switch (rect.targetIndex) {
                case 0: y = rect.startY; break;
                case 1: y = rect.centerY; break;
                case 2: y = rect.endY; break;
            }
            switch (rect.index) {
                case 1: y -= Math.floor(rect.height / 2); break;
                case 2: y -= rect.height; break;
            }
            positionObject = { id: rect.sourceId, y: pxUnit(y) };
        }
        else if (rect.type == GUIDE_TYPE_VERTICAL) {
            var x;
            switch (rect.targetIndex) {
                case 0: x = rect.startX; break;
                case 1: x = rect.centerX; break;
                case 2: x = rect.endX; break;
            }
            switch (rect.index) {
                case 1: x -= Math.floor(rect.width / 2); break;
                case 2: x -= rect.width; break;
            }
            positionObject = { id: rect.sourceId, x: pxUnit(x) };
        }
        if (isNotUndefined(positionObject)) {
            $store.run(ITEM_SET, positionObject);
        }
    }
}