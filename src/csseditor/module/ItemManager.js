import BaseModule from "../../colorpicker/BaseModule";
import { uuid } from "../../util/functions/math";
import Dom from "../../util/Dom";
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
    ITEM_TYPE_COLORSTEP,
    ITEM_TYPE_BOXSHADOW,
    ITEM_TYPE_TEXTSHADOW,
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
import { string2unit, percentUnit, UNIT_PX, unitObject } from "../../util/css/types";

const INDEX_DIST = 100 ; 
const COPY_INDEX_DIST = 1; 
const NONE_INDEX = -99999;

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


const itemField = {
    'mix-blend-mode' : 'mixBlendMode',
    'background-blend-mode' : 'backgroundBlendMode',
    'background-color': 'backgroundColor',
    'x': 'x',
    'y': 'y',
    'width': 'width',
    'height': 'height',
    'rotate': 'rotate',
    'border-radius': 'borderRadius',
    'border-top-left-radius': 'borderTopLeftRadius',
    'border-top-right-radius': 'borderTopRightRadius',
    'border-bottom-left-radius': 'borderBottomLeftRadius',
    'border-bottom-right-radius': 'borderBottomRightRadius',
    'skewX': 'skewX',
    'skewY': 'skewY',            
    'scale':'scale',
    'translateX':'translateX',
    'translateY':'translateY',
    'translateZ':'translateZ',
    'rotate3dX':'rotate3dX',
    'rotate3dY':'rotate3dY',
    'rotate3dZ':'rotate3dZ',
    'rotate3dA':'rotate3dA',
    'scale3dX':'scale3dX',
    'scale3dY':'scale3dY',
    'scale3dZ':'scale3dZ',
    'translate3dX':'translate3dX',
    'translate3dY':'translate3dY',
    'translate3dZ':'translate3dZ',
}

const updateUnitField = {
    borderRadius: true,
    borderTopLeftRadius: true,
    borderBottomLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    backgroundSizeWidth: true,
    backgroundSizeHeight: true
}

const updateNumberUnitField = {
    backgroundPositionX: UNIT_PX,
    backgroundPositionY: UNIT_PX,
    backgroundSizeHeight: UNIT_PX,
    backgroundSizeWidth: UNIT_PX,
}

const convertStyle = (item) => {
    var style = item.style || {};

    Object.keys(style).forEach(key => {
        item[itemField[key]] = style[key]
    })

    delete item.style;

    Object.keys(item).forEach(key => {
        if (updateUnitField[key]) {
            item[key] = string2unit (item[key])
        } else if (updateNumberUnitField[key]) {
            item[key] = unitObject (item[key], updateNumberUnitField[key])
        }
    })

    return item; 
}

export const DEFAULT_FUNCTION = (item) => item; 

