import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_EDITOR } from "../types/event";
import { unitValue, pxUnit } from "../../util/css/types";
import { ACTION } from "../../util/Store";
import { ITEM_SET } from "./ItemTypes";
import { SELECTION_UNIT_VALUES, SELECTION_CURRENT, SELECTION_CURRENT_LAYER_ID } from "./SelectionTypes";

export default class OrderingManager extends BaseModule {

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    horizontal ($store) {
        var items = $store.read(SELECTION_UNIT_VALUES);

        var x = Number.MAX_SAFE_INTEGER;
        var xItem = null; 

        var x2 = Number.MIN_SAFE_INTEGER;
        var x2Item = null; 

        items.forEach(item => {

            if (x > item.x) {
                x = item.x; 
                xItem = item;
            } else if (x2 < item.x2) {
                x2 = item.x2;                 
                x2Item = item;
            }
        });

        var count = items.length - 2; 
        var tempIds = [ xItem.id, x2Item.id ]

        if (count > 0) {
            var restItems = items.filter(it => {
                return !tempIds.includes(it.id)
            })

            restItems.sort( (a, b) => {
                if (a.centerX == b.centerX) return 0; 
                return a.centerX > b.centerX ? 1 : -1; 
            })

            var startX = xItem.centerX;
            var endX = x2Item.centerX;            
            var unitWidth = (endX - startX) / (count+1);

            restItems.forEach((item, index) => {
                item.centerX = startX + (index + 1) * unitWidth;
                item.x = item.centerX - (item.width/2)

                $store.run(ITEM_SET, {id: item.id, x: pxUnit(item.x)})
            })
        }

    }

    vertical ($store) {
        var items = $store.read(SELECTION_UNIT_VALUES);

        var y = Number.MAX_SAFE_INTEGER;
        var yItem = null; 

        var y2 = Number.MIN_SAFE_INTEGER;
        var y2Item = null; 

        items.forEach(item => {

            if (y > item.y) {
                y = item.y; 
                yItem = item;
            } else if (y2 < item.y2) {
                y2 = item.y2;                 
                y2Item = item;
            }
        });

        var count = items.length - 2; 
        var tempIds = [ yItem.id, y2Item.id ]

        if (count > 0) {
            var restItems = items.filter(it => {
                return !tempIds.includes(it.id)
            })

            restItems.sort( (a, b) => {
                if (a.centerY == b.centerY) return 0; 
                return a.centerY > b.centerY ? 1 : -1; 
            })

            var startY = yItem.centerY;
            var endY = y2Item.centerY;            
            var unitHeight = (endY - startY) / (count+1);

            restItems.forEach((item, index) => {
                item.centerY = startY + (index + 1) * unitHeight;
                item.y = item.centerY - (item.height/2)

                $store.run(ITEM_SET, {id: item.id, y: pxUnit(item.y)})
            })
        }

    }

    left ($store) {
        var items = $store.read(SELECTION_CURRENT);
        var x = Math.min(...items.map(item => {
            return unitValue(item.x)
        }));

        items.forEach(item => {
            $store.run(ITEM_SET, {id: item.id, x: pxUnit(x)})
        })
    }

    center ($store) {
        var items = $store.read(SELECTION_CURRENT);
        
        var x = Math.min(...items.map(item => {
            return unitValue(item.x)
        }));

        var x2 = Math.max(...items.map(item => {
            return unitValue(item.x) + unitValue(item.width);
        }));

        var centerX = x + Math.floor((x2 - x)/2)

        items.forEach(item => {
            var newX = pxUnit(Math.floor(centerX - unitValue(item.width)/2));
            $store.run(ITEM_SET, {id: item.id, x: newX })
        })
    }

    right ($store) {
        var items = $store.read(SELECTION_CURRENT);
        
        var x2 = Math.max(...items.map(item => {
            return unitValue(item.x) + unitValue(item.width);
        }));

        items.forEach(item => {
            var newX = pxUnit(x2 - unitValue(item.width));
            $store.run(ITEM_SET, {id: item.id, x: newX })
        })
    }

    top ($store) {
        var items = $store.read(SELECTION_CURRENT);
        var y = Math.min(...items.map(item => {
            return unitValue(item.y)
        }));

        items.forEach(item => {
            $store.run(ITEM_SET, {id: item.id, y: pxUnit(y)})
        })
    }

    middle ($store) {
        var items = $store.read(SELECTION_CURRENT);
        
        var y = Math.min(...items.map(item => {
            return unitValue(item.y)
        }));

        var y2 = Math.max(...items.map(item => {
            return unitValue(item.y) + unitValue(item.height);
        }));

        var centerY = y + (y2 - y)/2

        items.forEach(item => {
            var newY = pxUnit(Math.floor(centerY  - unitValue(item.height)/2));
            $store.run(ITEM_SET, {id: item.id, y: newY })
        })
    }

    bottom ($store) {
        var items = $store.read(SELECTION_CURRENT);
        
        var y2 = Math.max(...items.map(item => {
            return unitValue(item.y) + unitValue(item.height);
        }));

        items.forEach(item => {
            var newY = pxUnit(y2 - unitValue(item.height));
            $store.run(ITEM_SET, {id: item.id, y: newY })
        })
    }

    '/ordering/type' ($store, type) {
        if (this[type]) {
            this[type].call(this, $store);
        }
    }

    forward ($store) {
        $store.read(SELECTION_CURRENT_LAYER_ID, id => {
            $store.run('item/move/next', id) 
        })                     
    }

    backward ($store) {
        $store.read(SELECTION_CURRENT_LAYER_ID, id => {
            $store.run('item/move/prev', id) 
        })           
    }
    
    front ($store) {
        $store.read(SELECTION_CURRENT_LAYER_ID, id => {
            $store.run('item/move/last', id) 
        })
    }
    
    back ($store) {
        $store.read(SELECTION_CURRENT_LAYER_ID, id => {
            $store.run('item/move/first', id) 
        })                

    }    


    [ACTION('ordering/index')] ($store, type) {
        if (this[type]) {
            this[type].call(this, $store);
        }
    }

}