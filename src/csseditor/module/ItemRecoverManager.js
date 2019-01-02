import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";

const COPY_INDEX_DIST = 1; 

export default class ItemRecoverManager extends BaseModule {


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
        var newImageId = $store.read('item/create/object', Object.assign({parentId}, convertStyle(image.image)));
        image.colorsteps.forEach(step => {
            $store.read('item/create/object', Object.assign({}, step, {parentId: newImageId}))
        })

        return newImageId;
    }

    [GETTER('item/recover/boxshadow')] ($store, boxshadow, parentId) {
        return $store.read('item/create/object', Object.assign({parentId}, boxshadow.boxshadow));
    }    

    [GETTER('item/recover/textshadow')] ($store, textshadow, parentId) {
        return $store.read('item/create/object', Object.assign({parentId}, textshadow.textshadow));
    }        

    [GETTER('item/recover/layer')] ($store, layer, parentId) {
        var newLayerId = $store.read('item/create/object', 
            Object.assign({parentId}, convertStyle(layer.layer))
        );
        layer.images.forEach(image => {
            $store.read('item/recover/image', image, newLayerId);
        })

        layer.boxshadows.forEach(boxshadow => {
            $store.read('item/recover/boxshadow', boxshadow, newLayerId);
        })

        layer.textshadows.forEach(textshadow => {
            $store.read('item/recover/textshadow', textshadow, newLayerId);
        })

        return newLayerId;
    }
 
    [GETTER('item/recover/page')] ($store, page) {
        var newPageId = $store.read('item/create/object', convertStyle(page.page));
        page.layers.forEach(layer => {
            $store.read('item/recover/layer', layer, newPageId);
        })

        return newPageId;
    }    


    [ACTION('item/addCache')] ($store, item, sourceId) {
        var currentItem = $store.read('item/get', sourceId);
        $store.run('item/move/to', sourceId, $store.read('item/recover', item, currentItem.parentId)); 
    }


    [ACTION('item/copy/in')] ($store, destId, sourceId) {
        var destItem = $store.read('item/get', destId);
        var newImageId = $store.read('item/recover', 
            $store.read('collect/one', sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read('item/get', newImageId);
        newImageItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run('item/set', sourceItem, true);
        $store.run('item/sort', sourceId);
    }        


    [ACTION('item/copy/in/layer')] ($store, destId, sourceId) {
        var destItem = $store.read('item/get', destId);  /* layer */ 
        var newImageId = $store.read('item/recover', 
            $store.read('collect/one', sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read('item/get', newImageId);
        newImageItem.index = Number.MAX_SAFE_INTEGER;

        $store.run('item/set', newImageItem, true);        
        $store.run('item/sort', newImageId);
    }            

}