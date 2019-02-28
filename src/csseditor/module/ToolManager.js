
import { isFunction, isUndefined, clone } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { EMPTY_STRING } from "../../util/css/types";
import { 
    TOOL_GET, 
    TOOL_SET, 
    TOOL_TOGGLE, 
    TOOL_SAVE_DATA, 
    TOOL_RESTORE_DATA 
} from "../types/ToolTypes";
import { CHANGE_TOOL } from "../types/event";
import BaseModule from "../../util/BaseModule";

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
            'guide.position': true,
            'timeline.time.format': 'default',  // default: 1s, time:  00:00:00.000s
            'timeline.1ms.width.original': 0.3,
            'timeline.1ms.width': 0.3,
            'timeline.scroll.left': 0,
            'timeline.keyframe.width': 0,
            'timeline.keyframe.rect': {},
            'timeline.cursor.time': 0,
            'timeline.keyframe.selectedId': EMPTY_STRING,
            'timeline.keyframe.selectedType': EMPTY_STRING,
        }

        this.$store.toolStack = []
    } 

    [GETTER(TOOL_GET)] ($store, key, defaultValue) {
        return isUndefined($store.tool[key]) ? defaultValue : $store.tool[key]
    }    

    [ACTION(TOOL_SET)] ($store, key, value) {
        $store.tool[key] = value

        $store.emit(CHANGE_TOOL, key, value)
    }


    [ACTION(TOOL_TOGGLE)] ($store, key, isForce) {
        if (isFunction(isForce)) {
            $store.tool[key] = !$store.tool[key]
        } else {
            $store.tool[key] = isForce
        }

        $store.emit(CHANGE_TOOL)
    }

    [ACTION(TOOL_SAVE_DATA)] ($store) {
        $store.toolStack.push({
            items: clone($store.items),
            itemKeys: clone($store.itemKeys)
        })
    }

    [ACTION(TOOL_RESTORE_DATA)] ($store) {
        var obj = $store.toolStack.pop();

        $store.items = obj.items; 
        $store.itemKeys = obj.itemKeys;

        $store.emit(CHANGE_EDITOR);
    }

}