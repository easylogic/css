import BaseModule from "../../colorpicker/BaseModule";
import { uuid } from "../../util/functions/math";
import { CHANGE_EDITOR } from "../types/event";
import { 
    PAGE_DEFAULT_OBJECT, 
    LAYER_DEFAULT_OBJECT, 
    CIRCLE_DEFAULT_OBJECT, 
    GROUP_DEFAULT_OBJECT, 
    BOXSHADOW_DEFAULT_OBJECT, 
    IMAGE_DEFAULT_OBJECT, 
    COLORSTEP_DEFAULT_OBJECT,
    TEXTSHADOW_DEFAULT_OBJECT,
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_PAGE,
    ITEM_TYPE_LAYER,
    IMAGE_ITEM_TYPE_LINEAR,
    IMAGE_ITEM_TYPE_RADIAL,
    IMAGE_ITEM_TYPE_CONIC,
    IMAGE_ITEM_TYPE_REPEATING_LINEAR,
    IMAGE_ITEM_TYPE_REPEATING_RADIAL,
    IMAGE_ITEM_TYPE_REPEATING_CONIC,
    IMAGE_ITEM_TYPE_STATIC,
    IMAGE_ITEM_TYPE_IMAGE
} from "./ItemTypes";
import { percentUnit } from "../../util/css/types";
import { GETTER, ACTION } from "../../util/Store";

const gradientTypeList = [
    IMAGE_ITEM_TYPE_LINEAR,
    IMAGE_ITEM_TYPE_RADIAL,
    IMAGE_ITEM_TYPE_CONIC
]
const repeatingGradientTypeList = [
    IMAGE_ITEM_TYPE_REPEATING_LINEAR,
    IMAGE_ITEM_TYPE_REPEATING_RADIAL,
    IMAGE_ITEM_TYPE_REPEATING_CONIC
]
const conicList = [
    IMAGE_ITEM_TYPE_CONIC,
    IMAGE_ITEM_TYPE_REPEATING_CONIC
]

