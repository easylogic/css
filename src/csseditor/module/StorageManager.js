import BaseModule from "../../colorpicker/BaseModule";
import { uuid } from "../../util/functions/math";
import { isNotUndefined, isFunction, clone } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { ITEM_KEYS_GENERATE } from "../types/ItemCreateTypes";
import { SELECTION_ONE } from "../types/SelectionTypes";
import { STORAGE_GET, STORAGE_SET, STORAGE_PAGES, STORAGE_LAYERS, STORAGE_IMAGES, STORAGE_UNSHIFT_LAYER, STORAGE_SAVE_LAYER, STORAGE_ADD_LAYER, STORAGE_REMOVE_LAYER, STORAGE_REMOVE_PAGE, STORAGE_SAVE_PAGE, STORAGE_UNSHIFT_PAGE, STORAGE_ADD_PAGE, STORAGE_DELETE_PAGE, STORAGE_DELETE_IMAGE, STORAGE_SAVE_IMAGE, STORAGE_ADD_IMAGE, STORAGE_SAVE, STORAGE_LOAD_LAYER, STORAGE_LOAD_PAGE, STORAGE_LOAD_IMAGE, STORAGE_LOAD } from "../types/StorageTypes";

const SAVE_ID = 'css-imageeditor'
const CACHED_PAGE_SAVE_ID = 'css-imageeditor-cached-pages'
const CACHED_LAYER_SAVE_ID = 'css-imageeditor-cached-layers'
const CACHED_IMAGE_SAVE_ID = 'css-imageeditor-cached-images'

export default class StorageManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.cachedPages = []
        this.$store.cachedLayers = []
        this.$store.cachedImages = []
    }

    afterDispatch () {
        this.$store.emit('changeStorage')
    }

    [GETTER(STORAGE_GET)] ($store, key) {
        return JSON.parse(localStorage.getItem(`${SAVE_ID}-${key}`))
    }

    [ACTION(STORAGE_SET)] ($store, key, value) {
        localStorage.setItem(`${SAVE_ID}-${key}`, JSON.stringify(value))
    }

    [GETTER(STORAGE_PAGES)] ($store, id = undefined) {
        if (isNotUndefined(id)) {
            var results = $store.cachedPages.filter(item => (item.id == id) );

            if (!results.length) {
                return {}
            }

            return results[0];
        }
        return $store.cachedPages;
    }

    [GETTER(STORAGE_LAYERS)] ($store, id = undefined) {
        if (isNotUndefined(id) ) {
            var results = $store.cachedLayers.filter(item => (item.id == id) );

            if (!results.length) {
                return {}
            }

            return results[0];
        }
        return $store.cachedLayers;
    }    

    [GETTER(STORAGE_IMAGES)] ($store, index = undefined) {
        if (isNotUndefined(index)) {
            return $store.cachedImages[index];
        }
        return $store.cachedImages;
    }

    [ACTION(STORAGE_UNSHIFT_LAYER)] ($store, layer) {
        var item = {...layer};
        item.id = uuid()
        $store.cachedLayers.unshift(item);

        $store.run(STORAGE_SAVE_LAYER);
    }

    [ACTION(STORAGE_ADD_LAYER)] ($store, layer) {
        var item = {...layer};
        item.id = uuid()        
        $store.cachedLayers.push(item);

        $store.run(STORAGE_SAVE_LAYER);
    }    

    [ACTION(STORAGE_REMOVE_LAYER)] ($store, id) {

        $store.cachedLayers = $store.cachedLayers.filter(item => {
            return item.id != id; 
        });

        $store.run(STORAGE_SAVE_LAYER);
    }        

    [ACTION(STORAGE_REMOVE_PAGE)] ($store, id) {

        $store.cachedLayers = $store.cachedPages.filter(item => {
            return item.id != id; 
        });

        $store.run(STORAGE_SAVE_PAGE);
    }            

    [ACTION(STORAGE_UNSHIFT_PAGE)] ($store, page) {
        var item = {...page};
        item.id = uuid()
        $store.cachedPages.unshift(item);

        $store.run(STORAGE_SAVE_PAGE);
    }

    [ACTION(STORAGE_ADD_PAGE)] ($store, page) {
        var item = {...page};
        item.id = uuid()        
        $store.cachedPages.push(item);

        $store.run(STORAGE_SAVE_PAGE);
    }    

    [ACTION(STORAGE_DELETE_PAGE)] ($store, id) {

        $store.cachedPages = $store.cachedPages.filter(item => {
            return item.id != id; 
        });

        $store.run(STORAGE_SAVE_PAGE);
    }      

    [ACTION(STORAGE_DELETE_IMAGE)] ($store, id) {

        $store.cachedImages = $store.cachedImages.filter(item => {
            return item.id != id; 
        });

        $store.run(STORAGE_SAVE_IMAGE);
    }            

    [ACTION(STORAGE_ADD_IMAGE)] ($store, image) {
        var item = {...image};
        item.id = uuid()        
        $store.cachedImages.push(item);

        $store.run(STORAGE_SAVE_IMAGE);
    }        

    [ACTION(STORAGE_SAVE)] ($store) {
        localStorage.setItem(SAVE_ID, JSON.stringify({
            items: $store.items,
            selection: $store.selection
        }))
    }

    [ACTION(STORAGE_SAVE_LAYER)] ($store) {
        localStorage.setItem(CACHED_LAYER_SAVE_ID, JSON.stringify($store.cachedLayers))
    }    

    [ACTION(STORAGE_SAVE_PAGE)] ($store) {
        localStorage.setItem(CACHED_PAGE_SAVE_ID, JSON.stringify($store.cachedPages))
    }        

    [ACTION(STORAGE_SAVE_IMAGE)] ($store) {
        localStorage.setItem(CACHED_IMAGE_SAVE_ID, JSON.stringify($store.cachedImages))
    }        

    [ACTION(STORAGE_LOAD_LAYER)] ($store) {
        $store.cachedLayers = JSON.parse(localStorage.getItem(CACHED_LAYER_SAVE_ID) || "[]");

        $store.cachedLayers = $store.cachedLayers.map(item => {
            if (!item.id) item.id = uuid();
            return item;
        })
    }        

    [ACTION(STORAGE_LOAD_PAGE)] ($store) {
        $store.cachedPages = JSON.parse(localStorage.getItem(CACHED_PAGE_SAVE_ID) || "[]");

        $store.cachedPages = $store.cachedPages.map(item => {
            if (!item.id) item.id = uuid();
            return item;
        })
    }            

    [ACTION(STORAGE_LOAD_IMAGE)] ($store) {
        $store.cachedImages = JSON.parse(localStorage.getItem(CACHED_IMAGE_SAVE_ID) || "[]");

        $store.cachedLayers = $store.cachedLayers.map(item => {
            if (!item.id) item.id = uuid();
            return item;
        })        
    }      
    
    
    [ACTION(STORAGE_LOAD)] ($store, callback) {
        var obj = JSON.parse(localStorage.getItem(SAVE_ID) || "{}");

        if (obj.items) $store.items = obj.items 
        if (obj.selectedId) $store.selectedId = obj.selectedId
        if (obj.selectedMode) $store.selectedMode = obj.selectedMode
        if (obj.selection) $store.selection = obj.selection

        $store.run(ITEM_KEYS_GENERATE);

        if ($store.selectedId) {
            $store.run(SELECTION_ONE, $store.selectedId);
        }

        if (isFunction(callback)) {
            callback(!!obj.items)
        }
    }

}