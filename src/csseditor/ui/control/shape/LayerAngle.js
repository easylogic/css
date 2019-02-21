import {getXYInCircle, caculateAngle} from '../../../../util/functions/math'
import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_ROTATE, CHANGE_TOOL } from '../../../types/event';
import { POINTERSTART, POINTEREND, POINTERMOVE, DEBOUNCE, IF } from '../../../../util/Event';
import { SELECTION_IS_LAYER, SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from '../../../types/SelectionTypes';
import { isUndefined } from '../../../../util/functions/func';

export default class LayerAngle extends UIElement {

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
        if (!this.read(SELECTION_IS_LAYER)) return false; 


        return this.config('guide.angle')
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
        var layer = this.read(SELECTION_CURRENT_LAYER);
        if (!layer) return -90
        if (isUndefined(layer.rotate)) return -90;
        
        return layer.rotate - 90
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

    setAngle (rotate) {

        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_ROTATE, {id, rotate});
        })

    }

    [EVENT(
        CHANGE_LAYER_ROTATE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

    [EVENT(CHANGE_TOOL)] () {
        this.$el.toggle(this.isShow())
    }

    isDownCheck () {
        return this.isDown;
    }

    isNotDownCheck () {
        return !this.isDown
    }

    // Event Bindings 
    [POINTEREND('document') + IF('isDownCheck')] (e) {
        this.isDown = false ;
    }

    [POINTERMOVE('document') + DEBOUNCE(10) + IF('isDownCheck')] (e) {
        this.refreshUI(e);
    }

    [POINTERSTART('$drag_pointer') + IF('isNotDownCheck')] (e) {
        e.preventDefault();
        this.isDown = true; 
    }

    [POINTERSTART('$dragAngle') + IF('isNotDownCheck')] (e) {
        this.isDown = true; 
        this.refreshUI(e);        
    }     

}