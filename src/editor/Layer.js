import { combineKeyArray, cleanObject, keyEach } from "../util/functions/func";
import { CSS_TO_STRING, CSS_FILTERING } from "../util/css/make"; 
import { Length } from "./unit/Length";
import { NoneClipPath, ClipPath } from "./css-property/ClipPath";
import { Item } from "./Item";
import { Filter } from "./css-property/Filter";
import { BackdropFilter } from "./css-property/BackdropFilter";
import { BackgroundImage } from "./css-property/BackgroundImage";
import { BoxShadow } from "./css-property/BoxShadow";
import { TextShadow } from "./css-property/TextShadow";

export const BLEND_LIST = [
    'normal', 'multiply', 'screen', 'overlay', 'darken', 
    'lighten', 'color-dodge', 'color-burn', 'hard-light', 
    'soft-light', 'difference', 'exclusion', 'hue',
    'saturation', 'color', 'luminosity'
]

export class Layer extends Item {

    getDefaultTitle () { return 'Layer' }

    dist () {
        var json = this.json; 
        return Math.sqrt(Math.pow(json.width.value, 2) + Math.pow(json.width.value, 2))/Math.sqrt(2)
    }

    add (groupOrLayer) {
        if (groupOrLayer.itemType == 'group' || groupOrLayer.itemType == 'layer') {
            return super.add(groupOrLayer);
        } else {
            throw new Error('잘못된 객체입니다.');
        }
    }

    addBackgroundImage (item) { 
        this.json.backgroundImages.push(item)
        return item
    }

    addFilter (item) { 
        this.json.filters.push(item)
        return item
    }
    
    addBackdropFilter (item) { 
        this.json.backdropFilters.push(item)
        return item
    }
    
    addBoxShadow (item) { 
        this.json.boxShadows.push(item)
        return item
    }
    addTextShadow (item) { 
        this.json.textShadows.push(item)
        return item
    }    

    get texts () { return this.search({itemType: 'layer', type: 'text'}) }            
    get images () { return this.search({itemType: 'layer', type: 'image'}) }

    get filters () { return this.json.filters }
    get backdropFilters () { return this.json.backdropFilters }    
    get backgroundImages () { return this.json.backgroundImages }
    get boxShadows () { return this.json.boxShadows }    
    get textShadows () { return this.json.textShadows }        

    convert (json) {
        json = super.convert(json)

        json.x = Length.parse(json.x)
        json.y = Length.parse(json.y)
        json.width = Length.parse(json.width)
        json.height = Length.parse(json.height)        

        if (json.clippath) json.clippath = ClipPath.parse(json.clippath)

        json.filters = json.filters.map(f => Filter.parse(f));
        json.backdropFilters = json.backdropFilters.map(f => BackdropFilter.parse(f));
        json.backgroundImages = json.backgroundImages.map(f => BackgroundImage.parse(f));
        json.boxShadows = json.boxShadows.map(f => BoxShadow.parse(f));
        json.textShadows = json.textShadows.map(f => TextShadow.parse(f));
 
        return json
    }

    getDefaultObject (obj = {}) {
        return super.getDefaultObject({
            itemType: 'layer',
            width: Length.px(400),
            height: Length.px(300),
            backgroundColor: 'rgba(222, 222, 222, 1)',
            position: 'absolute',
            x: Length.px(0),
            y: Length.px(0),
            rotate: 0,
            filters: [],
            backdropFilters: [],
            backgroundImages: [],
            boxShadows: [],
            textShadows: [], 
            clippath: new NoneClipPath(),
            ...obj
        })
    }

    getArtBoard () {
        return this.path().filter(it => it.itemType == 'artboard')[0]
    }

    get screenX () { 
        return Length.px(this.getArtBoard().x.value + this.json.x.value);
    }

    set screenX (newX) {
        this.json.x.set(Length.px(newX.value - this.getArtBoard().x.value));
    }

    get screenY () { 
        return Length.px(this.getArtBoard().y.value + this.json.y.value);
    }

