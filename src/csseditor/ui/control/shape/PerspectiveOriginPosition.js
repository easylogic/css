import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_PAGE_TRANSFORM 
} from '../../../types/event';
import { percentUnit, unitValue, valueUnit } from '../../../../util/css/types';
import { POINTEREND, POINTERMOVE, POINTERSTART, DOUBLECLICK } from '../../../../util/Event';
import { defaultValue, isString } from '../../../../util/functions/func';
import { POSITION_CENTER, POSITION_RIGHT, POSITION_TOP, POSITION_LEFT, POSITION_BOTTOM } from '../../../module/ItemTypes';

const DEFINE_POSITIONS = { 
    [POSITION_CENTER]: [POSITION_CENTER, POSITION_CENTER],
    [POSITION_RIGHT]: [POSITION_RIGHT, POSITION_CENTER],
    [POSITION_TOP]: [POSITION_CENTER, POSITION_TOP],
    [POSITION_LEFT]: [POSITION_LEFT, POSITION_CENTER],
    [POSITION_BOTTOM]: [POSITION_CENTER, POSITION_BOTTOM]
}

export default class PerspectiveOriginPosition extends UIElement {

    template () {
        return `
            <div class="perspective-drag-position">
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
        if (!this.read('selection/is/page')) return false; 

        var page = this.read('selection/current/page')
        if (!page) return false; 

        return !!page.preserve;  
    }

    getCurrentXY(e, position) {

        if (e) {
            var xy = e.xy;

            return [xy.x, xy.y]
        }

        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()

        let p = position; 
        if (isString(p) && DEFINE_POSITIONS[p]) {
            p = DEFINE_POSITIONS[p]
        } else if (isString(p)) {
            p = p.split(' ');
        } else {
            p = [unitValue(p.perspectiveOriginPositionX), unitValue(p.perspectiveOriginPositionY)]
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
                    return minX + width * (+item/100); 
                } else if (index == 1) {
                    return minY + height * (+item/100); 
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

        var item = this.read('selection/current/page');

        if (!item) return ''; 

        return {
            perspectiveOriginPositionX: defaultValue(item.perspectiveOriginPositionX, percentUnit(0)),
            perspectiveOriginPositionY: defaultValue(item.perspectiveOriginPositionY, percentUnit(0))
         } || ''

    }

    refreshUI (e) {
        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()
        var [x , y] = this.getCurrentXY(e, this.getDefaultValue())

        x = Math.max(Math.min(maxX, x), minX)
        y = Math.max(Math.min(maxY, y), minY)

        var left = x - minX
        var top = y - minY 

        this.refs.$dragPointer.px('left', left);
        this.refs.$dragPointer.px('top', top);

        if (e) {

            this.setPerspectiveOriginPosition(
                percentUnit( Math.floor(left/width * 100) ), 
                percentUnit( Math.floor(top/height * 100) )
            );
        }

    }

    setPerspectiveOriginPosition (perspectiveOriginPositionX, perspectiveOriginPositionY) {
        this.read('selection/current/page/id', (id) => {
            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionX, perspectiveOriginPositionY});
        });
    }

    [EVENT(
        CHANGE_PAGE_TRANSFORM,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { 
        this.refresh() 
    }

    // Event Bindings 
    [POINTEREND('document')] (e) {
        this.isDown = false ;
    }

    [POINTERMOVE('document')] (e) {
        if (this.isDown) {
            this.refreshUI(e);
        }
    }

    [POINTERSTART('$dragPointer')] (e) {
        e.preventDefault();
        this.isDown = true; 
    }

    [POINTERSTART()] (e) {
        this.isDown = true; 
        // this.refreshUI(e);        
    }    
    
    [DOUBLECLICK('$dragPointer')] (e) {
        e.preventDefault()
        this.setPerspectiveOriginPosition(valueUnit(POSITION_CENTER), valueUnit(POSITION_CENTER))
        this.refreshUI()
    }
}