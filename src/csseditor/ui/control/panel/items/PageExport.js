import UIElement from "../../../../../colorpicker/UIElement";

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

    'click $exportCSS' (e) {
        this.emit('showExport')
    }
}