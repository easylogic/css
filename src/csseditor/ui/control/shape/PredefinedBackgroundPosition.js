import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_IMAGE
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { valueUnit } from '../../../../util/css/types';
import { POSITION_CENTER, POSITION_RIGHT, POSITION_LEFT, POSITION_TOP, POSITION_BOTTOM } from '../../../module/ItemTypes';
import { SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE_ID } from '../../../module/SelectionTypes';

const defined_position = {
    'to right': { 
        backgroundPositionX: valueUnit(POSITION_RIGHT), 
        backgroundPositionY: valueUnit(POSITION_CENTER)
    },
    'to left': { 
        backgroundPositionX: valueUnit(POSITION_LEFT), 
        backgroundPositionY: valueUnit(POSITION_CENTER)
    },
    'to top': { 
        backgroundPositionX: valueUnit(POSITION_CENTER), 
        backgroundPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom': { 
        backgroundPositionX: valueUnit(POSITION_CENTER), 
        backgroundPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top right': { 
        backgroundPositionX: valueUnit(POSITION_RIGHT), 
        backgroundPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom right': { 
        backgroundPositionX: valueUnit(POSITION_RIGHT), 
        backgroundPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to bottom left': { 
        backgroundPositionX: valueUnit(POSITION_LEFT), 
        backgroundPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top left': { 
        backgroundPositionX: valueUnit(POSITION_LEFT), 
        backgroundPositionY: valueUnit(POSITION_TOP)
    }
}

export default class PredefinedBackgroundPosition extends UIElement {

    template () { 
        return `
            <div class="predefined-background-position">
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
        return this.read(SELECTION_IS_IMAGE)
    }

    getPosition (type) {
        return defined_position[type] || {
            backgroundPositionX: valueUnit(POSITION_CENTER),
            backgroundPositionY: valueUnit(POSITION_CENTER)
        }
    }

    [CLICK('$el button') + SELF] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            var pos = this.getPosition(e.$delegateTarget.attr('data-value'))
            this.commit(CHANGE_IMAGE, {id, ...pos})
        })
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

}