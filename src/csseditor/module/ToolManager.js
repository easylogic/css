import BaseModule from "../../colorpicker/BaseModule";
import { isFunction, isUndefined } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { EMPTY_STRING } from "../../util/css/types";

export default class ToolManager extends BaseModule {

    initialize () {        
        super.initialize()

        this.$store.tool = {
            color : EMPTY_STRING,
            colorSource : EMPTY_STRING,
            'show.grid': false,
            'snap.grid': false,
            'guide.only': false,            
            'guide.angle': true,
            'guide.position': true
        }
    } 

    [GETTER('clone')] ($store, object) {
        return JSON.parse(JSON.stringify(object))
    }

    [GETTER('tool/colorSource')] ($store) {
        return $store.tool.colorSource
    }

    [GETTER('tool/get')] ($store, key, defaultValue) {
        return isUndefined($store.tool[key]) ? defaultValue : $store.tool[key]
    }    

    [ACTION('tool/setColorSource')] ($store, colorSource) {
        $store.tool.colorSource = colorSource;
    }

    [ACTION('tool/changeColor')] ($store, color) {
        $store.tool.color = color 

        $store.emit('changeColor')
    }


    [ACTION('tool/set')] ($store, key, value) {
        $store.tool[key] = value

        $store.emit('changeTool')
    }


    [ACTION('tool/toggle')] ($store, key, isForce) {
        if (isFunction(isForce)) {
            $store.tool[key] = !$store.tool[key]
        } else {
            $store.tool[key] = isForce
        }

        $store.emit('changeTool')
    }

}