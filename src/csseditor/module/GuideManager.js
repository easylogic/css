import BaseModule from "../../colorpicker/BaseModule";
import { GETTER } from "../../util/Store";
import { unitValue, pxUnit } from "../../util/css/types";

var list = new Array(100);
var lastIndex = -1;
var selectedItem = {}

var verticalKeys = ['y', 'centerY', 'y2']
var verticalAlign = { 'y' : 'top', 'centerY' : 'middle', 'y2' : 'bottom' }
var horizontalKeys = ['x', 'centerX', 'x2']
var horizontalAlign = { 'x' : 'left', 'centerX' : 'center', 'x2' : 'right' }
var MAX_DIST = 1; 

export default class GuideManager extends BaseModule {

    [GETTER('guide/rect/point')] ($store, obj) {
        var id = obj.id; 
        var x = unitValue(obj.x);
        var y = unitValue(obj.y);
        var width = unitValue(obj.width)
        var height = unitValue(obj.height)

        var x2 = x + width; 
        var y2 = y + height;

        var centerX = x + Math.floor(width/2); 
        var centerY = y + Math.floor(height/2); 

        var startX = x; 
        var endX = x2; 
        var startY = y; 
        var endY = y2; 

        return {
            pointX: [ 
                {x, y: centerY, startX, endX, centerX, id, width, height },
                {x: centerX, y: centerY, startX, endX, centerX, id, width, height },
                {x: x2, y: centerY, startX, endX, centerX, id, width, height }
            ],

            pointY: [
                {x: centerX, y, startY, endY, centerY, id, width, height },
                {x: centerX, y: centerY, startY, endY, centerY, id, width, height },
                {x: centerX, y: y2, startY, endY, centerY, id, width, height }
            ]
        }
    }

    [GETTER('guide/compare')] ($store, A, B, dist = MAX_DIST) {
        // x 축 비교 , x 축이 dist 안에 있으면 합격 

        var results = [] 
        A.pointX.forEach((AX, index) => {
            B.pointX.forEach(BX => {
                // console.log('x축', AX.x, BX.x, Math.abs(AX.x - BX.x),  dist)
                if (Math.abs(AX.x - BX.x) <= dist) {

                    results.push({ 
                        type: '|', 
                        x: BX.x, 
                        y: AX.y, 
                        index, 
                        startX: BX.startX, 
                        endX: BX.endX, 
                        centerX: BX.centerX,
                        sourceId: AX.id,  
                        targetId: BX.id,
                        width: AX.width,
                        height: AX.height
                    })
                }
            })
        })

        // y 축 비교,    
        A.pointY.forEach( (AY, index) => {
            B.pointY.forEach( (BY, targetIndex) => {
                // console.log('y축', AY.y, BY.y, Math.abs(AY.y - BY.y),  dist)
                if (Math.abs(AY.y - BY.y) <= dist) {
                    results.push({ 
                        type: '-', 
                        x: AY.x, 
                        y: BY.y, 
                        index, 
                        targetIndex,
                        startY: BY.startY, 
                        endY: BY.endY, 
                        centerY: BY.centerY, 
                        sourceId: AY.id,  
                        targetId: BY.id,
                        width: AY.width,
                        height: AY.height
                    })
                }
            }) 
        })

        return results;
    }

    [GETTER('guide/snap/layer')] ($store, dist = MAX_DIST) {
        var page = $store.read('selection/current/page');

        if (!page) return []
        if (page.selected) return []

        var selectionRect = $store.read('guide/rect/point', $store.read('selection/rect'));
        var pageRect = $store.read('guide/rect/point', { 
            x: pxUnit(0), 
            y: pxUnit(0), 
            width: page.width, 
            height: page.height 
        })

        var layers = [] 
        $store.read('item/each/children', page.id, (item) => {
            if ($store.read('selection/check', item.id) == false) { 
                layers.push($store.read('guide/rect/point', item))
            }
        })
        layers.push(pageRect);

        var points = []

        layers.forEach(B => {
            points.push(...$store.read('guide/compare', selectionRect, B, dist));
        })

        // console.log(points);

        return points.filter( (_, index) => index === 0);

    } 

}