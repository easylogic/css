import UIElement, { MULTI_EVENT } from "../../../colorpicker/UIElement";
import items from './panel/items/index';
import GradientAngle from "./shape/GradientAngle";
import GradientPosition from "./shape/GradientPosition";
import PredefinedLinearGradientAngle from "./shape/PredefinedLinearGradientAngle";
import PredefinedRadialGradientPosition from "./shape/PredefinedRadialGradientPosition";
import PredefinedRadialGradientAngle from "./shape/PredefinedRadialGradientAngle";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../types/event";


export default class SubFeatureControl extends UIElement {

    template () {
        return `
            <div class='sub-feature-control'>         
                <div class='feature'>
                    <div class="property-view linear" ref="$linear">
                        <PredefinedLinearGradientAngle></PredefinedLinearGradientAngle>
                        <GradientAngle></GradientAngle>                            
                    </div>
                    <div class="property-view radial" ref="$radial">
                        <PredefinedRadialGradientAngle></PredefinedRadialGradientAngle>
                        <PredefinedRadialGradientPosition></PredefinedRadialGradientPosition>
                        <GradientPosition></GradientPosition>
                    </div>
                </div>
            </div>
        `
    }

    components () {
        return { 
            PredefinedRadialGradientAngle,
            GradientAngle, 
            GradientPosition, 
            PredefinedLinearGradientAngle, 
            PredefinedRadialGradientPosition, 
            ...items
        } 
    }


    refresh () {
        this.$el.toggle(this.isShow())
        this.refs.$linear.toggleClass('hide', !this.isLinearShow())
        this.refs.$radial.toggleClass('hide', !this.isRadialShow())
    }


    isShow () {
        //if (!this.read('/selection/is/image')) return false;         
        return true;
    }

    isLinearShow () {
        if (!this.read('/selection/is/image')) return false; 

        var item = this.read('/selection/current/image')

        if (!item) return false; 

        var isLinear = this.read('/image/type/isLinear', item.type)
        var isConic = this.read('/image/type/isConic', item.type)

        if (isLinear == false && isConic == false) {
            return false; 
        }

        return this.read('/tool/get', 'guide.angle')
    }

    isRadialShow () {
        if (!this.read('/selection/is/image')) return false; 

        var item = this.read('/selection/current/image')
        if (!item) return false; 

        var isRadial = this.read('/image/type/isRadial', item.type)
        var isConic = this.read('/image/type/isConic', item.type)

        if (isRadial == false && isConic == false) {
            return false; 
        }

        return this.read('/tool/get', 'guide.angle')
    }

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh(); }
} 