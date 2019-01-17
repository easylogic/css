import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";
import { ITEM_SET, ITEM_GET, ITEM_CONVERT_STYLE, ITEM_SORT } from "../types/ItemTypes";
import { ITEM_CREATE_PAGE, ITEM_CREATE_LAYER, ITEM_CREATE_IMAGE, ITEM_CREATE_COLORSTEP, ITEM_CREATE_BOXSHADOW, ITEM_CREATE_TEXTSHADOW } from "../types/ItemCreateTypes";
import { COLLECT_ONE } from "../types/CollectTypes";
import { ITEM_MOVE_TO } from "../types/ItemMoveTypes";
import { ITEM_RECOVER, ITEM_RECOVER_PAGE, ITEM_RECOVER_LAYER, ITEM_RECOVER_IMAGE, ITEM_RECOVER_BOXSHADOW, ITEM_RECOVER_TEXTSHADOW, ITEM_RECOVER_COLORSTEP, ITEM_ADD_CACHE, ITEM_ADD_COPY, ITEM_COPY_IN, ITEM_COPY_IN_LAYER } from "../types/ItemRecoverTypes";

const COPY_INDEX_DIST = 1; 

export default class ItemRecoverManager extends BaseModule {

    afterDispatch() {
        this.$store.emit(CHANGE_EDITOR);
    }

    [GETTER(ITEM_RECOVER)] ($store, item, parentId) {

        if (item.page) {
            return $store.read(ITEM_RECOVER_PAGE, item, parentId);
        } else if (item.layer) {
            return $store.read(ITEM_RECOVER_LAYER, item, parentId);
        } else if (item.image) {
            return $store.read(ITEM_RECOVER_IMAGE, item, parentId);            
        } else if (item.boxshadow) {
            return $store.read(ITEM_RECOVER_BOXSHADOW, item, parentId);                        
        } else if (item.textshadow) {
            return $store.read(ITEM_RECOVER_TEXTSHADOW, item, parentId);                                    
        }
    }

    [GETTER(ITEM_RECOVER_IMAGE)] ($store, image, parentId) {
        var newImageId = $store.read(
            ITEM_CREATE_IMAGE, 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE, image.image))
        );
        var colorsteps = (image.colorsteps || []);
        
        colorsteps.forEach(step => {
            $store.read(ITEM_RECOVER_COLORSTEP, step, newImageId);
        })

        return newImageId;
    }
    [GETTER(ITEM_RECOVER_COLORSTEP)] ($store, colorstep, parentId) {
        return $store.read(ITEM_CREATE_COLORSTEP, Object.assign({parentId}, colorstep));
    }
    [GETTER(ITEM_RECOVER_BOXSHADOW)] ($store, boxshadow, parentId) {
        return $store.read(
            ITEM_CREATE_BOXSHADOW, 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE, boxshadow.boxshadow))
        );
    }    

    [GETTER(ITEM_RECOVER_TEXTSHADOW)] ($store, textshadow, parentId) {
        return $store.read(
            ITEM_CREATE_TEXTSHADOW, 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE, textshadow.textshadow))
        );
    }        

    [GETTER(ITEM_RECOVER_LAYER)] ($store, layer, parentId) {
        var newLayerId = $store.read(ITEM_CREATE_LAYER, 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE,layer.layer))
        );

        var images = layer.images || [] 
        images.forEach(image => {
            $store.read(ITEM_RECOVER_IMAGE, image, newLayerId);
        })

        var boxshadows = layer.boxshadows || []
        boxshadows.forEach(boxshadow => {
            $store.read(ITEM_RECOVER_BOXSHADOW, boxshadow, newLayerId);
        })

        var textshadows = layer.textshadows || []
        textshadows.forEach(textshadow => {
            $store.read(ITEM_RECOVER_TEXTSHADOW, textshadow, newLayerId);
        })

        return newLayerId;
    }
 
    [GETTER(ITEM_RECOVER_PAGE)] ($store, page) {
        var newPageId = $store.read(ITEM_CREATE_PAGE, $store.read(ITEM_CONVERT_STYLE,page.page));
        page.layers.forEach(layer => {
            $store.read(ITEM_RECOVER_LAYER, layer, newPageId);
        })

        return newPageId;
    }    


    [ACTION(ITEM_ADD_CACHE)] ($store, item, sourceId) {
        var currentItem = $store.read(ITEM_GET, sourceId);
        $store.run(ITEM_MOVE_TO, sourceId, $store.read(ITEM_RECOVER, item, currentItem.parentId)); 
    }

    [ACTION(ITEM_ADD_COPY)] ($store, sourceId) {
        var currentItem = $store.read(ITEM_GET, sourceId);
        $store.run(ITEM_MOVE_TO, sourceId, $store.read(ITEM_RECOVER, $store.read(COLLECT_ONE, sourceId), currentItem.parentId)); 
    }    

    [ACTION(ITEM_COPY_IN)] ($store, destId, sourceId) {
        var destItem = $store.read(ITEM_GET, destId);
        var newImageId = $store.read(ITEM_RECOVER, 
            $store.read(COLLECT_ONE, sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read(ITEM_GET, newImageId);
        newImageItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run(ITEM_SET, sourceItem, true);
        $store.run(ITEM_SORT, sourceId);
    }        


    [ACTION(ITEM_COPY_IN_LAYER)] ($store, destId, sourceId) {
        var destItem = $store.read(ITEM_GET, destId);  /* layer */ 
        var newImageId = $store.read(ITEM_RECOVER, 
            $store.read(COLLECT_ONE, sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read(ITEM_GET, newImageId);
        newImageItem.index = Number.MAX_SAFE_INTEGER;

        $store.run(ITEM_SET, newImageItem, true);        
        $store.run(ITEM_SORT, newImageId);
    }            

}