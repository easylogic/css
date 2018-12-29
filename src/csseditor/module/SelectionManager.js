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

    '*/selection/initialize/data' ($store) {
        return {
            type: SELECT_MODE_ONE,
            ids: [],
            items: [],
            itemType: ''
        }
    }

    '*/selection/ids' ($store) {
        return $store.selection.ids || []
    }

    '*/selection/check' ($store, id) {
        return $store.selection.ids.includes(id);
    }

    '*/selection/is/empty' ($store) {
        return $store.selection.ids.length === 0; 
    }

    '*/selection/is/not/empty' ($store) {
        return $store.selection.ids.length > 0; 
    }    

    '*/selection/has/one' ($store) {
        return $store.selection.ids.length === 1; 
    }

    '*/selection/has/many' ($store) {
        return $store.selection.ids.length > 1; 
    }

    '*/selection/type' ($store) {
        return $store.selection.type;
    }

    '*/selection/current' ($store) {
        return $store.selection.ids.filter(id => !!$store.items[id]).map(id => $store.items[id])
    }

    getCurrentItem ($store, itemType, callback) {
        var items = null

        if ($store.selection.itemType == itemType) {
            var items = $store.read('/selection/current')
        }

        if (Array.isArray(items) && items.length) {
            if ($store.read('/selection/is/one')) {
                if (typeof callback == 'function') callback (items[0])
                return items[0]
            } else {
                if (typeof callback == 'function') callback (items)
                return items
            }    
            
        }

        return items;
    }

    getCurrentItemId ($store, itemType, callback) {
        var items = null

        if ($store.selection.itemType == itemType) {
            var items = $store.read('/selection/current')
        }

        if (Array.isArray(items) && items.length) {
            if ($store.read('/selection/is/one') ) {
                if (typeof callback == 'function') callback (items[0].id)
                return items[0].id
            } else {
                if (typeof callback == 'function') callback (items.map(it => it.id))
                return items.map(it => it.id)
            }   
        }

        return items;
    }

    '*/selection/current/image' ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_IMAGE, callback);
    }

    '*/selection/current/image/id' ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_IMAGE, callback);
    }   

    '*/selection/current/boxshadow' ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_BOXSHADOW, callback);
    }

    '*/selection/current/boxshadow/id' ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_BOXSHADOW, callback);
    }       

    '*/selection/current/textshadow' ($store, callback) {
        return this.getCurrentItem($store, ITEM_TYPE_TEXTSHADOW, callback);
    }

    '*/selection/current/textshadow/id' ($store, callback) {
        return this.getCurrentItemId($store, ITEM_TYPE_TEXTSHADOW, callback);
    }       

    '*/selection/current/layer' ($store, callback) {
        var layers = null

        if ($store.selection.itemType == ITEM_TYPE_LAYER) {
            var layers = $store.read('/selection/current')
        } else if (
            $store.selection.itemType == ITEM_TYPE_IMAGE 
            || $store.selection.itemType == ITEM_TYPE_BOXSHADOW
            || $store.selection.itemType == ITEM_TYPE_TEXTSHADOW
        ) {
            var layers = $store.read('/selection/current').map(item => $store.items[item.parentId]) 
        }
        if (Array.isArray(layers) && layers.length) {
            if ($store.read('/selection/is/one')) {
                if (typeof callback == 'function') callback (layers[0])
                return layers[0]
            } else {
                if (typeof callback == 'function') callback (layers)
                return layers
            }        
        }

        return layers;
    }

    '*/selection/current/layer/id' ($store, callback) {
        var layers = null

        if ($store.selection.itemType == ITEM_TYPE_LAYER) {
            var layers = $store.read('/selection/current')
        } else if (
                $store.selection.itemType == ITEM_TYPE_IMAGE 
                || $store.selection.itemType == ITEM_TYPE_BOXSHADOW
                || $store.selection.itemType == ITEM_TYPE_TEXTSHADOW
        ) {
            var layers = $store.read('/selection/current').map(item => $store.items[item.parentId]) 
        }

        if (Array.isArray(layers) && layers.length) {
            if ($store.read('/selection/is/one') ) {
                if (typeof callback == 'function') callback (layers[0].id)
                return layers[0].id
            } else {
                if (typeof callback == 'function') callback (layers.map(it => it.id))
                return layers.map(it => it.id)
            }        
        }

        return layers;
    }
    
    '*/selection/current/page' ($store, callback) {

        var pages = $store.read('/selection/current').map(it => {
            var path = $store.read('/item/path', it.id)
            return $store.read('/item/get', path[path.length-1])
        });

        if (Array.isArray(pages) && pages.length ) {
            if (typeof callback == 'function') callback (pages[0])
            return pages[0]
        }

        return null;

    }    

    '*/selection/current/page/id' ($store, callback) {
       
        var pages = $store.read('/selection/current').map(it => {
            var path = $store.read('/item/path', it.id)
            return $store.read('/item/get', path[path.length-1])
        });

        if (Array.isArray(pages) && pages.length ) {
            if (typeof callback == 'function') callback (pages[0].id)
            return pages[0].id
        }

        return null;

    }    


    '*/selection/mode' ($store) {
        return $store.selection;
    }

    '*/selection/is' ($store, type) {
        return $store.selection.type == type; 
    }

    '*/selection/is/item' ($store, type) {
        return $store.selection.itemType == type; 
    }    

    '*/selection/is/empty' ($store) {
        return $store.selection.ids.length == 0; 
    }        

    '*/selection/is/layer' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_LAYER);
    }        

    '*/selection/is/image' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_IMAGE);
    }            

    '*/selection/is/page' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_PAGE);
    }                

    '*/selection/is/boxshadow' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_BOXSHADOW);
    }                    

    '*/selection/is/textshadow' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_TEXTSHADOW);
    }                    
    
    '*/selection/is/filter' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_FILTER);
    }                    
    
    '*/selection/is/backdrop-filter' ($store, type) {
        return $store.read('/selection/is/item', ITEM_TYPE_BACKDROP);
    }                        

    '*/selection/is/one' ($store) {
        return $store.read('/selection/is', SELECT_MODE_ONE)
    }

    '*/selection/is/group' ($store) {
        return $store.read('/selection/is', SELECT_MODE_GROUP)
    }    

    '*/selection/is/area' ($store) {
        return $store.read('/selection/is', SELECT_MODE_AREA)
    }        

    '*/selection/layers' ($store) {
        return $store.read('/item/filter', (id) => {
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

    '/selection/one' ($store, selectedId = '') {
        $store.selection = {  
            type: SELECT_MODE_ONE, 
            ids: [selectedId],
            itemType: $store.items[selectedId].itemType
        }
    }    

    '/selection/change' ($store, itemType) {
        if (itemType == ITEM_TYPE_PAGE) {
            $store.read('/selection/current/page', (page) => {
                $store.run('/selection/one', page.id);
            })
        }
    }

    '/selection/area' ($store, {x, y, width, height})  {
        var x2 = x + width; 
        var y2 = y + height; 

        var area = {x, y, width, height, x2, y2}

        var layers = $store.read('/selection/layers')

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
            $store.run('/selection/change', ITEM_TYPE_PAGE)
        }        
    }

    '*/selection/rect' ($store) {
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