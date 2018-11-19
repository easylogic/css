import UIElement from "../../../colorpicker/UIElement";
import PageSampleList from "../control/panel/PageSampleList";


export default class PageSampleWindow extends UIElement {

    components () {
        return {
            PageSampleList
        }
    }

    template () {
        return `
            <div class='page-sample-view'>
                <div class="close">&times;</div>
                <PageSampleList></PageSampleList>
            </div>
        `
    }
    
    'click $el .close' (e) {
        this.$el.toggle();
    }

    '@togglePageSampleView' () {
        this.$el.toggle();
    }


}