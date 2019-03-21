import UIElement, { EVENT } from '../../../util/UIElement';

import { 
    CHANGE_EDITOR, 
    CHANGE_ARTBOARD, 
    CHANGE_SELECTION,
    CHANGE_RECT,
    CHANGE_LAYER
} from '../../types/event';
import { EMPTY_STRING, WHITE_STRING } from '../../../util/css/types';
import { LOAD, POINTERSTART, MOVE, END, SELF, PREVENT, STOP } from '../../../util/Event';
import { editor } from '../../../editor/editor';
import { Length } from '../../../editor/unit/Length';
import { html, isNotUndefined, combineKeyArray, keyEach } from '../../../util/functions/func';
import { Layer } from '../../../editor/items/Layer';
import { ItemPositionCalc } from '../../../editor/ItemPositionCalc';
import { CSS_TO_STRING } from '../../../util/css/make';
import { Segment } from '../../../editor/util/Segment';


function createBackgroundImage (color, x, y, width, height) {
    return {
        'background-image': `linear-gradient(to right, ${color}, ${color})`,
        'background-size' : `${width} ${height}`,
        'background-position' : `${x} ${y}`,
        'background-repeat': 'no-repeat'
    }
}

function createGuideLine (list) {

    const lineWidth = Length.px(1.5); 

    var images = []

    list.forEach(it => {

        var target = it.B; 

        if (isNotUndefined(it.ax)) {

            images.push(createBackgroundImage('#e600ff', Length.px(it.bx-1), it.A.screenY, lineWidth, it.A.height))

            
            if (target instanceof Layer) {
                images.push(createBackgroundImage('#e600ff', Length.px(it.bx-1), target.screenY, lineWidth, target.height))
            }

            var minY = Length.min(target.screenY, it.A.screenY);
            var maxY = Length.max(target.screenY2, it.A.screenY2);

            images.push(createBackgroundImage('#4877ff', Length.px(it.bx-1), minY, lineWidth, Length.px(maxY.value - minY.value)))            

        } else {
            images.push(createBackgroundImage('#e600ff', it.A.screenX, Length.px(it.by), it.A.width, lineWidth))            

            var minX = Length.min(target.screenX, it.A.screenX);
            var maxX = Length.max(target.screenX2, it.A.screenX2);

            images.push(createBackgroundImage('#4877ff', minX, Length.px(it.by), Length.px(maxX.value - minX.value), lineWidth))            
        }

    })

    var results = {}
    images.forEach(item => {
        keyEach(item, (key, value) => {
            if (!results[key]) results[key] = []
            results[key].push(value);
        })
    })

    return combineKeyArray(results);
}


export default class CanvasView extends UIElement {

    initialize () {
        super.initialize();

        this.initializeLayerCache();
        this.itemPositionCalc = new ItemPositionCalc();
        this.selectMode = 'layer'
    }


    makeResizer () {
        return html`
            <div class='item-resizer select-view' ref="$itemResizer">
                ${Segment.LIST.map(seg => {
                    return `<button type="button" class='segment' data-value="${seg}"></button>`
                })}
            </div>
            <div class='item-resizer parent-view' ref="$parentItemResizer">
                <div class='grid-row-handler' data-count="0" ref="$parentItemResizerRow"></div>
                <div class='grid-column-handler' data-count="0" ref="$parentItemResizerColumn"></div>
            </div>            
        `
    }    

