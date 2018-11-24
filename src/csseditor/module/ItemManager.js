import BaseModule from "../../colorpicker/BaseModule";
import { uuid } from "../../util/functions/math";
import Dom from "../../util/Dom";

const INDEX_DIST = 100 ; 
const COPY_INDEX_DIST = 1; 
const NONE_INDEX = -99999;

const PAGE_DEFAULT_OBJECT = {
    itemType: 'page',
    name: '',
    parentId: '',
    index: 0,
    style: {
        width: '400px',
        height: '300px'
    }
}


const LAYER_DEFAULT_OBJECT = {
    itemType: 'layer',
    name: '',
    index: 0,    
    backgroundColor: '',
    backgroundBlendMode: 'normal',
    parentId: '',
    mixBlendMode: 'normal',
    selected: true,
    visible: true,
    clipPathSvg: '',
    clipPathWidth: '',
    clipPathHeight: '',
    fitClipPathSize: false,
    style: {
        x: '0px',
        y: '0px',
        'background-blend-mode' : 'multiply',
        'mix-blend-mode': 'normal'
    },    
    filters: {}
}

const IMAGE_DEFAULT_OBJECT = {
    itemType: 'image',
    type: 'static',
    fileType: '',       // select file type as imagefile,  png, gif, jpg, svg if type is image 
    index: 0,    
    parentId: '',    
    angle: 90,
    color: 'red',
    radialType: 'circle',
    radialPosition: 'center',
    visible: true,
    isClipPath: false, 
    backgroundRepeat: null,
    backgroundSize: null,
    backgroundSizeWidth: 0,
    backgroundSizeHeight: 0,
    backgroundOrigin: null, 
    backgroundPositionX: 0,
    backgroundPositionY: 0,
    backgroundColor: null,
    backgroundAttachment: null,
    backgroundClip: null
}

const COLORSTEP_DEFAULT_OBJECT = {
    itemType: 'colorstep',
    parentId: '',
    percent: 0,
    color: 'rgba(0, 0, 0, 0)'
}

const gradientTypeList = ['linear', 'radial', 'conic']
const repeatingGradientTypeList = ['repeating-linear', 'repeating-radial', 'repeating-conic']
const conicList = ['conic', 'repeating-conic']

export const EDITOR_MODE_PAGE = 'page';
export const EDITOR_MODE_LAYER = 'layer-rect';
export const EDITOR_MODE_LAYER_BORDER = 'layer-border';
export const EDITOR_MODE_IMAGE = 'image'; 
export const EDITOR_MODE_IMAGE_LINEAR = 'image-linear'; 
export const EDITOR_MODE_IMAGE_RADIAL = 'image-radial'; 
export const EDITOR_MODE_IMAGE_STATIC = 'image-static'; 
export const EDITOR_MODE_IMAGE_IMAGE = 'image-image'; 


const isUndefined = (value) => {
    return typeof value == 'undefined' || value == null;
}

