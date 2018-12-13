import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_EDITOR, 
    CHANGE_IMAGE, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_IMAGE
} from '../../../types/event';
import { parseParamNumber } from '../../../../util/filter/functions';

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
        if (this.read('/selection/is/image')) return true; 
    }

    getCurrentXY(e, position) {

        if (e) {
            var xy = e.xy;

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

        var item = this.read('/selection/current/image');

        if (!item) return ''; 

        var x = parseParamNumber(item.backgroundPositionX);
        var y = parseParamNumber(item.backgroundPositionY);
        var width = parseParamNumber(item.backgroundSizeWidth);
        var height = parseParamNumber(item.backgroundSizeHeight);        

        return { x, y, width, height }

    }

    refreshUI (e) {
        var { minX, minY, maxX, maxY } = this.getRectangle()
        var {x, y, width, height} = this.getDefaultValue();

        if (e) {
            var [x , y] = this.getCurrentXY(e)

            x = Math.max(Math.min(maxX, x), minX)
            y = Math.max(Math.min(maxY, y), minY)
    
            var left = x - minX
            var top = y - minY 
    
        } else {

            var left = x
            var top = y; 
        }

        left = Math.floor(left);
        top = Math.floor(top);

        this.refs.$dragPointer.px('left', left);
        this.refs.$dragPointer.px('top', top);
        this.refs.$backgroundRect.px('left',left);
        this.refs.$backgroundRect.px('top',top);
        this.refs.$backgroundRect.px('width',width);
        this.refs.$backgroundRect.px('height',height);

        if (e) {

            this.setBackgroundPosition(left, top);
        }

    }

    setBackgroundPosition (backgroundPositionX, backgroundPositionY) {
        this.read('/selection/current/image/id', (id) => {
            this.commit(CHANGE_IMAGE, {id, backgroundPositionX, backgroundPositionY});
        });
    }

    [MULTI_EVENT(
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { 
        this.refresh() 
    }

    // Event Bindings 
    'pointerend document' (e) {
        this.isDown = false ;
    }

    'pointermove document' (e) {
        if (this.isDown) {
            this.refreshUI(e);
        }
    }

    'pointerstart $dragPointer' (e) {
        e.preventDefault();
        this.isDown = true; 
    }

    'pointerstart $el' (e) {
        this.isDown = true; 
        // this.refreshUI(e);        
    }    
}