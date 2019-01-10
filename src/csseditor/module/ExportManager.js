import BaseModule from "../../colorpicker/BaseModule";
import { ACTION, GETTER } from "../../util/Store";


export default class ExportManager extends BaseModule {

    makePageCSS ($store, page) {

        var css = Object.assign({ 
                position: 'relative' 
            },
            $store.read('page/toCSS', page) 
        )

        return $store.read('css/toString', css);
    }

    getClassName (className) {
        return (className || '').split(' ').map(it => '.' + it).join('')
    }

    getPageStyle ($store, page) {
        var pageStyle = this.makePageCSS($store, page).split(';').map(it => {
            return `\t` + it + ';';
        }).join('\n')

        return pageStyle;
    }

    getPageHtml ($store, page) {
        var html = `<div id="page-1">\n${$store.read('item/map/children', page.id, (item, index) => {

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


            var clipPath = $store.read('layer/toStringClipPath', item);

            if (clipPath) {
                clipPath = `\t\t\n${clipPath}`
            }

            var content = item.content || ''

            return `\t<div ${selector.join(' ')}>${content}${clipPath}</div>`
        }).join('\n')}
</div>`

        return html;
    }

    getLayerStyle ($store, page) {
        var layerStyle = $store.read('item/map/children', page.id, (item, index) => {

            var idString = item.idString || 'layer-' + (index+1)
            var className = item.className

            var selector = [] 

            if (className) {
                selector = this.getClassName(className);
            } else  {
                selector = `#${idString}`
            }

            var css = $store.read('layer/toExport', item, true).split(';').map(it => {
                return '\t' + it + ';';
            }).join('\n');

            return `${selector} {\n${css}\n}`;
        }).join('\n')


        return layerStyle;
    }


    [GETTER('export/generate/code')] ($store) {
        var page = $store.read('selection/current/page')

        if (!page) {
            return '';  
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


    [GETTER('export/codepen/code')] ($store, obj, title = 'CSS Gradient Editor', description = 'EasyLogic Studio', link = ' - https://css.easylogic.studio') {
        return JSON.stringify({
            title,
            description: description + link,
            tags: ["css", "gradient", "editor", "easylogic", "studio"],
            ...obj
        }).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
    }

}