import UIElement, { MULTI_EVENT } from '../../../colorpicker/UIElement';
import PredefinedPageResizer from '../control/shape/PredefinedPageResizer';
import PredefinedGroupLayerResizer from '../control/shape/PredefinedGroupLayerResizer';
import LayerShapeEditor from '../control/shape/LayerShapeEditor';
import MoveGuide from '../control/shape/MoveGuide';
import SubFeatureControl from '../control/SubFeatureControl';
import ColorPickerLayer from '../control/panel/items/color/ColorPicker';
import { parseParamNumber } from '../../../util/filter/functions';

import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_LAYER, 
    EVENT_CHANGE_LAYER_BACKGROUND_COLOR, 
    EVENT_CHANGE_LAYER_CLIPPATH, 
    EVENT_CHANGE_LAYER_FILTER, 
    EVENT_CHANGE_LAYER_POSITION, 
    EVENT_CHANGE_LAYER_RADIUS, 
    EVENT_CHANGE_LAYER_SIZE, 
    EVENT_CHANGE_LAYER_TRANSFORM, 
    EVENT_CHANGE_IMAGE, 
    EVENT_CHANGE_IMAGE_COLOR, 
    EVENT_CHANGE_IMAGE_RADIAL_POSITION, 
    EVENT_CHANGE_IMAGE_RADIAL_TYPE, 
    EVENT_CHANGE_LAYER_TRANSFORM_3D, 
    EVENT_CHANGE_IMAGE_ANGLE, 
    EVENT_CHANGE_IMAGE_LINEAR_ANGLE, 
    EVENT_CHANGE_COLOR_STEP, 
    EVENT_CHANGE_PAGE_SIZE, 
    EVENT_CHANGE_PAGE, 
    EVENT_CHANGE_LAYER_MOVE, 
    EVENT_CHANGE_LAYER_ROTATE,
    EVENT_CHANGE_LAYER_OPACITY,
    EVENT_CHANGE_BOXSHADOW,
    EVENT_CHANGE_TEXTSHADOW,
    EVENT_CHANGE_LAYER_TEXT,
    EVENT_CHANGE_LAYER_BACKDROP_FILTER,
    EVENT_CHANGE_LAYER_CLIPPATH_POLYGON,
    EVENT_CHANGE_LAYER_CLIPPATH_POLYGON_POSITION
} from '../../types/event';
import { px } from '../../../util/css/types';



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

    'load $colorview' () {
        var page = this.read('/selection/current/page')

        if (!page) {
            return ''; 
        }

        var list = this.read('/item/map/children', page.id, (item, index) => {
            var content = item.content || '';
            return `<div 
                    tabindex='${index}'
                    class='layer' 
                    item-layer-id="${item.id}" 
                    title="${index+1}. ${item.name || 'Layer'}" 
                    style='${this.read('/layer/toString', item, true)}'>${content}${this.read('/layer/toStringClipPath', item)}</div>`
        });

        return list; 
    }

    '@animationEditor' () {
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
        this.read('/selection/current/layer', (items) => {

            if (!items.length) {
                items = [items]
            }
            
            items.forEach(item => {
                var $el = this.$el.$(`[item-layer-id="${item.id}"]`);
                $el.cssText(this.read('/layer/toString', item, true))

                var content = item.content || '';
                $el.html(content + this.read('/layer/toStringClipPath', item))
            })
        })
    }

    refreshLayerPosition () {
        this.read('/selection/current/layer', (items) => {

            if (!items.length) {
                items = [items]
            }
            
            items.forEach(item => {
                var $el = this.$el.$(`[item-layer-id="${item.id}"]`);
                $el.cssText(this.read('/layer/toString', item, true))
            })
        })
    }    

    makePageCSS (page) {
        return {
            overflow: page.clip ? 'hidden' : '',
            width: page.width, 
            height: page.height
        }; 
    }
 
    setBackgroundColor() {

        var page = this.read('/selection/current/page');

        var pageCSS = this.makePageCSS(page || {clip: false});

        var canvasCSS = {
            width: px( 2000 ),
            height: px( 2000 )
        }
        this.refs.$canvas.css(canvasCSS);
        this.refs.$page.css(pageCSS)

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

        var item = this.read('/selection/current/page')

        this.refs.$page.toggle(item)


        if (item) {
            if (item.itemType == 'page') {
                var list = this.read('/item/list/children', item.id);
                this.refs.$colorview.toggle(list.length)
            }
        }
        

    }

    [MULTI_EVENT(
        EVENT_CHANGE_PAGE_SIZE,
        EVENT_CHANGE_PAGE
    )] () { this.setBackgroundColor(); }

    // [MULTI_EVENT(
    //     EVENT_CHANGE_LAYER_POSITION,
    //     EVENT_CHANGE_LAYER_SIZE,
    //     EVENT_CHANGE_LAYER_MOVE,        
    // )] () {
    //     // this.refreshLayerPosition();
    // }

    // indivisual layer effect 
    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_BACKGROUND_COLOR,
        EVENT_CHANGE_LAYER_CLIPPATH,
        EVENT_CHANGE_LAYER_FILTER,
        EVENT_CHANGE_LAYER_BACKDROP_FILTER,
        EVENT_CHANGE_LAYER_RADIUS,
        EVENT_CHANGE_LAYER_ROTATE,
        EVENT_CHANGE_LAYER_OPACITY,
        EVENT_CHANGE_LAYER_TRANSFORM,
        EVENT_CHANGE_LAYER_TRANSFORM_3D,
        EVENT_CHANGE_LAYER_TEXT,
        EVENT_CHANGE_LAYER_POSITION,
        EVENT_CHANGE_LAYER_SIZE,
        EVENT_CHANGE_LAYER_MOVE,    
        EVENT_CHANGE_LAYER_CLIPPATH_POLYGON,
        EVENT_CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
        EVENT_CHANGE_BOXSHADOW,
        EVENT_CHANGE_TEXTSHADOW,
        EVENT_CHANGE_IMAGE,
        EVENT_CHANGE_IMAGE_COLOR,
        EVENT_CHANGE_IMAGE_ANGLE,
        EVENT_CHANGE_IMAGE_LINEAR_ANGLE,
        EVENT_CHANGE_IMAGE_RADIAL_POSITION,
        EVENT_CHANGE_IMAGE_RADIAL_TYPE,
        EVENT_CHANGE_COLOR_STEP
    )]() { 
        this.refreshLayer(); 
    }


    // all effect 
    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR
    )] () { this.refresh(); }

    updateSelection () {
        this.refresh();
    }

    '@changeTool' () {
        // this.refresh()
        this.refs.$colorview.toggleClass('showGrid', this.read('/tool/get', 'show.grid'))
    }
}