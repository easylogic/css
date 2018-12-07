import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_EDITOR } from "../types/event";
import { parseParamNumber } from "../../util/filter/functions";

export default class OrderingManager extends BaseModule {

    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }

    vertical ($store) {

    }

    horizontal ($store) {

    }

    left ($store) {
        var items = $store.read('/selection/current');
        var x = Math.min(...items.map(item => {
            return parseParamNumber(item.x)
        }));

        items.forEach(item => {
            var newX = x + 'px'
            $store.run('/item/set', {id: item.id, x: newX})
        })
    }

    center ($store) {
        var items = $store.read('/selection/current');
        
        var x = Math.min(...items.map(item => {
            return parseParamNumber(item.x)
        }));

        var x2 = Math.max(...items.map(item => {
            return parseParamNumber(item.x) + parseParamNumber(item.width);
        }));

        var centerX = x + Math.floor((x2 - x)/2)

        items.forEach(item => {
            var newX = Math.floor(centerX - parseParamNumber(item.width)/2) + 'px';
            $store.run('/item/set', {id: item.id, x: newX })
        })
    }

    right ($store) {
        var items = $store.read('/selection/current');
        
        var x2 = Math.max(...items.map(item => {
            return parseParamNumber(item.x) + parseParamNumber(item.width);
        }));

        items.forEach(item => {
            var newX = (x2 - parseParamNumber(item.width)) + 'px';
            $store.run('/item/set', {id: item.id, x: newX })
        })
    }

    top ($store) {
        var items = $store.read('/selection/current');
        var y = Math.min(...items.map(item => {
            return parseParamNumber(item.y)
        }));

        items.forEach(item => {
            var newY = y + 'px'
            $store.run('/item/set', {id: item.id, y: newY})
        })
    }

    middle ($store) {
        var items = $store.read('/selection/current');
        
        var y = Math.min(...items.map(item => {
            return parseParamNumber(item.y)
        }));

        var y2 = Math.max(...items.map(item => {
            return parseParamNumber(item.y) + parseParamNumber(item.height);
        }));

        var centerY = y + (y2 - y)/2

        items.forEach(item => {
            var newY = Math.floor(centerY  - parseParamNumber(item.height)/2) + 'px';
            $store.run('/item/set', {id: item.id, y: newY })
        })
    }

    bottom ($store) {
        var items = $store.read('/selection/current');
        
        var y2 = Math.max(...items.map(item => {
            return parseParamNumber(item.y) + parseParamNumber(item.height);
        }));

        items.forEach(item => {
            var newY = (y2 - parseParamNumber(item.height)) + 'px';
            $store.run('/item/set', {id: item.id, y: newY })
        })
    }

    vertical ($store) {
        
    }

    '/ordering/type' ($store, type) {
        if (this[type]) {
            this[type].call(this, $store);
        }
    }

}