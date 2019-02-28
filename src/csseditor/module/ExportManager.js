import BaseModule from "../../util/BaseModule";
import { GETTER } from "../../util/Store";
import { SELECTION_CURRENT_PAGE } from "../types/SelectionTypes";
import { EXPORT_GENERATE_CODE, EXPORT_CODEPEN_CODE } from "../types/ExportTpyes";
import { LAYER_TO_STRING_CLIPPATH, LAYER_TOEXPORT } from "../types/LayerTypes";
import { EMPTY_STRING, WHITE_STRING } from "../../util/css/types";
import { ITEM_MAP_LAYER_CHILDREN } from "../types/ItemSearchTypes";
import { PAGE_TO_CSS } from "../types/PageTypes";
import { CSS_TO_STRING } from "../../util/css/make";


export default class ExportManager extends BaseModule {

    makePageCSS ($store, page) {

        var css = { position: 'relative' , ...$store.read(PAGE_TO_CSS, page) }

        return CSS_TO_STRING(css);
    }

    getClassName (className) {
        return (className || EMPTY_STRING).split(WHITE_STRING).map(it => '.' + it).join(EMPTY_STRING)
    }

    getPageStyle ($store, page) {
        var pageStyle = this.makePageCSS($store, page).split(';').map(it => {
            return `\t` + it + ';';
        }).join('\n')

        return pageStyle;
    }

    getPageHtml ($store, page) {
        var html = `<div id="page-1">\n${$store.read(ITEM_MAP_LAYER_CHILDREN, page.id, (item, index) => {

            var idString = item.idString || 'layer-' + (index+1)
            var className = item.className

            var selector = [] 

            if (className) {
                selector.push(`class="${className}"`)
            }

            if (!selector.length && item.idString) {
                selector.push(`id="${idString}"`);
            } else {
                selector.push(`id="layer-${index+1}"`);
            }


            var clipPath = $store.read(LAYER_TO_STRING_CLIPPATH, item);

            if (clipPath) {
                clipPath = `\t\t\n${clipPath}`
            }

            var content = item.content || EMPTY_STRING

            return `\t<div ${selector.join(WHITE_STRING)}>${content}${clipPath}</div>`
        }).join('\n')}
</div>`

        return html;
    }

    getLayerStyle ($store, page) {
        var layerStyle = $store.read(ITEM_MAP_LAYER_CHILDREN, page.id, (item, index) => {

            var idString = item.idString || 'layer-' + (index+1)
            var className = item.className

            var selector = [] 

            if (className) {
                selector = this.getClassName(className);
            } else  {
                selector = `#${idString}`
            }

            var css = $store.read(LAYER_TOEXPORT, item, true).split(';').map(it => {
                return '\t' + it + ';';
            }).join('\n');

            return `${selector} {\n${css}\n}`;
        }).join('\n')


        return layerStyle;
    }


    [GETTER(EXPORT_GENERATE_CODE)] ($store) {
        var page = $store.read(SELECTION_CURRENT_PAGE)

        if (!page) {
            return EMPTY_STRING;  
        }

        var pageStyle = this.getPageStyle($store, page);

        var html = this.getPageHtml($store, page);

        var layerStyle = this.getLayerStyle($store, page);

        var styleText = `
#page-1 { 
${pageStyle}
}
${layerStyle}

`
        var style = `<style type="text/css">${styleText}</style>\n`
        return {
            html,
            fullhtml: style + html,
            css: styleText
        } 
    } 


    [GETTER(EXPORT_CODEPEN_CODE)] ($store, obj, title = 'CSS Gradient Editor', description = 'EasyLogic Studio', link = ' - https://css.easylogic.studio') {
        return JSON.stringify({
            title,
            description: description + link,
            tags: ["css", "gradient", "editor", "easylogic", "studio"],
            ...obj
        }).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
    }

}