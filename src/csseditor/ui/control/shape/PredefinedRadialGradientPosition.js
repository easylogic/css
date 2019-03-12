import UIElement, { EVENT } from '../../../../util/UIElement';
import { CHANGE_EDITOR, CHANGE_IMAGE, CHANGE_SELECTION, CHANGE_TOOL } from '../../../types/event';
import { CLICK } from '../../../../util/Event';
import { editor } from '../../../../editor/editor';


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
        var image = editor.selection.backgroundImage
        if (image) {
            image.radialPosition = e.$delegateTarget.attr('data-value')
            editor.send(CHANGE_IMAGE, image);
        }
    }

    refresh () {
        this.$el.toggle(this.isShow())
    }

    isShow () {
        var image = editor.selection.backgroundImage
        if (!image) return false; 

        var isRadial = image.image.isRadial();
        var isConic = image.image.isConic();

        return editor.config.get('guide.angle') && (isRadial || isConic);
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_TOOL
    )] () { 
        this.refresh() 
    }

}