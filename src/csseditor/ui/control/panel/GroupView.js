import UIElement from "../../../../colorpicker/UIElement";

import items  from './items/index'

export default class GroupView extends UIElement {

    template () {
        return `<div class='property-view'><GroupAlign /></div>`
    }

    components () {
        return items 
    }
}