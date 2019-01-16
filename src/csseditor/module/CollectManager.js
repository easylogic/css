import BaseModule from "../../colorpicker/BaseModule";
import { ITEM_TYPE_PAGE, ITEM_TYPE_LAYER, ITEM_TYPE_IMAGE, ITEM_TYPE_BOXSHADOW, ITEM_GET } from "./ItemTypes";
import { GETTER } from "../../util/Store";
import { COLLECT_COLORSTEPS, COLLECT_ONE, COLLECT_PAGE_ONE, COLLECT_LAYER_ONE, COLLECT_IMAGE_ONE, COLLECT_BOXSHADOW_ONE, COLLECT_TEXTSHADOW_ONE, COLLECT_IMAGES, COLLECT_BOXSHADOWS, COLLECT_TEXTSHADOWS, COLLECT_LAYERS } from "./CollectTypes";
import { clone } from "../../util/functions/func";

export default class CollectManager extends BaseModule {

    [GETTER(COLLECT_COLORSTEPS)] ($store, imageId) {
        return $store.read('item/map/children', imageId, (colorstep) => {
            var colorstep = clone($store.items[colorstep.id]);
            delete colorstep.id;
            delete colorstep.parentId;
    
            return colorstep
        })
    }

    [GETTER(COLLECT_ONE)] ($store, id) {
        var item = $store.read(ITEM_GET, id);

        switch(item.itemType) {
        case ITEM_TYPE_PAGE: 
            return $store.read(COLLECT_PAGE_ONE, id);
        case ITEM_TYPE_LAYER: 
            return $store.read(COLLECT_LAYER_ONE, id);
        case ITEM_TYPE_IMAGE: 
            return $store.read(COLLECT_IMAGE_ONE, id);
        case ITEM_TYPE_BOXSHADOW: 
            return $store.read(COLLECT_BOXSHADOW_ONE, id);            
        case ITEM_TYPE_TEXTSHADOW: 
            return $store.read(COLLECT_TEXTSHADOW_ONE, id);
        }

        return null;
    }

    [GETTER(COLLECT_IMAGE_ONE)] ($store, imageId) {
        var image = clone($store.items[imageId]);
        delete image.id;
        delete image.parentId;

        return {
            image,
            colorsteps: $store.read(COLLECT_COLORSTEPS, imageId)
        }
    }

    [GETTER(COLLECT_BOXSHADOW_ONE)] ($store, boxshadowId) {
        var boxshadow = clone($store.items[boxshadowId]);
        delete boxshadow.id;
        delete boxshadow.parentId;

        return { boxshadow }
    }    

    [GETTER(COLLECT_TEXTSHADOW_ONE)] ($store, textshadowId) {
        var textshadow = clone($store.items[textshadowId]);
        delete textshadow.id;
        delete textshadow.parentId;

        return { textshadow }
    }        

    [GETTER(COLLECT_IMAGES)] ($store, layerId) {
        return $store.read('item/map/image/children', layerId, (image) => {
            return $store.read(COLLECT_IMAGE_ONE, image.id)
        })
    }

    [GETTER(COLLECT_BOXSHADOWS)] ($store, layerId) {
        return $store.read('item/map/boxshadow/children', layerId, (image) => {
            return $store.read(COLLECT_BOXSHADOW_ONE, image.id)
        })
    }    

    [GETTER(COLLECT_TEXTSHADOWS)] ($store, layerId) {
        return $store.read('item/map/textshadow/children', layerId, (image) => {
            return $store.read(COLLECT_TEXTSHADOW_ONE, image.id)
        })
    }        

    [GETTER(COLLECT_LAYER_ONE)] ($store, layerId) {
        var results = {} 

        if (!$store.items[layerId]) {
            return results; 
        }

        var layer = clone($store.items[layerId]);
        delete layer.id;
        delete layer.parentId;

        return {
            layer,
            images: $store.read(COLLECT_IMAGES, layerId),
            boxshadows: $store.read(COLLECT_BOXSHADOWS, layerId),
            textshadows: $store.read(COLLECT_TEXTSHADOWS, layerId)
        }
    }

    [GETTER(COLLECT_LAYERS)] ($store, pageId) {
        return $store.read('item/map/children', pageId, (layer) => {
            return $store.read(COLLECT_LAYER_ONE, layer.id)
        })
    }

    [GETTER(COLLECT_PAGE_ONE)] ($store, pageId) {
        var results = {} 

        if (!$store.items[pageId]) {
            return results; 
        }

        var page = clone($store.items[pageId]);
        delete page.id;
        delete page.parentId;

        return {
            page,
            layers: $store.read(COLLECT_LAYERS, pageId)
        }

    }

}