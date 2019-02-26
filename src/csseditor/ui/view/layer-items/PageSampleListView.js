import UIElement from "../../../../colorpicker/UIElement";
import PageSampleList from "../../control/panel/PageSampleList";

export default class PageSampleListView extends UIElement {

    components () {
        return { PageSampleList }
    }

    template () { 
        return `<div class='pages'>         
            <PageSampleList />
        </div>`
    }
} 