import BaseModule from "../../colorpicker/BaseModule";
import { uuid } from "../../util/functions/math";
import { isNotUndefined, isFunction, clone } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { ITEM_KEYS_GENERATE } from "./ItemCreateTypes";
import { SELECTION_ONE } from "./SelectionTypes";

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

    [GETTER('storage/get')] ($store, key) {
        return JSON.parse(localStorage.getItem(`${SAVE_ID}-${key}`))
    }

    [ACTION('storage/set')] ($store, key, value) {
        localStorage.setItem(`${SAVE_ID}-${key}`, JSON.stringify(value))
    }

    [GETTER('storage/pages')] ($store, id = undefined) {
        if (isNotUndefined(id)) {
            var results = $store.cachedPages.filter(item => (item.id == id) );

            if (!results.length) {
                return {}
            }

            return results[0];
        }
        return $store.cachedPages;
    }

    [GETTER('storage/layers')] ($store, id = undefined) {
        if (isNotUndefined(id) ) {
            var results = $store.cachedLayers.filter(item => (item.id == id) );

            if (!results.length) {
                return {}
            }

            return results[0];
        }
        return $store.cachedLayers;
    }    

    [GETTER('storage/images')] ($store, index = undefined) {
        if (isNotUndefined(index)) {
            return $store.cachedImages[index];
        }
        return $store.cachedImages;
    }

    [ACTION('storage/unshift/layer')] ($store, layer) {
        var item = clone(layer);
        item.id = uuid()
        $store.cachedLayers.unshift(item);

        $store.run('storage/save/layer');
    }

    [ACTION('storage/add/layer')] ($store, layer) {
        var item = clone(layer);
        item.id = uuid()        
        $store.cachedLayers.push(item);

        $store.run('storage/save/layer');
    }    

    [ACTION('storage/remove/layer')] ($store, id) {

        $store.cachedLayers = $store.cachedLayers.filter(item => {
            return item.id != id; 
        });

        $store.run('storage/save/layer');
    }        

    [ACTION('storage/remove/page')] ($store, id) {

        $store.cachedLayers = $store.cachedPages.filter(item => {
            return item.id != id; 
        });

        $store.run('storage/save/page');
    }            

    [ACTION('storage/unshift/page')] ($store, page) {
        var item = clone(page);
        item.id = uuid()
        $store.cachedPages.unshift(item);

        $store.run('storage/save/page');
    }

    [ACTION('storage/add/page')] ($store, page) {
        var item = clone(page);
        item.id = uuid()        
        $store.cachedPages.push(item);

        $store.run('storage/save/page');
    }    

    [ACTION('storage/delete/page')] ($store, id) {

        $store.cachedPages = $store.cachedPages.filter(item => {
            return item.id != id; 
        });

        $store.run('storage/save/page');
    }      

    [ACTION('storage/delete/image')] ($store, id) {

        $store.cachedImages = $store.cachedImages.filter(item => {
            return item.id != id; 
        });

        $store.run('storage/save/image');
    }            

    [ACTION('storage/add/image')] ($store, image) {
        var item = clone(image);
        item.id = uuid()        
        $store.cachedImages.push(item);

        $store.run('storage/save/image');
    }        

    [ACTION('storage/save')] ($store) {
        localStorage.setItem(SAVE_ID, JSON.stringify({
            items: $store.items,
            selection: $store.selection
        }))
    }

    [ACTION('storage/save/layer')] ($store) {
        localStorage.setItem(CACHED_LAYER_SAVE_ID, JSON.stringify($store.cachedLayers))
    }    

    [ACTION('storage/save/page')] ($store) {
        localStorage.setItem(CACHED_PAGE_SAVE_ID, JSON.stringify($store.cachedPages))
    }        

    [ACTION('storage/save/image')] ($store) {
        localStorage.setItem(CACHED_IMAGE_SAVE_ID, JSON.stringify($store.cachedImages))
    }        

    [ACTION('storage/load/layer')] ($store) {
        $store.cachedLayers = JSON.parse(localStorage.getItem(CACHED_LAYER_SAVE_ID) || "[]");

        $store.cachedLayers = $store.cachedLayers.map(item => {
            if (!item.id) item.id = uuid();
            return item;
        })
    }        

    [ACTION('storage/load/page')] ($store) {
        $store.cachedPages = JSON.parse(localStorage.getItem(CACHED_PAGE_SAVE_ID) || "[]");

        $store.cachedPages = $store.cachedPages.map(item => {
            if (!item.id) item.id = uuid();
            return item;
        })
    }            

    [ACTION('storage/load/image')] ($store) {
        $store.cachedImages = JSON.parse(localStorage.getItem(CACHED_IMAGE_SAVE_ID) || "[]");

        $store.cachedLayers = $store.cachedLayers.map(item => {
            if (!item.id) item.id = uuid();
            return item;
        })        
    }      
    
    
    [ACTION('storage/load')] ($store, callback) {
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