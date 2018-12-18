import UIElement from "../../../colorpicker/UIElement";
import PageListView from "./PageListView";
import LayerListView from "./LayerListView";
import PageInfoView from "../control/panel/PageInfoView";
 
export default class SelectLayerView extends UIElement {
    template() {
        return `    
            <div class="select-layer-view">

                <div class="item-info">
                    <PageInfoView></PageInfoView>
                    <LayerListView></LayerListView>
                </div>
                <PageListView></PageListView>                            
            </div>
        `
    }

    components() {
        return {
            PageListView,
            PageInfoView,
            LayerListView
        }
    }
}