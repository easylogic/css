import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_EDITOR } from "../types/event";
import { unitValue, pxUnit } from "../../util/css/types";
import { ACTION } from "../../util/Store";

export default class OrderingManager extends BaseModule {

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    vertical ($store) {

    }

    horizontal ($store) {

    }

    left ($store) {
        var items = $store.read('selection/current');
        var x = Math.min(...items.map(item => {
            return unitValue(item.x)
        }));

        items.forEach(item => {
            $store.run('item/set', {id: item.id, x: pxUnit(x)})
        })
    }

    center ($store) {
        var items = $store.read('selection/current');
        
        var x = Math.min(...items.map(item => {
            return unitValue(item.x)
        }));

        var x2 = Math.max(...items.map(item => {
            return unitValue(item.x) + unitValue(item.width);
        }));

        var centerX = x + Math.floor((x2 - x)/2)

        items.forEach(item => {
            var newX = pxUnit(Math.floor(centerX - unitValue(item.width)/2));
            $store.run('item/set', {id: item.id, x: newX })
        })
    }

    right ($store) {
        var items = $store.read('selection/current');
        
        var x2 = Math.max(...items.map(item => {
            return unitValue(item.x) + unitValue(item.width);
        }));

        items.forEach(item => {
            var newX = pxUnit(x2 - unitValue(item.width));
            $store.run('item/set', {id: item.id, x: newX })
        })
    }

    top ($store) {
        var items = $store.read('selection/current');
        var y = Math.min(...items.map(item => {
            return unitValue(item.y)
        }));

        items.forEach(item => {
            $store.run('item/set', {id: item.id, y: pxUnit(y)})
        })
    }

    middle ($store) {
        var items = $store.read('selection/current');
        
        var y = Math.min(...items.map(item => {
            return unitValue(item.y)
        }));

        var y2 = Math.max(...items.map(item => {
            return unitValue(item.y) + unitValue(item.height);
        }));

        var centerY = y + (y2 - y)/2

        items.forEach(item => {
            var newY = pxUnit(Math.floor(centerY  - unitValue(item.height)/2));
            $store.run('item/set', {id: item.id, y: newY })
        })
    }

    bottom ($store) {
        var items = $store.read('selection/current');
        
        var y2 = Math.max(...items.map(item => {
            return unitValue(item.y) + unitValue(item.height);
        }));

        items.forEach(item => {
            var newY = pxUnit(y2 - unitValue(item.height));
            $store.run('item/set', {id: item.id, y: newY })
        })
    }

    '/ordering/type' ($store, type) {
        if (this[type]) {
            this[type].call(this, $store);
        }
    }

    forward ($store) {
        $store.read('selection/current/layer/id', id => {
            $store.run('item/move/next', id) 
        })                     
    }

    backward ($store) {
        $store.read('selection/current/layer/id', id => {
            $store.run('item/move/prev', id) 
        })           
    }
    
    front ($store) {
        $store.read('selection/current/layer/id', id => {
            $store.run('item/move/last', id) 
        })
    }
    
    back ($store) {
        $store.read('selection/current/layer/id', id => {
            $store.run('item/move/first', id) 
        })                

    }    


    [ACTION('ordering/index')] ($store, type) {
        if (this[type]) {
            this[type].call(this, $store);
        }
    }

}