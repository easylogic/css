import BasePropertyItem from './BasePropertyItem';
import { CHANGE_EDITOR, CHANGE_SELECTION } from '../../../../types/event';
import { CLICK } from '../../../../../util/Event';
import { EVENT } from '../../../../../colorpicker/UIElement';
import { SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE } from '../../../../module/SelectionTypes';
import { COLORSTEP_ORDERING_EQUALS, COLORSTEP_ORDERING_EQUALS_LEFT, COLORSTEP_ORDERING_EQUALS_RIGHT, COLORSTEP_CUT_OFF, COLORSTEP_CUT_ON } from '../../../../module/ColorStepTypes';
import { HISTORY_PUSH } from '../../../../module/HistoryTypes';
import { IMAGE_TYPE_IS_IMAGE } from '../../../../module/ImageTypes';

export default class ImageSorting extends BasePropertyItem {

    template () {  
        return `
        <div class='property-item image-sorting show'>
            <div class='items'>             
                <div>
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
        
        var isImage = this.read(SELECTION_IS_IMAGE);

        if (!isImage) return false; 

        var image = this.read(SELECTION_CURRENT_IMAGE);

        if (!image) return false;

        if (this.read(IMAGE_TYPE_IS_IMAGE, image.type)) {
            return false; 
        }

        return true; 
    }


    [CLICK('$ordering')] (e) {
        this.dispatch(COLORSTEP_ORDERING_EQUALS)
        this.dispatch(HISTORY_PUSH, `Ordering gradient` );        
    } 

    [CLICK('$orderingLeft')] (e) {
        this.dispatch(COLORSTEP_ORDERING_EQUALS_LEFT)
        this.dispatch(HISTORY_PUSH, `Ordering gradient` );        
    }    

    [CLICK('$orderingRight')] (e) {
        this.dispatch(COLORSTEP_ORDERING_EQUALS_RIGHT)
        this.dispatch(HISTORY_PUSH, `Ordering gradient` );        
    }        

    [CLICK('$cutOff')] (e) {
        this.dispatch(COLORSTEP_CUT_OFF)
        this.dispatch(HISTORY_PUSH, `Cut off static gradient pattern` );
    }

    [CLICK('$cutOn')] (e) {
        this.dispatch(COLORSTEP_CUT_ON)
        this.dispatch(HISTORY_PUSH, `Cut on static gradient pattern` );
    }    

}