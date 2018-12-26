import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_CLIPPATH_POLYGON,
    CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
    EVENT_CHANGE_LAYER_CLIPPATH_POLYGON_POSITION,
    CHANGE_LAYER_CLIPPATH_POLYGON
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { unitString, percentUnit } from "../../../../../util/css/types";
import { CLIP_PATH_TYPE_POLYGON } from "../../../../module/ItemTypes";
import { defaultValue } from "../../../../../util/functions/func";
import { CHANGEINPUT, CLICK } from "../../../../../util/Event";

export default class ClipPathPolygon extends BasePropertyItem {
    template () {
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
                <div class='items' ref='$polygonList'>            
                </div>
            </div>
        `
    }

    'load $polygonList' () {
        var layer = this.read('/selection/current/layer');
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

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_CLIPPATH_POLYGON,
    )] () { this.refresh() }

    [EVENT_CHANGE_LAYER_CLIPPATH_POLYGON_POSITION] (newValue) {
        this.refreshPolygonPosition(newValue)
    }

    refreshPolygonPosition (item) {

    }

    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            this.load();
        }

    }

    isShow () {
        var item = this.read('/selection/current/layer');

        if (!item) return false;
        
        return item.clipPathType == CLIP_PATH_TYPE_POLYGON
    }

    '@toggleClipPathPolygon' (isShow) {

        if (typeof isShow == 'undefined') {
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
            this.read('/selection/current/layer', (layer) => {
                var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
                clipPathPolygonPoints.splice(polygonIndex, 1);
    
                this.commit(CHANGE_LAYER_CLIPPATH_POLYGON, {
                    id: layer.id,
                    clipPathPolygonPoints
                })

                this.refresh();
            })

        } else if (key == 'copy') {
            this.read('/selection/current/layer', (layer) => {
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

        this.read('/selection/current/layer', (layer) => {
            var clipPathPolygonPoints = defaultValue(layer.clipPathPolygonPoints, []);
            clipPathPolygonPoints[polygonIndex][key] = percentUnit(value); 

            this.commit(CHANGE_LAYER_CLIPPATH_POLYGON_POSITION, {
                id: layer.id,
                polygonIndex,
                clipPathPolygonPoints
            })
        })
    }

}