import UIElement from "../../../colorpicker/UIElement";
import PageListView from "./PageListView";
import LayerListView from "./LayerListView";
import PageInfoView from "../control/panel/PageInfoView";
 
export default class SelectLayerView extends UIElement {
    template() {
        return `    
            <div class="select-layer-view">
                <PageListView></PageListView>
                <div class="item-info">
                    <PageInfoView></PageInfoView>
                    <LayerListView></LayerListView>
                </div>
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