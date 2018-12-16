import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { 
    EVENT_CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_EDITOR,
    EVENT_CHANGE_SELECTION
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class Text extends BasePropertyItem {
    template () {
        return `
            <div class='property-item text show'>
                <div class='title' ref="$title">Text</div>            
                <div class='items'>
                    <div>
                                          
                    </div>   
                </div>
            </div>
        `
    }  
}