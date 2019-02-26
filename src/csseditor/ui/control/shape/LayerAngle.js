import {getXYInCircle, caculateAngle} from '../../../../util/functions/math'
import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { CHANGE_EDITOR, CHANGE_SELECTION, CHANGE_LAYER_ROTATE, CHANGE_TOOL } from '../../../types/event';
import { POINTERSTART, MOVE } from '../../../../util/Event';
import { SELECTION_IS_LAYER, SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER, SELECTION_IDS } from '../../../types/SelectionTypes';
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

    getCurrentXY(isUpdate, angle, radius, centerX, centerY) {
        return isUpdate ? this.config('pos') : getXYInCircle(angle, radius, centerX, centerY)
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

    refreshUI (isUpdate) {
        var { minX, minY, radius,  centerX, centerY } = this.getRectangle()
        var { x , y } = this.getCurrentXY(isUpdate, this.getDefaultValue(), radius, centerX, centerY)

        var rx = x - centerX, ry = y - centerY, angle = caculateAngle(rx, ry);

        {
            var { x, y } = this.getCurrentXY(null, angle, radius, centerX, centerY);
        }

        // set drag pointer position 
        this.refs.$dragPointer.px('left', x - minX);
        this.refs.$dragPointer.px('top', y - minY);

        var lastAngle = Math.round(angle + 90) % 360;

        this.refreshAngleText (lastAngle)

        if (isUpdate) {

            this.setAngle (lastAngle)
        }

    }

    setAngle (rotate) {
        this.read(SELECTION_IDS).forEach( id => {
            var newRotate = (this.cachedRotate[id] + (rotate - this.cachedRotate[id]) ) % 360
            this.commit(CHANGE_LAYER_ROTATE, {id, rotate: newRotate});
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

    // Event Bindings 
    move () {
        this.refreshUI(true);
    }

    [POINTERSTART('$dragAngle') + MOVE()] (e) {
        this.cachedRotate = {}
        this.read(SELECTION_IDS).forEach( id => {
            this.cachedRotate[id] = this.get(id).rotate || 0;
        })
        this.refreshUI(e);        
    }     

}