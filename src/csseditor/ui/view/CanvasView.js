import UIElement, { EVENT } from '../../../util/UIElement';

import { 
    CHANGE_EDITOR, 
    CHANGE_ARTBOARD, 
    CHANGE_SELECTION,
    CHANGE_RECT,
    CHANGE_LAYER
} from '../../types/event';
import { EMPTY_STRING } from '../../../util/css/types';
import { LOAD, POINTERSTART, MOVE, END, SELF } from '../../../util/Event';
import { editor } from '../../../editor/editor';
import { Length } from '../../../editor/unit/Length';
import { html, isNotUndefined } from '../../../util/functions/func';
import { ArtBoard } from '../../../editor/ArtBoard';
import { Layer } from '../../../editor/Layer';
import { ItemPositionCalc } from '../../../editor/ItemPositionCalc';
import { BackgroundImage } from '../../../editor/css-property/BackgroundImage';
import { StaticGradient } from '../../../editor/image-resource/StaticGradient';
import { CSS_TO_STRING } from '../../../util/css/make';
import { Segment } from '../../../editor/util/Segment';

export default class CanvasView extends UIElement {

    initialize () {
        super.initialize();

        this.initializeLayerCache();
        this.itemPositionCalc = new ItemPositionCalc();
    }


    makeResizer () {
        return `<div class='item-resizer' ref="$itemResizer">
            <button type="button" class='segment' data-value="${Segment.MOVE}"></button>
            <button type="button" class='segment' data-value="${Segment.RIGHT}"></button>
            <button type="button" class='segment' data-value="${Segment.LEFT}"></button>
            <button type="button" class='segment' data-value="${Segment.TOP}"></button>
            <button type="button" class='segment' data-value="${Segment.BOTTOM}"></button>
            <button type="button" class='segment' data-value="${Segment.TOP_RIGHT}"></button>
            <button type="button" class='segment' data-value="${Segment.BOTTOM_RIGHT}"></button>
            <button type="button" class='segment' data-value="${Segment.BOTTOM_LEFT}"></button>
            <button type="button" class='segment' data-value="${Segment.TOP_LEFT}"></button>
        </div>`
    }    

    template () {
        return `
            <div class='page-view'>
                <div class='page-content' ref="$board">
                    <div class="page-scroll-panel" style="position:relative" ref="$panel">
                        <div class="page-canvas" ref="$canvas">
                            <div class='area drag-area' ref="$dragArea"></div>
                            <div class='area artboard-area' ref="$artboardArea"></div>
                            <div class='area layer-area' ref="$layerArea"></div>
                        </div>          
                        <div class="page-selection">
                            <div class='page-guide-line' ref="$guide"></div>
                            ${this.makeResizer()}
                            <div class="drag-area-view" ref="$dragAreaView"></div>

                        </div>
                    </div>
                </div>
            </div>
        `
    }     

    initializeLayerCache () {
        this.layerItems = {} 
    }

    getCachedLayerElement (id) {

        if (!this.layerItems[id]) {
            var $el = this.$el.$(`[item-id="${id}"]`);

            this.layerItems[id] = $el; 
        }

        return this.layerItems[id]
    }

    refreshLayerPosition (item) {
        if (item instanceof ArtBoard) {
            item.allLayers.forEach(layer => {
                var $el = this.getCachedLayerElement(layer.id);
                if ($el) $el.css(layer.toBoundCSS());
            })
        }
    }


    makeLayer (layer) {
        var selected = editor.selection.check(layer) ? 'selected': EMPTY_STRING
        var children = layer.children;
        return html`
            <div 
                class='layer ${selected}' 
                item-id="${layer.id}" 
                style="${layer.toBoundString()}" 
                title="${layer.title}" >
                ${children.map(it => this.makeLayer(it))}
                <div class='text-layer' style="pointer-events: none;"></div>
            </div>`
    }

    makeArtBoard (artboard) {
        return html`
            <div  
                class='artboard' 
                item-id="${artboard.id}" 
                title="${artboard.title}" 
                style='${artboard.toString()};'>
                    <div class='artboard-title' style="cursor:pointer;position:absolute;bottom:100%;left:0px;right:0px;display:inline-block;">${artboard.title}</div>
            </div>
        `
    }

    [LOAD('$artboardArea')] () {
        
        var project = editor.selection.currentProject
        if (!project) return EMPTY_STRING; 

        var list = project.artboards;

        return list.map( (artboard ) => {
            return this.makeArtBoard(artboard)
        });
    }
    
