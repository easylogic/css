import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE_LINEAR_ANGLE, 
    CHANGE_SELECTION
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';

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
        if (!this.read('selection/is/image')) return false;         
        var image = this.read('selection/current/image')

        if (!image) { return false; }

        var isLinear = this.read('image/type/isLinear', image.type);
        var isConic = this.read('image/type/isConic', image.type);

        return this.read('tool/get', 'guide.angle') && (isLinear || isConic);
    }

    
    [CLICK('$el button') + SELF] (e) {
        this.read('selection/current/image/id', (id) => {
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