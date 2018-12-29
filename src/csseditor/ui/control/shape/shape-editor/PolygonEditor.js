import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_CLIPPATH, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_CLIPPATH_POLYGON, 
    EVENT_CHANGE_LAYER_CLIPPATH_POLYGON, 
    CHANGE_LAYER_CLIPPATH_POLYGON_POSITION
} from "../../../../types/event";
import { CLIP_PATH_TYPE_POLYGON } from "../../../../module/ItemTypes";
import { defaultValue } from "../../../../../util/functions/func";
import { px2percent } from "../../../../../util/filter/functions";
import { percentUnit, stringUnit } from "../../../../../util/css/types";
import { CLICK, POINTEREND, POINTERMOVE, POINTERSTART, ALT, CHECKER, CAPTURE } from "../../../../../util/Event";
import Dom from "../../../../../util/Dom";

export default class PolygonEditor extends UIElement {

    template () {
        return `
            <div class='layer-shape-polygon-editor'>

            </div>
        `
    }

    'load $el' () {
        var layer = this.read('/selection/current/layer');
        if (!layer) return '';
        var points =  defaultValue( layer.clipPathPolygonPoints, [])
        if (!points.length) return '';

        var startIndex = 0;
        var lastIndex = points.length - 1; 

        return points.map((p, index) => {

            var start = index == startIndex ? 'start' : '';
            var end = index == lastIndex ? 'end' : '';

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
        var item = this.read('/selection/current/layer')

        if (!item) return false; 

        return item.clipPathType == CLIP_PATH_TYPE_POLYGON && !!item.showClipPathEditor; 
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

        var left = x - minX
        var top = y - minY  

        this.$dragItem.px('left', left);
        this.$dragItem.px('top', top);

        if (e) {
            

            this.$dragPoint =  {
                x: percentUnit( px2percent( left, width) ),
                y: percentUnit( px2percent( top, height) )
            }
    

            this.updateClipPath();
        }

    }

    updateClipPath () {
        this.read('/selection/current/layer', (layer) => {
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

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_SIZE,
        EVENT_CHANGE_LAYER_POSITION,        
        EVENT_CHANGE_LAYER_CLIPPATH,
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_CLIPPATH_POLYGON
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
        this.$dragItem = e.$delegateTarget
        this.isDown = true; 
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

        this.read('/selection/current/layer', (layer) => {
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, [])
            clipPathPolygonPoints.push(point);

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {id: layer.id, clipPathPolygonPoints});
            this.refresh();
        })
    }

    deletePoint (e) {
        var index = +e.$delegateTarget.attr('data-point-index')

        this.read('/selection/current/layer', (layer) => {
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