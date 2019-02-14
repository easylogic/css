import Event, { 
  CHECK_PATTERN, 
  NAME_SAPARATOR, 
  CHECK_SAPARATOR, 
  SAPARATOR, 
  CHECK_LOAD_PATTERN, 
  LOAD_SAPARATOR, 
  KEY_CONTROL, 
  KEY_SHIFT, 
  KEY_ALT, 
  KEY_META 
} from './Event'
import Dom from './Dom'
import State from './State'
import { debounce, isFunction, isArray, html, keyEach } from './functions/func';
import { EMPTY_STRING } from './css/types';

const checkGroup = /\>(\W*)\</g

const META_KEYS = [ KEY_CONTROL, KEY_SHIFT, KEY_ALT, KEY_META];
const REFERENCE_PROPERTY = 'ref';

export default class EventMachin { 

  constructor() { 
    this.state = new State(this);
    this.refs = {} 
    this.children = {} 
    this.childComponents = this.components()
  }

  render ($container) {
    this.$el = this.parseTemplate(html`${this.template()}`)
    this.refs.$el = this.$el;   

    if ($container) $container.html(this.$el)

    this.load()    

    this.afterRender();
  }

  afterRender () {
    
  }
 
  components () {
    return {} 
  }

  parseTemplate (html, isLoad) {

    if (isArray(html)) {
      html = html.join(EMPTY_STRING)
    }

    html = html.trim();

    const list = new Dom("div").html(html).children()
    
    var fragment = document.createDocumentFragment()
    var queryProperty = `[${REFERENCE_PROPERTY}]`;
    list.forEach($el => {
      // ref element 정리 
      if ($el.attr(REFERENCE_PROPERTY)) {
        this.refs[$el.attr(REFERENCE_PROPERTY)] = $el; 
      }
      var refs = $el.$$(queryProperty);
      refs.forEach($dom => {
        const name = $dom.attr(REFERENCE_PROPERTY)
        this.refs[name] = $dom;
      })

      fragment.appendChild($el.el);

    })

    if (!isLoad) {
      return list[0];
    }

    return fragment
  }

  parseComponent () {
    const $el = this.$el; 
    keyEach(this.childComponents, (ComponentName, Component) => {
      const targets = $el.$$(`${ComponentName.toLowerCase()}`);
      [...targets].forEach($dom => {
        let props = {};
        
        [...$dom.el.attributes].filter(t => {
          return [REFERENCE_PROPERTY].indexOf(t.nodeName) < 0 
        }).forEach(t => {
          props[t.nodeName] = t.nodeValue 
        })
  
        const refName = $dom.attr(REFERENCE_PROPERTY) || ComponentName
  
        if (refName) {
        
          if (Component) { 

            var instance = new Component(this, props);
            this.children[refName] = instance
            this.refs[refName] = instance.$el

            if (instance) {
              instance.render()
  
              $dom.replace(instance.$el)
            }
          }
  
        }
  
  
      })
    })
  }

  load () {
    this.filterProps(CHECK_LOAD_PATTERN).forEach(callbackName => {
      const elName = callbackName.split(LOAD_SAPARATOR)[1]
      if (this.refs[elName]) { 
        const fragment = this.parseTemplate(this[callbackName].call(this), true);
        this.refs[elName].html(fragment)
      }
    })

    this.parseComponent()
  }

  // 기본 템플릿 지정 
  template () {
    return '<div></div>';
  }

  initialize() {

  }

  eachChildren (callback) {
    if (!isFunction(callback)) return; 

    keyEach(this.children, (_, Component) => {
      callback(Component)
    })
  }

  /**
   * 이벤트를 초기화한다. 
   */
  initializeEvent () { 
    this.initializeEventMachin();

    // 자식 이벤트도 같이 초기화 한다. 
    // 그래서 이 메소드는 부모에서 한번만 불려도 된다. 
    this.eachChildren(Component => {
      Component.initializeEvent()
    })
  }

  /**
   * 자원을 해제한다. 
   * 이것도 역시 자식 컴포넌트까지 제어하기 때문에 가장 최상위 부모에서 한번만 호출되도 된다. 
   */
  destroy() {
    this.destroyEventMachin();
    // this.refs = {} 

    this.eachChildren(Component => {
      Component.destroy()
    })
  }

  destroyEventMachin () {
    this.removeEventAll();
  }

  initializeEventMachin () {
    this.filterProps(CHECK_PATTERN).forEach(this.parseEvent.bind(this));
  }

  /**
   * property 수집하기 
   * 상위 클래스의 모든 property 를 수집해서 리턴한다. 
   */
  collectProps () {

    if (!this.collapsedProps) {
      var p = this.__proto__ 
      var results = [] 
      do {
        results.push(...Object.getOwnPropertyNames(p))
        p  = p.__proto__;
      } while( p );

      this.collapsedProps = results
    }

    return this.collapsedProps; 
  }

  filterProps (pattern) {
    return this.collectProps().filter(key => {
      return key.match(pattern);
    });
  }

  getEventNames (eventName) {
    let results = [] 

    eventName.split(NAME_SAPARATOR).forEach(e => {
      var arr = e.split(NAME_SAPARATOR)

      results.push(...arr)
    })

    return results; 
  }

  parseEvent (key) {
    let checkMethodFilters = key.split(CHECK_SAPARATOR).map(it => it.trim());
    var eventSelectorAndBehave = checkMethodFilters.shift() ;

    var [eventName, ...params] = eventSelectorAndBehave.split(SAPARATOR);
    var eventNames =  this.getEventNames(eventName)
    var callback = this[key].bind(this)
    
    eventNames.forEach(eventName => {
      var eventInfo = [eventName, ...params]
      this.bindingEvent(eventInfo, checkMethodFilters, callback);
    })
  }

