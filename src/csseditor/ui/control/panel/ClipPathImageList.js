import BasePropertyItem from "./items/BasePropertyItem";
import Dom from "../../../../util/Dom";
import { parseParamNumber } from "../../../../util/filter/functions";
import { CHANGE_LAYER_CLIPPATH } from "../../../types/event";
import { CLICK, LOAD } from "../../../../util/Event";
import { isObject, isUndefined } from "../../../../util/functions/func";
import { EVENT } from "../../../../colorpicker/UIElement";
import { SELECTION_CURRENT_LAYER_ID } from "../../../types/SelectionTypes";
import { SVG_LIST, SVG_GET } from "../../../types/SVGTypes";

export default class ClipPathImageList extends BasePropertyItem {
    template () {
        return `<div class='image-resource'><div class='items' ref="$imageList"></div></div>`
    }

    [LOAD('$imageList')] () {
        return this.read(SVG_LIST).map((svg, index) => {
            if (isObject(svg)) {
                return `<div class='svg-item' data-key="${svg.key}">${svg.svg}</div>`
            }  else {
                return `<div class='svg-item' data-index="${index}">${svg}</div>`
            }
            
        })
    }

    refresh () {
        this.load();
    }

    [EVENT('changeSvgList')] () {
        this.refresh()
    }

    toggle (isShow) {
        if (isUndefined(isShow)) {
            this.$el.toggleClass('show')
        } else {
            this.$el.toggleClass('show', isShow)
        }
    }

    [EVENT('toggleClipPathImageList')] (isShow) {
        this.toggle(isShow)
    }

    setClipPathSvg (id, svg, callback) {
        var newValue = {
            id,
            clipPathType: 'svg',
            clipPathSvg: svg
        }


        var $temp = new Dom('div')
        $temp.html(svg);

        var $svg = $temp.$("svg");

        var width = 0;
        var height = 0; 
        if ($svg.attr('width')) {
            width = parseParamNumber($svg.attr('width'))
        } 

        if ($svg.attr('height')) {
            height = parseParamNumber($svg.attr('height'))
        }         

        if ($svg.attr('viewBox')) {
            var box = $svg.attr('viewBox').split(' ');

            width = parseParamNumber(box[2])
            height = parseParamNumber(box[3])
        }

        newValue.clipPathSvgWidth = width; 
        newValue.clipPathSvgHeight = height; 

        $temp.remove();

        callback && callback (newValue);
    }

    [CLICK('$imageList .svg-item')] (e) {
        var index = e.$delegateTarget.attr('data-index')
        var key = e.$delegateTarget.attr('data-key')

        if (index) {
            this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
                var svg = this.read(SVG_GET, +index);

                this.setClipPathSvg(id, svg, (newValue) => {
                    this.commit(CHANGE_LAYER_CLIPPATH, newValue)
                    this.toggle();
                });


            })
        } else if (key) {
            this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
                var svg = this.read(SVG_GET, Number.MAX_SAFE_INTEGER, key);

                this.setClipPathSvg(id, svg, (newValue) => {
                    this.commit(CHANGE_LAYER_CLIPPATH, newValue)
                    this.toggle();                    
                });


            })
        } 

    }

}