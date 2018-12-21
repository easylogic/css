import EventMachin from "../util/EventMachin";
import { uuid } from '../util/functions/math'

const CHECK_STORE_EVENT_PATTERN = /^@/
const CHECK_STORE_MULTI_EVENT_PATTERN = /^ME@/

const EVENT_PREFIX = '@'
const MULTI_EVENT_PREFIX = 'ME@'
const EVENT_SPLITTER = '|'

export const MULTI_EVENT = (...args) => {
    return MULTI_EVENT_PREFIX + args.join(EVENT_SPLITTER)
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

    getRealEventName(e, s = EVENT_PREFIX) {
        const arr = e.split(s)
            arr.shift();
        return arr.join(s);
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

        this.filterProps(CHECK_STORE_EVENT_PATTERN).forEach((key) => {
            const event = this.getRealEventName(key);

            this.storeEvents[event] = this[key].bind(this)
            this.$store.on(event, this.storeEvents[event], this);
        });

        this.filterProps(CHECK_STORE_MULTI_EVENT_PATTERN).forEach((key) => {
            const events = this.getRealEventName(key, MULTI_EVENT_PREFIX);

            var callback = this[key].bind(this)

            events.split(EVENT_SPLITTER).forEach(e => {
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
        return this.read('/i18n/get', ...args);
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
        this.run('/item/set', ...args);
        this.emit(eventType, ...args);
    }

}

export default UIElement 