  getDefaultDomElement (dom) {
    let el; 

    if (dom) {
      el = this.refs[dom] || this[dom] || window[dom]; 
    } else {
      el = this.el || this.$el || this.$root; 
    }

    if (el instanceof Dom) {
      return el.getElement();
    }

    return el;
  }

  /* magic check method  */ 
  self (e) {  // e.target 이 delegate 대상인지 체크 
    return e.$delegateTarget.is(e.target); 
  }



  getDefaultEventObject (eventName, checkMethodFilters) {
    const isControl = checkMethodFilters.includes(KEY_CONTROL);
    const isShift =  checkMethodFilters.includes(KEY_SHIFT);
    const isAlt = checkMethodFilters.includes(KEY_ALT);
    const isMeta =  checkMethodFilters.includes(KEY_META);

    var arr = checkMethodFilters.filter((code) => {
      return META_KEYS.includes(code.toUpperCase()) === false;
    });
    
    const checkMethodList = arr.filter(code => {
        return !!this[code];
    });

    // TODO: split debounce check code 
    const delay = arr.filter(code => {
      if (code.indexOf('debounce(')  > -1) {
        return true; 
      } 
      return false; 
    })

    let debounceTime = 0; 
    if (delay.length) {
      debounceTime = delay[0].replace('debounce(', EMPTY_STRING).replace(')', EMPTY_STRING);
    }

    // capture 
    const capturing = arr.filter(code => {
      if (code.indexOf('capture')  > -1) {
        return true; 
      } 
      return false; 
    })

    let useCapture = false; 
    if (capturing.length) {
      useCapture = true; 
    }
    
    arr = arr.filter(code => {
      return checkMethodList.includes(code) === false 
            && delay.includes(code) === false 
            && capturing.includes(code) === false; 
    }).map(code => {
      return code.toLowerCase() 
    });

    // TODO: split debounce check code     

    return {
      eventName,
      isControl,
      isShift,
      isAlt,
      isMeta,
      codes : arr,
      useCapture,
      debounce: debounceTime,
      checkMethodList: checkMethodList
    }
  }

  bindingEvent ([ eventName, dom, ...delegate], checkMethodFilters, callback) {
    let eventObject = this.getDefaultEventObject(eventName, checkMethodFilters);

    eventObject.dom = this.getDefaultDomElement(dom);
    eventObject.delegate = delegate.join(SAPARATOR);

    this.addEvent(eventObject, callback);
  }

  matchPath(el, selector) {
    if (el) {
      if (el.matches(selector)) { return el; }
      return this.matchPath(el.parentElement, selector);
    }
    return null;
  }

  getBindings () {

    if (!this._bindings) {
      this.initBindings();
    }

    return this._bindings;
  }

  addBinding (obj) {
    this.getBindings().push(obj);
  }

  initBindings() {
    this._bindings = [];
  }

  checkEventType (e, eventObject ) {
    var onlyControl = eventObject.isControl ? e.ctrlKey : true;
    var onlyShift = eventObject.isShift ? e.shiftKey : true; 
    var onlyAlt = eventObject.isAlt ? e.altKey : true; 
    var onlyMeta = eventObject.isMeta ? e.metaKey : true; 

    // 특정 keycode 를 가지고 있는지 체크 
    // keyup.pagedown  이라고 정의하면 pagedown 키를 눌렀을때만 동작 함 
    var hasKeyCode = true; 
    if (eventObject.codes.length) {

      hasKeyCode =  (
        e.code ? eventObject.codes.includes(e.code.toLowerCase()) : false
      ) || (
        e.key ? eventObject.codes.includes(e.key.toLowerCase()) : false
      )        
      
    }

    // 체크 메소드들은 모든 메소드를 다 적용해야한다. 
    var isAllCheck = true;  
    if (eventObject.checkMethodList.length) {  
      isAllCheck = eventObject.checkMethodList.every(method => {
        return this[method].call(this, e);
      });
    }

    return (onlyControl && onlyAlt && onlyShift && onlyMeta && hasKeyCode && isAllCheck);
  }

  makeCallback ( eventObject, callback) {

    if (eventObject.debounce) {
      callback = debounce(callback, eventObject.debounce)
    }

    if (eventObject.delegate) {
      return (e) => {
        const delegateTarget = this.matchPath(e.target || e.srcElement, eventObject.delegate);

        if (delegateTarget) { // delegate target 이 있는 경우만 callback 실행 
          e.$delegateTarget = new Dom(delegateTarget);
          e.xy = Event.posXY(e)

          if (this.checkEventType(e, eventObject)) {
            return callback(e, e.$delegateTarget, e.xy);
          } 

        } 

      }
    }  else {
      return (e) => {
        e.xy = Event.posXY(e)        
        if (this.checkEventType(e, eventObject)) { 
          return callback(e);
        }
      }
    }
  }

  addEvent(eventObject, callback) {
    eventObject.callback = this.makeCallback(eventObject, callback)
    this.addBinding(eventObject);
    Event.addEvent(eventObject.dom, eventObject.eventName, eventObject.callback, eventObject.useCapture)
  }

  removeEventAll () {
    this.getBindings().forEach(obj => {
      this.removeEvent(obj);
    });
    this.initBindings();
  }

  removeEvent({eventName, dom, callback}) {
    Event.removeEvent(dom, eventName, callback);
  }
}
