import UIElement, { EVENT } from "../../../../../util/UIElement";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_POSITION
} from "../../../../types/event";
import { POINTERSTART, MOVE, END } from "../../../../../util/Event";
import { CircleClipPath } from "../../../../../editor/css-property/ClipPath";
import { Length } from "../../../../../editor/unit/Length";
import { editor } from "../../../../../editor/editor";

export default class CircleEditor extends UIElement {

    template () {
        return `
            <div class='layer-shape-circle-editor'>
                <div class="drag-item center" data-type="center" ref="$center"></div>
                <div class="drag-item radius" data-type="radius" ref="$radius"></div>
            </div>
        `
    }

    refresh () {
        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if (isShow) {
            this.cachedRectangle = false;       
            
            var layer = editor.selection.currentLayer; 
            if (layer) {
                this.refs.$radius.toggle(layer.clippath.isSideType('none'))
            }            
            this.refreshPointer()
        }

    }

    refreshPointer () {
        var layer = editor.selection.layer; 
        if (layer) {
            var clippath = layer.clippath; 
            if (!clippath.isCircle()) return;

            var { width, height } = this.getRectangle()

            this.refs.$center.px('left', clippath.centerX.toPx(width))
            this.refs.$center.px('top', clippath.centerY.toPx(height));

            this.refs.$radius.px('left', clippath.radiusX.toPx(width));
            this.refs.$radius.px('top', clippath.radiusY.toPx(height));            
        }
    }

    isShow () {
        var item = editor.selection.layer
        if (!item) return false; 

        return item.clippath.isCircle() && !!item.showClipPathEditor; 
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

        var left = x - minX
        var top = y - minY  

        this.refs['$' + this.currentType].px('left', left);
        this.refs['$' + this.currentType].px('top', top);

        if (isUpdate) {
            
            this[this.currentType + "pos"] = [left, top]

            this.updateClipPath();
        }

    }

    updateClipPath () {
        var { width, height } = this.getRectangle()        
        var radius = this.radiuspos || [width, height];
        var center = this.centerpos || [width/2, height/2];

        var item = this.layer;
        item.clippath = new CircleClipPath({
            centerX: Length.px(center[0]).toPercent(width),
            centerY: Length.px(center[1]).toPercent(height),
            radiusX: Length.px(radius[0]).toPercent(width),
            radiusY: Length.px(raidus[1]).toPercent(height)
        })

        editor.send(CHANGE_LAYER_CLIPPATH, item);
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
    move () {
        this.refreshUI(true);
    }

    end () {
        this.currentType = null;
        this.layer = null; 
    }

    [POINTERSTART('$el .drag-item') + MOVE() + END()] (e) {
        e.preventDefault();
        this.currentType = e.$delegateTarget.attr('data-type');
        this.layer = editor.selection.layer;
    }
    
}