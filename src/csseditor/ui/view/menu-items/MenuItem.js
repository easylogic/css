import UIElement from "../../../../colorpicker/UIElement";
import { CLICK } from "../../../../util/Event";

export default class MenuItem extends UIElement {

    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = '';
        this.icon = ''; 
        this.checked = false; 
    }

    template () {
        return `
            <button type="button" class='menu-item' checked="${this.checked ? 'checked' : ''}">
                <div class="icon ${this.icon}"></div>
                <div class="title">${this.title}</div>
            </button>
        `
    }

    clickButton(e) {

    }

    [CLICK()] (e) {
        this.clickButton(e);
    }
}