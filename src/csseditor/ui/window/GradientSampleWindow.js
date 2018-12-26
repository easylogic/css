import UIElement from "../../../colorpicker/UIElement";
import GradientSampleList from "../control/colorsteps/GradientSampleList";
import { CLICK } from "../../../util/Event";



export default class GradientSampleWindow extends UIElement {

    components () {
        return {
            GradientSampleList
        }
    }

    template () {
        return `
            <div class='gradient-sample-view'>
                <div class="close">&times;</div>
                <GradientSampleList></GradientSampleList>
            </div>
        `
    }

    [CLICK('$el .close')] (e) {
        this.$el.toggle();
    }

    '@toggleGradientSampleView' () {
        this.$el.toggle();
    }


}