import UIElement from "../../../../util/UIElement";
import { CLICK } from "../../../../util/Event";
import { SHAPE_LIST, SHAPE_GET, SHAPE_TO_CSS_TEXT } from "../../../types/ShapeTypes";
import { html } from "../../../../util/functions/func";
import { editor } from "../../../../editor/editor";
import { Shape } from "../../../../editor/shape/Shape";


export default class ShapeListView extends UIElement {


    template () { 
        return html`
            <div class='shapes'>         
                <div class='layer-title'>Basic Layer</div>
                <div class="shapes-list" ref="$shapeList">
                    ${this.read(SHAPE_LIST).map(key => {
                        return `<button type="button" class='add-layer' data-shape='${key}'>
                            <div class='shape' style='${this.read(SHAPE_TO_CSS_TEXT, key)}'></div>
                        </button>`
                    })}
                </div>
            </div>
        `
    }

    [CLICK('$shapeList .add-layer')] (e) {
        var $button = e.$delegateTarget;
        var key = $button.attr('data-shape');

        editor.selection.add(new Shape({ data : this.read(SHAPE_GET, key)}))
    }

} 