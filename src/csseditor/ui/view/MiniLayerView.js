import items  from '../control/panel/items/index'
import BaseTab from "../BaseTab";

export default class MiniLayerView extends BaseTab {

    template () {
        return `
            <div class="tab mini-layer-view">
                <div class="tab-header" ref="$header">
                    <div class="tab-item selected" data-id="color">Color</div>
                    <div class="tab-item" data-id="blend">Blend</div>
                    <div class="tab-item" data-id="mix">Mix</div>
                    <div class="tab-item" data-id="filter">Filter</div>
                </div>
                <div class="tab-body" ref="$body">
                    <div class="tab-content selected" data-id="color">
                        <LayerColorPickerPanel></LayerColorPickerPanel>                
                    </div>
                    <div class="tab-content" data-id="blend">
                        <BlendList></BlendList>    
                    </div>
                    <div class="tab-content" data-id="mix">
                        <MixBlendList></MixBlendList>
                    </div>
                    <div class="tab-content" data-id="filter">
                        <FilterList></FilterList>   
                    </div>                                        
                </div>
            </div>            
        `
    }

    components () {
        return items
    }
}