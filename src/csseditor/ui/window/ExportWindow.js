import UIElement, { EVENT } from "../../../colorpicker/UIElement";
import ColorPickerCodeMirror from '../../../extension/codemirror/index'
import { CLICK } from "../../../util/Event";

export default class ExportWindow extends UIElement {

    template () {
        return `
            <div class='export-view'>
                <div class="color-view">
                    <div class="close" ref="$close">&times;</div>        
                    <div class="codeview-container">
                        <div class="title">
                            <div class="tools" ref="$title">
                                <div class="tool-item selected" data-type="fullhtml" ref="$fullhtmlTitle">Full HTML</div>
                                <div class="tool-item" data-type="html" ref="$htmlTitle">HTML</div>
                                <div class="tool-item" data-type="css" ref="$cssTitle">CSS</div>
                            </div>
                            <div class="buttons">
                                <form action="https://codepen.io/pen/define" method="POST" target="_blank">
                                    <input type="hidden" name="data" ref="$codepen" value=''>
                                    <button type="submit">Create New CodePen</button>
                                </form>
                            </div>
                        </div>
                        <div class="codeview">
                            <div class="content-item selected" data-type="fullhtml" ref="$fullhtmlContent">
                                <textarea ref="$fullhtml"></textarea>
                            </div>
                            <div class="content-item" data-type="html" ref="$htmlContent">
                                <textarea ref="$html"></textarea>
                            </div>
                            <div class="content-item" data-type="css" ref="$cssContent">
                                <textarea ref="$css"></textarea>
                            </div>                            
                        </div>
                    </div>
                    <div class="preview-container">
                        <div class="title">Preview</div>
                        <div class='preview' ref="$preview"></div>
                    </div>
                </div>
            </div>
        `
    }

    afterRender () {
        ColorPickerCodeMirror.load();
        var mixedMode = {
            name: "htmlmixed",
            scriptTypes: [{matches: /\/x-handlebars-template|\/x-mustache/i,
                           mode: null},
                          {matches: /(text|application)\/(x-)?vb(a|script)/i,
                           mode: "vbscript"}]
          };
        this.cmFullHtml = CodeMirror.fromTextArea(this.refs.$fullhtml.el, {
            lineNumbers: true, 
            readOnly: true,
            lineWrapping: true,
            mode : mixedMode,
            colorpicker : { 
                mode: 'view'
            }
        });

        this.cmHtml = CodeMirror.fromTextArea(this.refs.$html.el, {
            lineNumbers: true, 
            readOnly: true,
            lineWrapping: true,
            mode : mixedMode
        });

        this.cmCss = CodeMirror.fromTextArea(this.refs.$css.el, {
            lineNumbers: true, 
            readOnly: true,
            lineWrapping: true,
            mode : "text/css",
            colorpicker: {
                mode: 'view'
            }
        });        
    }
 

    makePageCSS (page) {

        var css = Object.assign({ 
                position: 'relative' 
            },
            this.read('page/toCSS', page) 
        )

        return this.read('css/toString', css);
    }

    getClassName (className) {
        return (className || '').split(' ').map(it => '.' + it).join('')
    }

    getPageStyle (page) {
        var pageStyle = this.makePageCSS(page).split(';').map(it => {
            return `\t` + it + ';';
        }).join('\n')

        return pageStyle;
    }

    getPageHtml (page) {
        var html = `<div id="page-1">\n${this.read('item/map/children', page.id, (item, index) => {

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


            var clipPath = this.read('layer/toStringClipPath', item);

            if (clipPath) {
                clipPath = `\t\t\n${clipPath}`
            }

            var content = item.content || ''

            return `\t<div ${selector.join(' ')}>${content}${clipPath}</div>`
        }).join('\n')}
</div>`

        return html;
    }

    getLayerStyle (page) {
        var layerStyle = this.read('item/map/children', page.id, (item, index) => {


            var idString = item.idString || 'layer-' + (index+1)
            var className = item.className

            var selector = [] 

            if (className) {
                selector = this.getClassName(className);
            } else  {
                selector = `#${idString}`
            }

            var css = this.read('layer/toExport', item, true).split(';').map(it => {
                return '\t' + it + ';';
            }).join('\n');

            return `${selector} {\n${css}\n}`;
        }).join('\n')


        return layerStyle;
    }

    generateCode () {
        var page = this.read('selection/current/page')

        if (!page) {
            return '';  
        }

        var pageStyle = this.getPageStyle(page);

        var html = this.getPageHtml(page);

        var layerStyle = this.getLayerStyle(page);

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

    getCodePenCode (obj, title = 'CSS Gradient Editor', description = 'EasyLogic Studio') {
        return JSON.stringify({
            title,
            description,
            ...obj
        }).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
    }

    loadCode () {
        var page = this.read('selection/current/page')

        if (!page) {
            return '';  
        }

        var generateCode = this.generateCode()

        if (this.cmFullHtml) {
            this.cmFullHtml.setValue(generateCode.fullhtml);
            this.cmFullHtml.refresh();
        }

        if (this.cmHtml) {
            this.cmHtml.setValue(generateCode.html);
            this.cmHtml.refresh();
        }


        if (this.cmCss) {
            this.cmCss.setValue(generateCode.css);
            this.cmCss.refresh();
        }        

        this.refs.$codepen.val(this.getCodePenCode({
            html: generateCode.html, 
            css: generateCode.css 
        }))

        this.refs.$preview.html(generateCode.fullhtml);
    }

    refresh () {
        this.loadCode();
    }

    [CLICK('$close')] (e) {
        this.$el.hide();
    }

    [CLICK('$title .tool-item')] (e) {
        var type = e.$delegateTarget.attr('data-type');

        Object.keys(this.refs).filter(it => it.includes('Title')).forEach(key => {
            var obj = this.refs[key];
            obj.toggleClass('selected', `$${type}Title` == key);
        })

        Object.keys(this.refs).filter(it => it.includes('Content')).forEach(key => {
            var obj = this.refs[key];
            obj.toggleClass('selected', `$${type}Content` == key);

            if (this.cmFullHtml) this.cmFullHtml.refresh();
            if (this.cmHtml) this.cmHtml.refresh();
            if (this.cmCss) this.cmCss.refresh();
        })        

    }

    [EVENT('toggleExport')] () {
        this.$el.toggle();
    }

    [EVENT('showExport')] () {
        this.$el.show();
        this.refresh();                
    }

    [EVENT('hideExport')] () {
        this.$el.hide();
    }    
}