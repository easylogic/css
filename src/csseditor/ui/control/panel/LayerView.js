import UIElement from "../../../../colorpicker/UIElement";

import LayerTabView from "./LayerTabView";


export default class LayerView extends UIElement {

    template () {
        return `<div class='property-view'><LayerTabView /></div>`
    }

    components () {
        return {LayerTabView} 
    }
}