import UIElement from "../../../colorpicker/UIElement";
import LayerView from "./panel/LayerView";
import ImageView from "./panel/ImageView";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../types/event";


export default class FeatureControl extends UIElement {

    template () {
        return `
            <div class='feature-control'>     
                <div class='feature layer-feature' data-type='layer'>
                    <LayerView></LayerView>
                </div>                              
                <div class='feature image-feature' data-type='image'>
                    <ImageView></ImageView>
                </div>
            </div>
        `
    }

    components () {
        return { 
            LayerView,
            ImageView
        } 
    }

    selectFeature () {

        var item = this.read('/selection/current');

        if (!item.length) return false; 
        
        var selectedFeature = this.$el.$('.feature.selected');
        
        if (selectedFeature) selectedFeature.removeClass('selected');

        var selectType = 'layer'; 

        if (this.read('/selection/is/layer') || this.read('/selection/is/group')) {
            selectType = 'layer';
        } else if (this.read('/selection/is/image')) {
            selectType = 'image';
        }

        this.$el.$(`.feature[data-type=${selectType}]`).addClass('selected')

    }

    [EVENT_CHANGE_EDITOR] () {
        this.selectFeature()
    }

    [EVENT_CHANGE_SELECTION] () {
        this.selectFeature();
    }
}