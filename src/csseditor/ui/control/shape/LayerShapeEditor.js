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
            transform = this.read('layer/make/transform', this.read('item/get', id));
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
        var item = this.read('selection/current/layer')

        if (!item) return; 

        this.$el.css(this.setRectangle(item))
    }

    isShow () {
        // console.log(this.read('selection/current'));
        return this.read('selection/is/layer') 
            || this.read('selection/is/image')
            || this.read('selection/is/boxshadow')
            || this.read('selection/is/textshadow');                        
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