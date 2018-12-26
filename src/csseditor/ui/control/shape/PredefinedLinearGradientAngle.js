import UIElement, { MULTI_EVENT, PIPE } from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, CHANGE_IMAGE_LINEAR_ANGLE, EVENT_CHANGE_IMAGE_LINEAR_ANGLE, EVENT_CHANGE_SELECTION} from '../../../types/event';
import { CLICK } from '../../../../util/Event';
import { SELF } from '../../../../util/EventMachin';


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
        if (!this.read('/selection/is/image')) return false;         
        var image = this.read('/selection/current/image')

        if (!image) { return false; }

        var isLinear = this.read('/image/type/isLinear', image.type);
        var isConic = this.read('/image/type/isConic', image.type);

        return this.read('/tool/get', 'guide.angle') && (isLinear || isConic);
    }

    
    [PIPE(
        CLICK('$el button'),
        SELF()
     )] (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE_LINEAR_ANGLE, {id, angle: e.$delegateTarget.attr('data-value')})
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE_LINEAR_ANGLE,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }

    '@changeTool' () {
        this.refresh();
    }

}