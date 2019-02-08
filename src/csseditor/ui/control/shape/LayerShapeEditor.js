import shapeEditor from './shape-editor/index';
import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER, 
    CHANGE_LAYER_CLIPPATH, 
    CHANGE_LAYER_SIZE, 
    CHANGE_LAYER_POSITION, 
    CHANGE_LAYER_ROTATE 
} from '../../../types/event';
import { pxUnit, stringUnit, unitValue } from '../../../../util/css/types';
import { SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER, SELECTION_IS_IMAGE, SELECTION_IS_BOXSHADOW, SELECTION_IS_TEXTSHADOW } from '../../../types/SelectionTypes';


export default class LayerShapeEditor extends UIElement {

    components () {
        return shapeEditor;
    }

    template () { 
        return `<div class="layer-shape-editor">
            <CircleEditor></CircleEditor>
            <EllipseEditor></EllipseEditor>
            <InsetEditor></InsetEditor>
            <PolygonEditor></PolygonEditor>
            <PathEditor></PathEditor>
        </div>`
    }

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow)

        if (isShow) {
            this.setPosition()
        }
    }

    setRectangle ({x, y, width, height, id}) {
        var toolSize = this.config('tool.size');
        var boardOffset = this.boardOffset || toolSize['board.offset']
        var pageOffset = this.pageOffset || toolSize['page.offset']
        var canvasScrollLeft = this.canvasScrollLeft || toolSize['board.scrollLeft'];
        var canvasScrollTop = this.canvasScrollTop || toolSize['board.scrollTop'];

        x = pxUnit( unitValue(x) + pageOffset.left - boardOffset.left + canvasScrollLeft ); 
        y = pxUnit( unitValue(y) + pageOffset.top - boardOffset.top  + canvasScrollTop ); 

        var left = stringUnit(x);
        var top = stringUnit(y);
        width = stringUnit(width);
        height = stringUnit(height);

        // var transform = "none"; 
        
        // if (id) {
        //     // transform = this.read(LAYER_MAKE_TRANSFORM_ROTATE, this.read(ITEM_GET, id));
        // }

        return { width, height, left, top}
    }    

    setPosition () {
        var item = this.read(SELECTION_CURRENT_LAYER)

        if (!item) return; 
        if (!item.showClipPathEditor) return;

        this.$el.css(this.setRectangle(item))
    }

    isShow () {
        return this.read(SELECTION_IS_LAYER) 
            || this.read(SELECTION_IS_IMAGE)
            || this.read(SELECTION_IS_BOXSHADOW)
            || this.read(SELECTION_IS_TEXTSHADOW);                        
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_LAYER_SIZE,
        CHANGE_LAYER_POSITION,
        CHANGE_LAYER_CLIPPATH,
        CHANGE_LAYER_ROTATE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }

}