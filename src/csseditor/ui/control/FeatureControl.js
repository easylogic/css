import UIElement, { EVENT } from "../../../colorpicker/UIElement";
import LayerView from "./panel/LayerView";
import ImageView from "./panel/ImageView";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../types/event";
import { SELECTION_CURRENT, SELECTION_IS_LAYER, SELECTION_IS_GROUP, SELECTION_IS_IMAGE } from "../../types/SelectionTypes";


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

        var item = this.read(SELECTION_CURRENT);

        if (!item.length) return false; 
        
        var selectedFeature = this.$el.$('.feature.selected');
        
        if (selectedFeature) selectedFeature.removeClass('selected');

        var selectType = 'layer'; 

        if (this.read(SELECTION_IS_LAYER) || this.read(SELECTION_IS_GROUP)) {
            selectType = 'layer';
        } else if (this.read(SELECTION_IS_IMAGE)) {
            selectType = 'image';
        }

        this.$el.$(`.feature[data-type=${selectType}]`).addClass('selected')

    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.selectFeature();
    }
}