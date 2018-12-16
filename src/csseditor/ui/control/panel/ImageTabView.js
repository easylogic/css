import items  from './items/index'
import PredefinedLinearGradientAngle from "../shape/PredefinedLinearGradientAngle";
import GradientAngle from "../shape/GradientAngle";
import PredefinedRadialGradientAngle from "../shape/PredefinedRadialGradientAngle";
import PredefinedRadialGradientPosition from "../shape/PredefinedRadialGradientPosition";
import GradientPosition from "../shape/GradientPosition";
import BaseTab from "../../BaseTab";


export default class ImageTabView extends BaseTab {

    template () {
        return `
            <div class="tab horizontal">
                <div class="tab-header" ref="$header">
                    <div class="tab-item selected" data-id="gradient">Gradient</div>
                    <div class="tab-item" data-id="css">CSS</div>
                </div>
                <div class="tab-body" ref="$body">
                    <div class="tab-content selected" data-id="gradient">
                        <BackgroundInfo></BackgroundInfo>
                        <BackgroundBlend></BackgroundBlend>
                        <div class='sub-feature'>
                            <BackgroundSize></BackgroundSize>
                        </div>
                        <ColorPickerPanel></ColorPickerPanel>
                        <ColorStepsInfo></ColorStepsInfo>   
                    </div>
                    <div class="tab-content" data-id="css">
                        <BackgroundCode></BackgroundCode>
                    </div>
                </div>
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