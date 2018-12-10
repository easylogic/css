import UIElement from "../../../../colorpicker/UIElement";

import items  from './items/index'

export default class PageInfoView extends UIElement {

    template () {
        return `
            <div class='page-info property-view'> 
                <PageName></PageName>
                <PageSize></PageSize>
                <clip></clip>
            </div>
        ` 
    }

    components () {
        return items 
    }
}