import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, CHANGE_IMAGE_LINEAR_ANGLE, EVENT_CHANGE_IMAGE_LINEAR_ANGLE, EVENT_CHANGE_SELECTION} from '../../../types/event';


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

    'click $el button | self' (e) {
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