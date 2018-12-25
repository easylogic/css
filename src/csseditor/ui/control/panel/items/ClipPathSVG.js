import BasePropertyItem from "./BasePropertyItem";
import Dom from "../../../../../util/Dom";
import { parseParamNumber } from "../../../../../util/filter/functions";
import { CHANGE_LAYER, EVENT_CHANGE_LAYER, EVENT_CHANGE_LAYER_CLIPPATH, CHANGE_LAYER_CLIPPATH } from "../../../../types/event";
import { CLIP_PATH_TYPE_SVG } from "../../../../module/ItemTypes";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { defaultValue } from "../../../../../util/functions/func";

export default class ClipPathSVG extends BasePropertyItem {
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

    'load $imageList' () {
        return this.read('/svg/list').map((svg, index) => {
            if (typeof svg == 'object') {
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

            this.load();
            this.updateView();
                
        }

    }


    isShow () {
        var item = this.read('/selection/current/layer');

        if (!item) return false;
        
        if (item.clipPathType == CLIP_PATH_TYPE_SVG) return true; 
    } 


    'click $clipPath' () {
        this.emit('toggleClipPathImageList')
    }

    'click $fit' () {
        this.read('/selection/current/layer', (layer) => {

            this.commit(CHANGE_LAYER_CLIPPATH, {id: layer.id, fitClipPathSize: this.refs.$fit.checked()})
            this.refresh();            
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_LAYER_CLIPPATH
    )] (value) {
        if (typeof value.clipPathType != 'undefined') {
            this.refresh();
        }
    }

    updateView () {
        this.read('/selection/current/layer', (layer) => {
            this.refs.$clipPath.html(defaultValue(layer.clipPathSvg, ''))
            this.refs.$fit.checked(defaultValue(layer.fitClipPathSize, false))
        });
    }


    '@changeSvgList' () {
        this.refresh()
    }

    '@toggleClipPathSVG' (isShow) {
        if (typeof isShow == 'undefined') {
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
            var box = $svg.attr('viewBox').split(' ');

            width = parseParamNumber(box[2])
            height = parseParamNumber(box[3])
        }

        newValue.clipPathSvgWidth = width; 
        newValue.clipPathSvgHeight = height; 

        $temp.remove();

        callback && callback (newValue);
    }

    'click $imageList .svg-item' (e) {
        var index = e.$delegateTarget.attr('data-index')
        var key = e.$delegateTarget.attr('data-key')

        if (index) {
            this.read('/selection/current/layer/id', (id) => {
                var svg = this.read('/svg/get', +index);

                this.setClipPathSvg(id, svg, (newValue) => {
                    this.commit(CHANGE_LAYER, newValue)
                    this.updateView();                    
                });


            })
        } else if (key) {

            this.read('/selection/current/layer/id', (id) => {
                var svg = this.read('/svg/get', Number.MAX_SAFE_INTEGER, key);

                this.setClipPathSvg(id, svg, (newValue) => {
                    this.commit(CHANGE_LAYER, newValue)
                    this.updateView();
                });

            })
        } 

    }

}