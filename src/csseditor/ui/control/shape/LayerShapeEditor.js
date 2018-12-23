import { parseParamNumber } from '../../../../util/filter/functions';
import shapeEditor from './shape-editor/index';
import UIElement, { MULTI_EVENT } from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER, EVENT_CHANGE_LAYER_CLIPPATH, EVENT_CHANGE_LAYER_SIZE, EVENT_CHANGE_LAYER_POSITION } from '../../../types/event';
import { px } from '../../../../util/css/types';


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
                <RectEditor></RectEditor>
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

        x = px( parseParamNumber(x, x => x + pageOffset.left - boardOffset.left + canvasScrollLeft) ); 
        y = px( parseParamNumber(y, y => y + pageOffset.top - boardOffset.top  + canvasScrollTop) ); 

        var transform = "none"; 
        
        if (id) {
            transform = this.read('/layer/make/transform', this.read('/item/get', id));
        }

        return { 
            width, height, 
            left: x, top: y, 
            transform
        }
    }    

    setPosition () {
        var item = this.read('/selection/current/layer')

        if (!item) return; 

        this.$el.css(this.setRectangle(item))
    }

    isShow () {
        return this.read('/selection/is/layer');
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_SIZE,
        EVENT_CHANGE_LAYER_POSITION,
        EVENT_CHANGE_LAYER_CLIPPATH,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }

}