import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_SELECTION } from "../types/event";
import { unitValue, pxUnit, EMPTY_STRING, ITEM_TYPE_IMAGE, ITEM_TYPE_BOXSHADOW, ITEM_TYPE_TEXTSHADOW, ITEM_TYPE_LAYER, ITEM_TYPE_PAGE } from "../../util/css/types";
import { isFunction } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { SELECTION_INITIALIZE_DATA, SELECTION_IDS, SELECTION_CHECK, SELECTION_IS_EMPTY, SELECTION_IS_NOT_EMPTY, SELECTION_HAS_ONE, SELECTION_HAS_MANY, SELECTION_TYPE, SELECTION_CURRENT, SELECTION_UNIT_VALUES, SELECTION_IS_ONE, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_IMAGE_ID, SELECTION_CURRENT_BOXSHADOW, SELECTION_CURRENT_BOXSHADOW_ID, SELECTION_CURRENT_TEXTSHADOW, SELECTION_CURRENT_TEXTSHADOW_ID, SELECTION_CURRENT_LAYER, SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_PAGE, SELECTION_CURRENT_PAGE_ID, SELECTION_MODE, SELECTION_IS, SELECTION_IS_ITEM, SELECTION_IS_LAYER, SELECTION_IS_IMAGE, SELECTION_IS_PAGE, SELECTION_IS_BOXSHADOW, SELECTION_IS_TEXTSHADOW, SELECTION_IS_FILTER, SELECTION_IS_BACKDROP_FILTER, SELECTION_IS_GROUP, SELECTION_IS_AREA, SELECTION_LAYERS, SELECTION_ONE, SELECTION_CHANGE, SELECTION_AREA, SELECTION_RECT } from "../types/SelectionTypes";
import { ITEM_FILTER, ITEM_PATH, ITEM_LIST_PAGE } from "../types/ItemSearchTypes";
import { IS_LAYER, IS_IMAGE, IS_PAGE, IS_BOXSHADOW, IS_TEXTSHADOW } from "../../util/css/make";

export const EDITOR_MODE_PAGE = 'page';
export const EDITOR_GROUP_SELECT = 'layer-group'
export const EDITOR_MODE_LAYER = 'layer-rect';
export const EDITOR_MODE_LAYER_BORDER = 'layer-border';
export const EDITOR_MODE_IMAGE = 'image'; 
export const EDITOR_MODE_IMAGE_LINEAR = 'image-linear'; 
export const EDITOR_MODE_IMAGE_RADIAL = 'image-radial'; 
export const EDITOR_MODE_IMAGE_STATIC = 'image-static'; 
export const EDITOR_MODE_IMAGE_IMAGE = 'image-image'; 

export const SELECT_MODE_ONE = `SELECT_MODE_ONE`
export const SELECT_MODE_AREA = `SELECT_MODE_AREA`
export const SELECT_MODE_GROUP = `SELECT_MODE_GROUP`

