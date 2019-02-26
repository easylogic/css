import UIElement, { EVENT } from '../../../../util/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE_RADIAL_POSITION, 
    CHANGE_SELECTION 
} from '../../../types/event';
import { percent, EMPTY_STRING, POSITION_CENTER, POSITION_RIGHT, POSITION_TOP, POSITION_LEFT, POSITION_BOTTOM, WHITE_STRING } from '../../../../util/css/types';
import { POINTEREND, POINTERMOVE, POINTERSTART, DOUBLECLICK, MOVE } from '../../../../util/Event';
import { isString } from '../../../../util/functions/func';
import { SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE, SELECTION_CURRENT_IMAGE_ID } from '../../../types/SelectionTypes';
import { IMAGE_TYPE_IS_RADIAL, IMAGE_TYPE_IS_CONIC } from '../../../../util/css/make';

const DEFINE_POSITIONS = { 
    [POSITION_CENTER]: [POSITION_CENTER, POSITION_CENTER],
    [POSITION_RIGHT]: [POSITION_RIGHT, POSITION_CENTER],
    [POSITION_TOP]: [POSITION_CENTER, POSITION_TOP],
    [POSITION_LEFT]: [POSITION_LEFT, POSITION_CENTER],
    [POSITION_BOTTOM]: [POSITION_CENTER, POSITION_BOTTOM]
}

export default class GradientPosition extends UIElement {

    template () {
        return `
            <div class="drag-position">
                <div ref="$dragPointer" class="drag-pointer"></div>
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
        if (!this.read(SELECTION_IS_IMAGE)) return false; 

        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) return false; 


        var isRadial = IMAGE_TYPE_IS_RADIAL(item.type);
        var isConic = IMAGE_TYPE_IS_CONIC(item.type);

        if (isRadial == false && isConic == false) {    // radial , conic 만 보여주기 
            return false; 
        }

        return this.config('guide.angle')
    }

    getCurrentXY(isUpdate, position) {

        if (isUpdate) {
            var xy = this.config('pos');

            return [xy.x, xy.y]
        }

        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()

        let p = position; 
        if (isString( p ) && DEFINE_POSITIONS[p]) {
            p = DEFINE_POSITIONS[p]
        } else if (isString (p)) {
            p = p.split(WHITE_STRING);
        }

        p = p.map((item, index) => {
            if (item == POSITION_CENTER) {
                if (index == 0) {
                    return minX + width/2
                } else if (index == 1) {
                    return minY + height/2
                }
            } else if (item === POSITION_LEFT) {
                return minX;
            } else if (item === POSITION_RIGHT) {
                return maxX;
            } else if (item === POSITION_TOP) {
                return minY;
            } else if (item === POSITION_BOTTOM) { 
                return maxY;
            } else {
                if (index == 0) {
                    return minX * width * (+item/100); 
                } else if (index == 1) {
                    return minY * height * (+item/100); 
                }
            }
        })
        
        return p; 
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

        return item.radialPosition || EMPTY_STRING

    }

    refreshUI (isUpdate) {
        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()
        var [x , y] = this.getCurrentXY(isUpdate, this.getDefaultValue())

        x = Math.max(Math.min(maxX, x), minX)
        y = Math.max(Math.min(maxY, y), minY)

        var left = x - minX
        var top = y - minY 

        this.refs.$dragPointer.px('left', left);
        this.refs.$dragPointer.px('top', top);

        if (isUpdate) {

            this.setRadialPosition([
                percent( Math.floor(left/width * 100) ), 
                percent( Math.floor(top/height * 100) )
            ]);
        }

    }

    setRadialPosition (radialPosition) {
        this.read(SELECTION_CURRENT_IMAGE_ID, (id) => {

            this.commit(CHANGE_IMAGE_RADIAL_POSITION, {id, radialPosition});
        });
    }

    [EVENT(
        CHANGE_IMAGE_RADIAL_POSITION,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { 
        this.refresh() 
    }

    [EVENT('changeTool')] () {
        this.$el.toggle(this.isShow())
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
    
    [DOUBLECLICK('$dragPointer')] (e) {
        e.preventDefault()
        this.setRadialPosition(POSITION_CENTER)
        this.refreshUI()
    }
}