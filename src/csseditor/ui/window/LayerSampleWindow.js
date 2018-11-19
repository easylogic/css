import UIElement from "../../../colorpicker/UIElement";
import LayerSampleList from "../control/panel/LayerSampleList";


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
    
    'click $el .close' (e) {
        this.$el.toggle();
    }

    '@toggleLayerSampleView' () {
        this.$el.toggle();
    }


}