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
import { ITEM_GET } from '../../../types/ItemTypes';
import { SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER, SELECTION_IS_IMAGE, SELECTION_IS_BOXSHADOW, SELECTION_IS_TEXTSHADOW } from '../../../types/SelectionTypes';
import { LAYER_MAKE_TRANSFORM_ROTATE } from '../../../types/LayerTypes';


export default class LayerShapeEditor extends UIElement {


    initialize () {
        super.initialize()

        this.$board = this.parent.refs.$board;
        this.$canvas = this.parent.refs.$canvas;
        this.$page = this.parent.refs.$page; 
    }

    components () {
        return shapeEditor;
    }

    template () { 
        return `
            <div class="layer-shape-editor">
                <CircleEditor></CircleEditor>
                <EllipseEditor></EllipseEditor>
                <InsetEditor></InsetEditor>
                <PolygonEditor></PolygonEditor>
                <PathEditor></PathEditor>
            </div>
        `
    }

    refresh () {
        var isShow = this.isShow();
        this.$el.toggle(isShow)

        if (isShow) {
            this.setPosition()
        }
    }

    setRectangle ({x, y, width, height, id}) {
        var boardOffset = this.boardOffset || this.$board.offset()
        var pageOffset = this.pageOffset || this.$page.offset()
        var canvasScrollLeft = this.canvasScrollLeft || this.$board.scrollLeft();
        var canvasScrollTop = this.canvasScrollTop || this.$board.scrollTop();

        x = pxUnit( unitValue(x) + pageOffset.left - boardOffset.left + canvasScrollLeft ); 
        y = pxUnit( unitValue(y) + pageOffset.top - boardOffset.top  + canvasScrollTop ); 

        x = stringUnit(x);
        y = stringUnit(y);
        width = stringUnit(width);
        height = stringUnit(height);

        var transform = "none"; 
        
        if (id) {
            transform = this.read(LAYER_MAKE_TRANSFORM_ROTATE, this.read(ITEM_GET, id));
        }

        return { 
            width, 
            height, 
            left: x, 
            top: y, 
            ...transform
        }
    }    

    setPosition () {
        var item = this.read(SELECTION_CURRENT_LAYER)

        if (!item) return; 

        this.$el.css(this.setRectangle(item))
    }

    isShow () {
        // console.log(this.read(SELECTION_CURRENT));
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