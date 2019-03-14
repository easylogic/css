import { Config } from "./Config";
import { Selection } from "./Selection";
import { uuidShort } from "../util/functions/math";

const items = new Map();


function traverse (item, results, parentId) {
    var newItem = item.clone(true)
    newItem.parentId = parentId; 
    results.push(newItem);

    item.children.forEach(child => {
        traverse(child, results, newItem.id);
    })
}

function tree (id) {
    var item = editor.get(id)
    var newItem = item.clone(true)
    var results = [newItem] 
    
    item.children.forEach(item => {
        traverse(item, results, newItem.id);
    })

    return results
}

export const EDITOR_ID = '';
export const editor = new class {

    constructor () {
        this.config = new Config(this); 
        this.selection = new Selection(this)
    }

    setStore($store) {
        this.$store = $store;
    }

    send (...args) {
        this.emit(...args)
    }

    emit (...args) {
        if (this.$store) {
            this.$store.source = 'EDITOR_ID' ; 
            this.$store.emit(...args);
        }
    }    

    /**
     * add Project
     * 
     * @param {Project} project 
     */
    addProject(project) {
        return this.add(EDITOR_ID, project);
    }

    filter (itemType) {
        var results = [] 
        for (const [id, item] of items) {
            if (item.itemType === itemType) {
                results[results.length] = item; 
            }
        }
        return results;
    }

    /**
     * get project list 
     */
    get projects () { return this.filter('project')}
    get artboards () { return this.filter('artboard')}    
    get layers () { return this.filter('layer') }
    get groups () { return this.filter('group') }    

    /**
     * add item 
     * 
     * @param {string} parentId 
     * @param {Item} item 
     * @return {Item} 
     */
    add (parentId, item) {
        item.parentId = parentId 
        items.set(item.id, item)

        this.sort(item.itemType);

        return item; 
    }

    /**
     * remove Item  with all children 
     * 
     * @param {string} id 
     */
    remove (id, isDeleteChildren = true) {

        if (isDeleteChildren) this.removeChildren(id);

        items.delete(id);
    }

    copy (id) {
        var data = tree(id, uuidShort());

        data.forEach(it => {
            this.set(it.id, it);
        })

        if (data.length) {
            data[0].index = data[0].index + 1; 
            data[0].parent().sort();            
        }

        return data; 
    }

    clear () {
        items.clear()
    }

    get all () {
        return items;
    }

    /**
     * remove all children 
     * 
     * @param {string} parentId 
     */
    removeChildren (parentId = EDITOR_ID, parentObject) {

        var children = [] 

        if (parentId == EDITOR_ID) {
            children = this.projects
        } else {
            var parent = this.get(parentId)
            if (parent) {
                children = parent.children
            } else if(parentObject) {
                children = parentObject.children
            }
        }

        if (children.length ) {
            children.forEach(child => {
                this.removeChildren(child.id);
                this.remove(child.id);
            });
        }
    }

    /**
     * get item 
     * 
     * @param {String} key 
     */
    get (key)  {
        return items.get(key);
    }

    /**
     * set Item 
     * 
     * @param {string} key 
     * @param {Item} value 
     */
    set (key, value) {
        items.set(key,value); 
    }

    /**
     * check item id 
     * 
     * @param {string|Item} key 
     */
    has (key) {
        return items.has(key);
    }

    /**
     * get children by searchObj  
     * 
     * @param {object} searchObj 
     */
    search (searchObj) {
        var keys = Object.keys(searchObj);
        var results = []

        for(const [id, item] of items) {
            var isItem = keys.every(searchField => searchObj[searchField] === item[searchField]);
            if (isItem) {
                results[results.length] = item;
            }
        }

        results.sort( (a, b) => {
            return a.index > b.index ? 1 : -1; 
        })

        return results;
    }

    sort (itemType) {

        var children = []
        
        if (itemType === 'project') children = this.projects;
        
        children.sort( (a, b) => {
            if (a.index === b.index) return 0; 
            return a.index > b.index ? 1: -1; 
        });

        children.forEach( (it, index) => {
            it.index = index * 100; 
        })

    }

    /**
     * get children 
     * 
     * @param {string} parentId 
     */
    children (parentId) {
        var results = [] 
        for (const [id, item] of items) {
            
            if (item.parentId === parentId) {
                results[results.length] = item; 
            }
        }
        return results;
    }
}
