import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { CHANGE_EDITOR, CHANGE_IMAGE_RADIAL_POSITION, CHANGE_SELECTION, CHANGE_TOOL } from '../../../types/event';
import { CLICK } from '../../../../util/Event';
import { SELECTION_CURRENT_IMAGE_ID, SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE } from '../../../types/SelectionTypes';
import { IMAGE_TYPE_IS_RADIAL, IMAGE_TYPE_IS_CONIC } from '../../../types/ImageTypes';


export default class PredefinedRadialGradientPosition extends UIElement {

    template () {
        return ` 
            <div class="predefined-angluar-group radial-position">
                <button type="button" data-value="top"></button>                          
                <button type="button" data-value="left"></button>                                                  
                <button type="button" data-value="bottom"></button>                            
                <button type="button" data-value="right"></button>                                        
            </div>
        `
    }
    [CLICK('$el button')] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE_RADIAL_POSITION, {id, radialPosition: e.$delegateTarget.attr('data-value')})
        })
    }

    refresh () {
        this.$el.toggle(this.isShow())
    }

    isShow () {
        if (!this.read(SELECTION_IS_IMAGE)) return false; 

        var image = this.read(SELECTION_CURRENT_IMAGE)

        if (!image) { return false; }

        var isRadial = this.read(IMAGE_TYPE_IS_RADIAL, image.type);
        var isConic = this.read(IMAGE_TYPE_IS_CONIC, image.type);

        return this.config('guide.angle') && (isRadial || isConic);
    }

    [EVENT(
        CHANGE_IMAGE_RADIAL_POSITION,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_TOOL
    )] () { 
        this.refresh() 
    }

}