    template () {
        return `
            <div class='page-view'>
                <div class='page-content' ref="$board">
                    <div class="page-scroll-panel" style="position:relative" ref="$panel">
                        <div class="page-canvas" ref="$canvas">
                            <div class='area drag-area' ref="$dragArea"></div>
                            <div class='area artboard-area' ref="$artboardArea"></div>
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
        this.titleItems = {} 
    }

    getCachedLayerElement (id) {

        if (!this.layerItems[id]) {
            var $el = this.$el.$(`[item-id="${id}"]`);

            this.layerItems[id] = $el; 
        }

        return this.layerItems[id]
    }

    getCachedTitleElement (id) {

        if (!this.titleItems[id]) {
            var $el = this.$el.$(`[artboard-id="${id}"]`);

            this.titleItems[id] = $el; 
        }

        return this.titleItems[id]
    }    

    makeLayer (layer) {
        var children = layer.children;
        var isLayoutItem = layer.isLayoutItem() ? 'true' : 'false'
        var hasLayout = layer.hasLayout()
        return html`
            <div 
                class='layer' 
                item-id="${layer.id}" 
                style="${layer.toString()}" 
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
                class='artboard-background' 
                style='${artboard.toBoundString()};'>
                    <div class='artboard-title' artboard-id="${artboard.id}">${artboard.title}</div>
            </div>
            <div  
                class='artboard' 
                item-id="${artboard.id}" 
                title="${artboard.title}" 
                style='${artboard.toString()};'>
                ${artboard.allLayers.map(layer => this.makeLayer(layer))}
            </div>
        `
    }

    [LOAD('$artboardArea')] () {
        this.initializeLayerCache();
        var project = editor.selection.currentProject
        if (!project) return EMPTY_STRING; 

        var list = project.artboards;

        return list.map( (artboard ) => {
            return this.makeArtBoard(artboard)
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

        this.$artboardTitleContainer = e.$delegateTarget.parent();
        this.item = editor.get(e.$delegateTarget.attr('artboard-id'))
        this.item.select();
        this.selectItem();
    }

    [POINTERSTART('$artboardArea .layer') + PREVENT + STOP + MOVE('moveLayer') + END('moveEndLayer')] (e) {
        
        this.selectMode = 'layer'
        this.direction = Segment.MOVE;
        this.item = editor.get(e.$delegateTarget.attr('item-id'))
        this.item.select()
        this.selectItem();

        this.isLayoutItem = this.item.isLayoutItem()

    }    

    moveEndArtBoard () {
        this.item.select();
        this.setItemResizer();
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

    matchArtboardTitlePosition (item) {
        var $title = this.getCachedTitleElement(item.id);
        if ($title) {
            $title.parent().cssText(item.toBoundString())
        }
    }

    matchPosition () {

        var items = editor.selection.items;
        for(var i = 0, len = items.length; i < len; i++) {
            var item = items[i];
            this.itemPositionCalc.recover(item);
            this.getCachedLayerElement(item.id).css(item.toBoundCSS());
            this.matchArtboardTitlePosition (item)
        }

        this.setItemResizer();
    }

    movePosition(dx, dy) {
        this.itemPositionCalc.calculateMove(dx, dy);
        
        this.matchPosition()
    }


    moveArtBoard (dx, dy) {
       this.movePosition(dx, dy);
       this.matchArtboardTitlePosition (this.item)
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
        $el.cssText(item.toString())
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

    refreshArtBoard () {
        editor.selection.artboards.forEach(item => {
            this.refreshArtBoardOne(item);
        })

    }     

    refreshArtBoardOne (item) {
        var $el = this.getCachedLayerElement(item.id); 

        $el.cssText(item.toString())

        item.allLayers.forEach(layer => {
            this.refreshLayerOne(layer);
        })

        this.refreshLayerOffset(item)
    }

    refreshAllLayers () {

        var project = editor.selection.currentProject;
        if (project) {
            project.artboards.forEach(artboard => {
                this.refreshArtBoardOne(artboard);
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

    makeGridUnit (items) {
        return items.map((it, index) => {
            return `<div class='grid-item grid-item-index-${index}'>
                        <div class='grid-item-value'>
                            <button class='add-left'></button>
                            <input type='number' value="${it.value}" />
                            <div class='unit'>${it.unit}</div>
                            <button class='add-right'></button>
                        </div>
                        <div class='draggable-buttons'>
                            <button type="button" class='first'></button>
                            <button type="button" class='second'></button>
                        </div>                        
                    </div>`
        }).join(EMPTY_STRING)
    }

    setParentItemResizer (screen, current) {
        this.refs.$parentItemResizer.css(screen);
        this.refs.$parentItemResizer.attr('data-mode', current.itemType)            
        this.refs.$parentItemResizer.attr('data-layout',current.display.type)

        if (current.display.type == 'flex') {
            this.refs.$parentItemResizer.attr('data-flex-direction',current.display.direction)
        } else if (current.display.type == 'grid') {
            var rows = current.display.rows
            var count = +this.refs.$parentItemResizerRow.attr('data-count')
            if (count != rows.length) {     // 세로 
                this.refs.$parentItemResizerRow.cssText(`
                    grid-template-rows: ${rows.join(WHITE_STRING)};
                    grid-template-columns: 1fr;
                `)
                this.refs.$parentItemResizerRow.html(this.makeGridUnit(rows))
            }

            var columns = current.display.columns;
            count = +this.refs.$parentItemResizerColumn.attr('data-count')
            if (count != columns.length) {  // 가로 
                this.refs.$parentItemResizerColumn.cssText(`
                    grid-template-columns: ${columns.join(WHITE_STRING)};
                    grid-template-rows: 1fr;
                `)                
                this.refs.$parentItemResizerColumn.html(this.makeGridUnit(columns))
            }
        }
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

            var parent = current.parent();
            if (parent && parent.screen) {
                this.setParentItemResizer(parent.screen, parent);                                
            }
            
            return; 
        }

        this.refs.$parentItemResizer.css({ left: '-10000px'});     

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

                if (current.hasLayout()) {
                    this.setParentItemResizer(currentRect.screen, current);
                } 

            } else {
                this.refs.$itemResizer.css({ left: '-10000px'})    
            }
        } else {
            this.refs.$itemResizer.css({ left: '-10000px'})
        }
        
    }

    [EVENT(
        CHANGE_ARTBOARD
    )] () { 
        // this.setBackgroundColor(); 
        this.refreshArtBoard();
        this.setItemResizer();
    }



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