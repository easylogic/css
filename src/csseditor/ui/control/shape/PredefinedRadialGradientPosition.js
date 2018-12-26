import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_SELECTION } from '../../../types/event';
import { CLICK } from '../../../../util/Event';


export default class PredefinedRadialGradientPosition extends UIElement {

    template () {
        return ` 
            <div class="predefined-angluar-group radial-position">
                <button type="button" data-value="top"></button>                          
                <button type="button" data-value="left"></button>                                                  
                <button type="button" data-value="bottom"></button>                            
                <button type="button" data-value="right"></button>                                        
            </div>
        `
    }
    [CLICK('$el button')] (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE_RADIAL_POSITION, {id, radialPosition: e.$delegateTarget.attr('data-value')})
        })
    }

    refresh () {
        this.$el.toggle(this.isShow())
    }

    isShow () {
        if (!this.read('/selection/is/image')) return false; 

        var image = this.read('/selection/current/image')

        if (!image) { return false; }

        var isRadial = this.read('/image/type/isRadial', image.type);
        var isConic = this.read('/image/type/isConic', image.type);

        return this.read('/tool/get', 'guide.angle') && (isRadial || isConic);
    }

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE_RADIAL_POSITION,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        '@changeTool'
    )] () { 
        this.refresh() 
    }

}