export default class SelectionManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.selection = {
            type: SELECT_MODE_ONE,
            ids: [],
            items: [],
            pageId: '',
            itemType: EMPTY_STRING
        }
    }

    afterDispatch () {
        this.$store.emit(CHANGE_SELECTION)
    }


    checkInArea (area, item) {

        if (area.width === 0) {return false; }
        if (area.height === 0) {return false; } 
        if (area.x2 < item.x) { return false; }
        if (area.y2 < item.y) { return false; }
        if (area.x > item.x2) { return false; }
        if (area.y > item.y2) { return false; }

        return true;
    }

    [GETTER(SELECTION_INITIALIZE_DATA)] ($store) {
        return {
            type: SELECT_MODE_ONE,
            ids: [],
            items: [],
            pageId: '',
            itemType: EMPTY_STRING
        }
    }

    [GETTER(SELECTION_IDS)] ($store) {
        return $store.selection.ids || []
    }

    [GETTER(SELECTION_CHECK)] ($store, id) {
        return $store.selection.ids.includes(id);
    }

    [GETTER(SELECTION_IS_EMPTY)] ($store) {
        return $store.selection.ids.length === 0; 
    }

    [GETTER(SELECTION_IS_NOT_EMPTY)] ($store) {
        return $store.selection.ids.length > 0; 
    }    

    [GETTER(SELECTION_HAS_ONE)] ($store) {
        return $store.selection.ids.length === 1; 
    }

    [GETTER(SELECTION_HAS_MANY)] ($store) {
        return $store.selection.ids.length > 1; 
    }

    [GETTER(SELECTION_TYPE)] ($store) {
        return $store.selection.type;
    }

    [GETTER(SELECTION_CURRENT)] ($store) {
        return $store.selection.ids.filter(id => !!$store.items[id]).map(id => $store.items[id])
    }   

    [GETTER(SELECTION_UNIT_VALUES)] ($store) {
        return $store.read(SELECTION_CURRENT).map(item => {
            return {
                id: item.id,
                x: unitValue(item.x),
                y: unitValue(item.y),
                width: unitValue(item.width),
                height: unitValue(item.height),                
                x2: unitValue(item.x) + unitValue(item.width),
                y2: unitValue(item.y) + unitValue(item.height),                
                centerX: unitValue(item.x) + unitValue(item.width)/2,
                centerY: unitValue(item.y) + unitValue(item.height)/2
            }
        });
    }

    getCurrentItem ($store, itemType, callback) {
        var items = null

        if ($store.selection.itemType == itemType) {
            var items = $store.read(SELECTION_CURRENT)
        }

        if (Array.isArray(items) && items.length) {
            if ($store.read(SELECTION_IS_ONE)) {
                if (isFunction(callback)) callback (items[0])
                return items[0]
            } else {
                if (isFunction(callback)) callback (items)
                return items
            }    
            
        }

        return items;
    }

    getCurrentItemId ($store, itemType, callback) {
        var items = null

        if ($store.selection.itemType == itemType) {
            var items = $store.read(SELECTION_CURRENT)
        }

        if (Array.isArray(items) && items.length) {
            if ($store.read(SELECTION_IS_ONE) ) {
                if (isFunction(callback)) callback (items[0].id)
                return items[0].id
            } else {
                if (isFunction(callback)) callback (items.map(it => it.id))
                return items.map(it => it.id)
            }   
        }

        return items;
    }

    [GETTER(SELECTION_CURRENT_IMAGE)] ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_IMAGE, callback);
    }

    [GETTER(SELECTION_CURRENT_IMAGE_ID)] ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_IMAGE, callback);
    }   

    [GETTER(SELECTION_CURRENT_BOXSHADOW)] ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_BOXSHADOW, callback);
    }

    [GETTER(SELECTION_CURRENT_BOXSHADOW_ID)] ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_BOXSHADOW, callback);
    }       

    [GETTER(SELECTION_CURRENT_TEXTSHADOW)] ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_TEXTSHADOW, callback);
    }

    [GETTER(SELECTION_CURRENT_TEXTSHADOW_ID)] ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_TEXTSHADOW, callback);
    }       

    [GETTER(SELECTION_CURRENT_LAYER)] ($store, callback) {
        var layers = ($store.selection.layers || [] ).map( id => this.get(id)) ;

        if (Array.isArray(layers) && layers.length) {
            if ($store.read(SELECTION_IS_ONE)) {
                if (isFunction(callback)) callback (layers[0])
                return layers[0]
            } else {
                if (isFunction(callback)) callback (layers)
                return layers
            }        
        }

        return layers;
    }

    [GETTER(SELECTION_CURRENT_LAYER_ID)] ($store, callback) {
        var layers = $store.selection.layers || [] ;

        if (Array.isArray(layers) && layers.length) {
            if ($store.read(SELECTION_IS_ONE) ) {
                if (isFunction(callback)) callback (layers[0])
                return layers[0]
            } else {
                if (isFunction(callback)) callback (layers)
                return layers
            }        
        }

        return layers;
    }
    
    [GETTER(SELECTION_CURRENT_PAGE)] ($store, callback) {
        var page = this.get($store.selection.pageId)

        if (!page) {
            var pages = $store.read(ITEM_LIST_PAGE)
            page = pages[0]
        }

        if (page ) {
            if (isFunction(callback)) callback (page)
            return page
        }

        return null;

    }    

    [GETTER(SELECTION_CURRENT_PAGE_ID)] ($store, callback) {
       
        var pageId = $store.selection.pageId

        if (!pageId) {
            var pages = $store.read(ITEM_LIST_PAGE)
            pageId = (pages[0] || {}).pageId
        }

        if (pageId ) {
            if (isFunction(callback)) callback (pageId)
            return pageId
        }

        return null;

    }    


    [GETTER(SELECTION_MODE)] ($store) {
        return $store.selection;
    }

    [GETTER(SELECTION_IS)] ($store, type) {
        return $store.selection.type == type; 
    }

    [GETTER(SELECTION_IS_ITEM)] ($store, type) {
        return $store.selection.itemType == type; 
    }    

    [GETTER(SELECTION_IS_LAYER)] ($store, type) {
        return IS_LAYER($store.selection)
    }        

    [GETTER(SELECTION_IS_IMAGE)] ($store, type) {

        var isImage = IS_IMAGE($store.selection);
        var isTypeCheck = true; 

        if (type) {
            if ($store.selection.ids.length ) {
                var item = this.get($store.selection.ids[0]);

                isTypeCheck = item.type == type
            }
        }

        return isImage && isTypeCheck;
    }            

    [GETTER(SELECTION_IS_PAGE)] ($store, type) {
        return IS_PAGE($store.selection);
    }                

    [GETTER(SELECTION_IS_BOXSHADOW)] ($store, type) {
        return IS_BOXSHADOW($store.selection);
    }                    

    [GETTER(SELECTION_IS_TEXTSHADOW)] ($store, type) {
        return IS_TEXTSHADOW($store.selection);
    }                    
    
    [GETTER(SELECTION_IS_ONE)] ($store) {
        return $store.read(SELECTION_IS, SELECT_MODE_ONE)
    }

    [GETTER(SELECTION_IS_GROUP)] ($store) {
        return $store.read(SELECTION_IS, SELECT_MODE_GROUP)
    }    

    [GETTER(SELECTION_IS_AREA)] ($store) {
        return $store.read(SELECTION_IS, SELECT_MODE_AREA)
    }        

    [GETTER(SELECTION_LAYERS)] ($store) {
        return $store.read(ITEM_FILTER, (id) => {
            return IS_LAYER($store.items[id])
        }).map(id => {
            var {x, y, width, height} = $store.items[id]

            x = unitValue(x);
            y = unitValue(y);
            width = unitValue(width);
            height = unitValue(height);
            var x2 = x + width;
            var y2 = y + height;

            return {x, y, width, height, x2, y2, id} 
        })
    }

    [ACTION(SELECTION_ONE)] ($store, selectedId = EMPTY_STRING) {
        $store.selection = {  
            type: SELECT_MODE_ONE, 
            ids: [selectedId],
            itemType: $store.items[selectedId].itemType
        }

        var path = $store.read(ITEM_PATH, selectedId)
        $store.selection.pageId = path[path.length-1];

        var layers = [] 

        if (IS_LAYER($store.selection)) {
            layers = [selectedId]
        } else if (
            IS_IMAGE($store.selection)
            || IS_BOXSHADOW($store.selection)
            || IS_TEXTSHADOW($store.selection)
        ) {
            layers = [this.get(selectedId).parentId]
        }        

        $store.selection.layers = layers; 
    }    

    [ACTION(SELECTION_CHANGE)] ($store, itemType) {
        if (IS_PAGE({itemType})) {
            $store.read(SELECTION_CURRENT_PAGE_ID, (id) => {
                if (id) {
                    $store.run(SELECTION_ONE, id);
                }
            })
        }
    }

    [ACTION(SELECTION_AREA)] ($store, {x, y, width, height})  {
        var x2 = x + width; 
        var y2 = y + height; 

        var area = {x, y, width, height, x2, y2}

        var layers = $store.read(SELECTION_LAYERS)

        var selectItems = []
        layers.forEach(it => {

            if (this.checkInArea(area, it)) {
                selectItems.push(it.id);
            }
        })

        if (selectItems.length) {
            $store.selection = { 
                type: selectItems.length == 1 ?  SELECT_MODE_ONE : SELECT_MODE_GROUP, 
                ids: selectItems,
                itemType: ITEM_TYPE_LAYER
            }
            var path = $store.read(ITEM_PATH, $store.selection.ids[0])
            $store.selection.pageId = path[path.length-1];          

            var layers = [] 

            if (IS_LAYER($store.selection)) {
                layers = [...selectItems]
            } else if (
                IS_IMAGE($store.selection) 
                || IS_BOXSHADOW($store.selection)
                || IS_TEXTSHADOW($store.selection)
            ) {
                layers = selectItems.map(id => this.get(id).parentId)
            }        
    
            $store.selection.layers = layers; 

        } else {
            $store.run(SELECTION_CHANGE, ITEM_TYPE_PAGE)
        }        
    }

    [GETTER(SELECTION_RECT)] ($store) {
        var items = $store.selection.ids.map(id => {
            var {x, y, width, height} = $store.items[id]

            x = unitValue(x);
            y = unitValue(y);
            width = unitValue(width);
            height = unitValue(height);
            var x2 = x + width;
            var y2 = y + height;

            return {x, y, width, height, x2, y2, id} 
        })

        var x = Math.min(...items.map(it => it.x))
        var y = Math.min(...items.map(it => it.y))
        var x2 = Math.max(...items.map(it => it.x2))
        var y2 = Math.max(...items.map(it => it.y2))

        var width = x2 - x;
        var height = y2 - y; 
        var centerX = x + (width/2);
        var centerY = y + (height/2);

        x = pxUnit(x)
        y = pxUnit(y)
        width = pxUnit(width)
        height = pxUnit(height)
        centerX = pxUnit(centerX);
        centerY = pxUnit(centerY);        


        if (items.length == 1) {
            return { x, y, width, height, centerX, centerY, id: items[0].id}
        }

        return { x, y, width, height, centerX, centerY}
    }

}