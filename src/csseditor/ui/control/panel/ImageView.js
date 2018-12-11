import UIElement from "../../../../colorpicker/UIElement";
import items  from './items/index'
import PredefinedLinearGradientAngle from "../shape/PredefinedLinearGradientAngle";
import GradientAngle from "../shape/GradientAngle";
import PredefinedRadialGradientAngle from "../shape/PredefinedRadialGradientAngle";
import PredefinedRadialGradientPosition from "../shape/PredefinedRadialGradientPosition";
import GradientPosition from "../shape/GradientPosition";


export default class ImageView extends UIElement {

    template () {
        return `
            <div class='property-view'>
                <BackgroundBlend></BackgroundBlend>
                <div class='sub-feature'>
                    <BackgroundSize></BackgroundSize>
                </div>
                <ColorPickerPanel></ColorPickerPanel>
                <ColorStepsInfo></ColorStepsInfo>   
            </div>  
        `
    }

    components () {
        return {            
            PredefinedLinearGradientAngle,
            GradientAngle,
            PredefinedRadialGradientAngle,
            PredefinedRadialGradientPosition,
            GradientPosition,
            ...items
        }
    }
}