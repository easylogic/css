import { px, EMPTY_STRING } from "./css/types";
import { isString, isUndefined, isNotString } from "./functions/func";

let counter = 0;
let cached = [];

export default class Dom {

    constructor (tag, className, attr) {
    
        if (isNotString(tag)) {
            this.el = tag;
        } else {
    
            var el  = document.createElement(tag);
            this.uniqId = counter++;

            if (className) {
                el.className = className;
            }

            attr = attr || {};
    
            for(var k in attr) {
                el.setAttribute(k, attr[k]);
            }
    
            this.el = el;
        }
    }

    static getScrollTop () {
        return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
    }

    static getScrollLeft () {
        return Math.max(window.pageXOffset, document.documentElement.scrollLeft, document.body.scrollLeft)
    }

    attr (key, value) {
        if (arguments.length == 1) {
            return this.el.getAttribute(key);
        }

        this.el.setAttribute(key, value);

        return this; 
    }

    attrs (...args) {
        return args.map(key => {
            return this.el.getAttribute(key);
        })
    }

    removeAttr (key) {
        this.el.removeAttribute(key);

        return this; 
    }

    is (checkElement) {
        return this.el === (checkElement.el || checkElement);
    }

    closest (cls) {
        
        var temp = this;
        var checkCls = false;
    
        while(!(checkCls = temp.hasClass(cls))) {
            if (temp.el.parentNode) {
                temp = new Dom(temp.el.parentNode);
            } else {
                return null;
            }
        }
    
        if (checkCls) {
            return temp;
        }
    
        return null;
    }

    parent () {
        return new Dom(this.el.parentNode);
    }
    
    removeClass (...args) {

        if (this.el.className) {
            var className = this.el.className;

            args.forEach(cls => {
                className = ((` ${className} `).replace(` ${cls} `, ' ')).trim();    
            })

            this.el.className = className;
        }

        return this; 
    }
    
    hasClass (cls) {
        if (!this.el.className)
        {
            return false;
        } else {
            var newClass = ` ${this.el.className} `;
            return newClass.indexOf(` ${cls} `) > -1;
        }
    }
    
    addClass (cls) {
        if (!this.hasClass(cls)) {
            this.el.className = `${this.el.className} ${cls}`;
        }

        return this; 
    
    }

    toggleClass (cls, isForce = false) {

        if (arguments.length == 2) {
            if (isForce) {
                this.addClass(cls)
            } else {
                this.removeClass(cls);
            }
        } else {
            if (this.hasClass(cls)) {
                this.removeClass(cls);
            } else {
                this.addClass(cls);
            }
        }


    }
    
    html (html) {

        if (arguments.length == 0) {
            return this.el.innerHTML;
        }

        if (isString( html )) {
            this.el.innerHTML = html;
        } else {
            this.empty().append(html);
        }

        return this;
    }

    find (selector) {
        return this.el.querySelector(selector)
    } 

    $ (selector) {
        var node = this.find(selector);
        return node ? new Dom(node) : null; 
    }

    findAll (selector) { 
        return this.el.querySelectorAll(selector)
    } 

    $$ (selector) {
        return [...this.findAll(selector)].map(node => {
            return new Dom(node)
        })
    }

    
    empty () {
        return this.html(EMPTY_STRING);
    }
    
    append (el) {
    
        if (isString( el )) {
            this.el.appendChild(document.createTextNode(el));
        } else {
            this.el.appendChild(el.el || el);
        }
    
        return this;
    }
    
    appendTo (target) {
        var t = target.el ? target.el : target;
    
        t.appendChild(this.el);
    
        return this;
    }
    
    remove () {
        if (this.el.parentNode) {
            this.el.parentNode.removeChild(this.el);
        }
    
        return this;
    }
    
    text (value) {
        if (arguments.length == 0) {
            return this.el.textContent;
        } else {

            var tempText = value; 

            if (value instanceof Dom) {
                tempText = value.text();
            } 
            
            this.el.textContent = tempText; 
            return this; 
        }
        
    }

    /**
     * 
     * $el.css`
     *  border-color: yellow;
     * `
     * 
     * @param {*} key 
     * @param {*} value 
     */
    
    css (key, value) {
        if (arguments.length == 2) {
            this.el.style[key] = value;
        } else if (arguments.length == 1) {
    
            if (isString( key )) {
                return getComputedStyle(this.el)[key];
            } else {
                var keys = key || {};
                Object.keys(keys).forEach(k => {
                    this.el.style[k] = keys[k];    
                })
            } 
    
        }
    
        return this;
    }

