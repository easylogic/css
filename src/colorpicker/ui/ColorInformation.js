import Event, { CLICK, KEYUP, INPUT, KEYDOWN } from '../../util/Event'
import UIElement, { EVENT } from '../../util/UIElement';

export default class ColorInformation extends UIElement {

    template () {
        return `
        <div class="information hex">
            <div ref="$informationChange" class="information-change">
                <button ref="$formatChangeButton" type="button" class="format-change-button arrow-button"></button>
            </div>
            <div class="information-item hex">
                <div class="input-field hex">
                    <input ref="$hexCode" class="input" type="text" />
                    <div class="title">HEX</div>
                </div>
            </div>
            <div class="information-item rgb">
                <div class="input-field rgb-r">
                    <input ref="$rgb_r" class="input" type="number" step="1" min="0" max="255" />
                    <div class="title">R</div>
                </div>
                <div class="input-field rgb-g">
                    <input ref="$rgb_g" class="input" type="number" step="1" min="0" max="255" />
                    <div class="title">G</div>
                </div>
                <div class="input-field rgb-b">
                    <input ref="$rgb_b" class="input" type="number" step="1" min="0" max="255" />
                    <div class="title">B</div>
                </div>          
                <div class="input-field rgb-a">
                    <input ref="$rgb_a" class="input" type="number" step="0.01" min="0" max="1" />
                    <div class="title">A</div>
                </div>                                                            
            </div>
            <div class="information-item hsl">
                <div class="input-field hsl-h">
                    <input ref="$hsl_h" class="input" type="number" step="1" min="0" max="360" />
                    <div class="title">H</div>
                </div>
                <div class="input-field hsl-s">
                    <input ref="$hsl_s" class="input" type="number" step="1" min="0" max="100" />
                    <div class="postfix">%</div>
                    <div class="title">S</div>
                </div>
                <div class="input-field hsl-l">
                    <input ref="$hsl_l" class="input" type="number" step="1" min="0" max="100" />
                    <div class="postfix">%</div>                        
                    <div class="title">L</div>
                </div>
                <div class="input-field hsl-a">
                    <input ref="$hsl_a" class="input" type="number" step="0.01" min="0" max="1" />
                    <div class="title">A</div>
                </div>
            </div>
        </div>
        `
    }
    
    setCurrentFormat (format) {
        this.format = format

        this.initFormat();
    }
    
    initFormat () {
        var current_format = this.format || 'hex';
    
        this.$el.removeClass('hex');
        this.$el.removeClass('rgb');
        this.$el.removeClass('hsl');
        this.$el.addClass(current_format);
    }
    
    nextFormat() {
        var current_format = this.format || 'hex';

        var next_format = 'hex';
        if (current_format == 'hex') {
            next_format = 'rgb';
        } else if (current_format == 'rgb') {
            next_format = 'hsl';
        } else if (current_format == 'hsl') {
            if (this.$store.alpha == 1) {
                next_format = 'hex';
            } else {
                next_format = 'rgb';
            }
        }

        this.$el.removeClass(current_format);
        this.$el.addClass(next_format);
        this.format = next_format;

        this.dispatch('changeFormat', this.format);
    }
    
    getFormat () {
        return this.format || 'hex';   
    }

    checkNumberKey(e) {
        return Event.checkNumberKey(e);
    }    

    checkNotNumberKey(e) {
        return !Event.checkNumberKey(e);
    }        

    changeRgbColor () {
        this.dispatch('changeColor', {
            type: 'rgb',
            r : this.refs.$rgb_r.int(),
            g : this.refs.$rgb_g.int(),
            b : this.refs.$rgb_b.int(),
            a : this.refs.$rgb_a.float()
        })
    }

    changeHslColor () {
        this.dispatch('changeColor', {
            type: 'hsl',
            h : this.refs.$hsl_h.int(),
            s : this.refs.$hsl_s.int(),
            l : this.refs.$hsl_l.int(),
            a : this.refs.$hsl_a.float()
        })        
    }    

    [EVENT('changeColor')] () {
        this.refresh()
    }

    [EVENT('initColor')] () { this.refresh() }    

    [INPUT('$rgb_r')] (e) {  this.changeRgbColor(); }
    [INPUT('$rgb_g')] (e) {  this.changeRgbColor(); }
    [INPUT('$rgb_b')] (e) {  this.changeRgbColor(); }
    [INPUT('$rgb_a')] (e) {  this.changeRgbColor(); }  
    
    [INPUT('$hsl_h')] (e) {  this.changeHslColor(); }
    [INPUT('$hsl_s')] (e) {  this.changeHslColor(); }
    [INPUT('$hsl_l')] (e) {  this.changeHslColor(); }
    [INPUT('$hsl_a')] (e) {  this.changeHslColor(); }      

    [KEYDOWN('$hexCode')] (e) {
        if(e.which < 65 || e.which > 70) {
            return this.checkNumberKey(e);
        }
    }
    
    [KEYUP('$hexCode')] (e) {
        var code = this.refs.$hexCode.val();
    
        if(code.charAt(0) == '#' && code.length == 7) {
            this.dispatch('changeColor', code)
        }
    }
    
    [CLICK('$formatChangeButton')] (e) {
        this.nextFormat();
    }

    setRGBInput() {
        this.refs.$rgb_r.val(this.$store.rgb.r);
        this.refs.$rgb_g.val(this.$store.rgb.g);
        this.refs.$rgb_b.val(this.$store.rgb.b);
        this.refs.$rgb_a.val(this.$store.alpha);
    }
    
    setHSLInput() {
        this.refs.$hsl_h.val(this.$store.hsl.h);
        this.refs.$hsl_s.val(this.$store.hsl.s);
        this.refs.$hsl_l.val(this.$store.hsl.l);
        this.refs.$hsl_a.val(this.$store.alpha);
    }    

    setHexInput () {
        this.refs.$hexCode.val(this.read('toHEX'));
    }

    refresh () {
        this.setCurrentFormat(this.$store.format);
        this.setRGBInput();
        this.setHSLInput();
        this.setHexInput();
    }
}
