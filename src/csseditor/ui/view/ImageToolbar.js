import UIElement, { MULTI_EVENT } from '../../../colorpicker/UIElement';

import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_LAYER_BACKGROUND_COLOR, 
    EVENT_CHANGE_LAYER_CLIPPATH, 
    EVENT_CHANGE_LAYER_FILTER, 
    EVENT_CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_LAYER_RADIUS, 
    EVENT_CHANGE_LAYER_SIZE, 
    EVENT_CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_IMAGE, 
    EVENT_CHANGE_IMAGE_COLOR, 
    EVENT_CHANGE_IMAGE_RADIAL_POSITION, 
    EVENT_CHANGE_IMAGE_RADIAL_TYPE, 
    EVENT_CHANGE_LAYER_TRANSFORM_3D, 
    EVENT_CHANGE_IMAGE_ANGLE, 
    EVENT_CHANGE_IMAGE_LINEAR_ANGLE, 
    EVENT_CHANGE_COLOR_STEP, 
    EVENT_CHANGE_PAGE_SIZE, 
    EVENT_CHANGE_PAGE, 
    EVENT_CHANGE_LAYER_MOVE, 
    EVENT_CHANGE_LAYER_ROTATE,
    EVENT_CHANGE_LAYER_OPACITY,
    EVENT_CHANGE_SELECTION
} from '../../types/event';import { CLICK } from '../../../util/Event';
s

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
    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )]() { 
        this.refresh(); 
    }

    refresh() {
        this.$el.toggle(this.isShow())
    }

    isShow() {
        return this.read('/selection/is/image');
    }


    [CLICK('$ordering')] (e) {
        this.dispatch('/colorstep/ordering/equals')
        this.dispatch('/history/push', `Ordering gradient` );        
    } 

    [CLICK('$orderingLeft')] (e) {
        this.dispatch('/colorstep/ordering/equals/left')
        this.dispatch('/history/push', `Ordering gradient` );        
    }    

    [CLICK('$orderingRight')] (e) {
        this.dispatch('/colorstep/ordering/equals/right')
        this.dispatch('/history/push', `Ordering gradient` );        
    }        

    [CLICK('$cutOff')] (e) {
        this.dispatch('/colorstep/cut/off')
        this.dispatch('/history/push', `Cut off static gradient pattern` );
    }

    [CLICK('$cutOn')] (e) {
        this.dispatch('/colorstep/cut/on')
        this.dispatch('/history/push', `Cut on static gradient pattern` );
    }    

}