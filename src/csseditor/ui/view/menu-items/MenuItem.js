import UIElement from "../../../../colorpicker/UIElement";
import { CLICK } from "../../../../util/Event";
import { EMPTY_STRING } from "../../../../util/css/types";

export default class MenuItem extends UIElement {

    constructor(opt = {}, props = {}, parent = null) {
        super(opt, props, parent);

        this.title = EMPTY_STRING;
        this.icon = EMPTY_STRING; 
        this.checked = false; 
    }

    template () {
        return `
            <button type="button" class='menu-item' checked="${this.checked ? 'checked' : EMPTY_STRING}">
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