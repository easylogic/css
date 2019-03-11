import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH_POLYGON,
    CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
    CHANGE_LAYER_CLIPPATH
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { stringUnit, EMPTY_STRING } from "../../../../../util/css/types";
import { isUndefined, html } from "../../../../../util/functions/func";
import { CHANGEINPUT, CLICK, LOAD } from "../../../../../util/Event";
import { CLIPPATH_SAMPLE_LIST} from "../../../../types/ClipPathTypes";
import { editor } from "../../../../../editor/editor";

export default class ClipPathPolygon extends BasePropertyItem {
    template () {
        var list = [] //this.read(CLIPPATH_SAMPLE_LIST)
        
        return html`
            <div class='property-item clip-path-polygon'>
                <div class="items">
                    <div>
                        Click panel with alt if you want to add point
                    </div>
                    <div>
                        Click drag item with alt if you want to delete point
                    </div>                    
                </div>
                <div class='items' ref='$sampleList'>샘플 리스트 구현해주세요.</div> 
                <div class='items' ref='$polygonList'></div>
            </div>
        `
    }

    [LOAD('$polygonList')] () {
        var layer = editor.selection.currentLayer; 
        if (!layer) return EMPTY_STRING;

        var clippath = layer.clippath; 
        if (!clippath) return EMPTY_STRING;

        if (!clippath.isPolygon()) return EMPTY_STRING;

        var points =  clippath.points
        if (!points.length) return EMPTY_STRING;

        var startIndex = 0;
        var lastIndex = points.length - 1; 

        return points.map((p, index) => {

            var start = index == startIndex ? 'start' : EMPTY_STRING;
            var end = index == lastIndex ? 'end' : EMPTY_STRING;

            return `
                <div class="polygon-item ${start} ${end}" data-index="${index}" >
                    <div class='area'></div>
                    <label>X</label>
                    <div>
                        <input type="number" data-index="${index}" data-key='x' value="${+p.x}" />
                        ${p.x.getUnitName()}
                    </div>
                    <label>Y</label>
                    <div>
                        <input type="number" data-index="${index}" data-key='y' value="${+p.y}" />
                        ${p.y.getUnitName()}
                    </div>
                    <div class='tools'>
                        <button type="button" data-key='delete' data-index="${index}">&times;</button>
                        <button type="button" data-key='copy' data-index="${index}">+</button>
                    </div>
                </div>
            `
        })
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER_CLIPPATH,
        CHANGE_LAYER_CLIPPATH_POLYGON,
    )] () { this.refresh() }

    [EVENT(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION)] (newValue) {
        alert('업데이트 구현해주세요')
    }

    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            this.load();
        }

    }

    isShow () {
        var item = editor.selection.currentLayer

        if (!item) return false;
        
        return item.clippath && item.clippath.isPolygon()
    }

    [EVENT('toggleClipPathPolygon')] (isShow) {

        if (isUndefined(isShow)) {
            this.$el.toggleClass('show');
        } else {
            this.$el.toggleClass('show', isShow);
        }
        
    }

    [CLICK('$polygonList button[data-key]')] (e) {
        var $item = e.$delegateTarget;
        var polygonIndex = +$item.attr('data-index')
        var key = $item.attr('data-key');
        if (key == 'delete') {

            var layer = editor.selection.currentLayer;
            if(layer) {
                var clippath = layer.clippath;
                if (clippath) {
                    clippath.removePoint(polygonIndex)
                    editor.send(CHANGE_LAYER_CLIPPATH_POLYGON, layer);
                }

            }
        } else if (key == 'copy') {
            var layer = editor.selection.currentLayer;
            if(layer) {
                var clippath = layer.clippath;
                if (clippath) {
                    clippath.copyPoint(polygonIndex)
                    editor.send(CHANGE_LAYER_CLIPPATH_POLYGON, layer);
                }

            }            
        }
    }

    [CHANGEINPUT('$polygonList input[type=number]')] (e) {
        var $item = e.$delegateTarget;

        var polygonIndex = +$item.attr('data-index')
        var key = $item.attr('data-key');
        var value = +$item.val();

        var layer = editor.selection.currentLayer;
        if (layer) {
            var clippath = layer.clippath

            if (clippath) {
                clippath.updatePoint(polygonIndex, key, Length.percent(value));
                editor.send(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, layer)
            }
        }
    }

    [CLICK('$sampleList .clip-path-item')] (e) {
        alert('샘플 데이타 변경 하느거 구현해주세요.')
    }

}