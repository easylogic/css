import BaseTab from "../BaseTab";
import layerItems from "./layer-items/index";

export default class OutlineTabView extends BaseTab {
    template() {
        return `    
            <div class="tab outline-tab-view">
                <div class="tab-header no-border" ref="$header">
                    <div class="tab-item select-reverse selected" data-id="layers">Layers</div>                
                    <div class="tab-item select-reverse" data-id="pages">Pages</div>       
                </div>
                <div class="tab-body no-border" ref="$body">
                    <div class="tab-content selected" data-id="layers">
                        <LayerListView />
                    </div>                
                    <div class="tab-content" data-id="pages">
                        <PageListView />
                    </div> 

                </div>
            </div>
        `
    }

    components() {
        return {
            ...layerItems
        }
    }
}