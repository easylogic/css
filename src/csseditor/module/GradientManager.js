import BaseModule from "../../colorpicker/BaseModule";
import gradientList from './gradients/index';
import ColorList from "./color-list/index";
import { GETTER, ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";
import { ITEM_GET, ITEM_REMOVE_CHILDREN, ITEM_REMOVE, ITEM_SET } from "../types/ItemTypes";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_LAYER } from "../types/SelectionTypes";
import { clone } from "../../util/functions/func";
import { ITEM_MOVE_IN } from "../types/ItemMoveTypes";
import { ITEM_RECOVER_IMAGE } from "../types/ItemRecoverTypes";
import { ITEM_MAP_IMAGE_CHILDREN } from "../types/ItemSearchTypes";

export default class GradientManager extends BaseModule {

    afterDispatch( ) {
        this.$store.emit(CHANGE_EDITOR)
    }

    getStaticList () {
        return ColorList.list['material'].map(color => {
            return {
                image: { 
                    type: 'static',
                    color
                }
            }
        });
    }
 
    [GETTER('gradient/list/sample')] ($store, type = 'all') {

        var results = [] 

        if (type == 'all') {
            results.push(...gradientList.map(it => {
                return {...it}
            }));
        }

        results.push(...this.getStaticList());

        return results;
    }

    [ACTION('gradient/image/select')] ($store, obj) {
        var image = this.getFirstImage($store);

        if (image) {
            var newImageId = $store.read(ITEM_RECOVER_IMAGE, obj, $store.read(SELECTION_CURRENT_LAYER_ID))
            $store.run(ITEM_MOVE_IN, image.id, newImageId);
            $store.run(ITEM_REMOVE_CHILDREN, image.id);            
            $store.run(ITEM_REMOVE, image.id);
        } else {
            var newImageId = $store.read(ITEM_RECOVER_IMAGE, obj, $store.read(SELECTION_CURRENT_LAYER_ID))
            var newImage = $store.read(ITEM_GET, newImageId);
            $store.run(ITEM_SET, newImage);

        }
    }

    getFirstImage ($store) {
        var image = $store.read(SELECTION_CURRENT_IMAGE)

        if (!image) {
            var layer = $store.read(SELECTION_CURRENT_LAYER);

            if (!layer) {
                return; 
            }
    
            var images = $store.read(ITEM_MAP_IMAGE_CHILDREN, layer.id)
    
            if (images.length) {
                image = images[0];
            }    
        }

        return image; 
    }

    [ACTION('gradient/image/add')] ($store, obj) {
        var image = this.getFirstImage($store);
        var layerId = $store.read(SELECTION_CURRENT_LAYER_ID);
        if (image) {
            var newImageId = $store.read(ITEM_RECOVER_IMAGE, obj, layerId)
            $store.run(ITEM_MOVE_IN, image.id, newImageId);
        } else {
            var newImageId = $store.read(ITEM_RECOVER_IMAGE, obj, layerId)
            var newImage = $store.read(ITEM_GET, newImageId);
            $store.run(ITEM_SET, newImage);
        }
    }    

    [ACTION('gradient/select')] ($store, type, index) {
        var obj = $store.read('gradient/list/sample', type)[index] 

        if (obj) {
            $store.run('gradient/image/select', obj);
        }
    }

    [ACTION('gradient/add')] ($store, type, index) {
        var obj = $store.read('gradient/list/sample', type)[index] 

        if (obj) {
            $store.run('gradient/image/add', obj);
        }
    }



}