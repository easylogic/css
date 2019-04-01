import UIElement, { EVENT } from "../../../util/UIElement";
import { html } from "../../../util/functions/func";
import { editor } from "../../../editor/editor";
import { CHANGE_EDITOR } from "../../types/event";
import property from "./panel/property/index";


export default class Inspector extends UIElement {

    template () {
        return html`
            <div class='feature-control'>     
            ${Object.keys(this.components()).map(key => `<${key} />`)}
            </div>
        `
    }

    components () {
        return property;
    }

    refresh() {
        this.load();
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }
}