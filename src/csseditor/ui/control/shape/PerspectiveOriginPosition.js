import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_SELECTION, CHANGE_PAGE_TRANSFORM, EVENT_CHANGE_PAGE_TRANSFORM } from '../../../types/event';
import { percent, percentUnit, unitValue } from '../../../../util/css/types';
import { POINTEREND, POINTERMOVE, POINTERSTART, DOUBLECLICK } from '../../../../util/Event';
import { defaultValue } from '../../../../util/functions/func';

const DEFINE_POSITIONS = { 
    'center': ['center', 'center'],
    'right': ['right', 'center'],
    'top': ['center', 'top'],
    'left': ['left', 'center'],
    'bottom': ['center', 'bottom']
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
        if (!this.read('/selection/is/page')) return false; 

        var page = this.read('/selection/current/page')
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
        if (typeof p == 'string' && DEFINE_POSITIONS[p]) {
            p = DEFINE_POSITIONS[p]
        } else if (typeof p === 'string') {
            p = p.split(' ');
        } else {
            p = [unitValue(p.perspectiveOriginPositionX), unitValue(p.perspectiveOriginPositionY)]
        }

        p = p.map((item, index) => {
            if (item == 'center') {
                if (index == 0) {
                    return minX + width/2
                } else if (index == 1) {
                    return minY + height/2
                }
            } else if (item === 'left') {
                return minX;
            } else if (item === 'right') {
                return maxX;
            } else if (item === 'top') {
                return minY;
            } else if (item === 'bottom') { 
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

        var item = this.read('/selection/current/page');

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
        this.read('/selection/current/page/id', (id) => {

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionX, perspectiveOriginPositionY});
        });
    }

    [MULTI_EVENT(
        EVENT_CHANGE_PAGE_TRANSFORM,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
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
        this.setPerspectiveOriginPosition('center')
        this.refreshUI()
    }
}