    [LOAD('$layerArea')] () {
        
        var project = editor.selection.currentProject        
        if (!project) return EMPTY_STRING; 

        this.initializeLayerCache();

        var list = project.artboards;

        return list.map( (artboard ) => {
            return artboard.allLayers.map(layer => {
                return this.makeLayer(layer)
            })
        });
    }    

    refresh () {
        this.setBackgroundColor();
        this.load();
        this.setItemResizer();
        this.removeGuideLine()
    }

    cacheSelectedItem ($target) {

        if ($target) {
            this.item = editor.get($target.attr('item-id'));
            this.$item = $target
            this.item.select();                    
        } else {
            this.item = editor.selection.current;
            this.$item = this.$el.$(`[item-id="${this.item.id}"]`)
        }

        this.x = +this.item.screenX.clone(); 
        this.y = +this.item.screenY.clone(); 
        this.width = +this.item.width.clone(); 
        this.height = +this.item.height.clone();
        this.x2 = this.x + this.width; 
        this.y2 = this.y + this.height; 

        this.itemPositionCalc.initialize(this.direction);
    }

    selectItem ($target) {
        this.cacheSelectedItem($target);    
        this.removeGuideLine()    
    }

    [POINTERSTART('$artboardArea .artboard-title') + MOVE('moveArtBoard') + END('moveEndArtBoard')] (e) {
        this.targetXY = e.xy; 
        this.$artboard = e.$delegateTarget.closest('artboard');  
        this.artboard = editor.get(this.$artboard.attr('item-id'))
        this.artboard.select();
        this.refs.$itemResizer.addClass('artboard').removeClass('layer');
        this.selectItem();
    }

    moveEndArtBoard () {
        this.artboard.select();
        this.setItemResizer();
    }

    [POINTERSTART('$layerArea .layer') + MOVE('moveLayer') + END('moveEndLayer')] (e) {
        this.targetXY = e.xy; 
        this.$layer = e.$delegateTarget;
        this.selectItem(this.$layer);
        this.refs.$itemResizer.addClass('layer').removeClass('artboard');

    }

    moveEndLayer () {
        this.item.select()
        this.setItemResizer();
    }


    [POINTERSTART('$dragArea') + MOVE('dragArea') + END('dragAreaEnd')] (e) {
        this.targetXY = e.xy; 
        this.offsetX = e.offsetX 
        this.offsetY = e.offsetY
        this.removeGuideLine()
    }


    [POINTERSTART('$itemResizer button') + SELF + MOVE('moveResize')] (e) {
        this.targetXY = e.xy; 
        this.$target = e.$delegateTarget;
        this.direction = this.$target.attr('data-value');
        this.cacheSelectedItem();
    }         

    getDragRect () {
        var pos = editor.config.get('pos');

        var dx = pos.x - this.targetXY.x;
        var dy = pos.y - this.targetXY.y; 

        var x = dx > -1 ? this.offsetX : this.offsetX + dx;
        var y = dy > -1 ? this.offsetY : this.offsetY + dy; 

        var rect = {
            x: Length.px(x),
            y: Length.px(y),
            width: Length.px(Math.abs(dx)),
            height: Length.px(Math.abs(dy)),
        }

        rect.x2 = Length.px(rect.x.value + rect.width.value)
        rect.y2 = Length.px(rect.y.value + rect.height.value)

        return rect; 
    }

    getDragCSS () {
        var rect  = this.getDragRect();

        return {
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height
        }
    }

    dragArea () {
        this.refs.$dragAreaView.css(this.getDragCSS());
    }

    dragAreaEnd () {
        this.refs.$dragAreaView.css({left: Length.px(-10000)});
        editor.selection.area(this.getDragRect())
        this.setItemResizer();           
 
        editor.send(CHANGE_SELECTION, null, this);         
    }

    moveResize () {
        var pos = editor.config.get('pos');

        var dx = pos.x - this.targetXY.x;
        var dy = pos.y - this.targetXY.y; 

        var guideList = this.itemPositionCalc.calculate(dx, dy)
        this.setGuideLine(guideList);

        this.matchPosition();

        this.emit(CHANGE_RECT);
    }

    matchPosition (guideList) {
        editor.selection.items.forEach(item => {
            this.itemPositionCalc.recover(item);
            this.getCachedLayerElement(item.id).css(item.toBoundCSS());
        })
        
        this.setItemResizer();
    }

    movePosition() {
        var pos = editor.config.get('pos');

        var dx = pos.x - this.targetXY.x;
        var dy = pos.y - this.targetXY.y;

        this.itemPositionCalc.calculateMove(dx, dy);
        
        this.matchPosition()
    }


