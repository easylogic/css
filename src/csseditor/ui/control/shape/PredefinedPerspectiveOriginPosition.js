import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_PAGE_TRANSFORM
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { percentUnit, valueUnit } from '../../../../util/css/types';
import { POSITION_RIGHT, POSITION_CENTER, POSITION_LEFT, POSITION_TOP, POSITION_BOTTOM } from '../../../module/ItemTypes';

const defined_position = {
    'to right': { 
        perspectiveOriginPositionX: valueUnit(POSITION_RIGHT), 
        perspectiveOriginPositionY: valueUnit(POSITION_CENTER)
    },
    'to left': { 
        perspectiveOriginPositionX: valueUnit(POSITION_LEFT), 
        perspectiveOriginPositionY: valueUnit(POSITION_CENTER)
    },
    'to top': { 
        perspectiveOriginPositionX: valueUnit(POSITION_CENTER), 
        perspectiveOriginPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom': { 
        perspectiveOriginPositionX: valueUnit(POSITION_CENTER), 
        perspectiveOriginPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top right': { 
        perspectiveOriginPositionX: valueUnit(POSITION_RIGHT), 
        perspectiveOriginPositionY: valueUnit(POSITION_TOP)
    },
    'to bottom right': { 
        perspectiveOriginPositionX: valueUnit(POSITION_RIGHT), 
        perspectiveOriginPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to bottom left': { 
        perspectiveOriginPositionX: valueUnit(POSITION_LEFT), 
        perspectiveOriginPositionY: valueUnit(POSITION_BOTTOM)
    },
    'to top left': { 
        perspectiveOriginPositionX: valueUnit(POSITION_LEFT), 
        perspectiveOriginPositionY: valueUnit(POSITION_TOP)
    }
}

export default class PredefinedPerspectiveOriginPosition extends UIElement {

    template () { 
        return `
            <div class="predefined-perspective-origin-position">
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
        if (!this.read('selection/is/page')) return false; 

        var page = this.read('selection/current/page')

        if (!page) return false; 

        return !!page.preserve
    }

    getPosition (type) {
        return defined_position[type] || {
            perspectiveOriginPositionX: percentUnit(0),
            perspectiveOriginPositionY: percentUnit(0)
        }
    }

    [CLICK('$el button') + SELF] (e) {
        this.read('selection/current/page/id', (id) => {
            var pos = this.getPosition(e.$delegateTarget.attr('data-value'))
            this.commit(CHANGE_PAGE_TRANSFORM, {id, ...pos})
        })
    }

    [EVENT(
        CHANGE_PAGE_TRANSFORM,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

}