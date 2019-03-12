import UIElement, { EVENT } from "../../../../../util/UIElement";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER
} from "../../../../types/event";
import { EMPTY_STRING } from "../../../../../util/css/types";
import { CLICK, POINTERSTART, ALT, CAPTURE, LOAD, MOVE } from "../../../../../util/Event";
import Dom from "../../../../../util/Dom";
import { Length } from "../../../../../editor/unit/Length";
import { editor } from "../../../../../editor/editor";

export default class PolygonEditor extends UIElement {

    template () {
        return `<div class='layer-shape-polygon-editor' title="Click panel with alt if you want to add point"></div>`
    }

    [LOAD()] () {
        var layer = editor.selection.layer;
        if (!layer) return EMPTY_STRING;
        var points = layer.clippath.points
        if (!points.length) return EMPTY_STRING;

        var startIndex = 0;
        var lastIndex = points.length - 1; 

        return points.map((p, index) => {

            var start = index == startIndex ? 'start' : EMPTY_STRING;
            var end = index == lastIndex ? 'end' : EMPTY_STRING;

            return `<div class="drag-item ${start} ${end}" data-point-index="${index}" style='left: ${p.x};top: ${p.y}'></div>`
        })
    }

    refresh () {
        var isShow = this.isShow();

        this.$el.toggle(isShow);

        if (isShow) {
            this.cachedRectangle = false;       
            this.load();
        }

    }

    isShow () {
        var layer = editor.selection.currentLayer
        if (!layer) return false; 

        var clippath = layer.clippath;
        if (!clippath) return false; 

        return clippath.isPolygon() && !!layer.showClipPathEditor; 
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

        this.$dragItem.px('left', left);
        this.$dragItem.px('top', top);

        if (isUpdate) {

            this.$dragPoint =  {
                x: Length.px(left).toPercent(width),
                y: Length.px(top).toPercent(right),
            }

            this.updateClipPath();
        }

    }

    updateClipPath () {
        var layer = editor.selection.currentLayer;
        if (!layer) return;
        
        var clippath = layer.clippath;
        if (!clippath) return; 
        if (!clippath.isPolygon()) return;

        var polygonIndex = +this.$dragItem.attr('data-point-index');
        var points = clippath.points
        points[polygonIndex] = this.$dragPoint;



        this.emit(CHANGE_LAYER);
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER
    )] () {
        this.refresh()
    }

    // Event Bindings 

    move () {
        this.refreshUI(true);
    }

    [POINTERSTART('$el .drag-item') + MOVE()] (e) {
        e.preventDefault();
        this.$dragItem = e.$delegateTarget
    }
 

    addPoint (e) {
        var { minX, minY, maxX, maxY, width, height } = this.getRectangle()
        var {x , y} = e.xy;

        x = Math.max(Math.min(maxX, x), minX)
        y = Math.max(Math.min(maxY, y), minY)

        var left = x - minX
        var top = y - minY          


        var point =  {
            x: Length.px(left).toPercent(width),
            y: Length.px(top).toPercent(height)
        }

        var layer = editor.selection.layer
        if (layer) {
            var clippath = layer.clippath; 
            clippath.points.push(point);

            this.emit(CHANGE_LAYER, layer);
            this.refresh();
        }
    }

    deletePoint (e) {
        var index = +e.$delegateTarget.attr('data-point-index')
        var layer = editor.selection.layer;
        if (!layer) return;
        
        var clippath = layer.clippath;
        if (!clippath) return; 
        if (!clippath.isPolygon()) return;

        clippath.points.splice(index, 1);
        this.emit(CHANGE_LAYER) 
        this.refresh();
    } 

    isNotDragItem (e) {
        return new Dom(e.target).hasClass('drag-item') == false;
    }

    [CLICK() + ALT] (e) {
        e.preventDefault();

        this.addPoint(e);
    }

    [CLICK('$el .drag-item') + ALT + CAPTURE] (e) {
        e.stopPropagation();
        e.preventDefault();

        this.deletePoint(e);
    }
    
}