import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER, 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_SIZE 
} from "../../../../types/event";
import { defaultValue } from "../../../../../util/functions/func";
import { percentUnit, value2px, CLIP_PATH_TYPE_INSET } from "../../../../../util/css/types";
import { px2percent } from "../../../../../util/filter/functions";
import { POINTEREND, POINTERMOVE, POINTERSTART } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";

export default class InsetEditor extends UIElement {

    template () {
        return `
            <div class='layer-shape-inset-editor'>
                <div class="drag-item top" data-type="top" ref="$top"></div>
                <div class="drag-item left" data-type="left" ref="$left"></div>
                <div class="drag-item right" data-type="right" ref="$right"></div>
                <div class="drag-item bottom" data-type="bottom" ref="$bottom"></div>
            </div>
        `
    }

    refresh () {
        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if (isShow) {
            this.cachedRectangle = false;       

            this.refreshPointer()
        }

    }

    refreshPointer () {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {

            if (layer.clipPathType !== CLIP_PATH_TYPE_INSET) return;

            var { width, height } = this.getRectangle()

            var top = defaultValue(layer.clipPathInsetTop, percentUnit(0));
            var left = defaultValue(layer.clipPathInsetLeft, percentUnit(0));
            var right = defaultValue(layer.clipPathInsetRight, percentUnit(0));
            var bottom = defaultValue(layer.clipPathInsetBottom, percentUnit(0));

            var topValue = value2px(top, height)
            var leftValue = value2px(left, width)
            var rightValue = value2px(percentUnit(100 - right.value) , width)
            var bottomValue = value2px(percentUnit( 100 - bottom.value), height)

            var centerX = leftValue + (rightValue - leftValue)/2; 
            var centerY = topValue + (bottomValue - topValue)/2; 

            this.refs.$top.px('top', topValue);
            this.refs.$top.px('left', centerX);

            this.refs.$left.px('top', centerY);
            this.refs.$left.px('left', leftValue);

            this.refs.$right.px('top', centerY);
            this.refs.$right.px('left', rightValue);

            this.refs.$bottom.px('left', centerX);            
            this.refs.$bottom.px('top', bottomValue);
        })
    }

    isShow () {
        var item = this.read(SELECTION_CURRENT_LAYER)

        if (!item) return false; 

        return item.clipPathType == CLIP_PATH_TYPE_INSET && !!item.showClipPathEditor; ; 
    }

    getRectangle () {

        if (!this.cachedRectangle) {
            var width = this.$el.width();  
            var height = this.$el.height();  
            var minX = this.$el.offsetLeft();
            var minY = this.$el.offsetTop();
    
            var maxX = minX + width; 
            var maxY = minY + height;            
            this.cachedRectangle = { minX, minY, maxX, maxY, width, height }
        }
        

        return this.cachedRectangle;
    }    

    refreshUI (e) {
        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()
        var {x , y} = e.xy;

        x = Math.max(Math.min(maxX, x), minX)
        y = Math.max(Math.min(maxY, y), minY)

        if (this.currentType == 'top' || this.currentType == 'bottom') {
            var top = y - minY  
            this.refs['$' + this.currentType].px('top', top);            
        } else {
            var left = x - minX
            this.refs['$' + this.currentType].px('left', left);
        }

        if (e) {
            
            if (this.currentType == 'top' || this.currentType == 'bottom') {
                this[this.currentType + "pos"] = top
            } else {
                this[this.currentType + "pos"] = left
            }

            this.updateClipPath();
        }

    }

    updateClipPath () {
        var { width, height } = this.getRectangle()        

        // TODO:  value must be with a unit. 
        var item = this.layer;
        item.clipPathType = CLIP_PATH_TYPE_INSET
        item.clipPathInsetTop = percentUnit( px2percent(defaultValue(this.toppos, 0), height))
        item.clipPathInsetLeft = percentUnit( px2percent(defaultValue(this.leftpos, 0), width))
        item.clipPathInsetRight = percentUnit( px2percent(width - defaultValue(this.rightpos, width), width) )
        item.clipPathInsetBottom = percentUnit( px2percent(height - defaultValue(this.bottompos, height), height) )

        this.commit(CHANGE_LAYER_CLIPPATH, item);

        this.refreshPointer();
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_POSITION,        
        CHANGE_LAYER_CLIPPATH,
        CHANGE_LAYER
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

    [POINTERSTART('$el .drag-item')] (e) {
        e.preventDefault();
        this.currentType = e.$delegateTarget.attr('data-type');
        this.isDown = true; 
    }

    [POINTERSTART()] (e) {
        this.isDown = true; 
        this.layer = this.read(SELECTION_CURRENT_LAYER);
        // this.refreshUI(e);        
    }    
    
}