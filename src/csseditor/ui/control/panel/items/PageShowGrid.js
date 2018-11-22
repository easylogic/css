import UIElement from "../../../../../colorpicker/UIElement";

export default class PageShowGrid extends UIElement {
    template () {
        return `
            <div class='property-item hidden'>
                <div class='items'>            
                    <div>
                        <label>Show Grid</label>
                        <div>
                            <input type='checkbox' ref="$check">
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    '@changeTool' () {
        this.refresh()
    }

    '@changeEditor' () {
        this.refresh()
    }    

    refresh() {
        this.read('/item/current/page', (item) => {
            this.refs.$check.el.checked = this.read('/tool/get', 'show.grid');
        })        
    }

    'click $check' () {
        this.read('/item/current/page', (item) => {
            this.dispatch('/tool/set', 'show.grid', this.refs.$check.el.checked)
        })
    }
}