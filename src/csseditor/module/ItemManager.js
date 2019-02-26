import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_EDITOR } from "../types/event";
import { string2unit, UNIT_PX, EMPTY_STRING} from "../../util/css/types";
import { GETTER, ACTION } from "../../util/Store";
import { ITEM_GET, ITEM_CONVERT_STYLE, ITEM_SET_ALL, ITEM_SET, ITEM_REMOVE_CHILDREN, ITEM_SORT, ITEM_REMOVE, ITEM_REMOVE_ALL, ITEM_FOCUS, ITEM_LOAD, ITEM_TOGGLE_VISIBLE, ITEM_INIT_CHILDREN, ITEM_TOGGLE_LOCK } from "../types/ItemTypes";
import { ITEM_KEYS, ITEM_INITIALIZE } from "../types/ItemCreateTypes";
import { SELECTION_ONE } from "../types/SelectionTypes";
import { keyEach } from "../../util/functions/func";
import { ITEM_LIST_CHILDREN, ITEM_LIST_PAGE, ITEM_EACH_CHILDREN, ITEM_DOM } from "../types/ItemSearchTypes";
import { HISTORY_INITIALIZE } from "../types/HistoryTypes";

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

const convertStyle = (item) => {
    var style = item.style || {};

    keyEach(style, (key, value) => {
        item[itemField[key]] = value
    })

    delete item.style;

    keyEach(item, (key, value) => {
        if (updateUnitField[key]) {
            item[key] = string2unit (value)
        } else if (key == 'index' && value == Number.MAX_SAFE_INTEGER) {
            item[key] = 0;
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

    [ACTION(ITEM_TOGGLE_VISIBLE)] ($store, id) {
        var item = this.get(id);

        var visible =  !item.visible;

        $store.run(ITEM_SET, {id: item.id, visible});
    }

    [ACTION(ITEM_TOGGLE_LOCK)] ($store, id) {
        var item = this.get(id); 

        var lock =  !item.lock;

        $store.run(ITEM_SET, {id: item.id, lock});
    }


    [ACTION(ITEM_SET_ALL)] ($store, parentId, items, isRemove = true) {
        if (isRemove) { 
            $store.run(ITEM_REMOVE_ALL, parentId);
        }
        $store.items = {...$store.items, ...items};
    }
 
    [ACTION(ITEM_FOCUS)] ($store, objOrId) {
        var $el = $store.read(ITEM_DOM, objOrId.id || objOrId);

        if ($el) {
            $el.focus();
        }
    }


    [ACTION(ITEM_REMOVE)] ($store, id) {
        if (id) {

            var item = this.get(id);
            var itemType = item.itemType; 

            if (item.parentId) {
                var list = $store.read(ITEM_LIST_CHILDREN, item.parentId, itemType);
            } else {
                var list = $store.read(ITEM_LIST_PAGE);
            }

            var nextSelectedId = EMPTY_STRING
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
    

   [ACTION(ITEM_REMOVE_ALL)] ($store, parentId) {
        $store.read(ITEM_EACH_CHILDREN, parentId, (item) => {

            $store.run(ITEM_REMOVE_ALL, item.id);

            $store.run(ITEM_INITIALIZE, item.id);

        })
    }

    [ACTION(ITEM_REMOVE_CHILDREN)] ($store, parentId) {
        $store.read(ITEM_EACH_CHILDREN, parentId, (item) => {
            $store.run(ITEM_REMOVE, item.id);
        })
    }

    [ACTION(ITEM_SET)] ($store, obj = {}, isSelected = false) {
        var id = obj.id; 
        var oldObj = this.get(id);
        $store.items[id] = {...oldObj, ...obj};

        if (!oldObj) {
            $store.run(ITEM_INIT_CHILDREN, $store.items[id].parentId)
        }

        if (isSelected) $store.run(SELECTION_ONE, id)
    }
    
    // initialize items 
    [ACTION(ITEM_LOAD)] ($store) { 
        $store.read(ITEM_KEYS).forEach(id => {
            $store.items[id] = convertStyle($store.items[id])
        })

        $store.run(HISTORY_INITIALIZE);
    }  

    [ACTION(ITEM_INIT_CHILDREN)] ($store, parentId) {
        var parent = $store.items[parentId]
        if (parent) {
            parent.children = undefined;
        }
    }

    [ACTION(ITEM_SORT)] ($store, id, sort) {
        const[get, list_children, list_page ] = $store.mapGetters(ITEM_GET, ITEM_LIST_CHILDREN, ITEM_LIST_PAGE);

        var item = get(id);
        var itemType = item.itemType; 

        if (item.parentId) {
            var list = list_children(item.parentId, itemType);

            $store.run(ITEM_INIT_CHILDREN, item.parentId)
        } else {
            var list = list_page();
        }

        // 필요 없는 index 를 가진 객체는 지운다. 
        list = list.filter(id => {
            return $store.items[id].index != NONE_INDEX
        });

        var sortCallback = sort || ( (a, b) => {
            return $store.items[a].index > $store.items[b].index ? 1 : -1;
        })

        list.sort(sortCallback);

        list.forEach((id, index) => {
            $store.items[id].index = index * INDEX_DIST
        })
    }
}