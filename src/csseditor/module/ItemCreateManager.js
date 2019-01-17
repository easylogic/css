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
    IMAGE_ITEM_TYPE_LINEAR,
    IMAGE_ITEM_TYPE_RADIAL,
    IMAGE_ITEM_TYPE_CONIC,
    IMAGE_ITEM_TYPE_REPEATING_LINEAR,
    IMAGE_ITEM_TYPE_REPEATING_RADIAL,
    IMAGE_ITEM_TYPE_REPEATING_CONIC,
    IMAGE_ITEM_TYPE_STATIC,
    IMAGE_ITEM_TYPE_IMAGE,
    ITEM_SET,
    ITEM_GET,
    ITEM_SORT,
    ITEM_TYPE_PAGE,
    ITEM_TYPE_LAYER,
    ITEM_TYPE_IMAGE,
    ITEM_TYPE_BOXSHADOW,
    ITEM_TYPE_TEXTSHADOW,
    ITEM_TYPE_COLORSTEP
} from "../types/ItemTypes";
import { percentUnit, pxUnit, unitValue, EMPTY_STRING } from "../../util/css/types";
import { GETTER, ACTION } from "../../util/Store";
import { ITEM_KEYS, ITEM_KEYS_GENERATE, ITEM_INITIALIZE, ITEM_CREATE_OBJECT, ITEM_CREATE_PAGE, ITEM_ADD_PAGE, ITEM_CREATE_LAYER, ITEM_CREATE_CIRCLE, ITEM_ADD, ITEM_CREATE_GROUP, ITEM_CREATE_BOXSHADOW, ITEM_CREATE_TEXTSHADOW, ITEM_CREATE_IMAGE, ITEM_CREATE_IMAGE_WITH_COLORSTEP, ITEM_CREATE_COLORSTEP, ITEM_CREATE, ITEM_COPY, ITEM_PREPEND_IMAGE, ITEM_ADD_IMAGE, ITEM_PREPEND_IMAGE_FILE, ITEM_ADD_IMAGE_FILE, ITEM_SET_IMAGE_FILE, ITEM_PREPEND_IMAGE_URL, ITEM_ADD_IMAGE_URL, ITEM_ADD_LAYER } from "../types/ItemCreateTypes";
import { clone } from "../../util/functions/func";
import { SELECTION_RECT } from "../types/SelectionTypes";
import { HISTORY_INITIALIZE } from "../types/HistoryTypes";

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

const itemCreateActions = {
    [ITEM_TYPE_PAGE] : ITEM_CREATE_PAGE,
    [ITEM_TYPE_LAYER] : ITEM_CREATE_LAYER,
    [ITEM_TYPE_IMAGE] : ITEM_CREATE_IMAGE,
    [ITEM_TYPE_BOXSHADOW] : ITEM_CREATE_BOXSHADOW,
    [ITEM_TYPE_TEXTSHADOW] : ITEM_CREATE_TEXTSHADOW,
    [ITEM_TYPE_COLORSTEP] : ITEM_CREATE_COLORSTEP
}

