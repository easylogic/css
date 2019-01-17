import BaseModule from "../../colorpicker/BaseModule";
import Dom from "../../util/Dom";
import { 
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_COLORSTEP,
    ITEM_TYPE_BOXSHADOW,
    ITEM_TYPE_TEXTSHADOW,
    ITEM_TYPE_LAYER,
    ITEM_GET
} from "./ItemTypes";
import { GETTER } from "../../util/Store";
import { isUndefined, clone } from "../../util/functions/func";
import { EMPTY_STRING } from "../../util/css/types";
export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemSearchManager extends BaseModule {

    [GETTER('item/get/all')] ($store, parentId) {
        var items = {}

        $store.read('item/each/children', parentId, (item) => {
            items[item.id] = clone(item);

            var children = $store.read('item/get/all', item.id)
            Object.keys(children).forEach(key => {
                items[key] = children[key];
            }); 
        })

        return items; 
    }

    [GETTER('item/list')] ($store, filterCallback) {
        var list = $store.itemKeys.filter(filterCallback)

        list.sort( (aId, bId) => {
            return $store.items[aId].index > $store.items[bId].index ? 1 : -1;
        })

        return list; 
    }

    [GETTER('item/filter')] ($store, filterCallback) {
        return $store.read('item/list', filterCallback)
    }    

    [GETTER('item/list/page')] ($store) {
        return $store.read('item/list', this.checkOnlyItemTypeCallback($store, 'page'));
    } 

    [GETTER('item/map/page')] ($store, callback) {
        return $store.read('item/list/page').map( (id, index) => {
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
        

    [GETTER('item/list/children')] ($store, parentId, itemType) {
        if (isUndefined(itemType)) {
            return $store.read('item/list', this.checkParentItemCallback($store, parentId));
        } else {
            return $store.read('item/list', this.checkItemTypeCallback($store, parentId, itemType));
        }
    }

    [GETTER('item/count/children')] ($store, parentId) {
        return $store.read('item/list', this.checkParentItemCallback($store, parentId)).length;
    }    

    [GETTER('item/map/children')] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkParentItemCallback($store, parentId)).map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }    

    [GETTER('item/map/type/children')] ($store, parentId, itemType, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkItemTypeCallback($store, parentId, itemType)).map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }        

    [GETTER('item/map/layer/children')] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_LAYER)).map(function (id, index) { 
            return callback($store.items[id], index)
        });        
    }

    [GETTER('item/map/image/children')] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_IMAGE)).map(function (id, index) { 
            return callback($store.items[id], index)
        });        
    }

    [GETTER('item/map/colorstep/children')] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_COLORSTEP)).map(function (id, index) { 
            return callback($store.items[id], index)
        });        
    }    

    [GETTER('item/map/boxshadow/children')] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_BOXSHADOW)).map(function (id, index) { 
            return callback($store.items[id], index)
        });        
    }    

    [GETTER('item/map/textshadow/children')] ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('item/list', this.checkItemTypeCallback($store, parentId, ITEM_TYPE_TEXTSHADOW)).map(function (id, index) { 
            return callback($store.items[id], index)
        });        
    }            

    [GETTER('item/filter/children')] ($store, parentId, callback) {
        return $store.read('item/list/children', parentId).filter(function (id, index) { 
            return callback($store.items[id], index)
        });
    }  

    [GETTER('item/each/children')] ($store, parentId, callback) {
        return $store.read('item/list/children', parentId).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }        

    [GETTER('item/each/type/children')] ($store, parentId, itemType, callback) {
        return $store.read('item/list/children', parentId, itemType).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }            

    [GETTER('item/traverse')] ($store, parentId) {
        var list = $store.read('item/list/children', parentId);
        
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
            return { id: childId, children: $store.read('item/traverse', childId)}
        })
    }

    [GETTER('item/tree')] ($store) {
        return $store.read('item/traverse', EMPTY_STRING);
    }

    [GETTER('item/tree/normalize')] ($store, root = [], children = [], depth = 0) {
        var results = [] 

        var list = (root != null ? $store.read('item/tree') : children);
        list.forEach(item => {
            results.push({ id: item.id, depth })
            results.push(... $store.read('item/tree/normalize', null, item.children, depth + 1))
        });

        return results; 
    }   
    
    [GETTER('item/path')] ($store, id) {
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

    [GETTER('item/dom')] ($store, id) {
        var element = document.querySelector('[item-layer-id="' + id + '"]');

        if (element) {
            return new Dom(element)
        }
    }

}