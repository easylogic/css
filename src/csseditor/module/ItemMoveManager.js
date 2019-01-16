import BaseModule from "../../colorpicker/BaseModule";
import { GETTER, ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";
import { ITEM_SET, ITEM_GET, ITEM_SORT } from "./ItemTypes";

const INDEX_DIST = 100 ; 
const COPY_INDEX_DIST = 1; 

export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemMoveManager extends BaseModule {

    afterDispatch() {
        this.$store.emit(CHANGE_EDITOR);
    }

    [ACTION('item/move/to')] ($store, sourceId, newItemId) {

        var currentItem = $store.read(ITEM_GET, sourceId);

        var newItem = $store.read(ITEM_GET, newItemId);
        newItem.index = currentItem.index + COPY_INDEX_DIST;

        $store.run(ITEM_SET, newItem, true);
        $store.run(ITEM_SORT, newItemId);

    }    

    [ACTION('item/move/next')] ($store, id) {
        var item = $store.read(ITEM_GET, id);
        item.index = $store.read('item/next/index', id);

        $store.run(ITEM_SET, item, item.selected);
        $store.run(ITEM_SORT, id);
    }

    [ACTION('item/move/last')] ($store, id) {
        var item = $store.read(ITEM_GET, id);
        item.index = Number.MAX_SAFE_INTEGER;

        $store.run(ITEM_SET, item, item.selected);
        $store.run(ITEM_SORT, id);
    }   
    
    [ACTION('item/move/first')] ($store, id) {
        var item = $store.read(ITEM_GET, id);
        item.index = -1 * COPY_INDEX_DIST;

        $store.run(ITEM_SET, item, item.selected);
        $store.run(ITEM_SORT, id);
    }       

    [ACTION('item/move/in')] ($store, destId, sourceId) {
        var destItem = $store.read(ITEM_GET, destId);
        var sourceItem = $store.read(ITEM_GET, sourceId);
        sourceItem.parentId = destItem.parentId;
        sourceItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run(ITEM_SET, sourceItem, true);
        $store.run(ITEM_SORT, sourceId);
    }    


    [ACTION('item/move/in/layer')] ($store, destId, sourceId) {
        var destItem = $store.read(ITEM_GET, destId);  /* layer */ 
        var sourceItem = $store.read(ITEM_GET, sourceId);

        sourceItem.parentId = destItem.id; 
        sourceItem.index = Number.MAX_SAFE_INTEGER;

        $store.run(ITEM_SET, sourceItem, true);        
        $store.run(ITEM_SORT, sourceId);
    }        
     

    [ACTION('item/move/prev')] ($store, id) {
        var item = $store.read(ITEM_GET, id);
        item.index = $store.read('item/prev/index', id);

        $store.run(ITEM_SET, item, item.selected);
        $store.run(ITEM_SORT, id);
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