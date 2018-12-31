import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH_POLYGON,
    CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
    CHANGE_LAYER_CLIPPATH
} from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { unitString, percentUnit, stringUnit } from "../../../../../util/css/types";
import { CLIP_PATH_TYPE_POLYGON } from "../../../../module/ItemTypes";
import { defaultValue, isUndefined } from "../../../../../util/functions/func";
import { CHANGEINPUT, CLICK, LOAD } from "../../../../../util/Event";

export default class ClipPathPolygon extends BasePropertyItem {
    template () {
        var list = this.read('clip-path/sample/list')
        
        return `
            <div class='property-item clip-path-polygon'>
                <div class="items">
                    <div>
                        Click panel with alt if you want to add point
                    </div>
                    <div>
                        Click drag item with alt if you want to delete point
                    </div>                    
                </div>
                <div class='items' ref='$sampleList'>${list.map( (it, index) => {
                    var values = it.clipPathPolygonPoints.map(point => {
                        return `${stringUnit(point.x)} ${stringUnit(point.y)}`
                    }).join(', ');
                    return `<div class='clip-path-item' data-index='${index}' style='clip-path: polygon(${values})'></div>`
                }).join('')}</div> 
                <div class='items' ref='$polygonList'></div>
            </div>
        `
    }

    [LOAD('$polygonList')] () {
        var layer = this.read('selection/current/layer');
        if (!layer) return '';
        var points =  defaultValue ( layer.clipPathPolygonPoints, [])
        if (!points.length) return '';

        var startIndex = 0;
        var lastIndex = points.length - 1; 

        return points.map((p, index) => {

            var start = index == startIndex ? 'start' : '';
            var end = index == lastIndex ? 'end' : '';

            return `
                <div class="polygon-item ${start} ${end}" data-index="${index}" >
                    <div class='area'></div>
                    <label>X</label>
                    <div>
                        <input type="number" data-index="${index}" data-key='x' value="${p.x.value}" />
                        ${unitString(p.x.unit)}
                    </div>
                    <label>Y</label>
                    <div>
                        <input type="number" data-index="${index}" data-key='y' value="${p.y.value}" />
                        ${unitString(p.y.unit)}
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
        this.refreshPolygonPosition(newValue)
    }

    refreshPolygonPosition (item) {
        var index = item.polygonIndex; 
        var pos = item.clipPathPolygonPoints[index];

        var x = this.refs.$polygonList.$(`[data-key="x"][data-index="${index}"]`);
        if (x) { x.val(pos.x.value) }

        var y = this.refs.$polygonList.$(`[data-key="y"][data-index="${index}"]`);
        if (y) { y.val(pos.y.value) }        
    }

    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            this.load();
        }

    }

    isShow () {
        var item = this.read('selection/current/layer');

        if (!item) return false;
        
        return item.clipPathType == CLIP_PATH_TYPE_POLYGON
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
            this.read('selection/current/layer', (layer) => {
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                clipPathPolygonPoints.splice(polygonIndex, 1);
    
                this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {
                    id: layer.id,
                    clipPathPolygonPoints
                })

                this.refresh();
            })

        } else if (key == 'copy') {
            this.read('selection/current/layer', (layer) => {
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                var copyItem = clipPathPolygonPoints[polygonIndex]

                clipPathPolygonPoints.splice(polygonIndex, 0, copyItem);
    
                this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {
                    id: layer.id,
                    clipPathPolygonPoints
                })
                this.refresh();
            })
        }
    }

    [CHANGEINPUT('$polygonList input[type=number]')] (e) {
        var $item = e.$delegateTarget;

        var polygonIndex = +$item.attr('data-index')
        var key = $item.attr('data-key');
        var value = +$item.val();

        this.read('selection/current/layer', (layer) => {
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
            clipPathPolygonPoints[polygonIndex][key] = percentUnit(value); 

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, {
                id: layer.id,
                polygonIndex,
                clipPathPolygonPoints
            })
        })
    }

    [CLICK('$sampleList .clip-path-item')] (e) {
        var $item = e.$delegateTarget;
        var index = +$item.attr('data-index')
        var points = this.read('clip-path/sample/get', index);

        this.read('selection/current/layer/id', (id) => {

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, { id, ...points})
            this.refresh();
        })
    }

}