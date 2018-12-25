import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER_CLIPPATH, EVENT_CHANGE_LAYER, CHANGE_LAYER_CLIPPATH, EVENT_CHANGE_LAYER_POSITION, EVENT_CHANGE_LAYER_SIZE, CHANGE_LAYER_CLIPPATH_POLYGON, EVENT_CHANGE_LAYER_CLIPPATH_POLYGON } from "../../../../types/event";
import { CLIP_PATH_TYPE_POLYGON } from "../../../../module/ItemTypes";
import { defaultValue } from "../../../../../util/functions/func";
import { px2percent } from "../../../../../util/filter/functions";
import { percentUnit, stringUnit } from "../../../../../util/css/types";

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

        return item.clipPathType == CLIP_PATH_TYPE_POLYGON; 
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
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, [])
            clipPathPolygonPoints[+this.$dragItem.attr('data-point-index')] = this.$dragPoint;

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {
                id: layer.id, 
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
    'pointerend document' (e) {
        this.isDown = false ;
    }

    'pointermove document' (e) {
        if (this.isDown) {
            this.refreshUI(e);
        }
    }

    'pointerstart $el .drag-item' (e) {
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

    'click $el | Alt' (e) {
        e.stopPropagation();

        this.addPoint(e);
    }
    
}