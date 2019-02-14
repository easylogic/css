import BasePropertyItem from "./BasePropertyItem";
import Dom from "../../../../../util/Dom";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { CHANGE_LAYER, CHANGE_LAYER_CLIPPATH, CHANGE_SELECTION } from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { defaultValue, isObject, isUndefined } from "../../../../../util/functions/func";
import { CLICK, LOAD } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER, SELECTION_CURRENT_LAYER_ID } from "../../../../types/SelectionTypes";
import { EMPTY_STRING, CLIP_PATH_TYPE_SVG, WHITE_STRING } from "../../../../../util/css/types";
import { SVG_LIST, SVG_GET } from "../../../../types/SVGTypes";
import { CLIP_PATH_IS_SVG } from "../../../../../util/css/make";

export default class ClipPathSVG extends BasePropertyItem {

    initialize() {
        super.initialize();

        this.count = 0;
    }
    template () {
        return `
            <div class='property-item clip-path-svg show'>

                <div class='items'>
                    <div>
                        <label>Fit Size</label>
                        <div >
                            <label><input type="checkbox" ref="$fit" /> fit to layer</label>
                        </div>
                    </div>                
                    <div>
                        <label>Clip</label>
                        <div class='clip-path-container' ref="$clipPath" title="Click me!!">

                        </div>
                    </div>                            
                    <div class='image-resource' ref="$imageList"></div>
                </div>
            </div>
        `
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

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            if (this.count < 4) {
                this.load();
                this.count++;
            }

            this.updateView();
                
        }

    }


    isShow () {
        var item = this.read(SELECTION_CURRENT_LAYER);

        if (!item) return false;
        
        if (CLIP_PATH_IS_SVG(item)) return true; 
    } 


    [CLICK('$clipPath')] () {
        this.emit('toggleClipPathImageList')
    }

    [CLICK('$fit')] () {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {

            this.commit(CHANGE_LAYER_CLIPPATH, {id: layer.id, fitClipPathSize: this.refs.$fit.checked()})
            this.refresh();            
        })
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_SELECTION,
        CHANGE_LAYER_CLIPPATH
    )] (value) {
        this.refresh();
    }

    updateView () {
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            this.refs.$clipPath.html(defaultValue(layer.clipPathSvg, EMPTY_STRING))
            this.refs.$fit.checked(defaultValue(layer.fitClipPathSize, false))
        });
    }


    [EVENT('changeSvgList')] () {
        this.refresh()
    }

    [EVENT('toggleClipPathSVG')] (isShow) {
        if (isUndefined(isShow)) {
            this.$el.toggleClass('show')
        } else {
            this.$el.toggleClass('show', isShow)
        }

        if (this.$el.hasClass('show')) {
            this.refresh();
        }
        
    }

    setClipPathSvg (id, svg, callback) {
        var newValue = {
            id,
            clipPathType:'svg',
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
            var box = $svg.attr('viewBox').split(WHITE_STRING);

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
                    this.commit(CHANGE_LAYER, newValue)
                    this.updateView();                    
                });


            })
        } else if (key) {

            this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
                var svg = this.read(SVG_GET, Number.MAX_SAFE_INTEGER, key);

                this.setClipPathSvg(id, svg, (newValue) => {
                    this.commit(CHANGE_LAYER, newValue)
                    this.updateView();
                });

            })
        } 

    }

}