import BaseTab from '../BaseTab';
import PredefinedPageResizer from '../control/shape/PredefinedPageResizer';
import PredefinedLayerResizer from '../control/shape/PredefinedLayerResizer';

import MoveGuide from '../control/shape/MoveGuide';
import SubFeatureControl from '../control/SubFeatureControl';
import LayerShapeEditor from '../control/shape/LayerShapeEditor';
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
                        <LayerShapeEditor></LayerShapeEditor>
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
            PredefinedLayerResizer, 
            LayerShapeEditor
        }
    }

    'load $colorview' () {
        var page = this.read('/item/current/page')

        if (!page) {
            return ''; 
        }

        var editMode = this.read('/item/get/editMode');

        var list = this.read('/item/map/children', page.id, (item, index) => {
            return `<div 
                class='layer' 
                item-layer-id="${item.id}" 
                title="${index+1}. ${item.name || 'Layer'}" 
                style='${this.read('/layer/toString', item, true)}'>
                    ${this.read('/layer/toStringClipPath', item)}
                </div>`
        });

        return list.reverse(); 
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
        return Object.assign({
            overflow: page.clip ? 'hidden' : ''
        }, page.style || {}); 
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

    'click.self $page .layer' (e) {
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

    'click.self $el .page-canvas' (e) {
        this.selectPageMode()
    }


    'click $colorview' (e) {

        this.read('/item/current/layer', layer => {
            this.dispatch('/item/select', layer.id);
            this.refresh();
        })
    }    

    'pointerstart $page .layer' (e) {
        this.isDown = true; 
        this.xy = e.xy;
        this.$layer = e.$delegateTarget;
        this.layer = this.read('/item/get', e.$delegateTarget.attr('item-layer-id'))
        this.moveX = +(this.layer.style.x || 0).replace('px', '')
        this.moveY = +(this.layer.style.y || 0).replace('px', '')

        this.dispatch('/item/select', this.layer.id)
    }

    updatePosition (style1 = {}, style2 = {}) {
        let style = Object.assign({}, style1, style2);

        Object.keys(style).forEach(key => {
            style[key] = style[key] + 'px' 
        })

        var item = this.layer
        item.style = Object.assign(item.style, style);

        var list = this.read('/guide/snap/layer', item, 3);

        if (list.length) {

            var [x, y] = list

            if (typeof x != 'undefined') {
                item.style.x = x + 'px';
            }

            if (typeof y != 'undefined') {
                item.style.y = y + 'px';
            }
        }

        this.$layer.css({
            left: item.style.x,
            top: item.style.y
        })
        this.dispatch('/item/set', item);
        this.refresh(true); 
    }


    moveXY (dx, dy) {
        var x = this.moveX + dx; 
        var y = this.moveY + dy; 

        this.updatePosition({x, y})
    }    


    'pointermove document' (e) {
        if (this.isDown) {
            this.refs.$page.addClass('moving');
            this.targetXY = e.xy;

            this.moveXY(this.targetXY.x - this.xy.x, this.targetXY.y - this.xy.y)
        }
    }

    'pointerend document' (e) {
        if (this.isDown) {
            this.isDown = false; 
            this.layer = null;
            this.refs.$page.removeClass('moving');        
        }
    }

}