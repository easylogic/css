import UIElement, { EVENT } from '../../../../util/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE, 
    CHANGE_SELECTION
} from '../../../types/event';
import { CLICK, SELF } from '../../../../util/Event';
import { editor } from '../../../../editor/editor';

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
        var image = editor.selection.backgroundImage;
        if (!image) { return false; }

        var isLinear = image.image.isLinear()
        var isConic = image.image.isConic()

        return editor.config.get('guide.angle') && (isLinear || isConic);
    }

    [CLICK('$el button') + SELF] (e) {
        var image = editor.selection.backgroundImage;
        if(image) {
            image.image.angle = e.$delegateTarget.attr('data-value')
            editor.send(CHANGE_IMAGE, image);
        }
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    [EVENT('changeTool')] () {
        this.refresh();
    }

}