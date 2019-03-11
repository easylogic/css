
import Dom from "./Dom";
import Event, { POINTERMOVE, POINTEREND } from "./Event";
import { ADD_BODY_MOUSEMOVE, ADD_BODY_MOUSEUP } from "../csseditor/types/ToolTypes";
import BaseStore from "./BaseStore";
import UIElement, { EVENT } from "./UIElement";

import {editor} from '../editor/editor'
import { debounce } from "./functions/func";

const EMPTY_POS = {x: 0, y : 0}

export const start = (opt) => {
    class App extends UIElement {

        initialize (modules = []) { 
            this.$store = new BaseStore({
                modules: [
                    ...this.getModuleList(),
                    ...modules
                ]
            });

            editor.setStore(this.$store);

            this.$body = new Dom(this.getContainer());
            this.$root = new Dom('div', this.getClassName());

            this.$body.append(this.$root);        

            this.render(this.$root)

            // 이벤트 연결 
            this.initializeEvent();          
            
            this.initBodyMoves()
        }

        initBodyMoves () {
            this.moves = new Set()
            this.ends = new Set();
            this.funcBodyMoves = debounce(this.loopBodyMoves.bind(this), 10);
        }

        loopBodyMoves () {
            var oldPos = editor.config.get('oldPos');
            var pos = editor.config.get('pos');
            var isRealMoved = (oldPos.x != pos.x ) || (oldPos.y != pos.y);

            if (isRealMoved && this.moves.size) {
                this.moves.forEach(v => {
                    v.func.call(v.context);
                })
            }
            requestAnimationFrame(this.funcBodyMoves)
        }

        removeBodyMoves () {

            this.ends.forEach(v => {
                v.func.call(v.context);
            })            

            this.moves.clear()
            this.ends.clear()
        }

        [EVENT(ADD_BODY_MOUSEMOVE)] (func, context) {
            this.moves.add({func, context})
        }

        [EVENT(ADD_BODY_MOUSEUP)] (func, context) {
            this.ends.add({func, context})
        }

        getModuleList () {
            return opt.modules || []
        }

        getClassName () {
            return opt.className || 'csseditor'
        }

        getContainer () {
            return opt.container || document.body;
        }  
        
        template () {
            return `<div>${opt.template}</div>`
        }

        components () {
            return opt.components || {}
        }

        [POINTERMOVE('document')] (e) {
            var oldPos = editor.config.get('pos') || EMPTY_POS;
            var newPos = Event.pos(e) || EMPTY_POS;

            this.bodyMoved = !(oldPos.x == newPos.x && oldPos.y == newPos.y);  
            editor.config.set('bodyEvent', e);
            editor.config.set('pos', newPos);
            editor.config.set('oldPos', oldPos);

            if (!this.requestId) {
                this.requestId = requestAnimationFrame(this.funcBodyMoves)
            }
        }

        [POINTEREND('document')] (e) {
            var newPos = Event.pos(e) || EMPTY_POS;
            editor.config.set('bodyEvent', e);
            editor.config.set('pos', newPos);
            this.removeBodyMoves()
            this.requestId = null; 
        }        
    }

    return new App(opt);
}