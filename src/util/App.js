import BaseStore from "../colorpicker/BaseStore";
import Dom from "./Dom";
import UIElement from "../colorpicker/UIElement";

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
    }

    return new App(opt);
}