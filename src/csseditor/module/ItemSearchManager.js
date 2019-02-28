import BaseModule from "../../util/BaseModule";
import Dom from "../../util/Dom";
import { GETTER } from "../../util/Store";
import { isUndefined } from "../../util/functions/func";
import { EMPTY_STRING, ITEM_TYPE_PAGE, ITEM_TYPE_LAYER, ITEM_TYPE_TIMELINE, ITEM_TYPE_KEYFRAME, ITEM_TYPE_IMAGE, ITEM_TYPE_COLORSTEP, ITEM_TYPE_BOXSHADOW, ITEM_TYPE_TEXTSHADOW } from "../../util/css/types";
import { 
    ITEM_MAP_PAGE, 
    ITEM_LIST_PAGE, 
    ITEM_EACH_CHILDREN, 
    ITEM_LIST, 
    ITEM_LIST_CHILDREN, 
    ITEM_COUNT_CHILDREN, 
    ITEM_MAP_CHILDREN, 
    ITEM_MAP_TYPE_CHILDREN, 
    ITEM_MAP_LAYER_CHILDREN, 
    ITEM_MAP_IMAGE_CHILDREN, 
    ITEM_MAP_COLORSTEP_CHILDREN, 
    ITEM_MAP_BOXSHADOW_CHILDREN, 
    ITEM_MAP_TEXTSHADOW_CHILDREN, 
    ITEM_EACH_TYPE_CHILDREN,  
    ITEM_PATH, 
    ITEM_DOM, 
    ITEM_MAP_TIMELINE_CHILDREN, 
    ITEM_MAP_KEYFRAME_CHILDREN 
} from "../types/ItemSearchTypes";
import { DEFAULT_FUNCTION } from "../../util/css/make";

export default class ItemSearchManager extends BaseModule {

    initialize() {
        super.initialize()

        this.sort_function = (aId, bId) => {
            var aIndex = this.$store.items[aId].index
            var bIndex = this.$store.items[bId].index;
            if (aIndex == bIndex) return 0;
            return aIndex > bIndex ? 1 : -1;
        }
    }

    [GETTER(ITEM_LIST)] ($store, filterCallback) {
        var list = $store.itemKeys.filter(filterCallback)

        list.sort(this.sort_function)

        return list; 
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
        var parent = this.get(parentId);

        parent.children = parent.children || {}

        if (!parent.children[itemType]) {
            parent.children[itemType] = $store.read(ITEM_LIST, this.checkItemTypeCallback($store, parentId, itemType))
        }

        return parent.children[itemType].map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }

    [GETTER(ITEM_MAP_TYPE_CHILDREN)] ($store, parentId, itemType, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, itemType, callback);
    }        

    [GETTER(ITEM_MAP_LAYER_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_LAYER, callback);
    }

    [GETTER(ITEM_MAP_TIMELINE_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_TIMELINE, callback)
    }    

    [GETTER(ITEM_MAP_KEYFRAME_CHILDREN)] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return this.getChildrenMapForType($store, parentId, ITEM_TYPE_KEYFRAME, callback)        
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

    [GETTER(ITEM_EACH_CHILDREN)] ($store, parentId, callback) {
        var parent = this.get(parentId);

        var children = parent.children;

        if (!children) {
            children = $store.read(ITEM_LIST, this.checkParentItemCallback($store, parentId))
        } else {
            if (children.colorstep) {
                return children.colorstep.forEach(function (id, index) { 
                    callback($store.items[id], index)
                });
            } else {
                return children.forEach(function (id, index) { 
                    callback($store.items[id], index)
                });
            }
        }

    }        

    [GETTER(ITEM_EACH_TYPE_CHILDREN)] ($store, parentId, itemType, callback) {
        return $store.read(ITEM_LIST_CHILDREN, parentId, itemType).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }            
    
    [GETTER(ITEM_PATH)] ($store, id) {
        var results = [id] 
        var targetId = id; 

        do {
            var item = this.get(targetId);

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