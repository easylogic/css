import BaseTab from '../BaseTab';
import PredefinedPageResizer from '../control/shape/PredefinedPageResizer';
import PredefinedLayerResizer from '../control/shape/PredefinedLayerResizer';

import MoveGuide from '../control/shape/MoveGuide';
import SubFeatureControl from '../control/SubFeatureControl';
import ColorPickerLayer from '../control/panel/items/color/ColorPicker';
import { parseParamNumber } from '../../../util/filter/functions';
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_LAYER, EVENT_CHANGE_LAYER_BACKGROUND_COLOR, EVENT_CHANGE_LAYER_CLIPPATH, EVENT_CHANGE_LAYER_FILTER, EVENT_CHANGE_LAYER_POSITION, EVENT_CHANGE_LAYER_RADIUS, EVENT_CHANGE_LAYER_SIZE, EVENT_CHANGE_LAYER_TRANSFORM, EVENT_CHANGE_IMAGE, EVENT_CHANGE_IMAGE_COLOR, EVENT_CHANGE_IMAGE_RADIAL_POSITION, EVENT_CHANGE_IMAGE_RADIAL_TYPE, CHANGE_LAYER_POSITION, EVENT_CHANGE_LAYER_TRANSFORM_3D, EVENT_CHANGE_IMAGE_ANGLE, EVENT_CHANGE_IMAGE_LINEAR_ANGLE, EVENT_CHANGE_COLOR_STEP, EVENT_CHANGE_PAGE_SIZE, EVENT_CHANGE_PAGE, CHANGE_SELECTION, EVENT_CHANGE_LAYER_MOVE } from '../../types/event';
import { ITEM_TYPE_PAGE } from '../../module/SelectionManager';
import Dom from '../../../util/Dom';


export default class GradientView extends BaseTab {

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
                        <PredefinedLayerResizer></PredefinedLayerResizer>                        
                        <MoveGuide></MoveGuide>     
                        <div ref="$dragArea"></div>                     
                    </div>          
                </div>
 
