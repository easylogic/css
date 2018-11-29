import BasePropertyItem from "./BasePropertyItem";
import { parseParamNumber } from "../../../../../util/filter/functions";


export default class Radius extends BasePropertyItem {
    template () {
        return `
            <div class='property-item radius show'>
                <div class='title' ref="$title">Radius 
                    <span>
                        <label><input type='checkbox' ref="$fixedRadius" /> fixed</label>
                    </span> 
                </div>
                <div class='items'>         
                    <div>
                        <label style="width:80px;" class="fixedRadiusOnly">T Left</label>
                        <div>
                            <input type='number' min="0" max="500" class="fixedRadiusOnly" ref="$topLeftRadius"> <span>px</span>
                        </div>
                        <label style="width:50px;">Right</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$topRightRadius"> <span>px</span>
                        </div>
                    </div>          
                    <div>
                        <label style="width:80px;">B Left</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$bottomLeftRadius"> <span>px</span>
                        </div>
                        <label style="width:50px;">Right</label>
                        <div>
                            <input type='number' min="0" max="500" ref="$bottomRightRadius"> <span>px</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    '@changeEditor' () {
        this.refresh()
    }

    refresh() {
        this.read('/item/current/layer', (item) => {

            if (item.fixedRadius) {
                this.refs.$fixedRadius.el.checked = true; 
                var radius = item.style['border-radius'] || ''
                radius = radius.replace('px', '')
                this.refs.$topLeftRadius.val(radius)
                this.refs.$topRightRadius.val('')
                this.refs.$bottomLeftRadius.val('')
                this.refs.$bottomRightRadius.val('')

                // this.refs.$topLeftRadius.val(item.style['border-top-left-radius'].replace('px', ''))
                this.refs.$topRightRadius.attr('disabled', true)
                this.refs.$bottomLeftRadius.attr('disabled', true)
                this.refs.$bottomRightRadius.attr('disabled', true)

            } else {
                this.refs.$topRightRadius.removeAttr('disabled')
                this.refs.$bottomLeftRadius.removeAttr('disabled')
                this.refs.$bottomRightRadius.removeAttr('disabled') 

                if (item.style['border-top-left-radius']) {
                    this.refs.$topLeftRadius.val(parseParamNumber(item.style['border-top-left-radius']))
                }
        
                if (item.style['border-top-right-radius']) {
                    this.refs.$topRightRadius.val(parseParamNumber(item.style['border-top-right-radius']))
                }
    
                if (item.style['border-bottom-left-radius']) {
                    this.refs.$bottomLeftRadius.val(parseParamNumber(['border-bottom-left-radius']))
                }
    
                if (item.style['border-bottom-right-radius']) {
                    this.refs.$bottomRightRadius.val(parseParamNumber(item.style['border-bottom-right-radius']))
                }
            }

        })
        
    }

    refreshValue (key, $el) {
        this.read('/item/current/layer', (item) => {
            item.style[key] = $el.int() + 'px'
            this.dispatch('/item/set', item)
        })
    }

    'click $fixedRadius' (e) {
        this.read('/item/current/layer', (item) => {
            item.fixedRadius = this.refs.$fixedRadius.el.checked; 
            this.dispatch('/item/set', item);
            this.refresh();
        })
    }

    'input:change $topLeftRadius' () {
        this.read('/item/current/layer', (item) => {
            if (item.fixedRadius) {
                this.refreshValue('border-radius', this.refs.$topLeftRadius);
            } else {
                this.refreshValue('border-top-left-radius', this.refs.$topLeftRadius);
            }
        })
        
    }

    'input:change $topRightRadius' () {
        this.refreshValue('border-top-right-radius', this.refs.$topRightRadius);
    }

    'input:change $bottomLeftRadius' () {
        this.refreshValue('border-bottom-left-radius', this.refs.$bottomLeftRadius);
    }

    'input:change $bottomRightRadius' () {
        this.refreshValue('border-bottom-right-radius', this.refs.$bottomRightRadius);
    }
}