import {getXYInCircle, caculateAngle} from '../../../../util/functions/math'
import UIElement from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, CHANGE_IMAGE_ANGLE, EVENT_CHANGE_IMAGE_ANGLE, EVENT_CHANGE_SELECTION } from '../../../types/event';

export default class GradientAngle extends UIElement {

    template () {
        return `
            <div class='drag-angle-rect'>
                <div class="drag-angle" ref="$dragAngle">
                    <div ref="$angleText" class="angle-text"></div>
                    <div ref="$dragPointer" class="drag-pointer"></div>
                </div>
            </div>
        `
    }

    refresh () {

        if (this.isShow()) {
            this.$el.show();

            this.refreshUI()            
        } else {
            this.$el.hide();
        }
    }

    isShow () {
        if (!this.read('/selection/is/image')) return false; 

        var item = this.read('/selection/current/image')

        if (!item) return false; 

        var isLinear = this.read('/image/type/isLinear', item.type)
        var isConic = this.read('/image/type/isConic', item.type)

        if (isLinear == false && isConic == false) {
            return false; 
        }

        return this.read('/tool/get', 'guide.angle')
    }

    getCurrentXY(e, angle, radius, centerX, centerY) {
        return e ? e.xy : getXYInCircle(angle, radius, centerX, centerY)
    }

    getRectangle () {
        var width = this.refs.$dragAngle.width();  
        var height = this.refs.$dragAngle.height();  
        var radius = Math.floor(width/2 * 0.7); 
        var {left, top} = this.refs.$dragAngle.offset();
        var minX = left; 
        var minY = top; 
        var centerX = minX + width / 2;
        var centerY = minY + height / 2;

        return { minX, minY, width, height, radius,  centerX, centerY }
    }    

    getDefaultValue() {
        var image = this.read('/selection/current/image');
        if (!image) return 0 

        var angle = this.read('/image/angle', image.angle) 
        return angle - 90
    }

    refreshAngleText (angleText) {
        this.refs.$angleText.text(angleText + ' °') 
    }

    refreshUI (e) {
        var { minX, minY, radius,  centerX, centerY } = this.getRectangle()
        var { x , y } = this.getCurrentXY(e, this.getDefaultValue(), radius, centerX, centerY)

        var rx = x - centerX, ry = y - centerY, angle = caculateAngle(rx, ry);

        {
            var { x, y } = this.getCurrentXY(null, angle, radius, centerX, centerY);
        }

        // set drag pointer position 
        this.refs.$dragPointer.px('left', x - minX);
        this.refs.$dragPointer.px('top', y - minY);

        var lastAngle = Math.round(angle + 90) % 360;

        this.refreshAngleText (lastAngle)

        if (e) {

            this.setAngle (lastAngle)
        }

    }

    setAngle (angle) {

        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE_ANGLE, {id, angle});
        })

    }

    [EVENT_CHANGE_IMAGE_ANGLE] () { this.refresh() } 
    [EVENT_CHANGE_EDITOR] () { this.refresh() } 
    [EVENT_CHANGE_SELECTION] () { this.refresh() }

    '@changeTool' () {
        this.$el.toggle(this.isShow())
    }

    isDownCheck () {
        return this.isDown;
    }

    isNotDownCheck () {
        return !this.isDown
    }

    // Event Bindings 
    'pointerend document | isDownCheck' (e) {
        this.isDown = false ;
    }

    'pointermove document | debounce(10) | isDownCheck' (e) {
        this.refreshUI(e);
    }

    'pointerstart $drag_pointer | isNotDownCheck' (e) {
        e.preventDefault();
        this.isDown = true; 
    }

    'pointerstart $dragAngle | isNotDownCheck' (e) {
        this.isDown = true; 
        this.refreshUI(e);        
    }     

}