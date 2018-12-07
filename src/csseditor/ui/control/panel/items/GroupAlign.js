import BasePropertyItem from "./BasePropertyItem";
import { CHANGE_LAYER_NAME, EVENT_CHANGE_EDITOR, CHANGE_EDITOR } from "../../../../types/event";

export default class GroupAlign extends BasePropertyItem {
    template () {
        return `
            <div class='property-item name show'>
                <div class='title' ref="$title">Align</div>            
                <div class='items'>            
                    <div>
                        <label>Horizontal</label>
                        <div>
                            <button type="button" data-value="left">Left</button>
                            <button type="button" data-value="center">Center</button>
                            <button type="button" data-value="right">Right</button>
                        </div>
                    </div>
                    <div>
                        <label>Vertical</label>
                        <div>
                            <button type="button" data-value="top">Top</button>
                            <button type="button" data-value="middle">middle</button>
                            <button type="button" data-value="bottom">bottom</button>
                        </div>
                    </div>                                        
                    <!--<div>
                        <label>동일한 간격</label>
                        <div>
                            <button type="button" data-value="vertical">Vertical</button>
                            <button type="button" data-value="horizontal">Horizontal</button>
                        </div>
                    </div>-->
                </div>
            </div>
        `
    }

    'click $el button' (e) {
        this.dispatch('/ordering/type', e.$delegateTarget.attr('data-value'))
    }

    
}