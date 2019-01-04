import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_SELECTION } from "../types/event";
import { parseParamNumber } from "../../util/filter/functions";
import { 
    ITEM_TYPE_IMAGE, 
    ITEM_TYPE_LAYER, 
    ITEM_TYPE_BOXSHADOW, 
    ITEM_TYPE_TEXTSHADOW, 
    ITEM_TYPE_PAGE 
} from "./ItemTypes";
import { px } from "../../util/css/types";
import { isFunction } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";

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
            itemType: ''
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

    [GETTER('selection/initialize/data')] ($store) {
        return {
            type: SELECT_MODE_ONE,
            ids: [],
            items: [],
            itemType: ''
        }
    }

    [GETTER('selection/ids')] ($store) {
        return $store.selection.ids || []
    }

    [GETTER('selection/check')] ($store, id) {
        return $store.selection.ids.includes(id);
    }

    [GETTER('selection/is/empty')] ($store) {
        return $store.selection.ids.length === 0; 
    }

    [GETTER('selection/is/not/empty')] ($store) {
        return $store.selection.ids.length > 0; 
    }    

    [GETTER('selection/has/one')] ($store) {
        return $store.selection.ids.length === 1; 
    }

    [GETTER('selection/has/many')] ($store) {
        return $store.selection.ids.length > 1; 
    }

    [GETTER('selection/type')] ($store) {
        return $store.selection.type;
    }

    [GETTER('selection/current')] ($store) {
        return $store.selection.ids.filter(id => !!$store.items[id]).map(id => $store.items[id])
    }

    getCurrentItem ($store, itemType, callback) {
        var items = null

        if ($store.selection.itemType == itemType) {
            var items = $store.read('selection/current')
        }

        if (Array.isArray(items) && items.length) {
            if ($store.read('selection/is/one')) {
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
            var items = $store.read('selection/current')
        }

        if (Array.isArray(items) && items.length) {
            if ($store.read('selection/is/one') ) {
                if (isFunction(callback)) callback (items[0].id)
                return items[0].id
            } else {
                if (isFunction(callback)) callback (items.map(it => it.id))
                return items.map(it => it.id)
            }   
        }

        return items;
    }

    [GETTER('selection/current/image')] ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_IMAGE, callback);
    }

    [GETTER('selection/current/image/id')] ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_IMAGE, callback);
    }   

    [GETTER('selection/current/boxshadow')] ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_BOXSHADOW, callback);
    }

    [GETTER('selection/current/boxshadow/id')] ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_BOXSHADOW, callback);
    }       

    [GETTER('selection/current/textshadow')] ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_TEXTSHADOW, callback);
    }

    [GETTER('selection/current/textshadow/id')] ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_TEXTSHADOW, callback);
    }       

    [GETTER('selection/current/layer')] ($store, callback) {
        var layers = null

        if ($store.selection.itemType == ITEM_TYPE_LAYER) {
            var layers = $store.read('selection/current')
        } else if (
            $store.selection.itemType == ITEM_TYPE_IMAGE 
            || $store.selection.itemType == ITEM_TYPE_BOXSHADOW
            || $store.selection.itemType == ITEM_TYPE_TEXTSHADOW
        ) {
            var layers = $store.read('selection/current').map(item => $store.items[item.parentId]) 
        }
        if (Array.isArray(layers) && layers.length) {
            if ($store.read('selection/is/one')) {
                if (isFunction(callback)) callback (layers[0])
                return layers[0]
            } else {
                if (isFunction(callback)) callback (layers)
                return layers
            }        
        }

        return layers;
    }

    [GETTER('selection/current/layer/id')] ($store, callback) {
        var layers = null

        if ($store.selection.itemType == ITEM_TYPE_LAYER) {
            var layers = $store.read('selection/current')
        } else if (
                $store.selection.itemType == ITEM_TYPE_IMAGE 
                || $store.selection.itemType == ITEM_TYPE_BOXSHADOW
                || $store.selection.itemType == ITEM_TYPE_TEXTSHADOW
        ) {
            var layers = $store.read('selection/current').map(item => $store.items[item.parentId]) 
        }

        if (Array.isArray(layers) && layers.length) {
            if ($store.read('selection/is/one') ) {
                if (isFunction(callback)) callback (layers[0].id)
                return layers[0].id
            } else {
                if (isFunction(callback)) callback (layers.map(it => it.id))
                return layers.map(it => it.id)
            }        
        }

        return layers;
    }
    
    [GETTER('selection/current/page')] ($store, callback) {

        var pages = $store.read('selection/current').map(it => {
            var path = $store.read('item/path', it.id)
            return $store.read('item/get', path[path.length-1])
        });

        if (Array.isArray(pages) && pages.length ) {
            if (isFunction(callback)) callback (pages[0])
            return pages[0]
        }

        return null;

    }    

    [GETTER('selection/current/page/id')] ($store, callback) {
       
        var pages = $store.read('selection/current').map(it => {
            var path = $store.read('item/path', it.id)
            return $store.read('item/get', path[path.length-1])
        });

        if (Array.isArray(pages) && pages.length ) {
            if (isFunction(callback)) callback (pages[0].id)
            return pages[0].id
        }

        return null;

    }    


    [GETTER('selection/mode')] ($store) {
        return $store.selection;
    }

    [GETTER('selection/is')] ($store, type) {
        return $store.selection.type == type; 
    }

    [GETTER('selection/is/item')] ($store, type) {
        return $store.selection.itemType == type; 
    }    

    [GETTER('selection/is/empty')] ($store) {
        return $store.selection.ids.length == 0; 
    }        

    [GETTER('selection/is/layer')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_LAYER;
    }        

    [GETTER('selection/is/image')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_IMAGE;
    }            

    [GETTER('selection/is/page')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_PAGE;
    }                

    [GETTER('selection/is/boxshadow')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_BOXSHADOW;
    }                    

    [GETTER('selection/is/textshadow')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_TEXTSHADOW;
    }                    
    
    [GETTER('selection/is/filter')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_FILTER;
    }                    
    
    [GETTER('selection/is/backdrop-filter')] ($store, type) {
        return $store.selection.itemType == ITEM_TYPE_BACKDROP;
    }                        

    [GETTER('selection/is/one')] ($store) {
        return $store.read('selection/is', SELECT_MODE_ONE)
    }

    [GETTER('selection/is/group')] ($store) {
        return $store.read('selection/is', SELECT_MODE_GROUP)
    }    

    [GETTER('selection/is/area')] ($store) {
        return $store.read('selection/is', SELECT_MODE_AREA)
    }        

    [GETTER('selection/layers')] ($store) {
        return $store.read('item/filter', (id) => {
            return $store.items[id].itemType == ITEM_TYPE_LAYER
        }).map(id => {
            var {x, y, width, height} = $store.items[id]

            x = parseParamNumber(x);
            y = parseParamNumber(y);
            width = parseParamNumber(width);
            height = parseParamNumber(height);
            var x2 = x + width;
            var y2 = y + height;

            return {x, y, width, height, x2, y2, id} 
        })
    }

    [ACTION('selection/one')] ($store, selectedId = '') {
        $store.selection = {  
            type: SELECT_MODE_ONE, 
            ids: [selectedId],
            itemType: $store.items[selectedId].itemType
        }
    }    

    [ACTION('selection/change')] ($store, itemType) {
        if (itemType == ITEM_TYPE_PAGE) {
            $store.read('selection/current/page', (page) => {
                $store.run('selection/one', page.id);
            })
        }
    }

    [ACTION('selection/area')] ($store, {x, y, width, height})  {
        var x2 = x + width; 
        var y2 = y + height; 

        var area = {x, y, width, height, x2, y2}

        var layers = $store.read('selection/layers')

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
        } else {
            $store.run('selection/change', ITEM_TYPE_PAGE)
        }        
    }

    [GETTER('selection/rect')] ($store) {
        var items = $store.selection.ids.map(id => {
            var {x, y, width, height} = $store.items[id]

            x = parseParamNumber(x);
            y = parseParamNumber(y);
            width = parseParamNumber(width);
            height = parseParamNumber(height);
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

        x = px(x)
        y = px(y)
        width = px(width)
        height = px(height)

        if (items.length == 1) {
            return { x, y, width, height, id: items[0].id}
        }

        return { x, y, width, height}
    }

}