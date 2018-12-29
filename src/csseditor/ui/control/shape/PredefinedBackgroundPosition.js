import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_IMAGE, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    CHANGE_IMAGE
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { valueUnit, pxUnit } from '../../../../util/css/types';

const defined_position = {
    'to right': { 
        backgroundPositionX: valueUnit('right'), 
        backgroundPositionY: valueUnit('center')
    },
    'to left': { 
        backgroundPositionX: valueUnit('left'), 
        backgroundPositionY: valueUnit('center')
    },
    'to top': { 
        backgroundPositionX: valueUnit('center'), 
        backgroundPositionY: valueUnit('top')
    },
    'to bottom': { 
        backgroundPositionX: valueUnit('center'), 
        backgroundPositionY: valueUnit('bottom')
    },
    'to top right': { 
        backgroundPositionX: valueUnit('right'), 
        backgroundPositionY: valueUnit('top')
    },
    'to bottom right': { 
        backgroundPositionX: valueUnit('right'), 
        backgroundPositionY: valueUnit('bottom')
    },
    'to bottom left': { 
        backgroundPositionX: valueUnit('left'), 
        backgroundPositionY: valueUnit('bottom')
    },
    'to top left': { 
        backgroundPositionX: valueUnit('left'), 
        backgroundPositionY: valueUnit('top')
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
        return this.read('/selection/is/image')
    }

    getPosition (type) {
        return defined_position[type] || {
            backgroundPositionX: valueUnit('center'),
            backgroundPositionY: valueUnit('center')
        }
    }

    [CLICK('$el button') + SELF] (e) {
        this.read('/selection/current/image/id', (id) => {
            var pos = this.getPosition(e.$delegateTarget.attr('data-value'))
            this.commit(CHANGE_IMAGE, {id, ...pos})
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }

}