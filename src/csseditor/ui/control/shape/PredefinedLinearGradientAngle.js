import UIElement, { EVENT } from '../../../../util/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE_LINEAR_ANGLE, 
    CHANGE_SELECTION
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_IMAGE_ID } from '../../../types/SelectionTypes';
import { IMAGE_TYPE_IS_LINEAR, IMAGE_TYPE_IS_CONIC } from '../../../../util/css/make';

export default class PredefinedLinearGradientAngle extends UIElement {

    template () { 
        return `
            <div class="predefined-angluar-group">
                <button type="button" data-value="to right"></button>                          
                <button type="button" data-value="to left"></button>                                                  
                <button type="button" data-value="to top"></button>                            
                <button type="button" data-value="to bottom"></button>                                        
                <button type="button" data-value="to top right"></button>                                
                <button type="button" data-value="to bottom right"></button>                                    
                <button type="button" data-value="to bottom left"></button>
                <button type="button" data-value="to top left"></button>
            </div>
        `
    }

    refresh () {
        this.$el.toggle(this.isShow())
    }


    isShow () {
        if (!this.read(SELECTION_IS_IMAGE)) return false;         
        var image = this.read(SELECTION_CURRENT_IMAGE)

        if (!image) { return false; }

        var isLinear = IMAGE_TYPE_IS_LINEAR(image.type);
        var isConic = IMAGE_TYPE_IS_CONIC(image.type);

        return this.config('guide.angle') && (isLinear || isConic);
    }

    
    [CLICK('$el button') + SELF] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE_LINEAR_ANGLE, {id, angle: e.$delegateTarget.attr('data-value')})
        })
    }

    [EVENT(
        CHANGE_IMAGE_LINEAR_ANGLE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    [EVENT('changeTool')] () {
        this.refresh();
    }

}