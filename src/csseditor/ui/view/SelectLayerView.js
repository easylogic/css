import BaseTab from "../BaseTab";
import layerItems from "./layer-items/index";
import OutlineTabView from "./OutlineTabView";




export default class SelectLayerView extends BaseTab {
    template() {
        return `    
            <div class="select-layer-view">
                <OutlineTabView />
            </div>
        `
    }

    components() {
        return {
            ...layerItems,
            OutlineTabView
        }
    }
}