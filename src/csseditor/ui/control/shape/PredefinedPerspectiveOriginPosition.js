import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    CHANGE_PAGE_TRANSFORM,
    EVENT_CHANGE_PAGE_TRANSFORM
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { percentUnit, unit, valueUnit } from '../../../../util/css/types';

const defined_position = {
    'to right': { 
        perspectiveOriginPositionX: valueUnit('right'), 
        perspectiveOriginPositionY: valueUnit('center')
    },
    'to left': { 
        perspectiveOriginPositionX: valueUnit('left'), 
        perspectiveOriginPositionY: valueUnit('center')
    },
    'to top': { 
        perspectiveOriginPositionX: valueUnit('center'), 
        perspectiveOriginPositionY: valueUnit('top')
    },
    'to bottom': { 
        perspectiveOriginPositionX: valueUnit('center'), 
        perspectiveOriginPositionY: valueUnit('bottom')
    },
    'to top right': { 
        perspectiveOriginPositionX: valueUnit('right'), 
        perspectiveOriginPositionY: valueUnit('top')
    },
    'to bottom right': { 
        perspectiveOriginPositionX: valueUnit('right'), 
        perspectiveOriginPositionY: valueUnit('bottom')
    },
    'to bottom left': { 
        perspectiveOriginPositionX: valueUnit('left'), 
        perspectiveOriginPositionY: valueUnit('bottom')
    },
    'to top left': { 
        perspectiveOriginPositionX: valueUnit('left'), 
        perspectiveOriginPositionY: valueUnit('top')
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
        if (!this.read('/selection/is/page')) return false; 

        var page = this.read('/selection/current/page')

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
        this.read('/selection/current/page/id', (id) => {
            var pos = this.getPosition(e.$delegateTarget.attr('data-value'))
            this.commit(CHANGE_PAGE_TRANSFORM, {id, ...pos})
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_PAGE_TRANSFORM,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }

}