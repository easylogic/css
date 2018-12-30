import BaseModule from "../../colorpicker/BaseModule";
import { parseParamNumber } from "../../util/filter/functions";
import { GETTER } from "../../util/Store";

var list = new Array(100);
var lastIndex = -1;
var selectedItem = {}

var verticalKeys = ['y', 'centerY', 'y2']
var verticalAlign = { 'y' : 'top', 'centerY' : 'middle', 'y2' : 'bottom' }
var horizontalKeys = ['x', 'centerX', 'x2']
var horizontalAlign = { 'x' : 'left', 'centerX' : 'center', 'x2' : 'right' }
var MAX_DIST = 1; 

export default class GuideManager extends BaseModule {

    [GETTER('guide/rect')] ($store, obj) {
        var x = parseParamNumber(obj.x);
        var y = parseParamNumber(obj.y);
        var width = parseParamNumber(obj.width)
        var height = parseParamNumber(obj.height)

        var x2 = x + width; 
        var y2 = y + height;

        var centerX = x + Math.floor(width/2); 
        var centerY = y + Math.floor(height/2); 

        return {x, y, x2, y2, width, height, centerX, centerY}
    }

    [GETTER('guide/snap/layer')] ($store, layer, dist = MAX_DIST) {
        var list = $store.read('guide/line/layer', dist);
        var x, y;
        if (list.length) {
            var height = parseParamNumber(layer.height)
            var width = parseParamNumber(layer.width)
            var topY = Math.min(...list.filter(it => it.align == 'top').map(it => it.y))
            var middleY = Math.min(...list.filter(it => it.align == 'middle').map(it => it.y))
            var bottomY = Math.min(...list.filter(it => it.align == 'bottom').map(it => it.y))
            var leftX = Math.min(...list.filter(it => it.align == 'left').map(it => it.x))
            var centerX = Math.min(...list.filter(it => it.align == 'center').map(it => it.x))
            var rightX = Math.min(...list.filter(it => it.align == 'right').map(it => it.x))

            if (topY != Infinity) {
                y = topY
            } else if (bottomY != Infinity) {
                y = bottomY -  height
            } else if (middleY != Infinity) {
                y =  Math.floor(middleY - height/2)
            }

            if (leftX  != Infinity) {
                x = leftX
            } else if (rightX != Infinity) {
                x = rightX -  width
            } else if (centerX != Infinity) {
                x =  Math.floor(centerX - width/2)
            }            

            if (typeof x != 'undefined' && typeof y != 'undefined') {
                return [x, y]
            }

        }

        return []

    } 

    [GETTER('guide/line/layer')] ($store , dist = MAX_DIST, selectedRect) {

        var page = $store.read('selection/current/page');

        if (!page) return []
        if (page.selected) return []

        var index = 0; 
        selectedItem = $store.read('guide/rect', selectedRect || $store.read('selection/rect'));

        list[index++] = $store.read('guide/rect', { 
            x: '0px', 
            y: '0px', 
            width: page.width, 
            height: page.height 
        })

        $store.read('item/each/children', page.id, (item) => {
            if ($store.read('selection/check', item.id) == false) { 
                var newItem = $store.read('guide/rect', { 
                    x: item.x, 
                    y: item.y,
                    width: item.width,
                    height: item.height
                })                
                list[index++] = newItem
            }
        })

        list.forEach(it => {
            var distance = Math.sqrt(
                Math.pow(it.centerX - selectedItem.centerX,2) + 
                Math.pow(it.centerY - selectedItem.centerY,2)
            )

            it.distance = distance
        })

        list.sort( (a, b) => {
            if (a.distance == b.distance ) return 0; 
            return a.distance > b.distance ? 1 : -1; 
        })

        lastIndex = 3; 
        
        return $store.read('guide/paths', dist); 
    }

    [GETTER('guide/paths')] ($store, dist = MAX_DIST) {

        var results = [] 
        for(var i = 0; i < lastIndex; i++) {
            results.push(...$store.read('guide/check', list[i], selectedItem, dist))
        }

        return results; 
    }

    [GETTER('guide/check')] ($store, item1, item2, dist = MAX_DIST) {
        var results = []

        results.push(...$store.read('guide/check/vertical', item1, item2, dist))

        results.push(...$store.read('guide/check/horizontal', item1, item2, dist))

        return results;
    }

    [GETTER('guide/check/vertical')] ($store, item1, item2, dist = MAX_DIST) {
        var results = []

        verticalKeys.forEach(key => {
            // top
            if (Math.abs(item1.y - item2[key]) < dist) {
                results.push({ type: '-', 
                    align: verticalAlign[key],
                    x: Math.min(item1.centerX, item2.centerX), 
                    y: item1.y,  
                    width: Math.max(item1.centerX, item2.centerX) - Math.min(item1.centerX, item2.centerX)
                })
            }

            // middle
            if (Math.abs(item1.centerY - item2[key]) < dist) {
                results.push({ type: '-', 
                    align: verticalAlign[key],
                    x: Math.min(item1.centerX, item2.centerX), 
                    y: item1.centerY,  
                    width: Math.max(item1.centerX, item2.centerX) - Math.min(item1.centerX, item2.centerX)
                })
            }

            // bottom
            if (Math.abs(item1.y2 - item2[key]) < dist) {
                results.push({ type: '-', 
                    align: verticalAlign[key],
                    x: Math.min(item1.centerX, item2.centerX), 
                    y: item1.y2,  
                    width: Math.max(item1.centerX, item2.centerX) - Math.min(item1.centerX, item2.centerX)
                })
            }

        })

        return results; 
    }

    [GETTER('guide/check/horizontal')] ($store, item1, item2, dist = MAX_DIST) {
        var results = []

        horizontalKeys.forEach(key => {

            // left 
            if (Math.abs(item1.x - item2[key]) < dist) {
                results.push({ type: '|', 
                    align: horizontalAlign[key],
                    x: item1.x, 
                    y: Math.min(item1.centerY, item2.centerY),  
                    height: Math.max(item1.centerY, item2.centerY) - Math.min(item1.centerY, item2.centerY)
                })
            }

            // center
            if (Math.abs(item1.centerX - item2[key]) < dist) {
                results.push({ type: '|', 
                    align: horizontalAlign[key],
                    x: item1.centerX, 
                    y: Math.min(item1.centerY, item2.centerY),  
                    height: Math.max(item1.centerY, item2.centerY) - Math.min(item1.centerY, item2.centerY)
                })
            }

            // right
            if (Math.abs(item1.x2 - item2[key]) < dist) {
                results.push({ type: '|', 
                    align: horizontalAlign[key],
                    x: item1.x2, 
                    y: Math.min(item1.centerY, item2.centerY),  
                    height: Math.max(item1.centerY, item2.centerY) - Math.min(item1.centerY, item2.centerY)
                })
            }

        })
        
        return results; 
    }


}