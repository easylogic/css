import UIElement from "../../../../colorpicker/UIElement";
import items  from './items/index'

export default class ImageView extends UIElement {

    template () {
        return `
            <div class='property-view'>
                <ColorPickerPanel></ColorPickerPanel>
                <ColorStepsInfo></ColorStepsInfo>
                <ImageResource></ImageResource>
                <BlendList></BlendList>                    
            </div>  
        `
    }

    components () {
        return items
    }
}