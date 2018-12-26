import UIElement from "../../../../../colorpicker/UIElement";
import { CLICK } from "../../../../../util/Event";

export default class PageExport extends UIElement {
    template () {
        return `
            <div class='property-item export'>
                <div class='items no-padding'>
                    <div>
                        <label>Export</label>
                        <button type="button" ref="$exportCSS">CSS</button>
                    </div>   
                                 
                </div>
            </div>
        ` 
    } 

    [CLICK('$exportCSS')] (e) {
        this.emit('showExport')
    }
}