    set screenY (newY) {
        this.json.y.set(Length.px(newY.value - this.getArtBoard().y.value));
    }

    toString () { return CSS_TO_STRING(this.toCSS()); }
    toBoundString () { return CSS_TO_STRING(this.toCSS(true)); }

    toClipPathCSS() {
        return this.json.clippath.toCSS()
    }

    toPropertyCSS(list) {
        var results = {}
        list.forEach(item => {
            keyEach(item.toCSS(), (key, value) => {
                if (!results[key]) results[key] = []
                results[key].push(value);
            })
        })

        return combineKeyArray(results);
    }

    toBackgroundImageCSS () { return this.toPropertyCSS(this.backgroundImages); }
    toBoxShadowCSS () { return this.toPropertyCSS(this.boxShadows); }
    toTextShadowCSS () { return this.toPropertyCSS(this.textShadows); }
    toFilterCSS () { return this.toPropertyCSS(this.filters); }
    toBackdropFilterCSS () { return this.toPropertyCSS(this.backdropFilters); }
    toFontCSS () {
        var results = {}
        var json = this.json; 

        if (json.color) {
            results['color'] = json.color;
        }
    
        if (json.fontSize) {
            results['font-size'] = json.fontSize;
        }
    
        if (json.fontFamily) {
            results['font-family'] = json.fontFamily;
        }
    
        if (json.fontWeight) {
            results['font-weight'] = json.fontWeight;
        }        
    
        if (json.lineHeight) {
            results['line-height']  = json.lineHeight
        }
    
        results['word-wrap'] = json.wordWrap || 'break-word';
        results['word-break'] = json.wordBreak || 'break-word';
    
        if (json.clipText) {
            results['color'] = 'transparent';
            results['background-clip'] = 'text';
            results['-webkit-background-clip'] = 'text';
        }
    
        return results;
    }


    toBorderRadiusCSS () {
        var json = this.json; 
        var css = {};
        if (json.fixedRadius)  {
            css['border-radius'] = json.borderRadius
        } else {
            if (json.borderTopLeftRadius) css['border-top-left-radius'] = json.borderTopLeftRadius;
            if (json.borderTopRightRadius) css['border-top-right-radius'] = json.borderTopRightRadius;
            if (json.borderBottomLeftRadius) css['border-bottom-left-radius'] = json.borderBottomLeftRadius;
            if (json.borderBottomRightRadius) css['border-bottom-right-radius'] = json.borderBottomRightRadius;            
        }

        return css;
    }


    toBorderColorCSS () {
        var json = this.json; 
        var css = {};

        if (json.borderColor) {
            css['border-color'] = json.borderColor
        }  else {
            if (json.borderTopColor) css['border-top-color'] = json.borderTopColor;
            if (json.borderRightColor) css['border-right-color'] = json.borderRightColor;
            if (json.borderBottomColor) css['border-bottom-color'] = json.borderBottomColor;
            if (json.borderLeftColor) css['border-left-color'] = json.borderLeftColor;            
        }

        return css;
    }

    toBorderStyleCSS () {
        var json = this.json; 
        var css = {};

        if (json.borderStyle) css['border-style'] = json.borderStyle
        if (json.borderTopStyle) css['border-top-style'] = json.borderTopStyle;
        if (json.borderRightStyle) css['border-right-style'] = json.borderRightStyle;
        if (json.borderBottomStyle) css['border-bottom-style'] = json.borderBottomStyle;
        if (json.borderLeftStyle) css['border-left-style'] = json.borderLeftStyle;

        return css;
    }


