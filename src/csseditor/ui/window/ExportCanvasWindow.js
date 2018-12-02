import UIElement from "../../../colorpicker/UIElement";
import ColorPickerCodeMirror from '../../../extension/codemirror/index'
import { uuid, degreeToRadian, getGradientLine } from "../../../util/functions/math";
import { parseParamNumber, unit2px, pixel } from "../../../util/filter/functions";

export default class ExportCanvasWindow extends UIElement {

    template () {
        return `
            <div class='export-view'>
                <div class="canvas-view">
                    <div class="close" ref="$close">&times;</div>        
                    <div class="codeview-container">
                        <div class="title">Code
                            <div class="tools" ref="$title">
                                <div class="tool-item selected" data-type="html" ref="$htmlTitle">HTML</div>
                                <div class="tool-item" data-type="css" ref="$cssTitle">CSS</div>
                            </div>
                        </div>
                        <div class="codeview">
                            <div class="content-item selected" data-type="html" ref="$htmlContent">
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
        this.cmHtml = CodeMirror.fromTextArea(this.refs.$html.el, {
            lineNumbers: true, 
            readOnly: true,
            lineWrapping: true,
            mode : mixedMode,
            colorpicker : { 
                mode: 'view'
            }
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
        var obj = Object.assign({
            position: 'relative',
            overflow: page.clip ? 'hidden' : ''
        }, page.style || {}); 


        return this.read('/css/toString', obj);
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
        var html = `<div id="page-1">\n${this.read('/item/map/children', page.id, (item, index) => {

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


            var clipPath = this.read('/layer/toStringClipPath', item);

            if (clipPath) {
                clipPath = `\t\t\n${clipPath}`
            }

            return `\t<div ${selector.join(' ')}>${clipPath}</div>`
        }).join('\n')}
</div>`

        return html;
    }

    getLayerStyle (page) {
        var layerStyle = this.read('/item/map/children', page.id, (item, index) => {


            var idString = item.idString || 'layer-' + (index+1)
            var className = item.className

            var selector = [] 

            if (className) {
                selector = this.getClassName(className);
            } else  {
                selector = `#${idString}`
            }

            var css = this.read('/layer/toExport', item, true).split(';').map(it => {
                return '\t' + it + ';';
            }).join('\n');

