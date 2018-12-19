import { parseParamNumber } from '../../../../util/filter/functions';
import shapeEditor from './shape-editor/index';
import UIElement from '../../../../colorpicker/UIElement';
import { EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from '../../../types/event';
import { px } from '../../../../util/css/types';


export default class LayerShapeEditor extends UIElement {


    initialize () {
        super.initialize()

        this.$board = this.parent.refs.$board;
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

    setPosition () {
        var layer = this.read('/selection/current/layer')

        if (!layer) return; 

        var {width, height, x, y} = layer; 

        var boardOffset = this.$board.offset()
        var pageOffset = this.$page.offset()

        x = px( parseParamNumber(x, x => x + pageOffset.left - boardOffset.left) ); 
        y = px( parseParamNumber(y, y => y + pageOffset.top - boardOffset.top) ); 

        this.$el.css({ 
            width, height, 
            left: x, top: y, 
            transform: this.read('/layer/make/transform', layer)
        })
    }

    isShow () {
        return !this.read('/selection/is/page');
    }

    [EVENT_CHANGE_EDITOR] () { this.refresh(); }
    [EVENT_CHANGE_SELECTION] () { this.refresh() }

}