import BaseModule from "../../colorpicker/BaseModule";
import gradientList from './gradients/index';
import ColorList from "./color-list/index";
import { isUndefined } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { CHANGE_EDITOR } from "../types/event";
import { INDEX_DIST } from "./ItemManager";

export default class GradientManager extends BaseModule {

    afterDispatch( ) {
        this.$store.emit(CHANGE_EDITOR)
    }
 
    [GETTER('gradient/list/sample')] ($store, type = 'all') {

        var results = [] 

        if (type == 'all') {
            results.push(...gradientList.map(it => {
                return Object.assign({}, it)
            }));

            results.push( { 
                type: 'static', 
                color: ColorList.list['material'][0]
            })

        } else {
            results.push(...ColorList.list['material'].map(color => {
                return Object.assign({}, { type: 'static', color})
            }))
        }

        return results;
    }

    [ACTION('gradient/image/select')] ($store, obj) {
        var image = this.getFirstImage($store);

        if (image) {
            var newImageId = $store.read('item/recover/image', obj, $store.read('selection/current/layer/id'))
            $store.run('item/move/in', image.id, newImageId);
            $store.run('item/remove/children', image.id);            
            $store.run('item/remove', image.id);
        } else {
            var newImageId = $store.read('item/recover/image', obj, $store.read('selection/current/layer/id'))
            var newImage = $store.read('item/get', newImageId);
            $store.run('item/set', newImage);

        }
    }

    getFirstImage ($store) {
        var image = $store.read('selection/current/image')

        if (!image) {
            var layer = $store.read('selection/current/layer');

            if (!layer) {
                return; 
            }
    
            var images = $store.read('item/map/image/children', layer.id)
    
            if (images.length) {
                image = images[0];
            }    
        }

        return image; 
    }

    [ACTION('gradient/image/add')] ($store, obj) {
        var image = this.getFirstImage($store);
        var layerId = $store.read('selection/current/layer/id');
        if (image) {
            var newImageId = $store.read('item/recover/image', obj, layerId)
            $store.run('item/move/in', image.id, newImageId);
        } else {
            var newImageId = $store.read('item/recover/image', obj, layerId)
            var newImage = $store.read('item/get', newImageId);
            $store.run('item/set', newImage);
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