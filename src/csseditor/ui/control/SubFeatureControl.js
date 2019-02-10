import UIElement, { EVENT } from "../../../colorpicker/UIElement";
import items from './panel/items/index';
import GradientAngle from "./shape/GradientAngle";
import GradientPosition from "./shape/GradientPosition";
import PredefinedLinearGradientAngle from "./shape/PredefinedLinearGradientAngle";
import PredefinedRadialGradientPosition from "./shape/PredefinedRadialGradientPosition";
import PredefinedRadialGradientAngle from "./shape/PredefinedRadialGradientAngle";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_PAGE } from "../../types/event";
import BackgroundResizer from "./shape/BackgroundResizer";
import PredefinedBackgroundPosition from "./shape/PredefinedBackgroundPosition";
import PredefinedPerspectiveOriginPosition from "./shape/PredefinedPerspectiveOriginPosition";
import PerspectiveOriginPosition from "./shape/PerspectiveOriginPosition";
import { SELECTION_CURRENT_PAGE, SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE, SELECTION_IS_LAYER } from "../../types/SelectionTypes";
import LayerAngle from "./shape/LayerAngle";
import PredefinedLayerAngle from "./shape/PredefinedLayerAngle";
import { IMAGE_TYPE_IS_LINEAR, IMAGE_TYPE_IS_CONIC, IMAGE_TYPE_IS_RADIAL } from "../../../util/css/make";


export default class SubFeatureControl extends UIElement {

    template () {
        return `
            <div class='sub-feature-control'>         
                <div class='feature'>
                    <div class="property-view" ref="$perspective">
                        <PredefinedPerspectiveOriginPosition />
                        <PerspectiveOriginPosition />
                    </div>
                    <div class="property-view" ref="$backgroundSize">
                        <PredefinedBackgroundPosition />
                        <BackgroundResizer />
                    </div>
                    <div class="property-view linear" ref="$linear">
                        <PredefinedLinearGradientAngle />
                        <GradientAngle />
                    </div>
                    <div class="property-view radial" ref="$radial">
                        <PredefinedRadialGradientAngle />
                        <PredefinedRadialGradientPosition />
                        <GradientPosition />
                    </div>
                    <div class="property-view layer" ref="$layer">
                        <PredefinedLayerAngle />
                        <LayerAngle />
                    </div>                    
                </div>
            </div>
        `
    }

    components () {
        return { 
            PredefinedLayerAngle,
            LayerAngle,
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
        this.refs.$layer.toggleClass('hide', this.isNotLayer())
    }


    isShow () {
        //if (!this.read(SELECTION_IS_IMAGE)) return false;         
        return true;
    }

    isNotImage () {
        return this.read(SELECTION_IS_IMAGE) == false;
    }

    isNotLayer () {
        return this.read(SELECTION_IS_LAYER) == false;
    }

    isNotPage () {
        if (!this.read('selection/is/page')) return true; 

        var item = this.read(SELECTION_CURRENT_PAGE);
        if (!item) return true; 

        return !item.preserve
    }

    isLinearShow () {
        if (!this.read(SELECTION_IS_IMAGE)) return false; 

        var item = this.read(SELECTION_CURRENT_IMAGE)

        if (!item) return false; 

        var isLinear = IMAGE_TYPE_IS_LINEAR(item.type)
        var isConic = IMAGE_TYPE_IS_CONIC(item.type)

        if (isLinear == false && isConic == false) {
            return false; 
        }

        return this.config('guide.angle')
    }

    isRadialShow () {
        if (!this.read(SELECTION_IS_IMAGE)) return false; 

        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) return false; 

        var isRadial = IMAGE_TYPE_IS_RADIAL(item.type)
        var isConic = IMAGE_TYPE_IS_CONIC(item.type)

        if (isRadial == false && isConic == false) {
            return false; 
        }

        return this.config('guide.angle')
    }

    [EVENT(
        CHANGE_PAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh(); }
} 