export default class ItemManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.items = {}
        this.$store.itemKeys = []
    }

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    '*/item/convert/style' ($store, item) {
        return convertStyle(item);
    }

    '*/item/keys' ($store) {
        return $store.itemKeys;
    }

    '/item/keys/generate' ($store) {
        $store.itemKeys =  Object.keys($store.items);
    }

    '/item/initialize' ($store, id) {
        delete $store.items[id];

        $store.run('/item/keys/generate')
    }    

    '*/item/create/object' ($store, obj, defaultObj = {}) {
        obj = Object.assign({}, $store.read('/clone', defaultObj), obj);         
        obj.id = Date.now() + '-' + uuid();

        $store.items[obj.id] = obj;

        $store.run('/item/keys/generate')

        return obj.id; 
    }

    '*/item/create/page' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, PAGE_DEFAULT_OBJECT);
    }

    '*/item/create/layer' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, LAYER_DEFAULT_OBJECT);
    }

    '*/item/create/circle' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, CIRCLE_DEFAULT_OBJECT);
    }    

    '*/item/create/group' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, GROUP_DEFAULT_OBJECT);
    }    

    '*/item/create/boxshadow' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, BOXSHADOW_DEFAULT_OBJECT);
    }

    '*/item/create/textshadow' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, TEXTSHADOW_DEFAULT_OBJECT);
    }    

    '*/item/create/backdrop-filter' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, BACKDROPFILTER_DEFAULT_OBJECT);
    }        
    
    '*/item/create/image' ($store, obj = {}) {

        var imageId = $store.read('/item/create/object', obj, IMAGE_DEFAULT_OBJECT);

        if (obj.type == IMAGE_ITEM_TYPE_STATIC) {
 
        } else if (obj.type == IMAGE_ITEM_TYPE_IMAGE) {

        } else if (gradientTypeList.includes(obj.type)) {

            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 0)', percent: 0, index: 0});
            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 1)', percent: 100, index: 100});
        } else if (repeatingGradientTypeList.includes(obj.type)) {
            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 0)', percent: 0, index: 0});
            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(216,216,216, 1)', percent: 10, index: 100});
        }

        return imageId; 
    }    

    '*/item/create/colorstep' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, COLORSTEP_DEFAULT_OBJECT);
    }        

    // 객체를 생성하면 id 만 리턴한다. 
    '*/item/create' ($store, itemType, obj = {}) {
        return $store.read('/item/create/' + itemType, obj);
    }

    '*/item/copy' ($store, id) {
        var copyObject = $store.clone('/item/get', id);

        return $store.read('/item/create', copyObject.itemType, copyObject);
    }    

    '*/item/get' ($store, id) {
        return $store.items[id] || {};
    }

    '*/item/get/all' ($store, parentId) {
        var items = {}

        $store.read('/item/each/children', parentId, (item) => {
            items[item.id] = $store.read('/clone', item);

            var children = $store.read('/item/get/all', item.id)
            Object.keys(children).forEach(key => {
                items[key] = children[key];
            }); 
        })

        return items; 
    }

    '/item/set/all' ($store, parentId, items, isRemove = true) {
        if (isRemove) { 
            $store.run('/item/remove/all', parentId);
        }
        Object.assign($store.items, items);
    }

    '*/item/list' ($store, filterCallback) {
        var list = $store.itemKeys.filter(filterCallback)

        list.sort( (aId, bId) => {
            return $store.items[aId].index > $store.items[bId].index ? 1 : -1;
        })

        return list; 
    }

    '*/item/filter' ($store, filterCallback) {
        return $store.read('/item/list', filterCallback)
    }    

    '*/item/list/page' ($store) {
        return $store.read('/item/filter', this.checkItemCallback($store, null, 'page'));
    } 

    '*/item/map/page' ($store, callback) {
        return $store.read('/item/list/page').map( (id, index) => {
            return callback($store.items[id], index)
        }); 
    }    


    checkItemCallback ($store, parentId, itemType = undefined) {
        if (itemType) {

            if (parentId) {
                return function (id) {
                    return $store.items[id].parentId == parentId && $store.items[id].itemType == itemType 
                }
            } else {
                return function (id) {
                    return $store.items[id].itemType == itemType
                }
            }
        } else {
            return function (id) {
                return $store.items[id].parentId == parentId
            }
        }

    }
        

    '*/item/list/children' ($store, parentId, itemType) {
        return $store.read('/item/filter', this.checkItemCallback($store, parentId, itemType));
    }

    '*/item/count/children' ($store, parentId) {
        return $store.read('/item/list/children', parentId).length;
    }    

    '*/item/map/children' ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('/item/list/children', parentId).map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }    

    '*/item/map/type/children' ($store, parentId, itemType, callback = DEFAULT_FUNCTION) {
        return $store.read('/item/list/children', parentId, itemType).map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }        

    '*/item/map/image/children' ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('/item/map/type/children', parentId, ITEM_TYPE_IMAGE, callback);
    }

    '*/item/map/colorstep/children' ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('/item/map/type/children', parentId, ITEM_TYPE_COLORSTEP, callback);
    }    

    '*/item/map/boxshadow/children' ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('/item/map/type/children', parentId, ITEM_TYPE_BOXSHADOW, callback);
    }    

    '*/item/map/textshadow/children' ($store, parentId, callback = DEFAULT_FUNCTION) {
        return $store.read('/item/map/type/children', parentId, ITEM_TYPE_TEXTSHADOW, callback);
    }            

    '*/item/filter/children' ($store, parentId, callback) {
        return $store.read('/item/list/children', parentId).filter(function (id, index) { 
            return callback($store.items[id], index)
        });
    }  

    '*/item/filter/type/children' ($store, parentId, itemType, callback) {
        return $store.read('/item/list/children', parentId, itemType).filter(function (id, index) { 
            return callback($store.items[id], index)
        });
    }      

    '*/item/each/children' ($store, parentId, callback) {
        return $store.read('/item/list/children', parentId).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }        

    '*/item/each/type/children' ($store, parentId, itemType, callback) {
        return $store.read('/item/list/children', parentId, itemType).forEach(function (id, index) { 
            callback($store.items[id], index)
        });
    }            

    '*/item/traverse' ($store, parentId) {
        var list = $store.read('/item/list/children', parentId);
        
        list.sort( (a, b) => {
            var $a = $store.items[a];
            var $b = $store.items[b];

            if ($a.order == $b.order) {
                
                if (a > b) return 1; 
                if (a < b) return -1;  

                return 0; 
            }
            return $a.order > $b.order ? 1 : -1; 
        })
        
        return list.map(childId => {
            return { id: childId, children: $store.read('/item/traverse', childId)}
        })
    }

    '*/item/tree' ($store) {
        return $store.read('/item/traverse', '');
    }

    '*/item/tree/normalize' ($store, root = [], children = [], depth = 0) {
        var results = [] 

        var list = (root != null ? $store.read('/item/tree') : children);
        list.forEach(item => {
            results.push({ id: item.id, depth })
            results.push(... $store.read('/item/tree/normalize', null, item.children, depth + 1))
        });

        return results; 
    }   
    
    '*/item/path' ($store, id) {
        var results = [id] 
        var targetId = id; 

        do {
            var item = $store.read('/item/get', targetId);

            if (item.parentId == '') {
                results.push(item.id);
                break; 
            } else {
                results.push(item.id);
                targetId = item.parentId
            }

        } while(targetId)
        
        return results;
    }

    '*/item/get/mode' ($store) {
        return $store.selectedMode
    }

    '*/item/get/editMode' ($store) {
        return $store.editMode
    }    

    '*/item/dom' ($store, id) {
        var element = document.querySelector('[item-layer-id="' + id + '"]');

        if (element) {
            return new Dom(element)
        }
    }

    '/item/focus' ($store, id) {
        var $el = $store.read('/item/dom', id);

        if ($el && $el.el) {
            $el.el.focus();
        }
    }


    '/item/remove' ($store, id) {
        if (id) {

            var item = $store.read('/item/get', id);
            var itemType = item.itemType; 

            if (item.parentId) {
                var list = $store.read('/item/list/children', item.parentId, itemType);
            } else {
                var list = $store.read('/item/list/page');
            }

            var nextSelectedId = '' 
            for(var i = 0, len = list.length; i < len; i++) {
                var nodeId = list[i]
                if ($store.items[id].index > item.index) {
                    nextSelectedId = nodeId; 
                    break;
                }
            }


            if (nextSelectedId) {
                $store.run('/selection/one', nextSelectedId)
            } else {
                if (item.index > 0 ) {
                    for(var i = 0, len = list.length; i < len; i++) {
                        var nodeId = list[i]
                        if ($store.items[nodeId].index == item.index - INDEX_DIST) {
                            nextSelectedId = nodeId; 
                            break;
                        }
                    }

                    if (nextSelectedId) {
                        $store.run('/selection/one', nextSelectedId)
                    }                        
                } else {
                    $store.run('/selection/one', item.parentId)
                }
            }


            $store.items[id].index = NONE_INDEX;
            $store.read('/item/sort', id);

            if ($store.items[id].backgroundImage) {
                URL.revokeObjectURL($store.items[id].backgroundImage);
            }
            $store.run('/item/initialize', id);
        }
    }
    

    '/item/remove/all' ($store, parentId) {
        $store.read('/item/each/children', parentId, (item) => {

            $store.run('/item/remove/all', item.id);

            $store.run('/item/initialize', item.id);

        })
    }

    '/item/remove/children' ($store, parentId) {
        $store.read('/item/each/children', parentId, (item) => {
            $store.run('/item/remove', item.id);
        })
    }

    '/item/set' ($store, obj = {}, isSelected = false) {
        var id = obj.id; 
        var prevItem = $store.clone('/item/get', id)
        $store.items[id] = Object.assign({}, prevItem, obj);

        if (isSelected) $store.run('/selection/one', id)
    }

    '*/item/add/index' ($store, id, dist = INDEX_DIST) {
        return $store.items[id].index + dist;
    }

    '*/item/next/index' ($store, id) {
        return $store.read('/item/add/index', id, INDEX_DIST + COPY_INDEX_DIST);
    }    

    '*/item/prev/index' ($store, id) {
        return $store.read('/item/add/index', id, -1 * (INDEX_DIST + COPY_INDEX_DIST));
    }   
    
    // initialize items 
    '/item/load' ($store) { 
        $store.read('/item/keys').forEach(id => {
            $store.items[id] = convertStyle($store.items[id])
        })

        $store.run('/history/initialize');
    }  

    '/item/add' ($store, itemType, isSelected = false, parentId = '') {
        var id = $store.read('/item/create', itemType);
        var item = $store.read('/item/get', id);
        item.parentId = parentId; 

        item.index = Number.MAX_SAFE_INTEGER; 

        $store.run('/item/set', item, isSelected);
        $store.run('/item/sort', item.id)
    }

    '/item/prepend/image' ($store, imageType, isSelected = false, parentId = '') {
        $store.run('/item/add/image', imageType, isSelected, parentId, -1);
    }        

    '/item/add/image' ($store, imageType, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('/item/create/image', { type : imageType });
        var item = $store.read('/item/get', id);
        item.type = imageType; 
        item.parentId = parentId; 
        item.index = index; 

        $store.run('/item/set', item, isSelected);
        $store.run('/item/sort', id); 
    }    

    '/item/prepend/image/file' ($store, img, isSelected = false, parentId = '') {
        $store.run('/item/add/image/file', img, isSelected, parentId, -1);
    }     

    '/item/add/image/file' ($store, img, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('/item/create/image');
        var item = $store.read('/item/get', id);
        item.type = ITEM_TYPE_IMAGE; 
        item.parentId = parentId; 
        item.index = index;
        item.colors = img.colors;         
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth =  percentUnit(100);

        $store.run('/item/set', item, isSelected);
        $store.run('/item/sort', id); 
    }     

    '/item/set/image/file' ($store, id, img) {
        var item = $store.read('/item/get', id);
        item.type = ITEM_TYPE_IMAGE; 
        item.colors = img.colors;         
        item.fileType = img.fileType || 'svg';
        if (img.clipPathSvg) item.clipPathSvg = img.clipPathSvg; 
        if (img.clipPathSvgId) item.clipPathSvgId = img.clipPathSvgId; 
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth = percentUnit(100);

        $store.run('/item/set', item);
    }         

    '/item/prepend/image/url' ($store, img, isSelected = false, parentId = '') {
        $store.run('/item/add/image/url', img, isSelected, parentId, -1);
    }         

    '/item/add/image/url' ($store, img, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('/item/create/image');
        var item = $store.read('/item/get', id);
        item.type = ITEM_TYPE_IMAGE; 
        item.parentId = parentId; 
        item.index = index;
        item.colors = img.colors;         
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundSizeWidth = percentUnit(100);

        $store.run('/item/set', item, isSelected);
        $store.run('/item/sort', id); 
    }         

    '/item/add/page' ($store, isSelected = false) {
        var pageId = $store.read('/item/create', ITEM_TYPE_PAGE);        
        var layerId = $store.read('/item/create', ITEM_TYPE_LAYER);
        var imageId = $store.read('/item/create', ITEM_TYPE_IMAGE);

        // 페이지 생성 
        var page = $store.read('/item/get', pageId);
        page.index = Number.MAX_SAFE_INTEGER;  
        $store.run('/item/set', page);

        // 레이어 생성 
        var layer = $store.read('/item/get', layerId);
        layer.parentId = pageId; 
        layer.width = page.width;
        layer.height = page.height; 
        // layer.style = Object.assign({}, layer.style, page.style)        
        $store.run('/item/set', layer);

        // 이미지 생성 
        var image = $store.read('/item/get', imageId);
        image.parentId = layerId; 
        $store.run('/item/set', image, isSelected);      
        
        $store.run('/history/initialize');
    }


    '/item/move/to' ($store, sourceId, newItemId) {

        var currentItem = $store.read('/item/get', sourceId);

        var newItem = $store.read('/item/get', newItemId);
        newItem.index = currentItem.index + COPY_INDEX_DIST;

        $store.run('/item/set', newItem, true);
        $store.run('/item/sort', newItemId);

    }    



    '*/item/recover' ($store, item, parentId) {

        if (item.page) {
            return $store.read('/item/recover/page', item, parentId);
        } else if (item.layer) {
            return $store.read('/item/recover/layer', item, parentId);
        } else if (item.image) {
            return $store.read('/item/recover/image', item, parentId);            
        } else if (item.boxshadow) {
            return $store.read('/item/recover/boxshadow', item, parentId);                        
        } else if (item.textshadow) {
            return $store.read('/item/recover/textshadow', item, parentId);                                    
        }
    }

    '*/item/recover/image' ($store, image, parentId) {
        var newImageId = $store.read('/item/create/object', Object.assign({parentId}, convertStyle(image.image)));
        image.colorsteps.forEach(step => {
            $store.read('/item/create/object', Object.assign({}, step, {parentId: newImageId}))
        })

        return newImageId;
    }

    '*/item/recover/boxshadow' ($store, boxshadow, parentId) {
        return $store.read('/item/create/object', Object.assign({parentId}, boxshadow.boxshadow));
    }    

    '*/item/recover/textshadow' ($store, textshadow, parentId) {
        return $store.read('/item/create/object', Object.assign({parentId}, textshadow.textshadow));
    }        

    '*/item/recover/layer' ($store, layer, parentId) {
        var newLayerId = $store.read('/item/create/object', 
            Object.assign({parentId}, convertStyle(layer.layer))
        );
        layer.images.forEach(image => {
            $store.read('/item/recover/image', image, newLayerId);
        })

        layer.boxshadows.forEach(boxshadow => {
            $store.read('/item/recover/boxshadow', boxshadow, newLayerId);
        })

        layer.textshadows.forEach(textshadow => {
            $store.read('/item/recover/textshadow', textshadow, newLayerId);
        })

        return newLayerId;
    }
 
    '*/item/recover/page' ($store, page) {
        var newPageId = $store.read('/item/create/object', convertStyle(page.page));
        page.layers.forEach(layer => {
            $store.read('/item/recover/layer', layer, newPageId);
        })

        return newPageId;
    }    

    '/item/addCopy' ($store, sourceId) {
        $store.run('/item/addCache', $store.read('/collect/one', sourceId), sourceId);    
    }    

    '/item/addCache' ($store, item, sourceId) {
        var currentItem = $store.read('/item/get', sourceId);
        $store.run('/item/move/to', sourceId, $store.read('/item/recover', item, currentItem.parentId)); 
    }

    '/item/move/next' ($store, id) {
        var item = $store.read('/item/get', id);
        item.index = $store.read('/item/next/index', id);

        $store.run('/item/set', item, item.selected);
        $store.run('/item/sort', id);
    }

    '/item/move/last' ($store, id) {
        var item = $store.read('/item/get', id);
        item.index = Number.MAX_SAFE_INTEGER;

        $store.run('/item/set', item, item.selected);
        $store.run('/item/sort', id);
    }   
    
    '/item/move/first' ($store, id) {
        var item = $store.read('/item/get', id);
        item.index = -1 * COPY_INDEX_DIST;

        $store.run('/item/set', item, item.selected);
        $store.run('/item/sort', id);
    }       

    '/item/move/in' ($store, destId, sourceId) {
        var destItem = $store.read('/item/get', destId);
        var sourceItem = $store.read('/item/get', sourceId);
        sourceItem.parentId = destItem.parentId;
        sourceItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run('/item/set', sourceItem, true);
        $store.run('/item/sort', sourceId);
    }    


    '/item/copy/in' ($store, destId, sourceId) {
        var destItem = $store.read('/item/get', destId);
        var newImageId = $store.read('/item/recover', 
            $store.read('/collect/one', sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read('/item/get', newImageId);
        newImageItem.index = destItem.index - COPY_INDEX_DIST;

        $store.run('/item/set', sourceItem, true);
        $store.run('/item/sort', sourceId);
    }        

    '/item/move/in/layer' ($store, destId, sourceId) {
        var destItem = $store.read('/item/get', destId);  /* layer */ 
        var sourceItem = $store.read('/item/get', sourceId);

        sourceItem.parentId = destItem.id; 
        sourceItem.index = Number.MAX_SAFE_INTEGER;

        $store.run('/item/set', sourceItem, true);        
        $store.run('/item/sort', sourceId);
    }        

    '/item/copy/in/layer' ($store, destId, sourceId) {
        var destItem = $store.read('/item/get', destId);  /* layer */ 
        var newImageId = $store.read('/item/recover', 
            $store.read('/collect/one', sourceId), 
            destItem.parentId
        );

        var newImageItem = $store.read('/item/get', newImageId);
        newImageItem.index = Number.MAX_SAFE_INTEGER;

        $store.run('/item/set', newImageItem, true);        
        $store.run('/item/sort', newImageId);
    }            

    '/item/move/prev' ($store, id) {
        var item = $store.read('/item/get', id);
        item.index = $store.read('/item/prev/index', id);

        $store.run('/item/set', item, item.selected);
        $store.run('/item/sort', id);
    }

    '/item/sort' ($store, id) {
        var item = $store.read('/item/get', id);
        var itemType = item.itemType; 

        if (item.parentId) {
            var list = $store.read('/item/list/children', item.parentId, itemType);
        } else {
            var list = $store.read('/item/list/page');
        }

        // 필요 없는 index 를 가진 객체는 지운다. 
        list = list.filter(id => {
            return $store.items[id].index != NONE_INDEX
        });

        list.sort( (a, b) => {
            return $store.items[a].index > $store.items[b].index ? 1 : -1;
        })

        list.forEach((id, index) => {
            $store.items[id].index = index * INDEX_DIST
        })
    }
}