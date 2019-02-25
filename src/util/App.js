import BaseStore from "../colorpicker/BaseStore";
import Dom from "./Dom";
import UIElement, { EVENT } from "../colorpicker/UIElement";
import Event, { POINTERMOVE, POINTEREND } from "./Event";
import { ADD_BODY_MOUSEMOVE, ADD_BODY_MOUSEUP } from "../csseditor/types/ToolTypes";
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
            this.funcBodyMoves = this.loopBodyMoves.bind(this)
            requestAnimationFrame(this.funcBodyMoves)
        }

        loopBodyMoves () {

            if (this.bodyMoved) {
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
            var pos = this.config('pos') || EMPTY_POS;
            var newPos = Event.pos(e) || EMPTY_POS;

            this.bodyMoved = !(pos.x == newPos.x && pos.y == newPos.y);  
            this.initConfig('bodyEvent', e);
            this.initConfig('pos', newPos);

        }

        [POINTEREND('document')] (e) {
            this.initConfig('bodyEvent', e);
            this.initConfig('pos', Event.pos(e));
            this.removeBodyMoves()
        }        
    }

    return new App(opt);
}