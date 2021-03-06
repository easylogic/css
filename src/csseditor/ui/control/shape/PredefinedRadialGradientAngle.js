import UIElement, { EVENT } from '../../../../util/UIElement';
import { CHANGE_IMAGE_RADIAL_POSITION, CHANGE_IMAGE_RADIAL_TYPE, CHANGE_EDITOR, CHANGE_SELECTION } from '../../../types/event';
import { CLICK, CHANGE } from '../../../../util/Event';
import { SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_IMAGE_ID } from '../../../types/SelectionTypes';
import { POSITION_CENTER } from '../../../../util/css/types';


export default class PredefinedRadialGradientAngle extends UIElement {

    template () { 
        return `
            <div class="predefined-radial-gradient-angle">
                <button ref="$center" type="button" data-value="center" title="center"><span class='circle'></span></button>            
                <select class="radial-type-list" ref="$select">
                    <option value="ellipse">ellipse</option>                
                    <option value="closest-side">closest-side</option> 
                    <option value="closest-corner">closest-corner</option>
                    <option value="farthest-side">farthest-side</option>
                    <option value="farthest-corner">farthest-corner</option>                    
                    <option value="circle">circle</option>
                    <option value="circle closest-side">circle closest-side</option> 
                    <option value="circle closest-corner">circle closest-corner</option>
                    <option value="circle farthest-side">circle farthest-side</option>
                    <option value="circle farthest-corner">circle farthest-corner</option>                                        
                </select>
            </div>
        `
    }

    refresh () {
        this.read(SELECTION_CURRENT_IMAGE, (image) => {
            this.refs.$select.val(image.radialType);
        })
    }

    [EVENT(
        CHANGE_IMAGE_RADIAL_POSITION,
        CHANGE_IMAGE_RADIAL_TYPE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    [CHANGE('$select')] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE_RADIAL_TYPE, {id, radialType: this.refs.$select.val()})
        });

    }

    [CLICK('$center')] (e) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE_RADIAL_POSITION, {id, radialPosition:  POSITION_CENTER})
        });
    }
}