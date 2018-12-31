import UIElement, { EVENT } from '../../../colorpicker/UIElement';
import PredefinedPageResizer from '../control/shape/PredefinedPageResizer';
import PredefinedGroupLayerResizer from '../control/shape/PredefinedGroupLayerResizer';
import LayerShapeEditor from '../control/shape/LayerShapeEditor';
import MoveGuide from '../control/shape/MoveGuide';
import SubFeatureControl from '../control/SubFeatureControl';
import ColorPickerLayer from '../control/panel/items/color/ColorPicker';
import { parseParamNumber } from '../../../util/filter/functions';

import { 
    CHANGE_EDITOR, 
    CHANGE_LAYER, 
    CHANGE_LAYER_BACKGROUND_COLOR, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER_FILTER, 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_RADIUS, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_TRANSFORM, 
    CHANGE_IMAGE, 
    CHANGE_IMAGE_COLOR, 
    CHANGE_IMAGE_RADIAL_POSITION, 
    CHANGE_IMAGE_RADIAL_TYPE, 
    CHANGE_LAYER_TRANSFORM_3D, 
    CHANGE_IMAGE_ANGLE, 
    CHANGE_IMAGE_LINEAR_ANGLE, 
    CHANGE_COLOR_STEP, 
    CHANGE_PAGE_SIZE, 
    CHANGE_PAGE, 
    CHANGE_LAYER_MOVE, 
    CHANGE_LAYER_ROTATE,
    CHANGE_LAYER_OPACITY,
    CHANGE_BOXSHADOW,
    CHANGE_TEXTSHADOW,
    CHANGE_LAYER_TEXT,
    CHANGE_LAYER_BACKDROP_FILTER,
    CHANGE_LAYER_CLIPPATH_POLYGON,
    CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
    CHANGE_PAGE_TRANSFORM
} from '../../types/event';
import { px } from '../../../util/css/types';
import { LOAD } from '../../../util/Event';



export default class GradientView extends UIElement {

    initialize () {
        super.initialize();

        this.hasScroll = false;
    }

    template () {
        return `
            <div class='page-view'>
                <div class='page-content' ref="$board">
                    <div class="page-canvas" ref="$canvas">
                        <div class="gradient-color-view-container" ref="$page">
                            <div class="gradient-color-view" ref="$colorview"></div>
                        </div>       
                        <PredefinedPageResizer></PredefinedPageResizer>
                        <PredefinedGroupLayerResizer></PredefinedGroupLayerResizer>
                        <LayerShapeEditor></LayerShapeEditor>
                        <MoveGuide></MoveGuide>
                        <div ref="$dragArea"></div>                     
                    </div>          
                </div>
                <SubFeatureControl></SubFeatureControl>
            </div>
        `
    }     

    components () {
        return {  
            ColorPickerLayer, 
            SubFeatureControl,
            LayerShapeEditor,
            MoveGuide,
            PredefinedPageResizer,
            PredefinedGroupLayerResizer
        }
    }

    [LOAD('$colorview')] () {
        var page = this.read('selection/current/page')

        if (!page) {
            return ''; 
        }

        var list = this.read('item/map/children', page.id, (item, index) => {
            var content = item.content || '';
            return `<div 
                    tabindex='${index}'
                    class='layer' 
                    item-layer-id="${item.id}" 
                    title="${index+1}. ${item.name || 'Layer'}" 
                    style='${this.read('layer/toString', item, true)}'>${content}${this.read('layer/toStringClipPath', item)}</div>`
        });

        return list; 
    }

    [EVENT('animationEditor')] () {
        this.load();
    }

    refresh (isDrag) {
        this.setBackgroundColor();
        this.load();

        if (!isDrag) {
            // this.refs.$page.el.scrollIntoView()
        }
    }
    
    refreshLayer () {
        this.read('selection/current/layer', (items) => {

            if (!items.length) {
                items = [items]
            }
            
            items.forEach(item => {
                var $el = this.$el.$(`[item-layer-id="${item.id}"]`);
                $el.cssText(this.read('layer/toString', item, true))

                var content = item.content || '';
                $el.html(content + this.read('layer/toStringClipPath', item))
            })
        })
    }