export default class ItemManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.items = {}
        this.$store.selectedId = '' 
        this.$store.selectedMode = 'board';
    }

    afterDispatch () {
        this.$store.emit('changeEditor')
    }

    '*/item/create/object' ($store, obj, defaultObj = {}) {
        obj = Object.assign({}, $store.read('/clone', defaultObj), obj);         
        obj.id = Date.now() + '-' + uuid();

        $store.items[obj.id] = obj;

        return obj.id; 
    }

    '*/item/create/page' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, PAGE_DEFAULT_OBJECT);
    }

    '*/item/create/layer' ($store, obj = {}) {
        return $store.read('/item/create/object', obj, LAYER_DEFAULT_OBJECT);
    }
    
    '*/item/create/image' ($store, obj = {}) {

        var imageId = $store.read('/item/create/object', obj, IMAGE_DEFAULT_OBJECT);

        if (obj.type == 'static') {
 
        } else if (obj.type == 'image') {

        } else if (gradientTypeList.includes(obj.type)) {

            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(0, 0, 0, 0)', percent: 0, index: 0});
            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(0, 0, 0, 1)', percent: 100, index: 100});
        } else if (repeatingGradientTypeList.includes(obj.type)) {
            if (conicList.includes(obj.type)) {
                $store.items[imageId].angle = 0; 
            }

            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(0, 0, 0, 0)', percent: 0, index: 0});
            $store.read('/item/create/colorstep', {parentId: imageId, color: 'rgba(0, 0, 0, 1)', percent: 10, index: 100});
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

    '*/item/current' ($store) {
        return $store.read('/item/get', $store.selectedId)
    }

    '*/item/current/page' ($store, callback) {
        var item = $store.read('/item/current')
        var path = $store.read('/item/path', item.id);

        var page = $store.read('/item/get', path[path.length-1])

        if (page) {
            if (typeof callback == 'function') callback(page);
            return page; 
        }

        return null; 
    }    


    '*/item/current/layer' ($store, callback) {
        var item = $store.read('/item/current')

        if (item.itemType == 'layer') {
            if (typeof callback == 'function') callback(item)
            return item; 
        } else if (item.itemType == 'image') {
            var layer = $store.read('/item/get', item.parentId);
            if (typeof callback == 'function') callback(layer)
            return layer
        }
        
        return null; 
    }    

    '*/item/is' ($store, itemType) {
        var item = $store.read('/item/current')

        return item.itemType == itemType 
    }

    '*/item/is/page' ($store) {
        return $store.read('/item/is', 'page');
    }

    '*/item/is/layer' ($store) {
        return $store.read('/item/is', 'layer');
    }    

    '*/item/is/image' ($store) {
        return $store.read('/item/is', 'image');
    }        

    '*/item/is/mode' ($store, mode, mode2) {
        return $store.selectedMode == mode || $store.selectedMode == mode2;
    }            

    '*/item/current/image' ($store, callback) {
        var item = $store.read('/item/current')

        if (item && item.itemType == 'image') {
            if (typeof callback == 'function') {
                callback(item);
            } 
            return item; 
        }

        return null; 
    }

    '*/item/keys' ($store) {
        return Object.keys($store.items)
    }

    '*/item/list' ($store, filterCallback) {
        var list = $store.read('/item/keys').filter(filterCallback)

        list.sort( (a, b) => {
            return $store.items[a].index > $store.items[b].index ? 1 : -1;
        })

        return list; 
    }

    '*/item/filter' ($store, filterCallback) {
        return $store.read('/item/list', filterCallback)
    }    

    '*/item/list/page' ($store) {
        return $store.read('/item/filter', function (id) {
            return $store.items[id].itemType == 'page'
        });
    } 

    '*/item/map/page' ($store, callback) {
        return $store.read('/item/filter', function (id) {
            return $store.items[id].itemType == 'page'
        }).map( (id, index) => {
            return callback($store.items[id], index)
        });
    }    

    '*/item/list/children' ($store, parentId) {
        return $store.read('/item/filter', function (id) {
            return $store.items[id].parentId == parentId
        });
    }

    '*/item/count/children' ($store, parentId) {
        return $store.read('/item/list/children', parentId).length;
    }    

    '*/item/map/children' ($store, parentId, callback = ((item) => item)) {
        return $store.read('/item/filter', function (id) {
            return $store.items[id].parentId == parentId
        }).map(function (id, index) { 
            return callback($store.items[id], index)
        });
    }    

    '*/item/filter/children' ($store, parentId, callback) {
        return $store.read('/item/filter', function (id) {
            return $store.items[id].parentId == parentId
        }).filter(function (id, index) { 
            return callback($store.items[id], index)
        });
    }        

    '*/item/each/children' ($store, parentId, callback) {
        return $store.read('/item/filter', function (id) {
            return $store.items[id].parentId == parentId
        }).forEach(function (id, index) { 
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


    '/item/remove' ($store, id) {
        if (id) {

            var item = $store.read('/item/get', id);

            if (item.parentId) {
                var list = $store.read('/item/list/children', item.parentId);
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
                $store.run('/item/select', nextSelectedId)
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
                        $store.run('/item/select', nextSelectedId)
                    }                        
                } else {
                    $store.run('/item/select', item.parentId)
                }
            }


            $store.items[id].index = NONE_INDEX;
            $store.read('/item/sort', id);

            if ($store.items[id].backgroundImage) {
                URL.revokeObjectURL($store.items[id].backgroundImage);
            }
            delete $store.items[id]
        }
    }

    '/item/remove/children' ($store, parentId) {
        $store.read('/item/each/children', parentId, (item) => {
            $store.run('/item/remove', item.id);
        })
    }

    '/item/select' ($store, selectedId = '') {
        $store.read('/item/keys').forEach(id => {

            var item = $store.items[id]

            if (item.itemType == 'colorstep') {
                // NOOP 
            } else {
                $store.items[id].selected = id === selectedId; 
            }

        })

        if (selectedId) {
            $store.items[selectedId].selectTime = Date.now();

            $store.selectedId = selectedId;
    
            $store.run('/item/select/mode', $store.items[selectedId].itemType);
        } else {
            $store.selectedId = selectedId
            $store.run('/item/select/mode', 'board');
        }

        var item = $store.items[$store.selectedId]

        if (item.itemType == 'image' && item.type == 'image') {
            $store.emit('selectImage');
        }
    }

    '/item/select/mode' ($store, mode, editMode) {
        $store.selectedMode = mode; 

        if (!editMode) {

            switch(mode) {
            case 'page': 
                editMode = EDITOR_MODE_PAGE;
                break; 
            case 'layer': 
                editMode = EDITOR_MODE_LAYER;
                break; 
            case 'image': 

                var item = $store.items[$store.selectedId];

                switch(item.type) {
                case 'linear':
                case 'repeating-linear':
                    editMode = EDITOR_MODE_IMAGE_LINEAR;    
                    break; 
                case 'radial':
                case 'repeating-radial':
                    editMode = EDITOR_MODE_IMAGE_RADIAL;    
                    break;                     
                case 'static':
                    editMode = EDITOR_MODE_IMAGE_STATIC;    
                    break;                                  
                case 'image':
                    editMode = EDITOR_MODE_IMAGE_IMAGE;    
                    break;
                }
                break; 
            }
        }


        $store.run('/item/select/editMode', editMode)
    }  

    '/item/select/editMode' ($store, editMode) {
        $store.editMode = editMode 
    }

    // 현재 기준으로 editMode 를 변경 
    '/item/switch/editMode' ($store) {

        switch ($store.editMode) {
        case EDITOR_MODE_LAYER: 
            $store.editMode = EDITOR_MODE_LAYER_BORDER;
            break; 
        case EDITOR_MODE_LAYER_BORDER:
            $store.editMode = EDITOR_MODE_LAYER;
            break;
        }

    }

    '/item/set' ($store, obj = {}, isSelected = false) {
        var id = obj.id; 
        $store.items[id] = Object.assign($store.clone('/item/get', id), obj);

        if (isSelected) $store.run('/item/select', id)
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
    '/item/load' ($store) { }  

    '/item/add' ($store, itemType, isSelected = false, parentId = '') {
        var id = $store.read('/item/create', itemType);
        var item = $store.read('/item/get', id);
        item.parentId = parentId; 

        if (item.itemType == 'layer') {
            var page = $store.read('/item/get', parentId);

            item.style = Object.assign(item.style, page.style)
        }

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
        item.type = 'image'; 
        item.parentId = parentId; 
        item.index = index;
        item.colors = img.colors;         
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth = '100%';

        $store.run('/item/set', item, isSelected);
        $store.run('/item/sort', id); 
    }     

    '/item/set/image/file' ($store, id, img) {
        var item = $store.read('/item/get', id);
        item.type = 'image'; 
        item.colors = img.colors;         
        item.fileType = img.fileType || 'svg';
        if (img.clipPathSvg) item.clipPathSvg = img.clipPathSvg; 
        if (img.clipPathSvgId) item.clipPathSvgId = img.clipPathSvgId; 
        item.backgroundImage = img.url;
        item.backgroundImageDataURI = img.datauri;
        item.backgroundSizeWidth = '100%';

        $store.run('/item/set', item);
    }         

    '/item/prepend/image/url' ($store, img, isSelected = false, parentId = '') {
        $store.run('/item/add/image/url', img, isSelected, parentId, -1);
    }         

    '/item/add/image/url' ($store, img, isSelected = false, parentId = '', index = Number.MAX_SAFE_INTEGER) {
        var id = $store.read('/item/create/image');
        var item = $store.read('/item/get', id);
        item.type = 'image'; 
        item.parentId = parentId; 
        item.index = index;
        item.colors = img.colors;         
        item.fileType = img.fileType;
        item.backgroundImage = img.url;
        item.backgroundSizeWidth = '100%';

        $store.run('/item/set', item, isSelected);
        $store.run('/item/sort', id); 
    }         

    '/item/add/page' ($store, isSelected = false) {
        var pageId = $store.read('/item/create', 'page');        
        var layerId = $store.read('/item/create', 'layer');
        var imageId = $store.read('/item/create', 'image');

        // 페이지 생성 
        var page = $store.read('/item/get', pageId);
        page.index = Number.MAX_SAFE_INTEGER;  
        $store.run('/item/set', page);

        // 레이어 생성 
        var layer = $store.read('/item/get', layerId);
        layer.parentId = pageId; 

        layer.style = Object.assign({}, layer.style, page.style)        
        $store.run('/item/set', layer);

        // 이미지 생성 
        var image = $store.read('/item/get', imageId);
        image.parentId = layerId; 
        $store.run('/item/set', image, isSelected);        
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
        }
    }

    '*/item/recover/image' ($store, image, parentId) {
        var newImageId = $store.read('/item/create/object', Object.assign({parentId}, image.image));
        image.colorsteps.forEach(step => {
            $store.read('/item/create/object', Object.assign({}, step, {parentId: newImageId}))
        })

        return newImageId;
    }

    '*/item/recover/layer' ($store, layer, parentId) {
        var newLayerId = $store.read('/item/create/object', Object.assign({parentId}, layer.layer));
        layer.images.forEach(image => {
            $store.read('/item/recover/image', image, newLayerId);
        })

        return newLayerId;
    }
 
    '*/item/recover/page' ($store, page) {
        var newPageId = $store.read('/item/create/object', page.page);
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

        if (item.parentId) {
            var list = $store.read('/item/list/children', item.parentId);
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

    '/item/set/parent' ($store, id, parentId) {
        $store.items[id] = Object.assign($store.clone('/item/get', id), { parentId });
    }    
}