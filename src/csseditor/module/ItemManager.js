import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_EDITOR } from "../types/event";
import { string2unit, UNIT_PX} from "../../util/css/types";
import { GETTER, ACTION } from "../../util/Store";
import { ITEM_GET, ITEM_CONVERT_STYLE, ITEM_SET_ALL, ITEM_SET, ITEM_REMOVE_CHILDREN, ITEM_SORT, ITEM_REMOVE } from "./ItemTypes";
import { ITEM_KEYS, ITEM_INITIALIZE } from "./ItemCreateTypes";
import { SELECTION_ONE } from "./SelectionTypes";
import { clone } from "../../util/functions/func";

export const INDEX_DIST = 100 ; 
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
    backgroundSizeHeight: true,
    x: true,
    y: true,
    width: true,
    height: true,
    backgroundPositionX: true,
    backgroundPositionY: true,
    backgroundSizeHeight: true,
    backgroundSizeWidth: true
}

const updateNumberUnitField = {
    x: UNIT_PX,
    y: UNIT_PX,
    width: UNIT_PX,
    height: UNIT_PX,
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
        } 
    })

    return item; 
}

export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemManager extends BaseModule {

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    [GETTER(ITEM_CONVERT_STYLE)] ($store, item) {
        return convertStyle(item);
    }


    [GETTER(ITEM_GET)] ($store, id) {
        return $store.items[id] || {};
    }

    [ACTION(ITEM_SET_ALL)] ($store, parentId, items, isRemove = true) {
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


    [ACTION(ITEM_REMOVE)] ($store, id) {
        if (id) {

            var item = $store.read(ITEM_GET, id);
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
                $store.run(SELECTION_ONE, nextSelectedId)
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
                        $store.run(SELECTION_ONE, nextSelectedId)
                    }                        
                } else {
                    $store.run(SELECTION_ONE, item.parentId)
                }
            }


            $store.items[id].index = NONE_INDEX;
            $store.run(ITEM_SORT, id);

            if ($store.items[id].backgroundImage) {
                URL.revokeObjectURL($store.items[id].backgroundImage);
            }
            $store.run(ITEM_INITIALIZE, id);
        }
    }
    

   [ACTION('item/remove/all')] ($store, parentId) {
        $store.read('item/each/children', parentId, (item) => {

            $store.run('item/remove/all', item.id);

            $store.run(ITEM_INITIALIZE, item.id);

        })
    }

    [ACTION(ITEM_REMOVE_CHILDREN)] ($store, parentId) {
        $store.read('item/each/children', parentId, (item) => {
            $store.run(ITEM_REMOVE, item.id);
        })
    }

    [ACTION(ITEM_SET)] ($store, obj = {}, isSelected = false) {
        var id = obj.id; 
        var prevItem = clone($store.read(ITEM_GET, id));
        $store.items[id] = Object.assign({}, prevItem, obj);

        if (isSelected) $store.run(SELECTION_ONE, id)
    }
    
    // initialize items 
    [ACTION('item/load')] ($store) { 
        $store.read(ITEM_KEYS).forEach(id => {
            $store.items[id] = convertStyle($store.items[id])
        })

        $store.run('history/initialize');
    }  

    [ACTION(ITEM_SORT)] ($store, id) {
        var item = $store.read(ITEM_GET, id);
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