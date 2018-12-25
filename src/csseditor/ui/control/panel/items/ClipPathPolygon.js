import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_CLIPPATH_POLYGON
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { unitString } from "../../../../../util/css/types";
import { CLIP_PATH_TYPE_POLYGON } from "../../../../module/ItemTypes";
import { defaultValue } from "../../../../../util/functions/func";

export default class ClipPathPolygon extends BasePropertyItem {
    template () {
        return `
            <div class='property-item clip-path-polygon'>
                <div class="items">
                    <div>
                        Click it with alt if you want to add point
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
                        <input type="number" data-index="${index}" data-type='x' value="${p.x.value}" />
                        ${unitString(p.x.unit)}
                    </div>
                    <label>Y</label>
                    <div>
                        <input type="number" data-index="${index}" data-type='x' value="${p.y.value}" />
                        ${unitString(p.y.unit)}
                    </div>
                    <div class='tools'>
                        <button type="button" data-type='delete' data-index="${index}">&times;</button>
                        <button type="button" data-type='copy' data-index="${index}">+</button>
                    </div>
                </div>
            `
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_CLIPPATH_POLYGON
    )] () { this.refresh() }

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

}