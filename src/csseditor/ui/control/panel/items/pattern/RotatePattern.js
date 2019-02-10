import BasePropertyItem from "../BasePropertyItem";
import { CHANGE_SELECTION, CHANGE_IMAGE, CHANGE_EDITOR } from "../../../../../types/event";
import { SELECTION_CURRENT_IMAGE } from "../../../../../types/SelectionTypes";
import { CLICK, INPUT, CHANGE } from "../../../../../../util/Event";
import { EVENT } from "../../../../../../colorpicker/UIElement";
import { PATTERN_SET } from "../../../../../types/PatternTypes";
import { BLEND_LIST } from "../../../../../types/BlendTypes";
import { html } from "../../../../../../util/functions/func";
import { PATTERN_GET } from "../../../../../../util/css/make";

export default class RotatePattern extends BasePropertyItem {
    template () {
        return html`
            <div class='property-item rotate-pattern show'>
                <div class='items'>            
                    <div>
                        <label>Enable</label>
                        <div>
                            <input type="checkbox" ref="$enable" /> 
                            Only Linear Gradient
                        </div>
                    </div>   
                    <div>
                        <label>Clone</label>
                        <div >
                            <input type='range' ref="$cloneCountRange" min="0" max="100">                        
                            <input type='number' class='middle' min="0" max="100" ref="$cloneCount"> 
                        </div>
                    </div>
                    <div>
                        <label>Blend</label>
                        <div>
                            <select ref="$blend">
                            ${this.read(BLEND_LIST).map(blend => {
                                return `<option value="${blend}">${blend}</option>`
                            })}
                            </select>
                        </div>
                    </div>          
                    <div>
                        <label>Random</label>
                        <div>
                            <label><input type="checkbox" ref="$randomPosition" /> Position</label>
                            <label><input type="checkbox" ref="$randomSize" /> Size</label>
                        </div>                        
                    </div>  
                </div>
            </div>
        ` 
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    refresh() {
        this.read(SELECTION_CURRENT_IMAGE, (image) => {
            var rotate = PATTERN_GET(image, 'rotate');
            if (rotate ) {
                this.refs.$enable.checked(rotate.enable || false);    
                this.refs.$cloneCountRange.val(rotate.clone || 1);
                this.refs.$cloneCount.val(rotate.clone || 1);
                this.refs.$blend.val(rotate.blend || 'normal');
                this.refs.$randomPosition.checked(rotate.randomPosition || false)
                this.refs.$randomSize.checked(rotate.randomSize || false)
            }
        });
    }

    changePatternValue () {
        this.read(SELECTION_CURRENT_IMAGE, (image) => {
            this.run(PATTERN_SET, image, 'rotate', {
                enable: this.refs.$enable.checked(),
                clone: this.refs.$cloneCount.int(),
                blend: this.refs.$blend.val(),
                randomPosition: this.refs.$randomPosition.checked(),
                randomSize: this.refs.$randomSize.checked()
            });

            this.emit(CHANGE_IMAGE)
        })
    }

    [CLICK('$enable')] () { this.changePatternValue(); }
    [CLICK('$randomPosition')] () { this.changePatternValue(); }
    [CLICK('$randomSize')] () { this.changePatternValue(); }
    [INPUT('$cloneCount')] () { 
        this.refs.$cloneCountRange.val(this.refs.$cloneCount)
        this.changePatternValue(); 
    }
    [INPUT('$cloneCountRange')] () { 
        this.refs.$cloneCount.val(this.refs.$cloneCountRange)
        this.changePatternValue(); 
    }
    [CHANGE('$blend')] () {
        this.changePatternValue();
    }
}