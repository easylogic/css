import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER, CHANGE_EDITOR } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";
import { EVENT } from "../../../../../util/UIElement";
import { EMPTY_STRING } from "../../../../../util/css/types";
import { editor } from "../../../../../editor/editor";

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
        var item = editor.selection.layer;
        
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
        var layer = editor.selection.layer;
        if (layer) {
            layer.name = this.refs.$name.val()
            this.commit(CHANGE_LAYER , layer);
        }
    }

    [INPUT('$class')] () {
        var layer = editor.selection.layer;
        if (layer) {
            layer.className = this.refs.$class.val()
            editor.send(CHANGE_LAYER, layer);
        }
    }    

    [INPUT('$id')] () {
        var layer = editor.selection.layer;
        if (layer) {
            layer.idString = this.refs.$id.val()
            editor.send(CHANGE_LAYER , layer);
        }
    }        
}