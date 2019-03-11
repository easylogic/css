import UIElement, { EVENT } from "../../../../../util/UIElement";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER, 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_SIZE 
} from "../../../../types/event";
import { defaultValue } from "../../../../../util/functions/func";
import { POINTERSTART, MOVE, END } from "../../../../../util/Event";
import { InsetClipPath } from "../../../../../editor/css-property/ClipPath";
import { editor } from "../../../../../editor/editor";

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
        var layer = editor.selection.layer;

        if (layer) {
            var clippath = layer.clippath; 
            if (!clippath) return; 
            if (!clippath.isInset()) return; 

            var { width, height } = this.getRectangle()

            var top = clippath.top;
            var left = clippath.left;
            var right = clippath.right;
            var bottom = clippath.bottom;

            var topValue = top.toPx(height)
            var leftValue = left.toPx(width)
            var rightValue = Length.percent(100 - right).toPx(width)
            var bottomValue = Length.percent(100 - bottom).toPx(height)

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
        }
    }

    isShow () {
        var item = editor.selection.layer
        if (!item) return false; 
        var clippath = item.clippath; 
        if (!clippath) return false; 

        return clippath.isInset() && !!item.showClipPathEditor;
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

    refreshUI (isUpdate) {
        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()
        var {x , y} = this.config('pos');

        x = Math.max(Math.min(maxX, x), minX)
        y = Math.max(Math.min(maxY, y), minY)

        if (this.currentType == 'top' || this.currentType == 'bottom') {
            var top = y - minY  
            this.refs['$' + this.currentType].px('top', top);            
        } else {
            var left = x - minX
            this.refs['$' + this.currentType].px('left', left);
        }

        if (isUpdate) {
            
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
        item.clippath = new InsetClipPath({
            top: Length.px(defaultValue(this.toppos, 0)).toPercent(height),
            left: Length.px(defaultValue(this.leftpos, 0)).toPercent(width),
            right: Length.px(width - defaultValue(this.rightpos, width)).toPercent(width),
            bottom: Length.px(height - defaultValue(this.bottompos, height)).toPercent(height)
        })

        this.emit(CHANGE_LAYER_CLIPPATH, item);

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
        this.cachedRectangle = null;
        this.refresh()
    }

    // Event Bindings 

    move () {
        this.refreshUI(true);
    }

    end () {
        this.layer = null; 
        this.currentType = null;
    }

    [POINTERSTART('$el .drag-item') + MOVE() + END()] (e) {
        e.preventDefault();
        this.currentType = e.$delegateTarget.attr('data-type');
        this.layer = editor.selection.layer;          
        this.cachedRectangle = null; 
    }
    
}