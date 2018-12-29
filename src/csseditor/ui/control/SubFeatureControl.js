import UIElement, { MULTI_EVENT } from "../../../colorpicker/UIElement";
import items from './panel/items/index';
import GradientAngle from "./shape/GradientAngle";
import GradientPosition from "./shape/GradientPosition";
import PredefinedLinearGradientAngle from "./shape/PredefinedLinearGradientAngle";
import PredefinedRadialGradientPosition from "./shape/PredefinedRadialGradientPosition";
import PredefinedRadialGradientAngle from "./shape/PredefinedRadialGradientAngle";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER, EVENT_CHANGE_PAGE } from "../../types/event";
import BackgroundResizer from "./shape/BackgroundResizer";
import PredefinedBackgroundPosition from "./shape/PredefinedBackgroundPosition";
import PredefinedPerspectiveOriginPosition from "./shape/PredefinedPerspectiveOriginPosition";
import PerspectiveOriginPosition from "./shape/PerspectiveOriginPosition";


export default class SubFeatureControl extends UIElement {

    template () {
        return `
            <div class='sub-feature-control'>         
                <div class='feature'>
                    <div class="property-view" ref="$perspective">
                        <PredefinedPerspectiveOriginPosition></PredefinedPerspectiveOriginPosition>
                        <PerspectiveOriginPosition></PerspectiveOriginPosition>
                    </div>
                    <div class="property-view" ref="$backgroundSize">
                        <PredefinedBackgroundPosition></PredefinedBackgroundPosition>
                        <BackgroundResizer></BackgroundResizer>
                    </div>
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
            PerspectiveOriginPosition,
            PredefinedPerspectiveOriginPosition,
            PredefinedRadialGradientAngle,
            GradientAngle, 
            GradientPosition, 
            PredefinedLinearGradientAngle, 
            PredefinedRadialGradientPosition, 
            BackgroundResizer,
            PredefinedBackgroundPosition,
            ...items
        } 
    }


    refresh () {
        this.$el.toggle(this.isShow())
        this.refs.$perspective.toggleClass('hide', this.isNotPage());
        this.refs.$backgroundSize.toggleClass('hide', this.isNotImage() )
        this.refs.$linear.toggleClass('hide', !this.isLinearShow())
        this.refs.$radial.toggleClass('hide', !this.isRadialShow())
    }


    isShow () {
        //if (!this.read('/selection/is/image')) return false;         
        return true;
    }

    isNotImage () {
        return this.read('/selection/is/image') == false;
    }

    isNotPage () {
        if (!this.read('/selection/is/page')) return true; 

        var item = this.read('/selection/current/page');
        if (!item) return true; 

        return !item.preserve
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
        EVENT_CHANGE_PAGE,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh(); }
} 