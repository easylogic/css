import UIElement, { EVENT } from '../../../util/UIElement';
// import PredefinedPageResizer from '../control/shape/PredefinedPageResizer';
// import PredefinedGroupLayerResizer from '../control/shape/PredefinedGroupLayerResizer';
import LayerShapeEditor from '../control/shape/LayerShapeEditor';
import MoveGuide from '../control/shape/MoveGuide';
import SubFeatureControl from '../control/SubFeatureControl';

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
    CHANGE_LAYER_BORDER,
    CHANGE_SELECTION
} from '../../types/event';
import { EMPTY_STRING, SEGMENT_TYPE_RIGHT, SEGMENT_TYPE_LEFT, SEGMENT_TYPE_TOP, SEGMENT_TYPE_BOTTOM, SEGMENT_TYPE_TOP_RIGHT, SEGMENT_TYPE_BOTTOM_RIGHT, SEGMENT_TYPE_BOTTOM_LEFT, SEGMENT_TYPE_TOP_LEFT, SEGMENT_TYPE_MOVE } from '../../../util/css/types';
import { LOAD, POINTERSTART, MOVE, END, SELF, STOP, IF, PREVENT } from '../../../util/Event';
import { editor } from '../../../editor/editor';
import { Length } from '../../../editor/unit/Length';
import { html, isUndefined } from '../../../util/functions/func';
import { ArtBoard } from '../../../editor/ArtBoard';
import { Layer } from '../../../editor/Layer';
import { ItemPositionCalc } from '../../../editor/ItemPositionCalc';

const move = {
    [SEGMENT_TYPE_MOVE] : true 
}

const right = {
    [SEGMENT_TYPE_RIGHT]: true, 
    [SEGMENT_TYPE_TOP_RIGHT]: true, 
    [SEGMENT_TYPE_BOTTOM_RIGHT]: true
}
const left = {
    [SEGMENT_TYPE_LEFT]: true, 
    [SEGMENT_TYPE_TOP_LEFT]: true, 
    [SEGMENT_TYPE_BOTTOM_LEFT]: true
}
const top = {
    [SEGMENT_TYPE_TOP]: true, 
    [SEGMENT_TYPE_TOP_RIGHT]: true, 
    [SEGMENT_TYPE_TOP_LEFT]: true
}

const bottom = {
    [SEGMENT_TYPE_BOTTOM]: true, 
    [SEGMENT_TYPE_BOTTOM_LEFT]: true, 
    [SEGMENT_TYPE_BOTTOM_RIGHT]: true
}

export default class CanvasView extends UIElement {

    initialize () {
        super.initialize();

        this.hasScroll = false;
        this.initializeLayerCache();
        this.itemPositionCalc = new ItemPositionCalc();
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
                            ${this.makeResizer()}
                            <div class="drag-area-view" ref="$dragAreaView"></div>
                            <div class='page-guide-line' ref="$guide"></div>                            
                        </div>
                    </div>
                </div>
                <!--
                <LayerShapeEditor />
                <MoveGuide />-->

              
                <!--SubFeatureControl /-->
            </div>
        `
    }     

    components () {
        return {  
            SubFeatureControl,
            LayerShapeEditor,
            MoveGuide
        }
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
            item.layers.forEach(layer => {
                var $el = this.getCachedLayerElement(layer.id);
                if ($el) $el.css(layer.toBoundCSS());
            })
        }
    }

    makeResizer () {
        return `<div class='item-resizer' ref="$itemResizer">
            <button type="button" data-value="${SEGMENT_TYPE_MOVE}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_RIGHT}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_LEFT}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_TOP}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_BOTTOM}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_TOP_RIGHT}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_BOTTOM_RIGHT}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_BOTTOM_LEFT}"></button>
            <button type="button" data-value="${SEGMENT_TYPE_TOP_LEFT}"></button>
        </div>`
    }

    makeLayer (layer) {
        var selected = editor.selection.check(layer) ? 'selected': EMPTY_STRING
        return `
            <div 
                class='layer ${selected}' 
                item-id="${layer.id}" 
                style="${layer.toBoundString()}" 
                title="${layer.title}" >
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
            return artboard.layers.map(layer => {
                return this.makeLayer(layer)
            })
        });
    }    

    refresh () {
        this.setBackgroundColor();
        this.load();
        this.setItemResizer();
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

        this.x = +this.item.x.clone(); 
        this.y = +this.item.y.clone(); 
        this.width = +this.item.width.clone(); 
        this.height = +this.item.height.clone();
        this.x2 = this.x + this.width; 
        this.y2 = this.y + this.height; 

        this.itemPositionCalc.initialize();
    }

    selectItem ($target) {

        this.cacheSelectedItem($target);        
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
        if (editor.selection.area(this.getDragRect())) {
            this.setItemResizer();            
            editor.send(CHANGE_SELECTION, null, this);
        }        

    }


    caculateSnap () {
        // this.run(GUIDE_SNAP_CACULATE, 3, this.currentType);
    }    

    moveResize () {
        var pos = editor.config.get('pos');

        var dx = pos.x - this.targetXY.x;
        var dy = pos.y - this.targetXY.y; 

        var items = editor.selection.items;

        items.forEach(item => {
            if (move[this.direction]) {  this.itemPositionCalc.caculateMove(item, dx, dy); }
            if (right[this.direction]) {  this.itemPositionCalc.caculateRight(item, dx, dy); }
            if (bottom[this.direction]) {  this.itemPositionCalc.caculateBottom(item, dx, dy); } 
            if (top[this.direction]) { this.itemPositionCalc.caculateTop(item, dx, dy); } 
            if (left[this.direction]) { this.itemPositionCalc.caculateLeft(item, dx, dy); }
    
            this.getCachedLayerElement(item.id).css(item.toBoundCSS());
        })
        
        this.setItemResizer();

        if (editor.selection.current instanceof ArtBoard) {
            this.emit(CHANGE_PAGE_SIZE);
        } else {
            this.emit(CHANGE_LAYER_SIZE)
        }

    }

    movePosition() {
        var pos = editor.config.get('pos');

        var dx = pos.x - this.targetXY.x;
        var dy = pos.y - this.targetXY.y;
        
        editor.selection.items.forEach(item => {
            this.itemPositionCalc.caculateMove(item, dx, dy);
            this.getCachedLayerElement(item.id).css(item.toBoundCSS())
        })

        this.setItemResizer();
    }


    moveArtBoard () {
       this.movePosition();
       this.refreshLayerPosition(this.item);       
       editor.send(CHANGE_PAGE_TRANSFORM, this.item, this);       
    }

    moveLayer () {
        this.movePosition();   
        editor.send(CHANGE_LAYER_POSITION, this.item, this);
    }    
    
    refreshLayer () {
        console.log('refreshLayer')
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

    setItemResizer () {

        if (editor.selection.artboard || editor.selection.layer) {
            var current = editor.selection.rect();
            if (current) {
                this.refs.$itemResizer.css({
                    left: current.x,
                    top: current.y,
                    width: current.width,
                    height: current.height
                })
            }
        } else {
            this.refs.$itemResizer.css({ left: '-10000px'})
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
        this.refreshLayer();
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

    [EVENT(
        CHANGE_SELECTION
    )] () {

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