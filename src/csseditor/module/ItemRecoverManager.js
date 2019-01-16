import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";
import { ITEM_SET, ITEM_GET, ITEM_CONVERT_STYLE, ITEM_SORT } from "./ItemTypes";
import { ITEM_CREATE_PAGE, ITEM_CREATE_LAYER } from "./ItemCreateTypes";
import { COLLECT_ONE } from "./CollectTypes";

const COPY_INDEX_DIST = 1; 

export default class ItemRecoverManager extends BaseModule {

    afterDispatch() {
        this.$store.emit(CHANGE_EDITOR);
    }

    [GETTER('item/recover')] ($store, item, parentId) {

        if (item.page) {
            return $store.read('item/recover/page', item, parentId);
        } else if (item.layer) {
            return $store.read('item/recover/layer', item, parentId);
        } else if (item.image) {
            return $store.read('item/recover/image', item, parentId);            
        } else if (item.boxshadow) {
            return $store.read('item/recover/boxshadow', item, parentId);                        
        } else if (item.textshadow) {
            return $store.read('item/recover/textshadow', item, parentId);                                    
        }
    }

    [GETTER('item/recover/image')] ($store, image, parentId) {
        var newImageId = $store.read(
            'item/create/image', 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE, image.image))
        );
        var colorsteps = (image.colorsteps || []);
        
        colorsteps.forEach(step => {
            $store.read('item/recover/colorstep', step, newImageId);
        })

        return newImageId;
    }
    [GETTER('item/recover/colorstep')] ($store, colorstep, parentId) {
        return $store.read('item/create/colorstep', Object.assign({parentId}, colorstep));
    }
    [GETTER('item/recover/boxshadow')] ($store, boxshadow, parentId) {
        return $store.read(
            'item/create/boxshadow', 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE, boxshadow.boxshadow))
        );
    }    

    [GETTER('item/recover/textshadow')] ($store, textshadow, parentId) {
        return $store.read(
            'item/create/textshadow', 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE, textshadow.textshadow))
        );
    }        

    [GETTER('item/recover/layer')] ($store, layer, parentId) {
        var newLayerId = $store.read(ITEM_CREATE_LAYER, 
            Object.assign({parentId}, $store.read(ITEM_CONVERT_STYLE,layer.layer))
        );

        var images = layer.images || [] 
        images.forEach(image => {
            $store.read('item/recover/image', image, newLayerId);
        })

        var boxshadows = layer.boxshadows || []
        boxshadows.forEach(boxshadow => {
            $store.read('item/recover/boxshadow', boxshadow, newLayerId);
        })

        var textshadows = layer.textshadows || []
        textshadows.forEach(textshadow => {
            $store.read('item/recover/textshadow', textshadow, newLayerId);
        })

        return newLayerId;
    }
 
    [GETTER('item/recover/page')] ($store, page) {
        var newPageId = $store.read(ITEM_CREATE_PAGE, $store.read(ITEM_CONVERT_STYLE,page.page));
        page.layers.forEach(layer => {
            $store.read('item/recover/layer', layer, newPageId);
        })

        return newPageId;
    }    


    [ACTION('item/addCache')] ($store, item, sourceId) {
        var currentItem = $store.read(ITEM_GET, sourceId);
        $store.run('item/move/to', sourceId, $store.read('item/recover', item, currentItem.parentId)); 
    }


    [ACTION('item/copy/in')] ($store, destId, sourceId) {
        var destItem = $store.read(ITEM_GET, destId);
        var newImageId = $store.read('item/recover', 
            $store.read(COLLECT_ONE, sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read(ITEM_GET, newImageId);
        newImageItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run(ITEM_SET, sourceItem, true);
        $store.run(ITEM_SORT, sourceId);
    }        


    [ACTION('item/copy/in/layer')] ($store, destId, sourceId) {
        var destItem = $store.read(ITEM_GET, destId);  /* layer */ 
        var newImageId = $store.read('item/recover', 
            $store.read(COLLECT_ONE, sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read(ITEM_GET, newImageId);
        newImageItem.index = Number.MAX_SAFE_INTEGER;

        $store.run(ITEM_SET, newImageItem, true);        
        $store.run(ITEM_SORT, newImageId);
    }            

}