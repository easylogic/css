import EventMachin from "../util/EventMachin";
import { uuid } from '../util/functions/math'
import { ITEM_SET } from "../csseditor/module/ItemTypes";

// const CHECK_STORE_PATTERN = /^@/
const CHECK_STORE_MULTI_PATTERN = /^ME@/

const PREFIX = '@'
const MULTI_PREFIX = 'ME@'
const SPLITTER = '|'

export const PIPE = (...args) => {
    return args.join(SPLITTER)
}

export const EVENT = (...args) => {
    return MULTI_PREFIX + PIPE(...args);
}

class UIElement extends EventMachin {
    constructor (opt, props) {
        super(opt)

        this.opt = opt || {};
        this.parent = this.opt;
        this.props = props || {}
        this.source = uuid()
        this.sourceName = this.constructor.name;
        // window[this.source] = this; 

        if (opt && opt.$store) {
            this.$store = opt.$store
        }

        this.created();

        this.initialize();
        
        this.initializeStoreEvent();
    }

    created() {

    }

    getRealEventName(e, s = PREFIX) {
        var startIndex = e.indexOf(s);
        return e.substr(startIndex == 0 ? 0 : startIndex + s.length);
    }

    /**
     * initialize store event 
     * 
     * you can define '@xxx' method(event) in UIElement 
     * 
     * 
     */
    initializeStoreEvent () {
        this.storeEvents = {}

        /*
        this.filterProps(CHECK_STORE_PATTERN).forEach((key) => {
            const event = this.getRealEventName(key);

            this.storeEvents[event] = this[key].bind(this)
            this.$store.on(event, this.storeEvents[event], this);
        }); */

        this.filterProps(CHECK_STORE_MULTI_PATTERN).forEach((key) => {
            const events = this.getRealEventName(key, MULTI_PREFIX);

            var callback = this[key].bind(this)

            events.split(SPLITTER).forEach(e => {
                e = this.getRealEventName(e);

                this.storeEvents[e] = callback                
                this.$store.on(e, this.storeEvents[e], this);
            })
            
        });        
    }

    destoryStoreEvent () {
        Object.keys(this.storeEvents).forEach(event => {
            this.$store.off(event, this.storeEvents[event])
        })
    }

    read (...args) {
        return this.$store.read(...args)
    }

    i18n (...args) {
        return this.read('i18n/get', ...args);
    }

    run (...args) {
        return this.$store.run(...args);
    }

    dispatch (...args) {
        this.$store.source = this.source ; 
        return this.$store.dispatch(...args) 
    }

    emit (...args) {
        this.$store.source = this.source ; 
        this.$store.emit(...args);
    }

    commit (eventType, ...args) {
        this.run(ITEM_SET, ...args);
        this.emit(eventType, ...args);
    }

}

export default UIElement 