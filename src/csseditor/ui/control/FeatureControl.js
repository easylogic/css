import UIElement from "../../../colorpicker/UIElement";
import LayerView from "./panel/LayerView";
import ImageView from "./panel/ImageView";


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
        var obj = this.read('/item/current')
        var selectedFeature = this.$el.$('.feature.selected');
        
        if (selectedFeature) selectedFeature.removeClass('selected');

        var selectType = 'layer'; 

        if (obj.itemType == 'layer') {
            selectType = 'layer';
        } else if (obj.itemType == 'image') {
            selectType = 'image';
        }

        this.$el.$(`.feature[data-type=${selectType}]`).addClass('selected')

    }

    '@changeEditor' () {
        this.selectFeature()
    }
}