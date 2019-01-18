import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE_LINEAR_ANGLE, 
    CHANGE_SELECTION,
    CHANGE_LAYER_ROTATE,
    CHANGE_TOOL
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { SELECTION_IS_LAYER, SELECTION_CURRENT_LAYER_ID } from '../../../types/SelectionTypes';

const DEFINED_ANGLES = {
    'to top': 0,
    'to top right': 45,    
    'to right': 90,
    'to bottom right': 135,    
    'to bottom': 180,
    'to bottom left': 225,    
    'to left': 270,
    'to top left' : 315

}

export default class PredefinedLayerAngle extends UIElement {

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
        if (!this.read(SELECTION_IS_LAYER)) return false;         

        return this.config('guide.angle')
    }

    
    [CLICK('$el button') + SELF] (e) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            var rotate = DEFINED_ANGLES[e.$delegateTarget.attr('data-value')];
            this.commit(CHANGE_LAYER_ROTATE, {id, rotate })
        })
    }

    [EVENT(
        CHANGE_LAYER_ROTATE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    [EVENT(CHANGE_TOOL)] () {
        this.refresh();
    }

}