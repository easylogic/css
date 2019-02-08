import BaseModule from "../../colorpicker/BaseModule";
import { ACTION, GETTER } from "../../util/Store";
import { HOTKEY_EXISTS, HOTKEY_RUN, HOTKEY_EXECUTE, HOTKEY_EXCLUDE } from "../types/HotkeyTypes";
import { isFunction } from "../../util/functions/func";

const KEY_SPLIT = '+'
const KEY_CTRL = 'ctrl'
const KEY_SHIFT = 'shift'
const KEY_ALT = 'alt'
const KEY_META = 'meta'

let hotKeys = [
    { key: 'alt+ArrowUp',   command: 'item/move/y', args: [-5] },
    { key: 'shift+alt+ArrowUp',   command: 'item/move/y', args: [-10] },
    { key: 'ArrowUp',       command: 'item/move/y', args: [-1] },
    { key: 'alt+ArrowDown', command: 'item/move/y', args: [5] },
    { key: 'ArrowDown',     command: 'item/move/y', args: [1] },
    { key: 'alt+ArrowRight', command: 'item/move/x', args: [5] },
    { key: 'ArrowRight',    command: 'item/move/x', args: [1] },
    { key: 'alt+ArrowLeft', command: 'item/move/x', args: [-5] },
    { key: 'ArrowLeft',     command: 'item/move/x', args: [-1] },
    { key: 'shift+a',       command: ($store, ...args) => {
        // console.log($store, args); 
    }, args: [1, 2, 3]}
]

const getKeyType = (it) => {
    if (it.toLowerCase() === KEY_CTRL) return KEY_CTRL
    if (it.toLowerCase() === KEY_ALT) return KEY_ALT
    if (it.toLowerCase() === KEY_SHIFT) return KEY_SHIFT
    if (it.toLowerCase() === 'meta') return KEY_META

    return it; 
}

hotKeys = hotKeys.map(it =>{
    var obj = {};

    it.key.split(KEY_SPLIT).forEach(key => {
        var type = getKeyType(key);
        switch(type) {
        case KEY_CTRL:
        case KEY_ALT:
        case KEY_SHIFT:
        case KEY_META:
            obj[type] = true; 
            break;
        default: 
            obj[''] = type; 
        }

    })

    var arr = []

    if (obj[KEY_CTRL]) { arr.push(KEY_CTRL); }
    if (obj[KEY_ALT]) { arr.push(KEY_ALT); }
    if (obj[KEY_SHIFT]) { arr.push(KEY_SHIFT); }
    if (obj[KEY_META]) { arr.push(KEY_META); }
    if (obj['']) { arr.push(obj['']); } 

    it.key = arr.join(KEY_SPLIT)

    return it; 
})

export default class HotkeyManager extends BaseModule {
   
    makeKeydownString (e) {
        var keyStrings = [];

        var arr = []

        if (e.ctrlKey) { arr.push(KEY_CTRL); }
        if (e.altKey) { arr.push(KEY_ALT); }
        if (e.shiftKey) { arr.push(KEY_SHIFT); }
        if (e.metaKey) { arr.push(KEY_META); }
        arr.push(e.keyCode);        // key code number check 

        keyStrings.push(arr.join(KEY_SPLIT));

        arr[arr.length-1] = e.key; // key string check 

        keyStrings.push(arr.join(KEY_SPLIT));

        return keyStrings;
    }

    checkKey (key, e) {
        return this.makeKeydownString(e).includes(key);
    }

    [GETTER(HOTKEY_EXISTS)] ($store, e) {
        return hotKeys.filter( command => {
            return this.checkKey(command.key, e);
        })
    }

    [ACTION(HOTKEY_RUN)] ($store, hotkey) {

        if (hotkey) {
            if (isFunction(hotkey.command)) {
                hotkey.command.call(null, $store, ...hotkey.args);
            } else {
                $store.dispatch(hotkey.command, ...hotkey.args);
            }

        }

    }

    [GETTER(HOTKEY_EXCLUDE)] ($store, e) {

        switch(e.target.nodeName) {
            case 'INPUT':
            case 'SELECT':
            case 'TEXTAREA':
                return true; 
            default: 
                break; 
        }

        return false;
        
    }

    [ACTION(HOTKEY_EXECUTE)] ($store, e) {
        if ($store.read(HOTKEY_EXCLUDE, e)) {
            return; 
        }

        var keys = $store.read(HOTKEY_EXISTS, e);

        if (keys.length) {
            e.preventDefault();
            keys.forEach(it => {
                $store.run(HOTKEY_RUN, it);
            })
        }
    }
}