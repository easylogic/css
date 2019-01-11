import UIElement, { EVENT } from "../../../colorpicker/UIElement";
import ColorPickerCodeMirror from '../../../extension/codemirror/index'
import { CLICK } from "../../../util/Event";
import ExportCodePenButton from "../view/export/ExportCodPenButton";
import ExportJSFiddleButton from "../view/export/ExportJSFiddleButton";



export default class ExportWindow extends UIElement {

    components () {
        return {
            ExportJSFiddleButton,
            ExportCodePenButton            
        }
    }

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
                                <ExportCodePenButton></ExportCodePenButton>
                                <ExportJSFiddleButton></ExportJSFiddleButton>
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
 

    loadCode () {
        var page = this.read('selection/current/page')

        if (!page) {
            return '';  
        }

        var generateCode = this.read('export/generate/code')

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