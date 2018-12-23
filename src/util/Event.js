export default {    

    addEvent (dom, eventName, callback, useCapture = false) {
        if (dom) {
            dom.addEventListener(eventName, callback, useCapture);
        }
    },
   
    removeEvent(dom, eventName, callback) {
        if (dom) {
            dom.removeEventListener(eventName, callback);
        }
    },

    pos(e) {
        if (e.touches && e.touches[0]) {
            return e.touches[0];
        }
    
        return e;
    },

    posXY (e) {
        var pos = this.pos(e);
        return {
            x: pos.pageX,
            y: pos.pageY
        }
    }
}