    cssText (value) {
        if (isUndefined( value ))  {
            return this.el.style.cssText;
        }

        this.el.style.cssText = value;

        return this; 
    }

    cssFloat (key) {
        return parseFloat(this.css(key));
    }

    cssInt (key) {
        return parseInt(this.css(key));
    }

    px (key, value) {
        return this.css(key, px (value) )
    }

    rect () {
        return this.el.getBoundingClientRect()
    }
    
    offset () {
        var rect = this.rect();

        var scrollTop = Dom.getScrollTop()
        var scrollLeft = Dom.getScrollLeft()

        return { 
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    offsetLeft () {
        return this.offset().left; 
    }

    offsetTop () {
        return this.offset().top; 
    }
    
    position () {

        if (this.el.style.top) {
            return {
                top: parseFloat(this.css('top')),
                left: parseFloat(this.css('left'))
            };
        } else {
            return this.rect();
        }

    }

    size () {
        return [this.width(), this.height()]
    }
    
    width () {
        return this.el.offsetWidth || this.rect().width;
    }

    contentWidth() {
        return this.width() - this.cssFloat('padding-left') - this.cssFloat('padding-right');
    }
    
    height () {
        return this.el.offsetHeight || this.rect().height;
    }


    contentHeight() {
        return this.height() - this.cssFloat('padding-top') - this.cssFloat('padding-bottom');
    }
    
    dataKey (key) {
        return this.uniqId + '.' + key;
    }
    
    data (key, value) {
        if (arguments.length == 2) {
            cached[this.dataKey(key)] = value;
        } else if (arguments.length == 1) {
            return cached[this.dataKey(key)];
        } else {
            var keys = Object.keys(cached);
    
            var uniqId = this.uniqId + ".";
            return keys.filter(function (key) {
                if (key.indexOf(uniqId) == 0) {
                    return true;
                }
    
                return false;
            }).map(function (value) {
                return cached[value];
            })
        }
    
        return this;
    }
    
    val (value) {
        if (arguments.length == 0) {
            return this.el.value;
        } else if (arguments.length == 1) {

            var tempValue = value; 

            if (value instanceof Dom) {
                tempValue = value.val()
            }

            this.el.value = tempValue;
        }
    
        return this;
    }
    
    int () {
        return parseInt(this.val(), 10);
    }

    float () {
        return parseFloat(this.val());
    }
    
    show () {
        return this.css('display', 'block');
    }
    
    hide () {
        return this.css('display', 'none');
    }

    toggle (isForce) {

        var currentHide = this.css('display') == 'none'

        if (arguments.length == 1) {
            currentHide = isForce
        }

        if (currentHide) {
            return this.show();
        } else {
            return this.hide();
        }
    }

    scrollTop () {
        if (this.el === document.body) {
            return Dom.getScrollTop()
        }

        return this.el.scrollTop
    } 

    scrollLeft () {
        if (this.el === document.body) {
            return Dom.getScrollLeft()
        }

        return this.el.scrollLeft
    }

    on (eventName, callback, opt1, opt2) {
        this.el.addEventListener(eventName, callback, opt1, opt2);

        return this; 
    }

    off (eventName, callback ) {
        this.el.removeEventListener(eventName, callback);

        return this; 
    }

    getElement ( ) {
        return this.el;
    }

    createChild (tag, className = EMPTY_STRING, attrs = {}, css = {}) {
        let $element = new Dom(tag, className, attrs);
        $element.css(css);

        this.append($element);

        return $element;
    }

    firstChild () {
        return new Dom(this.el.firstElementChild);
    }

    children () {
        var element = this.el.firstElementChild; 

        if (!element) {
            return [] 
        }

        var results = [] 

        do {
            results.push(new Dom(element));
            element = element.nextElementSibling;
        } while (element);

        return results; 
    }

    childLength () {
        return this.el.children.length;
    }

    replace (newElement) {

        this.el.parentNode.replaceChild(newElement.el || newElement, this.el);

        return this; 
    }

    checked (isChecked = false) {

        if (arguments.length == 0) {
            return !!this.el.checked; 
        }

        this.el.checked = !!isChecked;

        return this;
    }

    focus () {
        this.el.focus()

        return this; 
    }
}

