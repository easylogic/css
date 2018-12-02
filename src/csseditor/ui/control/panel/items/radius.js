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
                var radius = item.borderRadius || ''
                radius = radius.replace('px', '')
                this.refs.$topLeftRadius.val(radius)
                this.refs.$topRightRadius.val('')
                this.refs.$bottomLeftRadius.val('')
                this.refs.$bottomRightRadius.val('')

                this.refs.$topRightRadius.attr('disabled', true)
                this.refs.$bottomLeftRadius.attr('disabled', true)
                this.refs.$bottomRightRadius.attr('disabled', true)

            } else {
                this.refs.$topRightRadius.removeAttr('disabled')
                this.refs.$bottomLeftRadius.removeAttr('disabled')
                this.refs.$bottomRightRadius.removeAttr('disabled') 

                if (item.borderTopLeftRadius) {
                    this.refs.$topLeftRadius.val(parseParamNumber(item.borderTopLeftRadius))
                }
        
                if (item.borderTopRightRadius) {
                    this.refs.$topRightRadius.val(parseParamNumber(item.borderTopRightRadius))
                }
    
                if (item.borderBottomLeftRadius) {
                    this.refs.$bottomLeftRadius.val(parseParamNumber(item.borderBottomLeftRadius))
                }
    
                if (item.borderBottomRightRadius) {
                    this.refs.$bottomRightRadius.val(parseParamNumber(item.borderBottomRightRadius))
                }
            }

        })
        
    }

    refreshValue (key, $el) {
        this.read('/item/current/layer', (item) => {
            item[key] = $el.int() + 'px'
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
                this.refreshValue('borderRadius', this.refs.$topLeftRadius);
            } else {
                this.refreshValue('borderTopLeftRadius', this.refs.$topLeftRadius);
            }
        })
        
    }

    'input:change $topRightRadius' () {
        this.refreshValue('borderTopRightRadius', this.refs.$topRightRadius);
    }

    'input:change $bottomLeftRadius' () {
        this.refreshValue('borderBottomLeftRadius', this.refs.$bottomLeftRadius);
    }

    'input:change $bottomRightRadius' () {
        this.refreshValue('borderBottomRightRadius', this.refs.$bottomRightRadius);
    }
}