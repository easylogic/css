import BaseModule from "../../colorpicker/BaseModule";
import Dom from "../../util/Dom";
import { 
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_COLORSTEP,
    ITEM_TYPE_BOXSHADOW,
    ITEM_TYPE_TEXTSHADOW,
    ITEM_TYPE_LAYER,
    ITEM_GET,
    ITEM_TYPE_PAGE
} from "../types/ItemTypes";
import { GETTER } from "../../util/Store";
import { isUndefined, clone } from "../../util/functions/func";
import { EMPTY_STRING } from "../../util/css/types";
import { ITEM_MAP_PAGE, ITEM_LIST_PAGE, ITEM_GET_ALL, ITEM_EACH_CHILDREN, ITEM_LIST, ITEM_FILTER, ITEM_LIST_CHILDREN, ITEM_COUNT_CHILDREN, ITEM_MAP_CHILDREN, ITEM_MAP_TYPE_CHILDREN, ITEM_MAP_LAYER_CHILDREN, ITEM_MAP_IMAGE_CHILDREN, ITEM_MAP_COLORSTEP_CHILDREN, ITEM_MAP_BOXSHADOW_CHILDREN, ITEM_MAP_TEXTSHADOW_CHILDREN, ITEM_FILTER_CHILDREN, ITEM_EACH_TYPE_CHILDREN, ITEM_TRAVERSE, ITEM_TREE, ITEM_TREE_NORMALIZE, ITEM_PATH, ITEM_DOM } from "../types/ItemSearchTypes";
export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemSearchManager extends BaseModule {

    [GETTER(ITEM_GET_ALL)] ($store, parentId) {
        var items = {}

        $store.read(ITEM_EACH_CHILDREN, parentId, (item) => {
            items[item.id] = {...item};

            var children = $store.read(ITEM_GET_ALL, item.id)
            Object.keys(children).forEach(key => {
                items[key] = children[key];
            }); 
        })

        return items; 
    }

    [GETTER(ITEM_LIST)] ($store, filterCallback) {
        var list = $store.itemKeys.filter(filterCallback)

        list.sort( (aId, bId) => {
            return $store.items[aId].index > $store.items[bId].index ? 1 : -1;
        })

        return list; 
    }

    [GETTER(ITEM_FILTER)] ($store, filterCallback) {
        return $store.read(ITEM_LIST, filterCallback)
    }    

    [GETTER(ITEM_LIST_PAGE)] ($store) {
        return $store.read(ITEM_LIST, this.checkOnlyItemTypeCallback($store, ITEM_TYPE_PAGE));
    } 

    [GETTER(ITEM_MAP_PAGE)] ($store, callback) {
        return $store.read(ITEM_LIST_PAGE).map( (id, index) => {
            return callback($store.items[id], index)
        }); 
    }    


    checkItemTypeCallback ($store, parentId, itemType = undefined) {     
        return function (id) {
            return $store.items[id].parentId == parentId && $store.items[id].itemType == itemType 
        }
    }

    checkOnlyItemTypeCallback ($store, itemType) {
        return function (id) {
            return $store.items[id].itemType == itemType
        }
    }
            
    checkParentItemCallback ($store, parentId) {
        return function (id) {
            return $store.items[id].parentId == parentId
        }
    }
        

    [GETTER(ITEM_LIST_CHILDREN)] ($store, parentId, itemType = undefined) {
        if (isUndefined(itemType)) {
            return $store.read(ITEM_LIST, this.checkParentItemCallback($store, parentId));
        } else {
            return $store.read(ITEM_LIST, this.checkItemTypeCallback($store, parentId, itemType));
        }
    }

    [GETTER(ITEM_COUNT_CHILDREN)] ($store, parentId) {
        return $store.read(ITEM_LIST, this.checkParentItemCallback($store, parentId)).length;
    }    

    [GETTER(ITEM_MAP_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read(ITEM_LIST, this.checkParentItemCallback($store, parentId)).map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }    

    getChildrenMapForType ($store, parentId, itemType, callback = DEFAULT_FUNCTION) {
        var parent = $store.read(ITEM_GET, parentId);

        if (!parent.children) {
            parent.children = $store.read(ITEM_LIST, this.checkItemTypeCallback($store, parentId, itemType))
        }

        return parent.children.map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }

    [GETTER(ITEM_MAP_TYPE_CHILDREN)] ($store, parentId, itemType, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, itemType, callback);
    }        

    [GETTER(ITEM_MAP_LAYER_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_LAYER, callback);
    }

    [GETTER(ITEM_MAP_IMAGE_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_IMAGE, callback);
    }

    [GETTER(ITEM_MAP_COLORSTEP_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_COLORSTEP, callback);
    }    

    [GETTER(ITEM_MAP_BOXSHADOW_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_BOXSHADOW, callback);
    }    

    [GETTER(ITEM_MAP_TEXTSHADOW_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_TEXTSHADOW, callback);
    }            

    [GETTER(ITEM_FILTER_CHILDREN)] ($store, parentId, callback) {
        return $store.read(ITEM_LIST_CHILDREN, parentId).filter(function (id, index) { 
            return callback($store.items[id], index)
        });
    }  

    [GETTER(ITEM_EACH_CHILDREN)] ($store, parentId, callback) {
        return $store.read(ITEM_LIST_CHILDREN, parentId).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }        

    [GETTER(ITEM_EACH_TYPE_CHILDREN)] ($store, parentId, itemType, callback) {
        return $store.read(ITEM_LIST_CHILDREN, parentId, itemType).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }            

    [GETTER(ITEM_TRAVERSE)] ($store, parentId) {
        var list = $store.read(ITEM_LIST_CHILDREN, parentId);
        
        list.sort( (a, b) => {
            var $a = $store.items[a];
            var $b = $store.items[b];

            if ($a.order == $b.order) {
                
                if (a > b) return 1; 
                if (a < b) return -1;  

                return 0; 
            }
            return $a.order > $b.order ? 1 : -1; 
        })
        
        return list.map(childId => {
            return { id: childId, children: $store.read(ITEM_TRAVERSE, childId)}
        })
    }

    [GETTER(ITEM_TREE)] ($store) {
        return $store.read(ITEM_TRAVERSE, EMPTY_STRING);
    }

    [GETTER(ITEM_TREE_NORMALIZE)] ($store, root = [], children = [], depth = 0) {
        var results = [] 

        var list = (root != null ? $store.read(ITEM_TREE) : children);
        list.forEach(item => {
            results.push({ id: item.id, depth })
            results.push(... $store.read(ITEM_TREE_NORMALIZE, null, item.children, depth + 1))
        });

        return results; 
    }   
    
    [GETTER(ITEM_PATH)] ($store, id) {
        var results = [id] 
        var targetId = id; 

        do {
            var item = $store.read(ITEM_GET, targetId);

            if (item.parentId == EMPTY_STRING) {
                results.push(item.id);
                break; 
            } else {
                results.push(item.id);
                targetId = item.parentId
            }

        } while(targetId)
        
        return results;
    }

    [GETTER(ITEM_DOM)] ($store, id) {
        var element = document.querySelector('[item-layer-id="' + id + '"]');

        if (element) {
            return new Dom(element)
        }
    }

}