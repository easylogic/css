import BaseTab from '../BaseTab';
import PredefinedPageResizer from '../control/shape/PredefinedPageResizer';
import PredefinedLayerResizer from '../control/shape/PredefinedLayerResizer';

import MoveGuide from '../control/shape/MoveGuide';
import SubFeatureControl from '../control/SubFeatureControl';
import ColorPickerLayer from '../control/panel/items/color/ColorPicker';
import { parseParamNumber } from '../../../util/filter/functions';


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
        var page = this.read('/item/current/page')

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

    makePageCSS (page) {
        return {
            overflow: page.clip ? 'hidden' : '',
            width: page.width, 
            height: page.height
        }; 
    }
 
    setBackgroundColor() {

        var page = this.read('/item/current/page');

        var pageCSS = this.makePageCSS(page);
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

        var item = this.read('/item/current/page')

        this.refs.$page.toggle(item)


        if (item) {
            if (item.itemType == 'page') {
                var list = this.read('/item/list/children', item.id);
                this.refs.$colorview.toggle(list.length)
            }
        }
        

    }

    '@changeEditor' () {
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
            this.run('/item/select/mode', 'layer')
            this.dispatch('/item/select', id);
        }
    }

    selectPageMode () {
        this.dispatch('/item/select/mode', 'page')    
    }


    'click $page' (e) {
        if (!e.$delegateTarget) {
            this.selectPageMode()
        } else if (!e.$delegateTarget.hasClass('layer')) {
            this.selectPageMode()
        }

    }    

    'click $el .page-canvas | self' (e) {
        this.selectPageMode()
    }

    /*
    'click $colorview' (e) {

        this.read('/item/current/layer', layer => {
            this.dispatch('/item/select', layer.id);
            this.refresh();
        })
    } */


    updatePosition (style1 = {}, style2 = {}) {
        let style = Object.assign({}, style1, style2);

        Object.keys(style).forEach(key => {
            style[key] = style[key] + 'px' 
        })

        var item = Object.assign(this.layer, style);
        this.run('/item/set', item);

        var list = this.read('/guide/snap/layer', item, 3);
        // var {x, y} = item  
        if (list.length) {

            var [newX, newY] = list

            if (typeof newX != 'undefined') {
                item.x = newX + 'px';
            }

            if (typeof newY != 'undefined') {
                item.y = newY + 'px';
            }
        }
        this.$layer.css({
            left: item.x,
            top: item.y
        })

        this.dispatch('/item/set', item);
        this.refresh(true); 
    }


    moveXY (dx, dy) {
        var x = this.moveX + dx; 
        var y = this.moveY + dy; 
        this.updatePosition({x, y})
    }    


    isDownCheck () {
        return this.isDown
    }

    isNotDownCheck () {
        return !this.isDown
    }

    'pointerstart $page .layer | isNotDownCheck' (e) {
        this.isDown = true; 
        this.xy = e.xy;
        this.$layer = e.$delegateTarget;
        this.layer = this.read('/item/get', e.$delegateTarget.attr('item-layer-id'))
        this.moveX = parseParamNumber(this.layer.x || '0px')
        this.moveY = parseParamNumber(this.layer.y || '0px')

        this.dispatch('/item/select', this.layer.id)
    }    

    'pointermove document | isDownCheck' (e) {
        this.refs.$page.addClass('moving');
        this.targetXY = e.xy;
        this.moveXY(this.targetXY.x - this.xy.x, this.targetXY.y - this.xy.y)
    }


    isNotFirstPosition (e) {
        return this.xy.x !== e.xy.x || this.xy.y !== e.xy.y     
    }     

    'pointerend document | isDownCheck' (e) {
        this.isDown = false; 
        this.layer = null;
        this.refs.$page.removeClass('moving');        

        if (this.isNotFirstPosition(e)) {
            this.dispatch('/history/push', 'Move a layer');
        }
    }

}