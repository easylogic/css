import UIElement from "../../../../colorpicker/UIElement";

import items  from './items/index'

export default class LayerView extends UIElement {

    template () {
        return `
            <div class='property-view'>
                <GroupAlign></GroupAlign>
                <Name></Name>            
                <size></size>                
                <Rotate></Rotate>        
                <RadiusFixed></RadiusFixed>
                <radius></radius>                      
                <LayerBlend></LayerBlend>                            
                <LayerColorPickerPanel></LayerColorPickerPanel>
                <ClipPath></ClipPath>           
                <FilterList></FilterList>      
                <transform></transform>
                <transform3d></transform3d>                
            </div> 
        `
    }

    components () {
        return items 
    }
}