import BaseModule from "../../util/BaseModule";
import SVGList from "./svg/index";
import Dom from "../../util/Dom";
import { GETTER, ACTION } from "../../util/Store";
import { clone } from "../../util/functions/func";
import { EMPTY_STRING } from "../../util/css/types";
import { SVG_LIST_LOAD, SVG_LIST, SVG_GET_CLIPPATH, SVG_GET_BLOB, SVG_GET } from "../types/SVGTypes";

export default class SVGManager extends BaseModule {

    initialize () {
        super.initialize()

        this.$store.svgList = []
    }

    afterDispatch( ) {
        this.$store.emit('changeSvgList')
    }
 
    [GETTER(SVG_LIST)] ($store) {
        return [...SVGList, ...$store.svgList];
    } 

    [ACTION(SVG_LIST_LOAD)] ($store, loadList = []) {s
        $store.svgList = [...loadList];
    }

    [GETTER(SVG_GET_CLIPPATH)] ($store, svg, id, callback, transform = "") {

        var $div = new Dom('div');
        var paths = $div.html(svg).$('svg').html();

        var svg = `<svg height="0" width="0"><defs><clipPath id="${id}" ${transform ? `transform="${transform}"` : ""} >${paths}</clipPath></defs></svg>`

        callback && callback(svg, id);
    }

    [GETTER(SVG_GET_BLOB)] ($store, index, key) {
        if (SVGList[index]) {
            var svg = `${SVGList[index]}`;

            return new Blob([svg], {type:"image/svg+xml;charset=utf-8"});
        } else {
            var list = $store.svgList.filter(item => item.key == key);

            if (list.length) {
                return new Blob([list[0].svg], {type:"image/svg+xml;charset=utf-8"});
            }
        }

        return EMPTY_STRING; 
    }

    [GETTER(SVG_GET)] ($store, index, key) {
        if (SVGList[index]) {
            return SVGList[index];
        } else {
            var list = $store.svgList.filter(item => item.key == key);

            if (list.length) {
                return list[0].svg
            }
        }

        return EMPTY_STRING; 
    }    

}