            return `${selector} {\n${css}\n}`;
        }).join('\n')


        return layerStyle;
    }

    generateCode () {
        var page = this.read('/item/current/page')

        if (!page) {
            return {html: '', css : ''};  
        }

        return {
            html: '',
            css: ''
        } 
    }

    loadCode () {
        var page = this.read('/item/current/page')

        if (!page) {
            return '';  
        }

        var generateCode = this.generateCode()

        if (this.cmHtml) {
            this.cmHtml.setValue(generateCode.html);
            this.cmHtml.refresh();
        }

        if (this.cmCss) {
            this.cmCss.setValue(generateCode.css);
            this.cmCss.refresh();
        }        

        var newCanvasId = uuid();
        this.refs.$preview.html(`<canvas id="${newCanvasId}"></canvas>`);
        this.loadCanvas(newCanvasId);
    }
    
    getEndShapeForRadial (image, layer) {
        var size = layer.backgroundSize;
        
        var layerX = parseParamNumber(layer.x);
        var layerY = parseParamNumber(layer.y);
        var layerWidth = parseParamNumber(layer.width);
        var layerHeight = parseParamNumber(layer.height);

        var imageX = 0;
        var imageY = 0; 
        
        if (image.radialPosition == 'center') {
            imageX = layerWidth/2;  // 50% 
            imageY = layerHeight/2; // 50% 
        } else if (image.radialPosition == 'top') {
            imageX = layerWidth/2;  // 50% 
        } else if (image.radialPosition == 'bottom') {
            imageX = layerWidth/2;  // 50%             
            imageY = layerHeight;
        } else if (image.radialPosition == 'left') {
            imageY = layerHeight/2; // 50% 
        } else if (image.radialPosition == 'right') {
            imageX = layerWidth;
            imageY = layerHeight/2; // 50%             
        } else {
            var [imageX, imageY] = (typeof image.radialPosition == 'string') ? image.radialPosition.split(' ') : image.radialPosition;

            imageX = unit2px(imageX, layerWidth);
            imageY = unit2px(imageY, layerHeight);
        }

        var dx = Math.abs(imageX);
        var dy = Math.abs(imageY);
        var dx2 = Math.abs(dx - layerWidth)
        var dy2 = Math.abs(dy - layerHeight)        
        var realPos = {x:0,y:0, ratio: 1, radius: layerWidth/2}

        if (image.radialType == 'circle') { // constant radius 
            var realDist = Math.max(layerWidth/2, layerHeight/2);

            realPos = {x: dx, y: dy, ratio: 1, radius: Math.sqrt(Math.pow(realDist, 2) + Math.pow(realDist, 2))  }

            console.log(dx, dy, layerWidth, layerHeight, realDist)

        } else if (image.radialType == 'ellipse') { //axis-aligned ellipse
            var distX = Math.min(dx, dx2);
            var distY = Math.min(dy, dy2);
            var realDist = Math.max(layerWidth/2, layerHeight/2);

            realPos = {x: dx, y: dy, ratio: distY/distX, radius: Math.sqrt(realDist**2 + realDist**2) }

            console.log(dx, dy, dx2, dy2, layerWidth, layerHeight, realPos)

        } else if (image.radialType == 'closest-side') {
            var distX = Math.min(dx, dx2);
            var distY = Math.min(dy, dy2);
            var realDist = Math.min(distX, distY);

            realPos = {x: dx, y: dy, ratio: distY/distX, radius: realDist }
        } else if (image.radialType == 'closest-corner') {
            
        } else if (image.radialType == 'farthest-side') {
            var distX = Math.max(dx, dx2);
            var distY = Math.max(dy, dy2);
            var realDist = Math.max(distX, distY);

            realPos = {x: dx, y: dy, ratio: distY/distX, radius: realDist }
        } else if (image.radialType == 'farthest-corner') {

        } else if (image.radialType == 'circle closest-side') {
            var distX = Math.min(dx, dx2);
            var distY = Math.min(dy, dy2);
            var realDist = Math.min(distX, distY);

            realPos = {x: dx, y: dy, ratio: 1, radius: realDist }
            console.log(dx, dx2, dy, dy2, distX, distY, realDist, realDist/2);
        } else if (image.radialType == 'circle closest-corner') {
            
        } else if (image.radialType == 'circle farthest-side') {
            var distX = Math.max(dx, dx2);
            var distY = Math.max(dy, dy2);
            var realDist = Math.max(distX, distY);

            realPos = {x: dx, y: dy, ratio: 1, radius: realDist }
        } else if (image.radialType == 'circle farthest-corner') {
                        
        }

        return realPos;
    }

    loadCanvas(canvasId) {
        var $canvas = this.refs.$preview.$('canvas');


        var page = this.read('/item/current/page');

        var collect = this.read('/collect/one', page.id);

        var width = parseParamNumber(collect.page.width);
        var height = parseParamNumber(collect.page.height);

        // support retina 
        var pixelRatio = window.devicePixelRatio || 1

        $canvas.el.width = (width * pixelRatio)/2 ; 
        $canvas.el.height = (height * pixelRatio)/2;
        $canvas.px('width', width)
        $canvas.px('height', height)

        var context = $canvas.el.getContext('2d');        
        // context.scale(pixelRatio, pixelRatio)

        // drawing gradient 
        collect.layers.forEach(layerObj => {            

            var layer = layerObj.layer; 
            var images = layerObj.images; 

            // draw layer 

            // ordering layer 
            // 1. mix-blend-mode ? 
            if (layer.mixBlendMode) {
                context.globalCompositeOpertation = layer.mixBlendMode;
            }

            var x = parseParamNumber(layer.x);
            var y = parseParamNumber(layer.y);
            var width = parseParamNumber(layer.width);
            var height = parseParamNumber(layer.height);

            // 2. implements transform 

            // 3. background gradient 
            //    - caculate start, end point 
            //    - color step percent 
            images.forEach(imageObj => {
                var image = imageObj.image;
                var colorsteps = imageObj.colorsteps;

                context.save();
                context.beginPath()

                if (image.type == 'linear' || image.type == 'repeating-linear') {
                    var line = getGradientLine( degreeToRadian(layer.angle), {x, y, width, height});
    
                    var gradient = context.createLinearGradient(line.start.x, line.start.y, line.end.x, line.end.y);
    
                    colorsteps.forEach(step => {
                        gradient.addColorStop(step.percent/100, step.color);
                    })
    
                    context.fillStyle = gradient;
                    context.fillRect(x, y, width, height);                    
                } else if (image.type == 'radial' || image.type == 'repeating-radial') {

                    // background position (x, y)
                    // background size (width, height)
                    // background repeat(repeat, repeat-x, repeat-y, no-repeat)
                    // end shape 
                    // var radialType = image.radialType;  // circle, ellipse, closest-side

                    // end shape position 
                    // var radialPosition = image.radialPosition; // top, bottom, left, right 
                    var endShape = this.getEndShapeForRadial(image, layer);
                    

                    var gradient = context.createRadialGradient(endShape.x, endShape.y, 0, endShape.x, endShape.y, endShape.radius);
                    colorsteps.forEach(step => {
                        gradient.addColorStop(step.percent/100, step.color);
                    })
                    context.fillStyle = gradient;        
                    
                    // setTransform 
                    if (endShape.ratio > 1) {
                        context.setTransform(endShape.ratio, 0, 0, 1, 0, 0);
                        context.fillRect(x, y, width * endShape.ratio, height);                        
                    } else if (endShape.ratio < 1) {
                        context.fillRect(x, y, width, height * (1/endShape.ratio));                        
                        context.setTransform(1, 0, 0, endShape.ratio, 0, 0);

                    } else {
                        context.fillRect(x, y, width, height);
                    }

                }

                context.restore();                
            })

        })

    }

    refresh () {
        this.loadCode();
    }

    'click $close' (e) {
        this.$el.hide();
    }

    'click $title .tool-item' (e) {
        var type = e.$delegateTarget.attr('data-type');

        Object.keys(this.refs).filter(it => it.includes('Title')).forEach(key => {
            var obj = this.refs[key];
            obj.toggleClass('selected', `$${type}Title` == key);
        })

        Object.keys(this.refs).filter(it => it.includes('Content')).forEach(key => {
            var obj = this.refs[key];
            obj.toggleClass('selected', `$${type}Content` == key);

            if (this.cmHtml) this.cmHtml.refresh();
            if (this.cmHtml) this.cmCss.refresh();
        })        

    }

    '@toggleExportCanvas' () {
        this.$el.toggle();
    }

    '@showExportCanvas' () {
        this.$el.show();
        this.refresh();                
    }

    '@hideExportCanvas' () {
        this.$el.hide();
    }    
}