export default class ItemCreateManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.items = {}
        this.$store.itemKeys = []
    }

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    [GETTER('item/keys')] ($store) {
        return $store.itemKeys;
    }

    [ACTION('item/keys/generate')] ($store) {
        $store.itemKeys =  Object.keys($store.items);
    }

    [ACTION('item/initialize')] ($store, id) {
        delete $store.items[id];

        $store.run('item/keys/generate')
    }    

    [GETTER('item/create/object')] ($store, obj, defaultObj = {}) {
        obj = Object.assign({}, $store.read('clone', defaultObj), obj);         
        obj.id = Date.now() + '-' + uuid();

        $store.items[obj.id] = obj;

        $store.run('item/keys/generate')

        return obj.id; 
    }

    [GETTER('item/create/page')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, PAGE_DEFAULT_OBJECT);
    }

    [GETTER('item/create/layer')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, LAYER_DEFAULT_OBJECT);
    }

    [GETTER('item/create/circle')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, CIRCLE_DEFAULT_OBJECT);
    }    

    [GETTER('item/create/group')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, GROUP_DEFAULT_OBJECT);
    }    

    [GETTER('item/create/boxshadow')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, BOXSHADOW_DEFAULT_OBJECT);
    }

    [GETTER('item/create/textshadow')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, TEXTSHADOW_DEFAULT_OBJECT);
    }    

    [GETTER('item/create/backdrop-filter')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, BACKDROPFILTER_DEFAULT_OBJECT);
    }        
    
    [GETTER('item/create/image')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, IMAGE_DEFAULT_OBJECT);
    }    

    [GETTER('item/create/image/with/colorstep')] ($store, obj = {}) {

        var imageId = $store.read('item/create/object', obj, IMAGE_DEFAULT_OBJECT);

        if (obj.type == IMAGE_ITEM_TYPE_STATIC) {
 
        } else if (obj.type == IMAGE_ITEM_TYPE_IMAGE) {

        } else if (gradientTypeList.includes(obj.type)) {

            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read('item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 0)', percent: 0, index: 0});
            $store.read('item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 1)', percent: 100, index: 100});
        } else if (repeatingGradientTypeList.includes(obj.type)) {
            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read('item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 0)', percent: 0, index: 0});
            $store.read('item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 1)', percent: 10, index: 100});
        }

        return imageId; 
    }        

    [GETTER('item/create/colorstep')] ($store, obj = {}) {
        return $store.read('item/create/object', obj, COLORSTEP_DEFAULT_OBJECT);
    }        

    // 객체를 생성하면 id 만 리턴한다. 
    [GETTER('item/create')] ($store, itemType, obj = {}) {
        return $store.read('item/create/' + itemType, obj);
    }

    [GETTER('item/copy')] ($store, id) {
        var copyObject = $store.clone('item/get', id);

        return $store.read('item/create', copyObject.itemType, copyObject);
    }    


    [ACTION('item/add')] ($store, itemType, isSelected = false, parentId = '') {
        var id = $store.read('item/create', itemType);
        var item = $store.read('item/get', id);
        item.parentId = parentId; 

        item.index = Number.MAX_SAFE_INTEGER; 

        $store.run('item/set', item, isSelected);
        $store.run('item/sort', item.id)
    }

    [ACTION('item/prepend/image')] ($store, imageType, isSelected = false, parentId = '') {
        $store.run('item/add/image', imageType, isSelected, parentId, -1);
    }        

    [ACTION('item/add/image')] ($store, imageType, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('item/create/image/with/colorstep', { type : imageType });
        var item = $store.read('item/get', id);
        item.type = imageType; 
        item.parentId = parentId; 
        item.index = index; 

        $store.run('item/set', item, isSelected);
        $store.run('item/sort', id); 
    }    

    [ACTION('item/prepend/image/file')] ($store, img, isSelected = false, parentId = '') {
        $store.run('item/add/image/file', img, isSelected, parentId, -1);
    }     

    [ACTION('item/add/image/file')] ($store, img, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('item/create/image');
        var item = $store.read('item/get', id);
        item.type = ITEM_TYPE_IMAGE; 
        item.parentId = parentId; 
        item.index = index;
        item.colors = img.colors;         
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth =  percentUnit(100);

        $store.run('item/set', item, isSelected);
        $store.run('item/sort', id); 
    }     

    [ACTION('item/set/image/file')] ($store, id, img) {
        var item = $store.read('item/get', id);
        item.type = ITEM_TYPE_IMAGE; 
        item.colors = img.colors;         
        item.fileType = img.fileType || 'svg';
        if (img.clipPathSvg) item.clipPathSvg = img.clipPathSvg; 
        if (img.clipPathSvgId) item.clipPathSvgId = img.clipPathSvgId; 
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth = percentUnit(100);

        $store.run('item/set', item);
    }         

    [ACTION('item/prepend/image/url')] ($store, img, isSelected = false, parentId = '') {
        $store.run('item/add/image/url', img, isSelected, parentId, -1);
    }         

    [ACTION('item/add/image/url')] ($store, img, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('item/create/image');
        var item = $store.read('item/get', id);
        item.type = ITEM_TYPE_IMAGE; 
        item.parentId = parentId; 
        item.index = index;
        item.colors = img.colors;         
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundSizeWidth = percentUnit(100);

        $store.run('item/set', item, isSelected);
        $store.run('item/sort', id); 
    }         

    [ACTION('item/add/page')] ($store, isSelected = false) {
        var pageId = $store.read('item/create', ITEM_TYPE_PAGE);        
        var layerId = $store.read('item/create', ITEM_TYPE_LAYER);
        var imageId = $store.read('item/create', ITEM_TYPE_IMAGE);

        // 페이지 생성 
        var page = $store.read('item/get', pageId);
        page.index = Number.MAX_SAFE_INTEGER;  
        $store.run('item/set', page);

        // 레이어 생성 
        var layer = $store.read('item/get', layerId);
        layer.parentId = pageId; 
        layer.width = $store.read('clone', page.width);
        layer.height = $store.read('clone', page.height); 
        // layer.style = Object.assign({}, layer.style, page.style)        
        $store.run('item/set', layer);

        // 이미지 생성 
        var image = $store.read('item/get', imageId);
        image.parentId = layerId; 
        $store.run('item/set', image, isSelected);      
        
        $store.run('history/initialize');
    }
}