                <!--<ColorPickerLayer></ColorPickerLayer>-->
                <SubFeatureControl></SubFeatureControl>
            </div>
        `
    } 

    components () {
        return {  
            ColorPickerLayer, 
            SubFeatureControl,
            MoveGuide,
            PredefinedPageResizer,
            PredefinedLayerResizer
        }
    }

    'load $colorview' () {
        var page = this.read('/selection/current/page')

        if (!page) {
            return ''; 
        }

        var list = this.read('/item/map/children', page.id, (item, index) => {
            return `<div 
                class='layer' 
                item-layer-id="${item.id}" 
                title="${index+1}. ${item.name || 'Layer'}" 
                style='${this.read('/layer/toString', item, true)}'>
                    ${this.read('/layer/toStringClipPath', item)}
                </div>`
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
                $el.html(this.read('/layer/toStringClipPath', item))
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
            width: 2000 + 'px',
            height: 2000 + 'px'
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

    [EVENT_CHANGE_PAGE_SIZE] () {
        this.setBackgroundColor()
    }

    [EVENT_CHANGE_PAGE] () {
        this.setBackgroundColor();
    }

    // indivisual layer effect 
    [EVENT_CHANGE_LAYER] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_BACKGROUND_COLOR] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_CLIPPATH] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_FILTER] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_POSITION] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_RADIUS] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_SIZE] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_MOVE] (newValue) { this.refreshLayer(); }    
    [EVENT_CHANGE_LAYER_TRANSFORM] (newValue) { this.refreshLayer(); }
    [EVENT_CHANGE_LAYER_TRANSFORM_3D] (newValue) { this.refreshLayer(); }

    [EVENT_CHANGE_IMAGE] (newValue) { this.refreshLayer() }
    [EVENT_CHANGE_IMAGE_COLOR] (newValue) { this.refreshLayer() }
    [EVENT_CHANGE_IMAGE_ANGLE] (newValue) { this.refreshLayer() }
    [EVENT_CHANGE_IMAGE_LINEAR_ANGLE] (newValue) { this.refreshLayer() }
    [EVENT_CHANGE_IMAGE_RADIAL_POSITION] (newValue) { this.refreshLayer() }
    [EVENT_CHANGE_IMAGE_RADIAL_TYPE] (newValue) { this.refreshLayer() }

    [EVENT_CHANGE_COLOR_STEP] (newValue) { this.refreshLayer() }

    // all effect 
    [EVENT_CHANGE_EDITOR] () {
        this.refresh();
    }

    '@changeTool' () {
        // this.refresh()
        this.refs.$colorview.toggleClass('showGrid', this.read('/tool/get', 'show.grid'))
    }

    checkPage (e) {
        return e.target == this.refs.$colorview.el;
    }

    'click $page .layer | self' (e) {
        var id = e.$delegateTarget.attr('item-layer-id')
        if (id) {
            this.dispatch('/selection/one', id);
            this.emit(CHANGE_SELECTION)
        }
    }

    selectPageMode () {
        
        if (!this.dragArea) {
            this.dispatch('/selection/change', ITEM_TYPE_PAGE) ;
        }

    }


    // 'click $page' (e) {
    //     if (!e.$delegateTarget) {
    //         this.selectPageMode()
    //     } else if (!e.$delegateTarget.hasClass('layer')) {
    //         this.selectPageMode()
    //     }

    // }    

    // 'click $el .page-canvas | self' (e) {
    //     this.selectPageMode()
    // }

    isDownCheck () {
        return this.isDown
    }

    isNotDownCheck () {
        return !this.isDown
    }

    isPageMode (e) {
        if (this.read('/selection/is/page')) {
            return true; 
        }

        var $target = new Dom(e.target)

        if ($target.is(this.refs.$colorview)) {
            return true;
        }

        if ($target.is(this.refs.$canvas)) {
            return true;
        }
    }

    hasDragArea () {
        return this.dragArea
    }

    hasNotDragArea () {
        return !this.dragArea
    }

    'pointerstart $canvas | hasNotDragArea | isPageMode | isNotDownCheck' (e) {
        this.isDown = true; 
        this.xy = e.xy;
        var x = this.xy.x;
        var y = this.xy.y;
        this.dragArea = true;
        this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: 0px;height:0px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`)
        this.refs.$dragArea.show();
    }     
    
    'pointermove document | hasDragArea | isDownCheck' (e) {
        if (!this.xy) return;         
        // this.refs.$page.addClass('moving');
        this.targetXY = e.xy;

        var width = Math.abs(this.targetXY.x - this.xy.x)
        var height = Math.abs(this.targetXY.y - this.xy.y)

        var offset = this.refs.$board.offset();

        var x = Math.min(this.targetXY.x, this.xy.x) + this.refs.$board.scrollLeft() - offset.left;
        var y = Math.min(this.targetXY.y, this.xy.y) + this.refs.$board.scrollTop() - offset.top;
        this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: ${width}px;height:${height}px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`);


    }    

    'pointerend document | hasDragArea | isDownCheck' (e) {
        this.isDown = false; 

        if (!this.xy) return; 
        if (!this.targetXY) return; 

        var width = Math.abs(this.targetXY.x - this.xy.x)
        var height = Math.abs(this.targetXY.y - this.xy.y)

        var po = this.refs.$page.offset();

        var x = Math.min(this.targetXY.x, this.xy.x) - po.left;
        var y = Math.min(this.targetXY.y, this.xy.y) - po.top;
        
        this.dragArea = false;
        this.refs.$dragArea.hide();

        this.dispatch('/selection/area', {x, y, width, height})        
    }    

    isNotFirstPosition (e) {
        return this.xy.x !== e.xy.x || this.xy.y !== e.xy.y     
    }     

}