    refreshLayerPosition () {
        this.read('selection/current/layer', (items) => {

            if (!items.length) {
                items = [items]
            }
            
            items.forEach(item => {
                var $el = this.$el.$(`[item-layer-id="${item.id}"]`);
                $el.css(this.read('layer/bound/toCSS', item))
            })
        })
    }    
 
    setBackgroundColor() {

        var page = this.read('selection/current/page');

        var pageCSS = this.read('page/toCSS', page || {clip: false});

        var canvasCSS = {
            width: px( 2000 ),
            height: px( 2000 )
        }

        var colorviewCSS = this.read('page/colorview/toCSS', page || {clip: false});
        this.refs.$canvas.css(canvasCSS);
        this.refs.$page.css(pageCSS)
        this.refs.$colorview.css(colorviewCSS);

        if (!this.hasScroll) {
            var canvasWidth = 2000;
            var canvasHeight = 2000;
            var boardWidth = this.refs.$board.width();
            var boardHeight = this.refs.$board.height();
            var pageWidth = parseParamNumber(pageCSS.width);
            var pageHeight = parseParamNumber(pageCSS.height);
            
            if (boardWidth < pageWidth) {
                var left = canvasWidth/2 - (pageWidth/2 - boardWidth/2)
            } else {
                var left = (canvasWidth)/2 - (boardWidth/2)
            }
    
            if (boardHeight < pageHeight) {
                var top = canvasHeight/2 - (pageHeight/2 - boardHeight/2)
            } else {
                var top = canvasHeight/2 - (boardHeight/2)
            }        
    
            this.refs.$board.el.scrollTop = Math.floor(top);
            this.refs.$board.el.scrollLeft = Math.floor(left);
            this.hasScroll = true; 
        }

        var item = this.read('selection/current/page')

        this.refs.$page.toggle(item)


        if (item) {
            if (item.itemType == 'page') {
                var list = this.read('item/list/children', item.id);
                this.refs.$colorview.toggle(list.length)
            }
        }
        

    }

    [EVENT(
        CHANGE_PAGE_SIZE,
        CHANGE_PAGE,
        CHANGE_PAGE_TRANSFORM
    )] () { this.setBackgroundColor(); }

    // [EVENT(
    //     CHANGE_LAYER_POSITION,
    //     CHANGE_LAYER_SIZE,
    //     CHANGE_LAYER_MOVE,        
    // )] () {
    //     this.refreshLayerPosition();
    // }

    // indivisual layer effect 
    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_BACKGROUND_COLOR,
        CHANGE_LAYER_CLIPPATH,
        CHANGE_LAYER_FILTER,
        CHANGE_LAYER_BACKDROP_FILTER,
        CHANGE_LAYER_RADIUS,
        CHANGE_LAYER_ROTATE,
        CHANGE_LAYER_OPACITY,
        CHANGE_LAYER_TRANSFORM,
        CHANGE_LAYER_TRANSFORM_3D,
        CHANGE_LAYER_TEXT,
        CHANGE_LAYER_POSITION,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_MOVE,    
        CHANGE_LAYER_CLIPPATH_POLYGON,
        CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
        CHANGE_BOXSHADOW,
        CHANGE_TEXTSHADOW,
        CHANGE_IMAGE,
        CHANGE_IMAGE_COLOR,
        CHANGE_IMAGE_ANGLE,
        CHANGE_IMAGE_LINEAR_ANGLE,
        CHANGE_IMAGE_RADIAL_POSITION,
        CHANGE_IMAGE_RADIAL_TYPE,
        CHANGE_COLOR_STEP
    )]() { 
        this.refreshLayer(); 
    }


    // all effect 
    [EVENT(
        CHANGE_EDITOR
    )] () { this.refresh(); }

    updateSelection () {
        this.refresh();
    }

    [EVENT('changeTool')] () {
        // this.refresh()
        this.refs.$colorview.toggleClass('showGrid', this.read('tool/get', 'show.grid'))
    }
}