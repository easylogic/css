
import BasePropertyItem from './BasePropertyItem';
import { CHANGE_IMAGE,  CHANGE_SELECTION } from '../../../../types/event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { CLICK, SELF, LOAD } from '../../../../../util/Event';
import { IMAGE_ITEM_TYPE_IMAGE } from '../../../../module/ItemTypes';
import { SELECTION_IS_IMAGE } from '../../../../module/SelectionTypes';

export default class BackgroundImage extends BasePropertyItem {

    template () { 
        return `
        <div class='property-item background-image'>
            <div class='title' ref="$title">Background Image</div>
            <div class='items'>         
                <div>
                    <img ref="$image" style="max-width: 100%; height: 100px" />
                </div>
            </div>
        </div>
        `
    }

    onToggleShow () {
        this.refresh();
    }


    isShow () {
        return false;
        // return this.read(SELECTION_IS_IMAGE, IMAGE_ITEM_TYPE_IMAGE);  
    }    

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if (isShow) {
            this.read(SELECTION_CURRENT_IMAGE, (image) => {
                this.refs.$image.attr('src', image.backgroundImageDataURI)
            })
    
        }
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_SELECTION
    )] () {
        if (this.isPropertyShow()) {
            this.refresh()
        }
    }


    [CLICK('$blendList .blend-item') + SELF] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundBlendMode: e.$delegateTarget.attr('data-mode')}, true)
            this.refresh();
        });
        
    }

}