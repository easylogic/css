import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER_NAME, EVENT_CHANGE_EDITOR } from "../../../../types/event";
import { INPUT } from "../../../../../util/Event";

export default class Name extends BasePropertyItem {
    template () {
        return `
            <div class='property-item name show'>
                <div class='title' ref="$title">Properties</div>   
                <div class='items'>            
                    <div>
                        <label>Name</label>
                        <div>
                            <input type='text' ref="$name" class='full'> 
                        </div>
                    </div>
                    <div>
                        <label>ID</label>
                        <div>
                            <input type='text' ref="$id" class='full'> 
                        </div>
                    </div>                                        
                    <div>
                        <label>Class</label>
                        <div>
                            <input type='text' ref="$class" class='full'> 
                        </div>
                    </div>                    
                </div>
            </div>
        `
    }

    [EVENT_CHANGE_EDITOR] () {
        this.refresh()
    }

    refresh() {
        var item = this.read('selection/current');

        if (!item.length) return;

        item = item[0];
        
        var name = '';
        var idString = '';
        var className = ''; 
        if (item) {
            name = item.name ; 
            idString = item.idString || '';
            className = item.className || '';
        }

        this.refs.$name.val(name)
        this.refs.$id.val(idString)
        this.refs.$class.val(className)
    }

    [INPUT('$name')] () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_NAME , {id, name: this.refs.$name.val()});
        });
    }

    [INPUT('$class')] () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_NAME , {id, className: this.refs.$class.val()});
        });        
    }    

    [INPUT('$id')] () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_NAME , {id, idString: this.refs.$id.val()});
        });          
    }        
}