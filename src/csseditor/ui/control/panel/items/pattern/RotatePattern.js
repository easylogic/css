import BasePropertyItem from "../BasePropertyItem";
import { CHANGE_SELECTION, CHANGE_IMAGE, CHANGE_EDITOR } from "../../../../../types/event";
import { SELECTION_CURRENT_IMAGE } from "../../../../../types/SelectionTypes";
import { CLICK, INPUT, CHANGE } from "../../../../../../util/Event";
import { EVENT } from "../../../../../../colorpicker/UIElement";
import { PATTERN_GET, PATTERN_SET } from "../../../../../types/PatternTypes";
import { BLEND_LIST } from "../../../../../types/BlendTypes";
import { EMPTY_STRING } from "../../../../../../util/css/types";

export default class RotatePattern extends BasePropertyItem {
    template () {
        return `
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
                            }).join(EMPTY_STRING)}
                            </select>
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
            var rotate = this.read(PATTERN_GET, image, 'rotate');
            if (rotate ) {
                this.refs.$enable.checked(rotate.enable || false);    
                this.refs.$cloneCountRange.val(rotate.clone || 1);
                this.refs.$cloneCount.val(rotate.clone || 1);
                this.refs.$blend.val(rotate.blend || 'normal');
            }
        });
    }

    changePatternValue () {
        this.read(SELECTION_CURRENT_IMAGE, (image) => {
            this.run(PATTERN_SET, image, 'rotate', {
                enable: this.refs.$enable.checked(),
                clone: this.refs.$cloneCount.int(),
                blend: this.refs.$blend.val()
            });

            this.emit(CHANGE_IMAGE)
        })
    }

    [CLICK('$enable')] () { this.changePatternValue(); }
    [INPUT('$cloneCount')] () { 
        this.refs.$cloneCountRange.val(this.refs.$cloneCount.val())
        this.changePatternValue(); 
    }
    [INPUT('$cloneCountRange')] () { 
        this.refs.$cloneCount.val(this.refs.$cloneCountRange.val())
        this.changePatternValue(); 
    }
    [CHANGE('$blend')] () {
        this.changePatternValue();
    }
}