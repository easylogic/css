import items  from './items/index'
import BaseTab from "../../BaseTab";

export default class LayerTabView extends BaseTab {

    template () {
        return `
        <div class="tab">
            <div class="tab-header" ref="$header">
                <div class="tab-item selected" data-id="inspect">I</div>
                <div class="tab-item" data-id="clippath">C</div>
                <div class="tab-item" data-id="effect">E</div>
                <div class="tab-item" data-id="transform">T</div>
            </div>
            <div class="tab-body" ref="$body">
                <div class="tab-content selected" data-id="inspect">
                    <Name></Name>            
                    <size></size>                
                    <Rotate></Rotate>        
                    <RadiusFixed></RadiusFixed>
                    <radius></radius>                      
                    <LayerBlend></LayerBlend>                            
                    <LayerColorPickerPanel></LayerColorPickerPanel>
                </div>
                <div class="tab-content" data-id="clippath">
                    <ClipPath></ClipPath>                          
                </div>
                <div class="tab-content" data-id="effect">
                    <FilterList></FilterList>                             
                </div>
                <div class="tab-content" data-id="transform">
                    <transform></transform>
                    <transform3d></transform3d> 
                </div>                
            </div>
        </div>

        `
    }

    components () {
        return items 
    }
}