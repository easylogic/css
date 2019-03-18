import UIElement, { EVENT } from "../../../util/UIElement";
import { html } from "../../../util/functions/func";
import { editor } from "../../../editor/editor";
import { CHANGE_EDITOR } from "../../types/event";

export default class FeatureControl extends UIElement {

    template () {
        return html`
            <div class='feature-control'>     
            ${editor.inspector.keys.map(key => `<${key} />`)}
            </div>
        `
    }

    components () {
        return editor.inspector.components;
    }

    refresh() {
        this.load();
    }

    [EVENT(CHANGE_EDITOR)] () {
        this.refresh();
    }
}