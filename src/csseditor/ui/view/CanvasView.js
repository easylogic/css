import UIElement, { EVENT } from '../../../util/UIElement';

import { 
    CHANGE_EDITOR, 
    CHANGE_ARTBOARD, 
    CHANGE_SELECTION,
    CHANGE_RECT,
    CHANGE_LAYER
} from '../../types/event';
import { EMPTY_STRING } from '../../../util/css/types';
import { LOAD, POINTERSTART, MOVE, END, SELF, PREVENT, STOP } from '../../../util/Event';
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


function createGuideLine (list) {
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

    return layer.toBackgroundImageCSS(); 
}


export default class CanvasView extends UIElement {

    initialize () {
        super.initialize();

        this.initializeLayerCache();
        this.itemPositionCalc = new ItemPositionCalc();
        this.selectMode = 'layer'
    }


    makeResizer () {
        return html`<div class='item-resizer' ref="$itemResizer">
                ${Segment.LIST.map(seg => {
                    return `<button type="button" class='segment' data-value="${seg}"></button>`
                })}
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
        var children = layer.children;
        var isLayoutItem = layer.isLayoutItem() ? 'true' : 'false'
        var hasLayout = layer.hasLayout()
        return html`
            <div 
                class='layer' 
                item-id="${layer.id}" 
                style="${layer.toBoundString()}" 
                title="${layer.title}" 
                data-layout-item="${isLayoutItem}"
                data-has-layout="${hasLayout}"
                >
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
                    <div class='artboard-title' artboard-id="${artboard.id}">${artboard.title}</div>
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
            return artboard.allLayers.filter(layer => !layer.isLayoutItem()).map(layer => {
                return this.makeLayer(layer)
            })
        });
    }    

    refresh () {
        this.setBackgroundColor();
        this.load();

        this.refreshAllLayers()
        editor.selection.initRect()
        this.setItemResizer();
        this.removeGuideLine()
    }

    cacheSelectedItem () {

        if (this.item && this.item.isLayoutItem()) {
            this.itemPositionCalc.clear()
        } else {
            this.itemPositionCalc.initialize(this.direction);
        }

    }

    selectItem () {
        this.cacheSelectedItem();    
        this.removeGuideLine()    
    }

    [POINTERSTART('$artboardArea .artboard-title') + MOVE('moveArtBoard') + END('moveEndArtBoard')] (e) {
        this.selectMode = 'artboard'

        this.item = editor.get(e.$delegateTarget.attr('artboard-id'))
        this.item.select();
        this.selectItem();
    }

    moveEndArtBoard () {
        this.item.select();
        this.setItemResizer();
    }

    [POINTERSTART('$layerArea .layer') + PREVENT + STOP + MOVE('moveLayer') + END('moveEndLayer')] (e) {
        
        this.selectMode = 'layer'
        this.direction = Segment.MOVE;
        this.item = editor.get(e.$delegateTarget.attr('item-id'))
        this.item.select()
        this.selectItem();

        this.isLayoutItem = this.item.isLayoutItem()

    }

    moveEndLayer () {
        this.item.select()        
        this.setItemResizer();
    }


    [POINTERSTART('$dragArea') + PREVENT + STOP + MOVE('dragArea') + END('dragAreaEnd')] (e) {
        this.selectMode = 'drag'
        this.offsetX = e.offsetX 
        this.offsetY = e.offsetY
        this.removeGuideLine()
    }


    [POINTERSTART('$itemResizer button') + SELF + MOVE('moveResize') + END('moveResizeEnd')] (e) {
        this.$target = e.$delegateTarget;
        this.direction = this.$target.attr('data-value');
        this.cacheSelectedItem();
    }         

    getDragRect (dx, dy) {
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

    getDragCSS (dx, dy) {
        var rect  = this.getDragRect(dx, dy);

        return {
            left: rect.x,
            top: rect.y,
            width: rect.width,
            height: rect.height
        }
    }

    dragArea (dx, dy) {
        this.refs.$dragAreaView.css(this.getDragCSS(dx, dy));
    }

    dragAreaEnd (dx, dy) {
        this.refs.$dragAreaView.css({left: Length.px(-10000)});
        editor.selection.area(this.getDragRect(dx, dy))
        this.itemPositionCalc.initialize(this.direction);
        this.setItemResizer();           
        editor.send(CHANGE_SELECTION, null, this);         
    }

    moveResize (dx, dy) {
        var guideList = this.itemPositionCalc.calculate(dx, dy)
        this.setGuideLine(guideList);

        this.matchPosition();

        this.emit(CHANGE_RECT);
    }

    moveResizeEnd () {

        editor.selection.items.forEach(item => {
            this.refreshLayerOffset(item)
        })
    }

    matchPosition () {
        editor.selection.items.forEach(item => {
            this.itemPositionCalc.recover(item);
            this.getCachedLayerElement(item.id).css(item.toBoundCSS());
        })
        
        this.setItemResizer();
    }

    movePosition(dx, dy) {
        this.itemPositionCalc.calculateMove(dx, dy);
        
        this.matchPosition()
    }


    moveArtBoard (dx, dy) {
       this.movePosition(dx, dy);
       this.refreshLayerPosition(this.item);       
       editor.send(CHANGE_RECT, this.item, this);       
    }

    moveLayer (dx, dy) {

        if (!this.isLayoutItem) {
            this.movePosition(dx, dy);   

            editor.send(CHANGE_RECT, this.item, this);
        }

    }    

    refreshLayerOffset (item) {
        var $el = this.getCachedLayerElement(item.id); 

        item.offset = $el.offsetRect()

        item.children.forEach(child => {
            this.refreshLayerOffset(child);
        })        
    }

    refreshLayerOne (item) {
        var $el = this.getCachedLayerElement(item.id); 

        var content = item.content || EMPTY_STRING;
        $el.$('.text-layer').html(content)            
        $el.cssText(item.toBoundString())
        $el.attr('data-layout-item', item.isLayoutItem() ? 'true' : 'false')
        $el.attr('data-has-layout', item.hasLayout() ? 'true' : 'false')

        item.offset = $el.offsetRect()

        item.children.forEach(child => {
            this.refreshLayerOne(child);
        })

        this.refreshLayerOffset(item)
    }
    
    refreshLayer () {
        editor.selection.layers.forEach(item => {
            this.refreshLayerOne(item);
        })

    } 

    refreshAllLayers () {
        var project = editor.selection.currentProject;
        if (project) {
            project.artboards.forEach(artboard => {
                artboard.allLayers.forEach(layer => {
                    this.refreshLayerOne(layer);
                })
            })
        }

    }
 
    setBackgroundColor() {

        var canvasCSS = { 
            width: Length.px( editor.config.get('canvas.width') ), 
            height: Length.px( editor.config.get('canvas.height') )
        }

        this.refs.$panel.css(canvasCSS)
    }

    removeGuideLine() {
        this.refs.$guide.cssText('');
    }

    setGuideLine (list) {
        this.refs.$guide.cssText(CSS_TO_STRING(createGuideLine(list)));
    }

    setItemResizer () {
        var current = editor.selection.current;
        if (current) {
            if (current.isLayoutItem()) {
                this.refs.$itemResizer.attr('data-rect', 'true')
            } else {
                this.refs.$itemResizer.attr('data-rect', 'false')
            }
            this.refs.$itemResizer.attr('data-mode', current.itemType)            
            this.refs.$itemResizer.attr('data-layout', current.display.type)
        } 
        
        if (current && current.isLayoutItem()) {
            this.refs.$itemResizer.css(current.screen)
            return; 
        }

        if (editor.selection.artboard || editor.selection.layer) {

            var current = editor.selection.current; 
            var currentRect = editor.selection.currentRect;

            if (currentRect && !current.isLayoutItem()) {
                this.refs.$itemResizer.css({
                    left: currentRect.screenX,
                    top: currentRect.screenY,
                    width: currentRect.width,
                    height: currentRect.height
                })
            } else {
                this.refs.$itemResizer.css({ left: '-10000px'})    
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
        this.setItemResizer();
    }

    [EVENT(CHANGE_RECT)] () {

        var guideList = this.itemPositionCalc.calculateGuide()
        this.setGuideLine(guideList);
        this.matchPosition()

    }

    [EVENT(CHANGE_SELECTION)] () {

        var item = editor.selection.current;
        if (item) {
            var $item = this.getCachedLayerElement(item.id)
            if (!$item) {
                this.refresh();
            } else {
                this.item = item; 
                this.selectItem()
                editor.selection.initRect()
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