    moveArtBoard () {
       this.movePosition();
       this.refreshLayerPosition(this.item);       
       editor.send(CHANGE_RECT, this.item, this);       
    }

    moveLayer () {
        this.movePosition();   
        editor.send(CHANGE_RECT, this.item, this);
    }    
    
    refreshLayer () {
        editor.selection.layers.forEach(item => {
            var $el = this.getCachedLayerElement(item.id); 

            var content = item.content || EMPTY_STRING;
            $el.$('.text-layer').html(content)            
            $el.cssText(item.toBoundString())
        })

    } 
 
    setBackgroundColor() {

        var canvasCSS = { width: Length.px( 2000 ), height: Length.px( 2000 )}

        this.refs.$panel.css(canvasCSS)
    }

    removeGuideLine() {
        this.refs.$guide.cssText('');
    }

    setGuideLine (list) {
        if (!list.length) {
            this.removeGuideLine()
            return
        }

        var layer = new Layer();

        const lineWidth = Length.px(1.5); 

        list.forEach(it => {

            var target = it.B; 

            if (isNotUndefined(it.ax)) {

                var background = layer.addBackgroundImage(new BackgroundImage());
                background.addGradient(new StaticGradient({ color: '#e600ff' }));
                background.repeat = 'no-repeat' 
                background.width = lineWidth
                background.height = it.A.height;
                background.x = Length.px(it.bx-1)
                background.y = it.A.screenY;       
                
                if (target instanceof Layer) {
                    var background = layer.addBackgroundImage(new BackgroundImage());
                    background.addGradient(new StaticGradient({ color: '#e600ff' }));
                    background.repeat = 'no-repeat' 
                    background.width = lineWidth
                    background.height = target.height;
                    background.x = Length.px(it.bx-1)
                    background.y = target.screenY;                           
                }

                var minY = Length.min(target.screenY, it.A.screenY);
                var maxY = Length.max(target.screenY2, it.A.screenY2);

                var background = layer.addBackgroundImage(new BackgroundImage());
                background.addGradient(new StaticGradient({ color: '#4877ff' }));
                background.repeat = 'no-repeat' 
                background.width = lineWidth
                background.height = Length.px(maxY.value - minY.value); 
                background.x = Length.px(it.bx-1)
                background.y = minY

            } else {
                var background = layer.addBackgroundImage(new BackgroundImage());
                background.addGradient(new StaticGradient({ color: '#e600ff' }));
                background.repeat = 'no-repeat' 
                background.width = it.A.width
                background.height = lineWidth
                background.x = it.A.screenX;
                background.y = Length.px(it.by)             

                var minX = Length.min(target.screenX, it.A.screenX);
                var maxX = Length.max(target.screenX2, it.A.screenX2);

                var background = layer.addBackgroundImage(new BackgroundImage());
                background.addGradient(new StaticGradient({ color: '#4877ff' }));
                background.repeat = 'no-repeat' 
                background.width = Length.px(maxX.value - minX.value); 
                background.height = lineWidth
                background.x = minX;
                background.y = Length.px(it.by)
                
                
            }

        })
        
        
        layer.remove()

        var css = layer.toBackgroundImageCSS(); 

        this.refs.$guide.cssText(CSS_TO_STRING(css));
    }

    setItemResizer () {

        if (editor.selection.artboard || editor.selection.layer) {
            var current = editor.selection.currentRect;
            if (current) {
                this.refs.$itemResizer.css({
                    left: current.screenX,
                    top: current.screenY,
                    width: current.width,
                    height: current.height
                })
            }
        } else {
            this.refs.$itemResizer.css({ left: '-10000px'})
        }
        
    }

    [EVENT(
        CHANGE_ARTBOARD
    )] () { this.setBackgroundColor(); }


    // indivisual layer effect 
    [EVENT(CHANGE_LAYER)]() { 
        this.refreshLayer(); 
    }

    [EVENT(CHANGE_RECT)] () {

        var guideList = this.itemPositionCalc.calculateGuide()
        this.setGuideLine(guideList);
        this.matchPosition()

    }

    [EVENT(CHANGE_SELECTION)] () {

        var item = editor.selection.current;
        if (item) {
            var $item = this.refs.$canvas.$(`[item-id="${item.id}"]`)
            if (!$item) {
                this.refresh();
            } else {
    
            }
    
            this.setItemResizer();
        } else {
            console.log('empty', item)
        }
    }

    // all effect 
    [EVENT(
        CHANGE_EDITOR
    )] () { 
        this.refresh(); 
    }

}