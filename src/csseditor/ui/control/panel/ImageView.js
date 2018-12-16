import UIElement from "../../../../colorpicker/UIElement";
import ImageTabView from "./ImageTabView";

export default class ImageView extends UIElement {

    template () {
        return `
            <div class='property-view'>
                <ImageTabView></ImageTabView> 
            </div>  
        `
    }

    components () {
        return {            
            ImageTabView
        }
    }
}