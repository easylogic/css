import BaseTab from "../BaseTab";
import layerItems from "./layer-items/index";

export default class OutlineTabView extends BaseTab {
    template() {
        return `    
            <div class="outline">
                <ProjectListView />                    
                <LayerListView />
            </div>
        `
    }

    components() {
        return {
            ...layerItems
        }
    }
}