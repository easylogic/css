import UIElement, { MULTI_EVENT, PIPE } from '../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_IMAGE, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    CHANGE_IMAGE
} from '../../../types/event';
import { CLICK } from '../../../../util/Event';
import { SELF } from '../../../../util/EventMachin';

const defined_position = {
    'to right': { 
        backgroundPositionX: 'right', 
        backgroundPositionY: 'center'
    },
    'to left': { 
        backgroundPositionX: 'left', 
        backgroundPositionY: 'center'
    },
    'to top': { 
        backgroundPositionX: 'center', 
        backgroundPositionY: 'top'
    },
    'to bottom': { 
        backgroundPositionX: 'center', 
        backgroundPositionY: 'bottom'
    },
    'to top right': { 
        backgroundPositionX: 'right', 
        backgroundPositionY: 'top'
    },
    'to bottom right': { 
        backgroundPositionX: 'right', 
        backgroundPositionY: 'bottom'
    },
    'to bottom left': { 
        backgroundPositionX: 'left', 
        backgroundPositionY: 'bottom'
    },
    'to top left': { 
        backgroundPositionX: 'left', 
        backgroundPositionY: 'top'
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
            backgroundPositionX: '0px',
            backgroundPositionY: '0px'
        }
    }

    [PIPE(
        CLICK('$el button'),
        SELF()
    )] (e) {
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