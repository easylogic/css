import UIElement, { EVENT } from "../../../util/UIElement";
import LayerView from "./panel/LayerView";
import ImageView from "./panel/ImageView";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../types/event";
import { CLICK } from "../../../util/Event";
import { ORDERING_INDEX, ORDERING_TYPE } from "../../types/OrderingTypes";


export default class Alignment extends UIElement {

    template () {
        return `
            <div class='alignment'>
                <div class="button-group group-align" ref="$groupAlign">
                    <button type="button" title="left" data-value="left"></button>
                    <button type="button" title="center" data-value="center"></button>
                    <button type="button" title="right" data-value="right"></button>
                    <button type="button" title="top" data-value="top"></button>
                    <button type="button" title="middle" data-value="middle"></button>
                    <button type="button" title="bottom" data-value="bottom"></button>
                    <button type="button" title="vertical" data-value="vertical"></button>
                    <button type="button" title="horizontal" data-value="horizontal"></button>
                </div>

                <div class="button-group group-order" ref="$groupOrdering">
                    <button type="button" title="front" data-value="front"></button>
                    <button type="button" title="back" data-value="back"></button>
                    <button type="button" title="forward" data-value="forward"></button>
                    <button type="button" title="backward" data-value="backward"></button>
                </div>                
                        
            </div>
        `
    }

    [CLICK('$groupAlign button')] (e) {
        console.log('sstart', e);
        this.dispatch(ORDERING_TYPE, e.$delegateTarget.attr('data-value'))
        console.log('end', e);
    }

    [CLICK('$groupOrdering button')] (e) {
        this.dispatch(ORDERING_INDEX, e.$delegateTarget.attr('data-value'))
    }    
}