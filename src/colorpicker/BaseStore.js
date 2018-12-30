import { debounce, isFunction } from "../util/functions/func";
import { ACTION_PREFIX, GETTER_PREFIX } from "../util/Store";

export const PREVENT = 'PREVENT'

export default class BaseStore {
    constructor (opt) {
        this.callbacks = [] 
        this.actions = []
        this.getters = []
        this.modules = opt.modules || []

        this.initialize()
    }

    initialize () {
        this.initializeModule();
    }

    initializeModule () {
        this.modules.forEach(ModuleClass => {
            var instance = this.addModule(ModuleClass);
        })
    } 

    action (action, context) {
        var actionName = action.substr(action.indexOf(ACTION_PREFIX) + ACTION_PREFIX.length) 
        this.actions[actionName] = { context, callback: context[action] };
    }

    getter (action, context) {
        var actionName = action.substr(action.indexOf(GETTER_PREFIX) + GETTER_PREFIX.length) 
        this.getters[actionName] = { context, callback: context[action] };
    }    

    dispatch (action, ...opts) {
        var m = this.actions[action];

        if (m) {
            var ret = this.run(action, ...opts);

            if (ret != PREVENT) {
                m.context.afterDispatch()
            }

        } else {
            throw new Error('action : ' + action + ' is not a valid.')
        }

    }

    run (action, ...opts) {
        var m = this.actions[action];

        if (m) { 
            m.callback.apply(m.context, [this, ...opts]); 
        } else {
            throw new Error('action : ' + action + ' is not a valid.')            
        }
    }    

    read (action, ...opts) {
        var m = this.getters[action];

        if (m) { 
            return m.callback.apply(m.context, [this, ...opts]); 
        } else {
            throw new Error('getter : ' + action + ' is not a valid.')            
        }
    }

    clone (action, ...opts) {
        return JSON.parse(JSON.stringify(this.read(action, ...opts)))
    }

    addModule (ModuleClass) {
        return new ModuleClass(this)
    }

    on (event, originalCallback, context, delay = 0) {
        var callback = delay > 0 ? debounce(originalCallback, delay) : originalCallback;
        this.callbacks.push({ event, callback, context, originalCallback })
    }

    off (event, originalCallback) {

        if (arguments.length == 0) {
            this.callbacks = [] 
        } else if (arguments.length == 1) {
            this.callbacks = this.callbacks.filter(f => {
                return f.event != event 
            })
        } else if (arguments.length == 2) {
            this.callbacks = this.callbacks.filter(f => {
                return !(f.event == event && f.originalCallback == originalCallback)
            })
        }

    }

    emit () {
        var args = [...arguments];
        var event = args.shift();

        this.callbacks.filter(f => {
            return (f.event == event)
        }).forEach(f => {
            if (f && isFunction(f.callback) && f.context.source != this.source) {
                f.callback(...args);
            }
        })
    }    
}