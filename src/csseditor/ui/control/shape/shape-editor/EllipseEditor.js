import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER_CLIPPATH, EVENT_CHANGE_LAYER, CHANGE_LAYER_CLIPPATH, EVENT_CHANGE_LAYER_POSITION, EVENT_CHANGE_LAYER_SIZE } from "../../../../types/event";
import { 
    CLIP_PATH_TYPE_ELLIPSE, 
    CLIP_PATH_SIDE_TYPE_NONE
} from "../../../../module/ItemTypes";
import { defaultValue } from "../../../../../util/functions/func";
import { percentUnit, value2px } from "../../../../../util/css/types";
import { px2percent } from "../../../../../util/filter/functions";
import { POINTEREND, POINTERMOVE, POINTERSTART } from "../../../../../util/Event";

export default class EllipseEditor extends UIElement {

    template () {
        return `
            <div class='layer-shape-ellipse-editor'>
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
            
            this.read('selection/current/layer', layer => {
                var sideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE)
                this.refs.$radius.toggle(sideType == CLIP_PATH_SIDE_TYPE_NONE)
            })   
            this.refreshPointer()
        }

    }

    refreshPointer () {
        this.read('selection/current/layer', (layer) => {

            if (layer.clipPathType != CLIP_PATH_TYPE_ELLIPSE) return;
            var { width, height } = this.getRectangle()

            var centerX =  defaultValue(layer.clipPathCenterX, percentUnit(50))
            var centerY =  defaultValue(layer.clipPathCenterY, percentUnit(50))

            var radiusX =  defaultValue(layer.clipPathRadiusX, percentUnit(100))
            var radiusY =  defaultValue(layer.clipPathRadiusY, percentUnit(100))            

            this.refs.$center.px('left', value2px(centerX, width))
            this.refs.$center.px('top', value2px(centerY, height));

            this.refs.$radius.px('left', value2px(radiusX, width));
            this.refs.$radius.px('top', value2px(radiusY, height));                  
        })
    }

    isShow () {
        var item = this.read('selection/current/layer')

        if (!item) return false; 

        return item.clipPathType == CLIP_PATH_TYPE_ELLIPSE && !!item.showClipPathEditor; 
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

        this.refs['$' + this.currentType].px('left', left);
        this.refs['$' + this.currentType].px('top', top);

        if (e) {
            
            this[this.currentType + "pos"] = [left, top]

            this.updateClipPath();
        }

    }

    updateClipPath () {
        var { width, height } = this.getRectangle()        
        var radius = this.radiuspos || [width, height];
        var center = this.centerpos || [width/2, height/2];

        var item = this.layer;
        item.clipPathType = CLIP_PATH_TYPE_ELLIPSE
        item.clipPathCenterX = percentUnit( px2percent( center[0], width) );
        item.clipPathCenterY = percentUnit( px2percent( center[1], height) );
        item.clipPathRadiusX = percentUnit( px2percent( radius[0], width) );
        item.clipPathRadiusY = percentUnit( px2percent( radius[1], height) );

        this.commit(CHANGE_LAYER_CLIPPATH, item);

    }

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_SIZE,
        EVENT_CHANGE_LAYER_POSITION,        
        EVENT_CHANGE_LAYER_CLIPPATH,
        EVENT_CHANGE_LAYER
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
        this.layer = this.read('selection/current/layer');
        // this.refreshUI(e);        
    }    
    
}