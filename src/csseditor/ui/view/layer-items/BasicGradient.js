import UIElement from "../../../../util/UIElement";
import { CLICK } from "../../../../util/Event";
import { editor } from "../../../../editor/editor";
import BackgroundImage from "../../control/panel/items/BackgroundImage";
import { LinearGradient } from "../../../../editor/image-resource/LinearGradient";
import { ColorStep } from "../../../../editor/image-resource/ColorStep";
import { RepeatingLinearGradient } from "../../../../editor/image-resource/RepeatingLinearGradient";
import { RadialGradient } from "../../../../editor/image-resource/RadialGradient";
import { RepeatingRadialGradient } from "../../../../editor/image-resource/RepeatingRadialGradient";
import { ConicGradient } from "../../../../editor/image-resource/ConicGradient";
import { RepeatingConicGradient } from "../../../../editor/image-resource/RepeatingConicGradient";

const GradientClassList = {
    'linear': LinearGradient,
    'repeating-linear': RepeatingLinearGradient,
    'radial': RadialGradient,
    'repeating-radial': RepeatingRadialGradient,
    'conic': ConicGradient,
    'conic-linear': RepeatingConicGradient,        
}

export default class BasicGradient extends UIElement  {

    template () {

        return `
        <div class="gradient-sample-list">
            <h1>Basic gradient</h1>
            <div class='gradient-type' ref="$gradientType">
                <div>
                    <div class="gradient-item linear" data-type="linear" title="Linear"></div>
                    <div class="gradient-item radial" data-type="radial" title="Radial"></div>
                    <div class="gradient-item conic" data-type="conic" title="Conic"></div>                            
                    <div class="gradient-item static" data-type="static" title="Static"></div>                                                    
                </div>
                <div>
                    <div class="gradient-item repeating-linear" data-type="repeating-linear" title="Linear"></div>
                    <div class="gradient-item repeating-radial" data-type="repeating-radial" title="Radial"></div>
                    <div class="gradient-item repeating-conic" data-type="repeating-conic" title="Conic"></div>                            

                    <div class="gradient-item image" data-type="image" title="Image">
                        <div>
                            <div class="m1"></div>
                            <div class="m2"></div>
                            <div class="m3"></div> 
                        </div>
                    </div>                                                  
                </div>
            </div>
        </div>
        `  
    }

    [CLICK('$gradientType .gradient-item')] (e) {
        var image = editor.selection.layer.addBackgroundImage(new BackgroundImage({
            index: -1
        }));

        var type = e.$delegateTarget.attr('data-type');

        var gradient, GradientClass = GradientClassList[type];
        gradient = image.add(new GradientClass());
        gradient.addColorStep(new ColorStep({color: 'rgba(255, 255, 255, 0)', precent: 0}))
        gradient.addColorStep(new ColorStep({color: 'rgba(222, 222, 222, 1)', precent: 100}))

        image.select()
    }     

} 