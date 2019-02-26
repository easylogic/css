import BaseModule from "../../util/BaseModule";
import { GETTER } from "../../util/Store";
import { COLLECT_COLORSTEPS, COLLECT_ONE, COLLECT_PAGE_ONE, COLLECT_LAYER_ONE, COLLECT_IMAGE_ONE, COLLECT_BOXSHADOW_ONE, COLLECT_TEXTSHADOW_ONE, COLLECT_IMAGES, COLLECT_BOXSHADOWS, COLLECT_TEXTSHADOWS, COLLECT_LAYERS } from "../types/CollectTypes";
import { ITEM_MAP_CHILDREN, ITEM_MAP_IMAGE_CHILDREN, ITEM_MAP_BOXSHADOW_CHILDREN, ITEM_MAP_TEXTSHADOW_CHILDREN } from "../types/ItemSearchTypes";
import { ITEM_TYPE_PAGE, ITEM_TYPE_LAYER, ITEM_TYPE_IMAGE, ITEM_TYPE_BOXSHADOW, ITEM_TYPE_TEXTSHADOW } from "../../util/css/types";

export default class CollectManager extends BaseModule {

    [GETTER(COLLECT_COLORSTEPS)] ($store, imageId) {
        return $store.read(ITEM_MAP_CHILDREN, imageId, (colorstep) => {
            var colorstep = {...$store.items[colorstep.id]};
            delete colorstep.id;
            delete colorstep.parentId;
    
            return colorstep
        })
    }

    [GETTER(COLLECT_ONE)] ($store, id) {
        var item = this.get(id);

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
        var image = {...$store.items[imageId]};
        delete image.id;
        delete image.parentId;

        return {
            image,
            colorsteps: $store.read(COLLECT_COLORSTEPS, imageId)
        }
    }

    [GETTER(COLLECT_BOXSHADOW_ONE)] ($store, boxshadowId) {
        var boxshadow = {...$store.items[boxshadowId]};
        delete boxshadow.id;
        delete boxshadow.parentId;

        return { boxshadow }
    }    

    [GETTER(COLLECT_TEXTSHADOW_ONE)] ($store, textshadowId) {
        var textshadow = {...$store.items[textshadowId]};
        delete textshadow.id;
        delete textshadow.parentId;

        return { textshadow }
    }        

    [GETTER(COLLECT_IMAGES)] ($store, layerId) {
        return $store.read(ITEM_MAP_IMAGE_CHILDREN, layerId, (image) => {
            return $store.read(COLLECT_IMAGE_ONE, image.id)
        })
    }

    [GETTER(COLLECT_BOXSHADOWS)] ($store, layerId) {
        return $store.read(ITEM_MAP_BOXSHADOW_CHILDREN, layerId, (image) => {
            return $store.read(COLLECT_BOXSHADOW_ONE, image.id)
        })
    }    

    [GETTER(COLLECT_TEXTSHADOWS)] ($store, layerId) {
        return $store.read(ITEM_MAP_TEXTSHADOW_CHILDREN, layerId, (image) => {
            return $store.read(COLLECT_TEXTSHADOW_ONE, image.id)
        })
    }        

    [GETTER(COLLECT_LAYER_ONE)] ($store, layerId) {
        var results = {} 

        if (!$store.items[layerId]) {
            return results; 
        }

        var layer = {...$store.items[layerId]};
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
        return $store.read(ITEM_MAP_CHILDREN, pageId, (layer) => {
            return $store.read(COLLECT_LAYER_ONE, layer.id)
        })
    }

    [GETTER(COLLECT_PAGE_ONE)] ($store, pageId) {
        var results = {} 

        if (!$store.items[pageId]) {
            return results; 
        }

        var page = {...$store.items[pageId]};
        delete page.id;
        delete page.parentId;

        return {
            page,
            layers: $store.read(COLLECT_LAYERS, pageId)
        }

    }

}