    toBorderWidthCSS () {
        var json = this.json; 
        var css = {};

        if (json.fixedBorderWidth) {
            css['border-width'] = json.borderWidth
            css['border-style'] = 'solid';
        } else {

            if (json.borderTopWidth) {
                css['border-top-width'] = json.borderTopWidth;
                css['border-top-style'] = 'solid';
            }
        
            if (json.borderRightWidth) {
                css['border-right-width'] = json.borderRightWidth;
                css['border-right-style'] = 'solid';
            }
        
            if (json.borderLeftWidth) {
                css['border-left-width'] = json.borderLeftWidth;
                css['border-left-style'] = 'solid'
            }
        
            if (json.borderBottomWidth) {
                css['border-bottom-width'] = json.borderBottomWidth;
                css['border-bottom-style'] = 'solid'
            }
        }

        return css;
    }

    toTransformCSS () {

        var json = this.json; 
        var results = [] 

        if (json.perspective) {
            results.push(`perspective(${json.perspective}px)`)
        }

        if (json.rotate) {
            results.push(`rotate(${json.rotate}deg)`)
        }

        if (json.skewX) {
            results.push(`skewX(${json.skewX}deg)`)
        }        

        if (json.skewY) {
            results.push(`skewY(${json.skewY}deg)`)
        }                

        if (json.scale) {
            results.push(`scale(${json.scale})`)
        }                        

        if (json.translateX) {
            results.push(`translateX(${json.translateX}px)`)
        }                                

        if (json.translateY) {
            results.push(`translateY(${json.translateY}px)`)
        }

        if (json.translateZ) { 
            results.push(`translateZ(${json.translateZ}px)`)
        }

        if (json.rotateX) {
            results.push(`rotateX(${json.rotateX}deg)`)
        }                                

        if (json.rotateY) {
            results.push(`rotateY(${json.rotateY}deg)`)
        }                                

        if (json.rotateZ) {
            results.push(`rotateZ(${json.rotateZ}deg)`)
        }      
        
        if (json.scaleX) {
            results.push(`scaleX(${json.scaleX})`)
        }  

        if (json.scaleY) {
            results.push(`scaleY(${json.scaleY})`)
        }  
        
        if (json.scaleZ) {
            results.push(`scaleZ(${json.scaleZ})`)
        }          
        
        return {
            transform: (results.length ? results.join(WHITE_STRING) : 'none')
        }
    }

    toDefaultCSS (isBound) {
        var css = {};
        var json = this.json; 

        css.width = json.width;
        css.height = json.height;
        css['box-sizing'] = json.boxSizing || 'border-box';        
        css['visibility'] = json.visible ? 'visible' : 'hidden';        
        css.position = json.position;

        if (json.x) {
            css.left = isBound ? this.screenX : json.x
        }

        if (json.y) { 
            css.top = isBound ? this.screenY : json.y
        }        

        if (json.backgroundColor) {
            css['background-color'] = json.backgroundColor
        }         
        
        if (json.mixBlendMode) {
            css['mix-blend-mode'] = json.mixBlendMode || "normal"
        }

        if (json.backgroundClip && !json.clipText) {
            css['background-clip'] = json.backgroundClip || ""
            css['-webkit-background-clip'] = json.backgroundClip || ""            
        }        

        if (json.opacity) {
            css['opacity'] = json.opacity;
        }

        return css; 
    }

    toBoundCSS() {
        var json = this.json;
        var left  = json.x.clone();
        var top  = json.y.clone();

        left.add(this.getArtBoard().x);
        top.add(this.getArtBoard().y);

        return { left: this.screenX, top: this.screenY, width: json.width, height: json.height  }
    }

    toCSS (isBound = false) {
    
        var results = {
            ...this.toDefaultCSS(isBound), 
            ...this.toBorderWidthCSS(),
            ...this.toBorderRadiusCSS(),
            ...this.toBorderColorCSS(),
            ...this.toBorderStyleCSS(),
            ...this.toTransformCSS(),
            ...this.toClipPathCSS(),
            ...this.toFilterCSS(),
            ...this.toBackdropFilterCSS(),
            ...this.toFontCSS(),              
            ...this.toBoxShadowCSS(),
            ...this.toTextShadowCSS(),
            ...this.toBackgroundImageCSS()
        }

        return CSS_FILTERING(cleanObject(results));
    }

}