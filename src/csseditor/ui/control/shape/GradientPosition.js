import UIElement, { EVENT } from '../../../../util/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_IMAGE_RADIAL_POSITION, 
    CHANGE_SELECTION 
} from '../../../types/event';
import { EMPTY_STRING, WHITE_STRING } from '../../../../util/css/types';
import { POINTERSTART, DOUBLECLICK, MOVE } from '../../../../util/Event';
import { isString } from '../../../../util/functions/func';
import { Position } from '../../../../editor/unit/Length';
import { editor } from '../../../../editor/editor';

const DEFINE_POSITIONS = { 
    [Position.CENTER]: [Position.CENTER, Position.CENTER],
    [Position.RIGHT]: [Position.RIGHT, Position.CENTER],
    [Position.TOP]: [Position.CENTER, Position.TOP],
    [Position.LEFT]: [Position.LEFT, Position.CENTER],
    [Position.BOTTOM]: [Position.CENTER, Position.BOTTOM]
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
        var image = editor.selection.backgroundImage
        if (!image) return false; 

        var isRadial = image.image.isRadial()
        var isConic = image.image.isConic()

        if (isRadial == false && isConic == false) {    // radial , conic 만 보여주기 
            return false; 
        }

        return editor.config.get('guide.angle')
    }

    getCurrentXY(isUpdate, position) {

        if (isUpdate) {
            var xy = editor.config.get('pos');

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

        var image = editor.selection.backgroundImage
        if (!image) return EMPTY_STRING; 

        return image.image.radialPosition || EMPTY_STRING

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
                Length.percent( Math.floor(left/width * 100) ), 
                Length.percent( Math.floor(top/height * 100) )
            ]);
        }

    }

    setRadialPosition (radialPosition) {
        var image = editor.selection.backgroundImage; 
        if (image) {
            image.image.radialPosition = radialPosition
            editor.send(CHANGE_IMAGE_RADIAL_POSITION, image.image);
        }
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
        this.setRadialPosition(Position.CENTER)
        this.refreshUI()
    }
}