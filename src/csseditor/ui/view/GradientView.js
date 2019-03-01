import UIElement, { EVENT } from '../../../util/UIElement';
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
    CHANGE_PAGE_TRANSFORM,
    CHANGE_PAGE_NAME,
    CHANGE_TOOL,
    CHANGE_LAYER_BORDER,
    CHANGE_TOOL_SIZE
} from '../../types/event';
import { px, EMPTY_STRING } from '../../../util/css/types';
import { LOAD, SCROLL } from '../../../util/Event';
import { SELECTION_CURRENT_PAGE, SELECTION_CURRENT_LAYER } from '../../types/SelectionTypes';
import { LAYER_TO_STRING } from '../../types/LayerTypes';
import { ITEM_MAP_LAYER_CHILDREN } from '../../types/ItemSearchTypes';
import { PAGE_TO_CSS, PAGE_COLORVIEW_TO_CSS } from '../../types/PageTypes';
import { RESIZE_WINDOW } from '../../types/ToolTypes';
import { BOUND_TO_CSS_ARRAY, LAYER_NAME, LAYER_TO_STRING_CLIPPATH } from '../../../util/css/make';

export default class GradientView extends UIElement {

    initialize () {
        super.initialize();

        this.hasScroll = false;
        this.initializeLayerCache();
    }

    template () {
        return `
            <div class='page-view'>
                <div class='page-content' ref="$board">
                    <div class="page-canvas" ref="$canvas">
                        <div class="gradient-color-view-container" ref="$page">
                            <div class="gradient-color-view" ref="$colorview"></div>
                        </div>       
                        <PredefinedPageResizer />
                        <PredefinedGroupLayerResizer />
                        <LayerShapeEditor />
                        <MoveGuide />
                        <div ref="$dragArea"></div>                     
                    </div>          
                </div>
                <SubFeatureControl />
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

    initializeLayerCache () {
        this.layerItems = {} 
    }

    [LOAD('$colorview')] () {
        var page = this.read(SELECTION_CURRENT_PAGE)

        if (!page) {
            return EMPTY_STRING; 
        }

        this.initializeLayerCache();

        var list = this.read(ITEM_MAP_LAYER_CHILDREN, page.id, (item, index) => {
            var content = item.content || EMPTY_STRING;
            var title = LAYER_NAME(item)
            return `<div 
                    tabindex='${index}'
                    class='layer' 
                    item-layer-id="${item.id}" 
                    title="${title}" 
                    style='${this.read(LAYER_TO_STRING, item, true)}'>${content}${LAYER_TO_STRING_CLIPPATH(item)}</div>`
        });

        return list; 
    }

    [EVENT('animationEditor')] () {
        this.load();
    }

    refresh () {
        this.setBackgroundColor();
        this.load();
    }
    
    refreshLayer () {
        this.read(SELECTION_CURRENT_LAYER, (items) => {

            if (!items.length) {
                items = [items]
            }
            
            items.forEach(item => {

                if (!this.layerItems[item.id]) {
                    var $el = this.$el.$(`[item-layer-id="${item.id}"]`);

                    this.layerItems[item.id] = $el; 
                }

                this.layerItems[item.id].cssText(this.read(LAYER_TO_STRING, item, true))

                var content = item.content || EMPTY_STRING;
                this.layerItems[item.id].html(content + LAYER_TO_STRING_CLIPPATH(item))
            })
        })
    }

    refreshLayerPosition () {
        this.read(SELECTION_CURRENT_LAYER, (items) => {

            if (!items.length) {
                items = [items]
            }
            
            items.forEach(item => {
                if (!this.layerItems[item.id]) {
                    var $el = this.$el.$(`[item-layer-id="${item.id}"]`);

                    this.layerItems[item.id] = $el; 
                }

                this.layerItems[item.id].cssArray(BOUND_TO_CSS_ARRAY(item))

                var content = item.content || EMPTY_STRING;
                this.layerItems[item.id].html(content + LAYER_TO_STRING_CLIPPATH(item))
            })
        })
    }    
 
    setBackgroundColor() {

        var page = this.read(SELECTION_CURRENT_PAGE);

        var pageCSS = this.read(PAGE_TO_CSS, page || {clip: false});

        var canvasCSS = {
            width: px( 2000 ),
            height: px( 2000 )
        }

        var colorviewCSS = this.read(PAGE_COLORVIEW_TO_CSS, page || {clip: false});
        this.refs.$canvas.css(canvasCSS)
        this.refs.$page.attr('title', page.name || 'Untitled page');
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
    }

    [EVENT(
        CHANGE_PAGE_SIZE,
        CHANGE_PAGE,
        CHANGE_PAGE_TRANSFORM
    )] () { this.setBackgroundColor(); }

    [EVENT(CHANGE_PAGE_NAME)] () {
        this.setBackgroundColor();
    }

    [EVENT(
        CHANGE_LAYER_POSITION,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_MOVE,        
    )] () {
        this.refreshLayerPosition();
    }

    // indivisual layer effect 
    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_BACKGROUND_COLOR,
        CHANGE_LAYER_CLIPPATH,
        CHANGE_LAYER_FILTER,
        CHANGE_LAYER_BACKDROP_FILTER,
        CHANGE_LAYER_RADIUS,
        CHANGE_LAYER_BORDER,
        CHANGE_LAYER_ROTATE,
        CHANGE_LAYER_OPACITY,
        CHANGE_LAYER_TRANSFORM,
        CHANGE_LAYER_TRANSFORM_3D,
        CHANGE_LAYER_TEXT,
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
        // this.refresh();
    }

    [EVENT(CHANGE_TOOL)] () {
        this.refs.$colorview.toggleClass('showGrid', this.config('show.grid'))
    }

    updateToolSize () {
        this.initConfig('tool.size', {
            'page.offset': this.refs.$page.offset(),
            'board.offset': this.refs.$board.offset(),
            'board.scrollTop': this.refs.$board.scrollTop(),
            'board.scrollLeft': this.refs.$board.scrollLeft()
        });

        this.emit(CHANGE_TOOL_SIZE)
    }

    [EVENT(RESIZE_WINDOW)] () {
        this.updateToolSize();
    }

    [SCROLL('$board')] () {
        this.updateToolSize();
    }
}