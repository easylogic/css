import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_EDITOR } from "../types/event";
import { string2unit, UNIT_PX, unitObject } from "../../util/css/types";
import { parseParamNumber } from "../../util/filter/functions";
import { GETTER, ACTION } from "../../util/Store";

const INDEX_DIST = 100 ; 
const NONE_INDEX = -99999;

const itemField = {
    'mix-blend-mode' : 'mixBlendMode',
    'background-blend-mode' : 'backgroundBlendMode',
    'background-color': 'backgroundColor',
    'x': 'x',
    'y': 'y',
    'width': 'width',
    'height': 'height',
    'rotate': 'rotate',
    'border-radius': 'borderRadius',
    'border-top-left-radius': 'borderTopLeftRadius',
    'border-top-right-radius': 'borderTopRightRadius',
    'border-bottom-left-radius': 'borderBottomLeftRadius',
    'border-bottom-right-radius': 'borderBottomRightRadius',
    'skewX': 'skewX',
    'skewY': 'skewY',            
    'scale':'scale',
    'translateX':'translateX',
    'translateY':'translateY',
    'translateZ':'translateZ',
    'rotate3dX':'rotate3dX',
    'rotate3dY':'rotate3dY',
    'rotate3dZ':'rotate3dZ',
    'rotate3dA':'rotate3dA',
    'scale3dX':'scale3dX',
    'scale3dY':'scale3dY',
    'scale3dZ':'scale3dZ',
    'translate3dX':'translate3dX',
    'translate3dY':'translate3dY',
    'translate3dZ':'translate3dZ',
}

const updateUnitField = {
    borderRadius: true,
    borderTopLeftRadius: true,
    borderBottomLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    backgroundSizeWidth: true,
    backgroundSizeHeight: true
}

const updateNumberUnitField = {
    backgroundPositionX: UNIT_PX,
    backgroundPositionY: UNIT_PX,
    backgroundSizeHeight: UNIT_PX,
    backgroundSizeWidth: UNIT_PX,
}

const convertStyle = (item) => {
    var style = item.style || {};

    Object.keys(style).forEach(key => {
        item[itemField[key]] = style[key]
    })

    delete item.style;

    Object.keys(item).forEach(key => {
        if (updateUnitField[key]) {
            item[key] = string2unit (item[key])
        } else if (updateNumberUnitField[key]) {
            item[key] = unitObject (parseParamNumber(item[key]), updateNumberUnitField[key])
        }
    })

    return item; 
}

export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemManager extends BaseModule {

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    [GETTER('item/convert/style')] ($store, item) {
        return convertStyle(item);
    }


    [GETTER('item/get')] ($store, id) {
        return $store.items[id] || {};
    }

    [ACTION('item/set/all')] ($store, parentId, items, isRemove = true) {
        if (isRemove) { 
            $store.run('item/remove/all', parentId);
        }
        Object.assign($store.items, items);
    }
 
    [ACTION('item/focus')] ($store, id) {
        var $el = $store.read('item/dom', id);

        if ($el && $el.el) {
            $el.el.focus();
        }
    }


    [ACTION('item/remove')] ($store, id) {
        if (id) {

            var item = $store.read('item/get', id);
            var itemType = item.itemType; 

            if (item.parentId) {
                var list = $store.read('item/list/children', item.parentId, itemType);
            } else {
                var list = $store.read('item/list/page');
            }

            var nextSelectedId = '' 
            for(var i = 0, len = list.length; i < len; i++) {
                var nodeId = list[i]
                if ($store.items[id].index > item.index) {
                    nextSelectedId = nodeId; 
                    break;
                }
            }


            if (nextSelectedId) {
                $store.run('selection/one', nextSelectedId)
            } else {
                if (item.index > 0 ) {
                    for(var i = 0, len = list.length; i < len; i++) {
                        var nodeId = list[i]
                        if ($store.items[nodeId].index == item.index - INDEX_DIST) {
                            nextSelectedId = nodeId; 
                            break;
                        }
                    }

                    if (nextSelectedId) {
                        $store.run('selection/one', nextSelectedId)
                    }                        
                } else {
                    $store.run('selection/one', item.parentId)
                }
            }


            $store.items[id].index = NONE_INDEX;
            $store.read('item/sort', id);

            if ($store.items[id].backgroundImage) {
                URL.revokeObjectURL($store.items[id].backgroundImage);
            }
            $store.run('item/initialize', id);
        }
    }
    

   [ACTION('item/remove/all')] ($store, parentId) {
        $store.read('item/each/children', parentId, (item) => {

            $store.run('item/remove/all', item.id);

            $store.run('item/initialize', item.id);

        })
    }

    [ACTION('item/remove/children')] ($store, parentId) {
        $store.read('item/each/children', parentId, (item) => {
            $store.run('item/remove', item.id);
        })
    }

    [ACTION('item/set')] ($store, obj = {}, isSelected = false) {
        var id = obj.id; 
        var prevItem = $store.clone('item/get', id)
        $store.items[id] = Object.assign({}, prevItem, obj);

        if (isSelected) $store.run('selection/one', id)
    }
    
    // initialize items 
    [ACTION('item/load')] ($store) { 
        $store.read('item/keys').forEach(id => {
            $store.items[id] = convertStyle($store.items[id])
        })

        $store.run('history/initialize');
    }  

    [ACTION('item/sort')] ($store, id) {
        var item = $store.read('item/get', id);
        var itemType = item.itemType; 

        if (item.parentId) {
            var list = $store.read('item/list/children', item.parentId, itemType);
        } else {
            var list = $store.read('item/list/page');
        }

        // 필요 없는 index 를 가진 객체는 지운다. 
        list = list.filter(id => {
            return $store.items[id].index != NONE_INDEX
        });

        list.sort( (a, b) => {
            return $store.items[a].index > $store.items[b].index ? 1 : -1;
        })

        list.forEach((id, index) => {
            $store.items[id].index = index * INDEX_DIST
        })
    }
}