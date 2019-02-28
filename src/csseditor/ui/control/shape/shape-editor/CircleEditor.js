import UIElement, { EVENT } from "../../../../../util/UIElement";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_POSITION
} from "../../../../types/event";
import { defaultValue } from "../../../../../util/functions/func";
import { px2percent } from "../../../../../util/filter/functions";
import { percentUnit, value2px, CLIP_PATH_SIDE_TYPE_NONE, CLIP_PATH_TYPE_CIRCLE } from "../../../../../util/css/types";
import { POINTERSTART, MOVE } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER } from "../../../../types/SelectionTypes";
import { CLIP_PATH_IS_CIRCLE } from "../../../../../util/css/make";

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
            
            this.read(SELECTION_CURRENT_LAYER, layer => {
                var sideType = defaultValue(layer.clipPathSideType, CLIP_PATH_SIDE_TYPE_NONE)
                this.refs.$radius.toggle(sideType == CLIP_PATH_SIDE_TYPE_NONE)
            })
            
            this.refreshPointer()
        }

    }

    refreshPointer () {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {

            if (!CLIP_PATH_IS_CIRCLE(layer)) return;

            var { width, height } = this.getRectangle()

            var centerX =  defaultValue(layer.clipPathCenterX, percentUnit(50))
            var centerY =  defaultValue(layer.clipPathCenterY, percentUnit(50))

            var radiusX =  defaultValue(layer.clipPathRadiusX, percentUnit(100))
            var radiusY =  defaultValue(layer.clipPathRadiusY, percentUnit(100))            

            this.refs.$center.px('left', value2px (centerX, width))
            this.refs.$center.px('top', value2px (centerY, height));

            this.refs.$radius.px('left', value2px(radiusX, width));
            this.refs.$radius.px('top', value2px(radiusY, height));            
        })
    }

    isShow () {
        var item = this.read(SELECTION_CURRENT_LAYER)

        if (!item) return false; 

        return CLIP_PATH_IS_CIRCLE(item) && !!item.showClipPathEditor; 
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
        item.clipPathType = CLIP_PATH_TYPE_CIRCLE
        item.clipPathCenterX = percentUnit( px2percent( center[0], width) );
        item.clipPathCenterY = percentUnit( px2percent( center[1], height) );
        item.clipPathRadiusX = percentUnit( px2percent( radius[0], width) );
        item.clipPathRadiusY = percentUnit( px2percent( radius[1], height) );

        this.commit(CHANGE_LAYER_CLIPPATH, item);

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

    [POINTERSTART('$el .drag-item') + MOVE()] (e) {
        e.preventDefault();
        this.currentType = e.$delegateTarget.attr('data-type');
    }

    [POINTERSTART()] (e) {
        this.layer = this.read(SELECTION_CURRENT_LAYER);
    }    
    
}