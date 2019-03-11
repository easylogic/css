import UIElement, { EVENT } from "../../../util/UIElement";
import LayerView from "./panel/LayerView";
import ImageView from "./panel/ImageView";
import { CHANGE_EDITOR, CHANGE_SELECTION } from "../../types/event";
import { editor } from "../../../editor/editor";


export default class FeatureControl extends UIElement {

    template () {
        return `
            <div class='feature-control'>     
                <div class='feature layer-feature' data-type='layer'>
                    <LayerView />
                </div>                              
                <div class='feature image-feature' data-type='image'>
                    <ImageView />
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
        
        var selectedFeature = this.$el.$('.feature.selected');        
        if (selectedFeature) selectedFeature.removeClass('selected');

        var selectType = 'layer'; 

        if (editor.selection.currentImage) {
            selectType = 'image';
        } else {
            selectType = 'layer';
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