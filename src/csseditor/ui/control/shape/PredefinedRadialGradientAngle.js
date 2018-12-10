import UIElement from '../../../../colorpicker/UIElement';
import { CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_IMAGE_RADIAL_TYPE, CHANGE_IMAGE_RADIAL_TYPE, EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from '../../../types/event';


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
        this.read('/selection/current/image', (image) => {
            this.refs.$select.val(image.radialType);
        })
    }

    [EVENT_CHANGE_IMAGE_RADIAL_POSITION] () { this.refresh(); }
    [EVENT_CHANGE_IMAGE_RADIAL_TYPE] () { this.refresh(); }    
    [EVENT_CHANGE_EDITOR] () { this.refresh(); }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }    

    'change $select' (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE_RADIAL_TYPE, {id, radialType: this.refs.$select.val()})
        });

    }

    'click $center' (e) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE_RADIAL_POSITION, {id, radialPosition: 'center'})
        });
    }
}