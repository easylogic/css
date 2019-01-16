import UIElement, { EVENT } from '../../../colorpicker/UIElement';

import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION
} from '../../types/event';
import { CLICK } from '../../../util/Event';
import { HISTORY_PUSH } from '../../module/HistoryTypes';

export default class ImageToolbar extends UIElement {

    template () {  
        return `
            <div class='image-toolbar'>            
                <div class="step-align">
                    <label>Sorting</label>
                    <div class="button-group">
                        <button ref="$ordering" title="Full Ordering">=|=</button>
                        <button ref="$orderingLeft" title="Left Ordering">=|</button>
                        <button ref="$orderingRight" title="Right Ordering">|=</button>
                    </div>

                    <label>Cutting</label>
                    <div class="button-group">
                        <button class="cut" ref="$cutOff" title="Cut Off"></button>
                        <button class="cut on" ref="$cutOn" title="Cut On"></button>
                    </div>      
                </div>
                                
            </div>
        `
    }

    // indivisual layer effect 
    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )]() { 
        this.refresh(); 
    }

    refresh() {
        this.$el.toggle(this.isShow())
    }

    isShow() {
        return this.read(SELECTION_IS_IMAGE);
    }


    [CLICK('$ordering')] (e) {
        this.dispatch('colorstep/ordering/equals')
        this.dispatch(HISTORY_PUSH, `Ordering gradient` );        
    } 

    [CLICK('$orderingLeft')] (e) {
        this.dispatch('colorstep/ordering/equals/left')
        this.dispatch(HISTORY_PUSH, `Ordering gradient` );        
    }    

    [CLICK('$orderingRight')] (e) {
        this.dispatch('colorstep/ordering/equals/right')
        this.dispatch(HISTORY_PUSH, `Ordering gradient` );        
    }        

    [CLICK('$cutOff')] (e) {
        this.dispatch('colorstep/cut/off')
        this.dispatch(HISTORY_PUSH, `Cut off static gradient pattern` );
    }

    [CLICK('$cutOn')] (e) {
        this.dispatch('colorstep/cut/on')
        this.dispatch(HISTORY_PUSH, `Cut on static gradient pattern` );
    }    

}