import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_IMAGE
} from '../../../types/event';
import { POINTERSTART, POINTERMOVE, POINTEREND, MOVE } from '../../../../util/Event';
import { defaultValue } from '../../../../util/functions/func';
import { percentUnit, EMPTY_STRING } from '../../../../util/css/types';
import { SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_IMAGE_ID } from '../../../types/SelectionTypes';

export default class BackgroundResizer extends UIElement {

    template () {
        return `
            <div class="background-resizer">
                <div ref="$dragPointer" class="drag-pointer"></div>
                <div ref="$backgroundRect" class='background-rect'></div>
            </div>
        `
    }

    refresh () {

        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if (isShow) {
            this.refreshUI()            
        }
    }

    isShow () {
        return this.read(SELECTION_IS_IMAGE);
    }

    getCurrentXY(isUpdate, position) {

        if (isUpdate) {
            var xy = this.config('pos');

            return [xy.x, xy.y]
        }

        return position; 
    }

    getRectangle () {
        var width = this.$el.width();  
        var height = this.$el.height();  
        var minX = this.$el.offsetLeft();
        var minY = this.$el.offsetTop();

        var maxX = minX + width; 
        var maxY = minY + height;

        return { minX, minY, maxX, maxY, width, height }
    }    

    getDefaultValue() {

        var item = this.read(SELECTION_CURRENT_IMAGE);

        if (!item) return EMPTY_STRING; 

        var x = defaultValue(item.backgroundPositionX, percentUnit(0)).value;
        var y = defaultValue(item.backgroundPositionY, percentUnit(0)).value;
        var width = defaultValue(item.backgroundSizeWidth, percentUnit(100)).value;
        var height = defaultValue(item.backgroundSizeHeight, percentUnit(100)).value;

        return { x, y, width, height }

    }

    refreshUI (isUpdate) {
        var { minX, minY, maxX, maxY } = this.getRectangle()
        var {x, y, width, height} = this.getDefaultValue();

        if (isUpdate) {
            var [x , y] = this.getCurrentXY(isUpdate)

            x = Math.max(Math.min(maxX, x), minX)
            y = Math.max(Math.min(maxY, y), minY)
    
            var left = x - minX
            var top = y - minY 
    
        } else {

            var left = minX + (maxX - minX) *  (x/100)
            var top = minY + (maxY - minY) *  (y/100); 
        }

        left = Math.floor(left);
        top = Math.floor(top);

        this.refs.$dragPointer.px('left', left);
        this.refs.$dragPointer.px('top', top);

        if (isUpdate) {
            var newLeft = (left / (maxX - minX)) * 100
            var newTop = (top / (maxY - minY)) * 100
            this.setBackgroundPosition( percentUnit(newLeft), percentUnit(newTop));
        }

    }

    setBackgroundPosition (backgroundPositionX, backgroundPositionY) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundPositionX, backgroundPositionY});
        });
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { 
        this.refresh() 
    }

    // Event Bindings 
    move () {
        this.refreshUI(true);
    }

    [POINTERSTART('$dragPointer') + MOVE()] (e) {
        e.preventDefault();
    }

    [POINTERSTART() + MOVE()] (e) {
    }    
}