export default class ItemCreateManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.items = {}
        this.$store.itemKeys = []
    }

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    [GETTER(ITEM_KEYS)] ($store) {
        return $store.itemKeys;
    }

    [ACTION(ITEM_KEYS_GENERATE)] ($store) {
        $store.itemKeys =  Object.keys($store.items);
    }

    [ACTION(ITEM_INITIALIZE)] ($store, id) {
        delete $store.items[id];

        $store.run(ITEM_KEYS_GENERATE)
    }    

    [GETTER(ITEM_CREATE_OBJECT)] ($store, obj, defaultObj = {}) {
        obj = Object.assign(clone( defaultObj), obj);
        obj.id = Date.now() + '-' + uuid();

        $store.items[obj.id] = obj;

        $store.run(ITEM_KEYS_GENERATE)

        return obj.id; 
    }

    [GETTER(ITEM_CREATE_PAGE)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, PAGE_DEFAULT_OBJECT);
    }

    [GETTER(ITEM_CREATE_LAYER)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, LAYER_DEFAULT_OBJECT);
    }

    [GETTER(ITEM_CREATE_CIRCLE)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, CIRCLE_DEFAULT_OBJECT);
    }    

    [GETTER(ITEM_CREATE_GROUP)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, GROUP_DEFAULT_OBJECT);
    }    

    [GETTER(ITEM_CREATE_BOXSHADOW)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, BOXSHADOW_DEFAULT_OBJECT);
    }

    [GETTER(ITEM_CREATE_TEXTSHADOW)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, TEXTSHADOW_DEFAULT_OBJECT);
    }          
    
    [GETTER(ITEM_CREATE_IMAGE)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, IMAGE_DEFAULT_OBJECT);
    }    

    [GETTER(ITEM_CREATE_IMAGE_WITH_COLORSTEP)] ($store, obj = {}) {

        var imageId = $store.read(ITEM_CREATE_OBJECT, obj, IMAGE_DEFAULT_OBJECT);
        var color_0 = 'rgba(216,216,216, 0)';
        var color_1 = 'rgba(216,216,216, 1)';
        if (obj.type == IMAGE_ITEM_TYPE_STATIC) {
 
        } else if (obj.type == IMAGE_ITEM_TYPE_IMAGE) {

        } else if (gradientTypeList.includes(obj.type)) {

            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read(ITEM_CREATE_COLORSTEP, {parentId: imageId, color: color_0, percent: 0, index: 0});
            $store.read(ITEM_CREATE_COLORSTEP, {parentId: imageId, color: color_1, percent: 100, index: 100});
        } else if (repeatingGradientTypeList.includes(obj.type)) {
            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read(ITEM_CREATE_COLORSTEP, {parentId: imageId, color: color_0, percent: 0, index: 0});
            $store.read(ITEM_CREATE_COLORSTEP, {parentId: imageId, color: color_1, percent: 10, index: 100});
        }

        return imageId; 
    }        

    [GETTER(ITEM_CREATE_COLORSTEP)] ($store, obj = {}) {
        return $store.read(ITEM_CREATE_OBJECT, obj, COLORSTEP_DEFAULT_OBJECT);
    }        

    [GETTER(ITEM_CREATE)] ($store, itemType, obj = {}) {
        return $store.read(itemCreateActions[itemType], obj);
    }

    [GETTER(ITEM_COPY)] ($store, id) {
        var copyObject = clone( $store.read(ITEM_GET, id) );

        return $store.read(ITEM_CREATE, copyObject.itemType, copyObject);
    }    


    [ACTION(ITEM_ADD)] ($store, itemType, isSelected = false, parentId = EMPTY_STRING) {
        var id = $store.read(ITEM_CREATE, itemType);
        var item = $store.read(ITEM_GET, id);
        item.parentId = parentId; 

        item.index = Number.MAX_SAFE_INTEGER; 

        $store.run(ITEM_SET, item, isSelected);
        $store.run(ITEM_SORT, item.id)
    }

    [ACTION(ITEM_ADD_LAYER)] ($store, itemType, isSelected = false, parentId = EMPTY_STRING) {
        var rect = $store.read(SELECTION_RECT);

        var id = $store.read(ITEM_CREATE, itemType);
        var item = $store.read(ITEM_GET, id);
        item.x = pxUnit(unitValue(rect.centerX) - unitValue(item.width)/2);
        item.y = pxUnit(unitValue(rect.centerY) - unitValue(item.height)/2);

        item.parentId = parentId; 

        item.index = Number.MAX_SAFE_INTEGER; 

        $store.run(ITEM_SET, item, isSelected);
        $store.run(ITEM_SORT, item.id)
    }

    [ACTION(ITEM_PREPEND_IMAGE)] ($store, imageType, isSelected = false, parentId = EMPTY_STRING) {
        $store.run(ITEM_ADD_IMAGE, imageType, isSelected, parentId, -1);
    }        

    [ACTION(ITEM_ADD_IMAGE)] ($store, imageType, isSelected = false, parentId = EMPTY_STRING, index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read(ITEM_CREATE_IMAGE_WITH_COLORSTEP, { type : imageType });
        var item = $store.read(ITEM_GET, id);
        item.type = imageType; 
        item.parentId = parentId; 
        item.index = index; 

        $store.run(ITEM_SET, item, isSelected);
        $store.run(ITEM_SORT, id); 
    }    

    [ACTION(ITEM_PREPEND_IMAGE_FILE)] ($store, img, isSelected = false, parentId = EMPTY_STRING) {
        $store.run(ITEM_ADD_IMAGE_FILE, img, isSelected, parentId, -1);
    }     

    [ACTION(ITEM_ADD_IMAGE_FILE)] ($store, img, isSelected = false, parentId = EMPTY_STRING, index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read(ITEM_CREATE_IMAGE, {type: IMAGE_ITEM_TYPE_IMAGE});
        var item = $store.read(ITEM_GET, id);
        item.parentId = parentId; 
        item.index = index;
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth =  percentUnit(100);

        $store.run(ITEM_SET, item, isSelected);
        $store.run(ITEM_SORT, id); 
    }     

    [ACTION(ITEM_SET_IMAGE_FILE)] ($store, id, img) {        
        var item = $store.read(ITEM_GET, id);
        item.fileType = img.fileType || 'svg';
        if (img.clipPathSvg) item.clipPathSvg = img.clipPathSvg; 
        if (img.clipPathSvgId) item.clipPathSvgId = img.clipPathSvgId; 
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth = percentUnit(100);

        $store.run(ITEM_SET, item);
    }

    [ACTION(ITEM_PREPEND_IMAGE_URL)] ($store, img, isSelected = false, parentId = EMPTY_STRING) {
        $store.run(ITEM_ADD_IMAGE_URL, img, isSelected, parentId, -1);
    }         

    [ACTION(ITEM_ADD_IMAGE_URL)] ($store, img, isSelected = false, parentId = EMPTY_STRING, index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read(ITEM_CREATE_IMAGE, {type: IMAGE_ITEM_TYPE_IMAGE});
        var item = $store.read(ITEM_GET, id);
        item.parentId = parentId; 
        item.index = index;     
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundSizeWidth = percentUnit(100);

        $store.run(ITEM_SET, item, isSelected);
        $store.run(ITEM_SORT, id); 
    }         

    [ACTION(ITEM_ADD_PAGE)] ($store, isSelected = false) {
        var pageId = $store.read(ITEM_CREATE_PAGE);        
        var layerId = $store.read(ITEM_CREATE_LAYER);
        var imageId = $store.read(ITEM_CREATE_IMAGE);

        // 페이지 생성 
        var page = $store.read(ITEM_GET, pageId);
        page.index = Number.MAX_SAFE_INTEGER;  
        $store.run(ITEM_SET, page);

        // 레이어 생성 
        var layer = $store.read(ITEM_GET, layerId);
        layer.parentId = pageId; 
        layer.width = clone(page.width);
        layer.height = clone(page.height); 
        $store.run(ITEM_SET, layer);

        // 이미지 생성 
        var image = $store.read(ITEM_GET, imageId);
        image.parentId = layerId; 
        $store.run(ITEM_SET, image, isSelected);      
        
        $store.run(HISTORY_INITIALIZE);
    }
}