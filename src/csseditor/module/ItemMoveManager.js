import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";

const INDEX_DIST = 100 ; 
const COPY_INDEX_DIST = 1; 

export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemMoveManager extends BaseModule {

    afterDispatch() {
        this.$store.emit(CHANGE_EDITOR);
    }

    [ACTION('item/move/to')] ($store, sourceId, newItemId) {

        var currentItem = $store.read('item/get', sourceId);

        var newItem = $store.read('item/get', newItemId);
        newItem.index = currentItem.index + COPY_INDEX_DIST;

        $store.run('item/set', newItem, true);
        $store.run('item/sort', newItemId);

    }    

    [ACTION('item/move/next')] ($store, id) {
        var item = $store.read('item/get', id);
        item.index = $store.read('item/next/index', id);

        $store.run('item/set', item, item.selected);
        $store.run('item/sort', id);
    }

    [ACTION('item/move/last')] ($store, id) {
        var item = $store.read('item/get', id);
        item.index = Number.MAX_SAFE_INTEGER;

        $store.run('item/set', item, item.selected);
        $store.run('item/sort', id);
    }   
    
    [ACTION('item/move/first')] ($store, id) {
        var item = $store.read('item/get', id);
        item.index = -1 * COPY_INDEX_DIST;

        $store.run('item/set', item, item.selected);
        $store.run('item/sort', id);
    }       

    [ACTION('item/move/in')] ($store, destId, sourceId) {
        var destItem = $store.read('item/get', destId);
        var sourceItem = $store.read('item/get', sourceId);
        sourceItem.parentId = destItem.parentId;
        sourceItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run('item/set', sourceItem, true);
        $store.run('item/sort', sourceId);
    }    


    [ACTION('item/move/in/layer')] ($store, destId, sourceId) {
        var destItem = $store.read('item/get', destId);  /* layer */ 
        var sourceItem = $store.read('item/get', sourceId);

        sourceItem.parentId = destItem.id; 
        sourceItem.index = Number.MAX_SAFE_INTEGER;

        $store.run('item/set', sourceItem, true);        
        $store.run('item/sort', sourceId);
    }        
     

    [ACTION('item/move/prev')] ($store, id) {
        var item = $store.read('item/get', id);
        item.index = $store.read('item/prev/index', id);

        $store.run('item/set', item, item.selected);
        $store.run('item/sort', id);
    }


    [GETTER('item/add/index')] ($store, id, dist = INDEX_DIST) {
        return $store.items[id].index + dist;
    }

    [GETTER('item/next/index')] ($store, id) {
        return $store.read('item/add/index', id, INDEX_DIST + COPY_INDEX_DIST);
    }    

    [GETTER('item/prev/index')] ($store, id) {
        return $store.read('item/add/index', id, -1 * (INDEX_DIST + COPY_INDEX_DIST));
    }       

}