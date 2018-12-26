export const EVENT_NAME_SAPARATOR = ':'
export const EVENT_CHECK_SAPARATOR = '|'
export const EVENT_SAPARATOR = ' '
export const EVENT_MAKE = (...keys) => {
    var key = keys.join(EVENT_NAME_SAPARATOR);
    return (...args) => {
        return [key, ...args].join(EVENT_SAPARATOR)
    }
}

export const CUSTOM = EVENT_MAKE;
export const CLICK = EVENT_MAKE('click')
export const DOUBLECLICK = EVENT_MAKE('dblclick') 
export const MOUSEDOWN = EVENT_MAKE('mousedown')
export const MOUSEUP = EVENT_MAKE('mouseup')
export const MOUSEMOVE = EVENT_MAKE('mousemove')
export const MOUSEOVER = EVENT_MAKE('mouseover')
export const MOUSEOUT = EVENT_MAKE('mouseout')
export const MOUSEENTER = EVENT_MAKE('mouseenter')
export const MOUSELEAVE = EVENT_MAKE('mouseleave')
export const POINTERSTART = EVENT_MAKE('pointerstart')
export const POINTERMOVE = EVENT_MAKE('pointermove')
export const POINTEREND = EVENT_MAKE('pointerend')
export const TOUCHSTART = EVENT_MAKE('touchstart')
export const TOUCHMOVE = EVENT_MAKE('touchmove')
export const TOUCHEND = EVENT_MAKE('touchend')
export const KEYDOWN = EVENT_MAKE('keydown')
export const KEYUP = EVENT_MAKE('keyup')
export const KEYPRESS = EVENT_MAKE('keypress')
export const DRAG = EVENT_MAKE('drag')
export const DRAGSTART = EVENT_MAKE('dragstart')
export const DROP = EVENT_MAKE('drop')
export const DRAGOVER = EVENT_MAKE('dragover')
export const DRAGENTER = EVENT_MAKE('dragenter')
export const DRAGLEAVE = EVENT_MAKE('dragleave')
export const DRAGEXIT = EVENT_MAKE('dragexit')
export const DRAGOUT = EVENT_MAKE('dragout')
export const DRAGEND = EVENT_MAKE('dragend')
export const CONTEXTMENU = EVENT_MAKE('contextmenu')
export const CHANGE = EVENT_MAKE('change')
export const INPUT = EVENT_MAKE('input')
export const PASTE = EVENT_MAKE('paste')
export const RESIZE = EVENT_MAKE('resize')
export const SCROLL = EVENT_MAKE('scroll')

// custom event 
export const CHANGEINPUT = CUSTOM('change', 'input')
export const PREDEFINED_EVENT_NAMES = {
    'pointerstart': 'mousedown:touchstart',
    'pointermove': 'mousemove:touchmove',
    'pointerend': 'mouseup:touchend',
    'ttingttong': 'click',
    'tt': 'click'
}
export const DEBOUNCE = (debounce = 100) => {
    return `debouce(${debounce})`
}

export const CHECK_EVENT_PATTERN = /^(click|mouse(down|up|move|over|out|enter|leave)|pointer(start|move|end)|touch(start|move|end)|key(down|up|press)|drag|dragstart|drop|dragover|dragenter|dragleave|dragexit|dragend|contextmenu|change|input|ttingttong|tt|paste|resize|scroll)/ig;

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