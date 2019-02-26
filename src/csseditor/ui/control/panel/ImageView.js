import UIElement from "../../../../util/UIElement";
import ImageTabView from "./ImageTabView";

export default class ImageView extends UIElement {

    template () {
        return `<div class='property-view'><ImageTabView /></div>`
    }

    components () {
        return {            
            ImageTabView
        }
    }
}