import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER_NAME, CHANGE_EDITOR } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";
import { EVENT } from "../../../../../util/UIElement";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT } from "../../../../types/SelectionTypes";
import { EMPTY_STRING } from "../../../../../util/css/types";

export default class Name extends BasePropertyItem {
    template () {
        return `
            <div class='property-item name show'>
                <div class='items'>            
                    <div>
                        <label>Name</label>
                        <div><input type='text' ref="$name" class='full'></div>
                    </div>
                    <div>
                        <label>ID</label>
                        <div><input type='text' ref="$id" class='full'></div>
                    </div>                                        
                    <div>
                        <label>Class</label>
                        <div><input type='text' ref="$class" class='full'></div>
                    </div>                    
                </div>
            </div>
        `
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh()
    }

    refresh() {
        var item = this.read(SELECTION_CURRENT);

        if (!item.length) return;

        item = item[0];
        
        var name = EMPTY_STRING;
        var idString = EMPTY_STRING;
        var className = EMPTY_STRING; 
        if (item) {
            name = item.name ; 
            idString = item.idString || EMPTY_STRING;
            className = item.className || EMPTY_STRING;
        }

        this.refs.$name.val(name)
        this.refs.$id.val(idString)
        this.refs.$class.val(className)
    }

    [INPUT('$name')] () {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_NAME , {id, name: this.refs.$name.val()});
        });
    }

    [INPUT('$class')] () {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_NAME , {id, className: this.refs.$class.val()});
        });        
    }    

    [INPUT('$id')] () {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_NAME , {id, idString: this.refs.$id.val()});
        });          
    }        
}