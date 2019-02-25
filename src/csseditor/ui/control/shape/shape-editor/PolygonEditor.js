import UIElement, { EVENT } from "../../../../../colorpicker/UIElement";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER, 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_CLIPPATH_POLYGON, 
    CHANGE_LAYER_CLIPPATH_POLYGON_POSITION
} from "../../../../types/event";
import { defaultValue } from "../../../../../util/functions/func";
import { px2percent } from "../../../../../util/filter/functions";
import { percentUnit, stringUnit, EMPTY_STRING } from "../../../../../util/css/types";
import { CLICK, POINTERSTART, ALT, CAPTURE, LOAD, MOVE } from "../../../../../util/Event";
import Dom from "../../../../../util/Dom";
import { SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";
import { CLIP_PATH_IS_POLYGON } from "../../../../../util/css/make";

export default class PolygonEditor extends UIElement {

    template () {
        return `<div class='layer-shape-polygon-editor' title="Click panel with alt if you want to add point"></div>`
    }

    [LOAD()] () {
        var layer = this.read(SELECTION_CURRENT_LAYER);
        if (!layer) return EMPTY_STRING;
        var points =  defaultValue( layer.clipPathPolygonPoints, [])
        if (!points.length) return EMPTY_STRING;

        var startIndex = 0;
        var lastIndex = points.length - 1; 

        return points.map((p, index) => {

            var start = index == startIndex ? 'start' : EMPTY_STRING;
            var end = index == lastIndex ? 'end' : EMPTY_STRING;

            return `<div class="drag-item ${start} ${end}" data-point-index="${index}" style='left: ${stringUnit(p.x)};top: ${stringUnit(p.y)}'></div>`
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
        var item = this.read(SELECTION_CURRENT_LAYER)

        if (!item) return false; 

        return CLIP_PATH_IS_POLYGON(item) && !!item.showClipPathEditor; 
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
                x: percentUnit( px2percent( left, width) ),
                y: percentUnit( px2percent( top, height) )
            }

            this.updateClipPath();
        }

    }

    updateClipPath () {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var polygonIndex = +this.$dragItem.attr('data-point-index');
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, [])
            clipPathPolygonPoints[polygonIndex] = this.$dragPoint;

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, {
                id: layer.id, 
                polygonIndex,
                clipPathPolygonPoints
            });
        }) 
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_POSITION,        
        CHANGE_LAYER_CLIPPATH,
        CHANGE_LAYER,
        CHANGE_LAYER_CLIPPATH_POLYGON,
        CHANGE_LAYER_CLIPPATH_POLYGON_POSITION
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
            x: percentUnit( px2percent( left, width) ),
            y: percentUnit( px2percent( top, height) )
        }

        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, [])
            clipPathPolygonPoints.push(point);

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {id: layer.id, clipPathPolygonPoints});
            this.refresh();
        })
    }

    deletePoint (e) {
        var index = +e.$delegateTarget.attr('data-point-index')

        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, [])
            clipPathPolygonPoints.splice(index, 1);

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {id: layer.id, clipPathPolygonPoints});
            this.refresh();
        })
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