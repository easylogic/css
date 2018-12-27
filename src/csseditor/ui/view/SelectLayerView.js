import UIElement from "../../../colorpicker/UIElement";
import PageListView from "./PageListView";
import LayerListView from "./LayerListView";
 
export default class SelectLayerView extends UIElement {
    template() {
        return `    
            <div class="select-layer-view">

                <div class="item-info">
                    <LayerListView></LayerListView>
                </div>
                <PageListView></PageListView>                            
            </div>
        `
    }

    components() {
        return {
            PageListView,
            LayerListView
        }
    }
}