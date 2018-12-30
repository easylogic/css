import BaseModule from "../../colorpicker/BaseModule";
import { ITEM_TYPE_PAGE, ITEM_TYPE_LAYER, ITEM_TYPE_IMAGE, ITEM_TYPE_BOXSHADOW } from "./ItemTypes";
import { GETTER } from "../../util/Store";

export default class CollectManager extends BaseModule {

    [GETTER('collect/colorsteps')] ($store, imageId) {
        return $store.read('item/map/children', imageId, (colorstep) => {
            var colorstep = $store.read('clone', $store.items[colorstep.id]);
            delete colorstep.id;
            delete colorstep.parentId;
    
            return colorstep
        })
    }

    [GETTER('collect/one')] ($store, id) {
        var item = $store.read('item/get', id);

        switch(item.itemType) {
        case ITEM_TYPE_PAGE: 
            return $store.read('collect/page/one', id);
        case ITEM_TYPE_LAYER: 
            return $store.read('collect/layer/one', id);
        case ITEM_TYPE_IMAGE: 
            return $store.read('collect/image/one', id);
        case ITEM_TYPE_BOXSHADOW: 
            return $store.read('collect/boxshadow/one', id);            
        case ITEM_TYPE_TEXTSHADOW: 
            return $store.read('collect/textshadow/one', id);
        }

        return null;
    }

    [GETTER('collect/image/one')] ($store, imageId) {
        var image = $store.read('clone', $store.items[imageId]);
        delete image.id;
        delete image.parentId;

        return {
            image,
            colorsteps: $store.read('collect/colorsteps', imageId)
        }
    }

    [GETTER('collect/boxshadow/one')] ($store, boxshadowId) {
        var boxshadow = $store.read('clone', $store.items[boxshadowId]);
        delete boxshadow.id;
        delete boxshadow.parentId;

        return { boxshadow }
    }    

    [GETTER('collect/textshadow/one')] ($store, textshadowId) {
        var textshadow = $store.read('clone', $store.items[textshadowId]);
        delete textshadow.id;
        delete textshadow.parentId;

        return { textshadow }
    }        

    [GETTER('collect/images')] ($store, layerId) {
        return $store.read('item/map/image/children', layerId, (image) => {
            return $store.read('collect/image/one', image.id)
        })
    }

    [GETTER('collect/boxshadows')] ($store, layerId) {
        return $store.read('item/map/boxshadow/children', layerId, (image) => {
            return $store.read('collect/boxshadow/one', image.id)
        })
    }    

    [GETTER('collect/textshadows')] ($store, layerId) {
        return $store.read('item/map/textshadow/children', layerId, (image) => {
            return $store.read('collect/textshadow/one', image.id)
        })
    }        

    [GETTER('collect/layer/one')] ($store, layerId) {
        var results = {} 

        if (!$store.items[layerId]) {
            return results; 
        }

        var layer = $store.read('clone', $store.items[layerId]);
        delete layer.id;
        delete layer.parentId;

        return {
            layer,
            images: $store.read('collect/images', layerId),
            boxshadows: $store.read('collect/boxshadows', layerId),
            textshadows: $store.read('collect/textshadows', layerId)
        }
    }

    [GETTER('collect/layers')] ($store, pageId) {
        return $store.read('item/map/children', pageId, (layer) => {
            return $store.read('collect/layer/one', layer.id)
        })
    }

    [GETTER('collect/page/one')] ($store, pageId) {
        var results = {} 

        if (!$store.items[pageId]) {
            return results; 
        }

        var page = $store.read('clone', $store.items[pageId]);
        delete page.id;
        delete page.parentId;

        return {
            page,
            layers: $store.read('collect/layers', pageId)
        }

    }

}