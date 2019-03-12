import UIElement, { EVENT } from "../../../util/UIElement";
import items from './panel/items/index';
import GradientAngle from "./shape/GradientAngle";
import GradientPosition from "./shape/GradientPosition";
import PredefinedLinearGradientAngle from "./shape/PredefinedLinearGradientAngle";
import PredefinedRadialGradientPosition from "./shape/PredefinedRadialGradientPosition";
import PredefinedRadialGradientAngle from "./shape/PredefinedRadialGradientAngle";
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_ARTBOARD } from "../../types/event";
import BackgroundResizer from "./shape/BackgroundResizer";
import PredefinedBackgroundPosition from "./shape/PredefinedBackgroundPosition";
import PredefinedPerspectiveOriginPosition from "./shape/PredefinedPerspectiveOriginPosition";
import PerspectiveOriginPosition from "./shape/PerspectiveOriginPosition";
import LayerAngle from "./shape/LayerAngle";
import PredefinedLayerAngle from "./shape/PredefinedLayerAngle";
import { editor } from "../../../editor/editor";


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
        return true;
    }

    isNotImage () {
        return !editor.selection.backgroundImage;
    }

    isNotLayer () {
        return !editor.selection.layer;
    }

    isNotPage () {
        return !editor.selection.artboard
    }

    isLinearShow () {
        var backgroundImage = editor.selection.backgroundImage; 
        if (!backgroundImage) return false; 

        var image = backgroundImage.image;
        if (!image) return false; 

        if (image.isLinear() == false && image.isConic() == false) {
            return false; 
        }

        return editor.config.get('guide.angle')
    }

    isRadialShow () {
        var backgroundImage = editor.selection.backgroundImage; 
        if (!backgroundImage) return false; 

        var image = backgroundImage.image;
        if (!image) return false; 

        if (image.isRadial() == false && image.isConic() == false) {
            return false; 
        }

        return editor.config.get('guide.angle')
    }

    [EVENT(
        CHANGE_ARTBOARD,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh(); }
} 