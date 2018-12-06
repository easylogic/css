import UIElement from "../../../../colorpicker/UIElement";

import items  from './items/index'

export default class LayerView extends UIElement {

    template () {
        return `
            <div class='property-view'>
                <Name></Name>                
                <BackgroundColor></BackgroundColor> 
                <ClipPath></ClipPath>                 
                <size></size>
                <radius></radius>                
                <transform></transform>
                <transform3d></transform3d>                
            </div> 
        `
    }

    components () {
        return items 
    }
}