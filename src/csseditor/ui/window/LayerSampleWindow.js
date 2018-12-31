import UIElement, { EVENT } from "../../../colorpicker/UIElement";
import LayerSampleList from "../control/panel/LayerSampleList";
import { CLICK } from "../../../util/Event";


export default class LayerSampleWindow extends UIElement {

    components () {
        return {
            LayerSampleList
        }
    }

    template () {
        return `
            <div class='layer-sample-view'>
                <div class="close">&times;</div>
                <LayerSampleList></LayerSampleList>
            </div>
        `
    }
    
    [CLICK('$el .close')] (e) {
        this.$el.toggle();
    }

    [EVENT('toggleLayerSampleView')] () {
        this.$el.toggle();
    }


}