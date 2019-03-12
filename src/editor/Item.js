import { uuidShort, uuid } from "../util/functions/math";
import { isFunction, isUndefined, isNotUndefined } from "../util/functions/func";
import { editor } from "./editor";
import Dom from "../util/Dom";
import { Length } from "./unit/Length";

export class Item {

    constructor (json = {}) {
        this.json = this.convert({...this.getDefaultObject(), ...json})

        return new Proxy(this, {
            get: (target, key) => {
                var originMethod = target[key];
                if (isFunction(originMethod)) { // method tracking
                    return (...args) => {
                        return originMethod.apply(target, args);
                    }
                } else {
                    // getter or json property 
                    return originMethod || target.json[key]
                }
            },
            set: (target, key, value) => {

                // Dom 객체가 오면 자동으로 입력 해줌 
                if (value instanceof Dom) {
                    value = value.realVal()
                }

                if (this.checkField(key, value)) {
                    target.json[key] = value 
                } else {
                    throw new Error(`${value} is invalid as ${key} property value.`)
                }

                return true; 
            }
        })
    }

    getDefaultTitle () { return 'Item' }

    /**
     * getter .name
     */
    get title () {
        return `${this.json.name || this.getDefaultTitle()}`
    }    

    /**
     * check attribute object 
     */
    isAttribute () {
        return false; 
    }

    /**
     * when json is loaded, json object is be a new instance 
     * 
     * @param {*} json 
     */
    convert (json) {
        if (isUndefined(json.id)) {
            json.id = uuidShort();
        }
        return json; 
    }

    /**
     * defence to set invalid key-value  
     * 
     * @param {*} key 
     * @param {*} value 
     */
    checkField(key, value) {
        return true; 
    }

    /**
     * search children by searchObj
     * 
     * @param {*} searchObj 
     */
    search (searchObj = {}) {
        return editor.search({parentId: this.id, ...searchObj});
    }

    one (searchObj) {
        return this.search(searchObj)[0]
    }

    /**
     * clone Item 
     */
    clone (isNew = false) {
        var json = JSON.parse(JSON.stringify(this.json));
        if (isNew) json.id = undefined;

        var ItemClass = this.constructor

        return new ItemClass(json);
    }

    addItem (itemType , item, sortType) {
        if (item.itemType != itemType) {
            throw new Error(`Only ${itemType} is able to add in ${this.json.type}`);
        }

        var newItem = editor.add(this.id, item);

        if (isUndefined(sortType)) {
            this.sort()
        } else {
            this.sort(sortType)
        }

        return newItem; 
    }    

    add (item) {
        return this.addItem(item.itemType, item, item.itemType);
    }

    reset (obj) {
        this.json = this.convert({...this.json, ...obj})
    }
    
    select() { 
        editor.selection.select(this.id) 
    }

    moveTo (x, y) {
        this.json.x.set(x);
        this.json.y.set(y);
    }

    moveBy (dx, dy) {
        this.json.x.set( (+this.json.x) + dx);
        this.json.y.set( (+this.json.y) + dy);
    }

    get screenX () { return this.json.x }
    set screenX (newX) { this.json.x.set(newX); }

    get screenY () { return this.json.y }
    set screenY (newY) { this.json.y.set(newY); }

    get screenX2 () { return Length.px(this.screenX.value + this.json.width.value) }
    get screenY2 () { return Length.px(this.screenY.value + this.json.height.value) }    
    get centerX () { return Length.px(this.screenX.value + Math.floor(this.json.width.value / 2)) }
    get centerY () { return Length.px(this.screenY.value + Math.floor(this.json.height.value / 2)) }    

    get selected () { 
        return editor.selection.check(this.id); 
    }

    get selectedOne () {
        return editor.selection.checkOne(this.id);
    }

    get id() { return this.json.id; }
    get parentId () { return this.json.parentId }
    get children () { 
        var children = editor.children(this.id) 
        children.sort( (a, b) => {
            if (a.index === b.index) return 0;

            return a.index > b.index ? 1 : -1; 
        })
        return children;
    }
    get childrenIds() { return editor.childrenIds(this.id); }

    getDefaultObject (obj = {}) {
        return {
            id: uuidShort(),
            index: Number.MAX_SAFE_INTEGER,
            visible: true,
            lock: false,
            ...obj
        }
    }

    toggle (field, toggleValue) {
        if (isUndefined(toggleValue)) {
            this.json[field] = !this.json[field]
        } else {
            this.json[field] = !!toggleValue;
        }
    }

    toJSON () {
        return this.json;
    }

    remove () {
        editor.remove(this.id);
    }

    clear(itemType) {

        if (isNotUndefined(itemType)) {
            this.search({itemType}).forEach(c => c.remove())
        }else {
            editor.removeChildren(this.id, this)
        }

    } 

    parent () {
        return editor.get(this.parentId)
    }

    sort (itemType) {
        var children = this.children;

        if (itemType) {
            children = children.filter(it => it.itemType === itemType)
        }
        
        children.sort( (a, b) => {
            if (a.index === b.index) return 0; 
            return a.index > b.index ? 1: -1; 
        });

        children.forEach( (it, index) => {
            it.index = index * 100; 
        })

    }

    copy () {
        return editor.copy(this.id) 
    }

    insertLast (source) {

        var selfParent = this.parent();
        var sourceParent = source.parent();

        source.parentId = this.json.parentId;
        source.index = this.json.index + 1; 

        selfParent.sort()
        sourceParent.sort();
    }

    moveLast() {
        this.json.index = Number.MAX_SAFE_INTEGER;
        this.parent().sort(this.itemType);
    }

    moveFirst() {
        this.json.index = -1;
        this.parent().sort(this.itemType);
    }    

    moveNext() {
        this.json.index += 101;
        this.parent().sort(this.itemType);
    }

    movePrev() {
        this.json.index -= 101; 
        this.parent().sort(this.itemType);
    }


    path () {
        var path = [];
        var currentId = this.id; 
        do {
            var item = editor.get(currentId);
            path.push(item);
            currentId = item.parentId
        } while(currentId);

        return path;
    }


    checkInArea (area) {

        if (area.width.value === 0) {return false; }
        if (area.height.value === 0) {return false; } 
        if (area.x2.value < this.screenX.value) { return false; }
        if (area.y2.value < this.screenY.value) { return false; }
        if (area.x.value > this.screenX2.value) { return false; }
        if (area.y.value > this.screenY2.value) { return false; }

        return true;
    }

    toBoundCSS() {
        return {
            top: this.json.y,
            left: this.json.x,
            width: this.json.width,
            height: this.json.height
        }
    }
}