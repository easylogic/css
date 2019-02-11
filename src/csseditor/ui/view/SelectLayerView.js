import BaseTab from "../BaseTab";
import layerItems from "./layer-items/index";



export default class SelectLayerView extends BaseTab {
    template() {
        return `    
            <div class="tab horizontal left select-layer-view">
                <div class="tab-header no-border" ref="$header">
                    <div class="tab-item selected" data-id="outline">Outline</div>       
                    <div class="tab-item" data-id="page">Page</div>                                       
                    <div class="tab-item" data-id="layers">Layer</div>
                    <div class="tab-item small-font" data-id="gradient">Gradient</div>
                    <div class="tab-item small-font" data-id="history">History</div>
                </div>
                <div class="tab-body" ref="$body">
                    <div class="tab-content" data-id="page">
                        <PageListView />
                    </div> 
                    <div class="tab-content selected" data-id="outline">
                        <LayerListView />
                    </div>
                    <div class="tab-content" data-id="layers">
                        <ShapeListView />
                        <LayerSampleList />
                    </div>
                    <div class="tab-content" data-id="gradient">
                        <BasicGradient />
                        <GradientSampleList />
                    </div> 
                    <div class="tab-content" data-id="history">
                        <HistoryListView />
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