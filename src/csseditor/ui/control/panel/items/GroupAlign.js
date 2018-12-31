import BasePropertyItem from "./BasePropertyItem";
import { CLICK } from "../../../../../util/Event";

export default class GroupAlign extends BasePropertyItem {
    template () {
        return `
            <div class='property-item group-align show'>
                <div class='items'>            
                    <div>
                        <div>
                            <button type="button" title="left" data-value="left"></button>
                            <button type="button" title="center" data-value="center"></button>
                            <button type="button" title="right" data-value="right"></button>
                            <button type="button" title="top" data-value="top"></button>
                            <button type="button" title="middle" data-value="middle"></button>
                            <button type="button" title="bottom" data-value="bottom"></button>
                            <button type="button" title="vertical" data-value="vertical"></button>
                            <button type="button" title="horizontal" data-value="horizontal"></button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    [CLICK('$el button')] (e) {
        this.dispatch('ordering/type', e.$delegateTarget.attr('data-value'))
    }

    
}