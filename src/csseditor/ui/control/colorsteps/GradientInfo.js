import UIElement, { MULTI_EVENT } from "../../../../colorpicker/UIElement";
import { percent2px, px2percent, px2em, em2percent, percent2em, em2px } from "../../../../util/filter/functions";
import { CHANGE_COLOR_STEP, REMOVE_COLOR_STEP, EVENT_CHANGE_COLOR_STEP, EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION } from "../../../types/event";
import { UNIT_PX, UNIT_EM, UNIT_PERCENT, isPercent, isPX, isEM } from "../../../../util/css/types";
import { CLICK, INPUT, CHANGE } from "../../../../util/Event";

function checkPxEm(unit) {
    return [UNIT_PX, UNIT_EM].includes(unit);
}

export default class GradientInfo extends UIElement {

    template () { 
        return ` 
            <div class='gradient-info'>
                <div class="form-item" ref="$colorsteps">

                </div>
            </div>
        ` 
    }

    getUnitName (step) {
        var unit = step.unit || UNIT_PERCENT

        if (checkPxEm(unit)) {
            return unit; 
        }

        return 'percent'
    }

    getUnitSelect (step) {

        var unit = step.unit || UNIT_PERCENT

        if (checkPxEm(unit) == false) {
            unit = UNIT_PERCENT;
        }

        return `
        <select class='unit' colorstep-id="${step.id}">
            <option value='${UNIT_PERCENT}' ${isPercent (unit) ? 'selected' : ''}>%</option>
            <option value='${UNIT_PX}' ${isPX(unit) ? 'selected' : ''}>px</option>
            <option value='${UNIT_EM}' ${isEM(unit) ? 'selected' : ''}>em</option>
        </select>
        `
    }

    getUnitValue (step) {

        if (isPX(step.unit)) {
            return {
                px: step.px,
                percent: px2percent(step.px, this.getMaxValue()),
                em: px2em(step.px, this.getMaxValue())
            }
        } else if (isEM(step.unit)) {
            return {
                em: step.em,
                percent: em2percent(step.em, this.getMaxValue()),
                px: em2px(step.em, this.getMaxValue())
            }
        }

        return {
            percent: step.percent,
            px: percent2px(step.percent, this.getMaxValue()),
            em: percent2em(step.percent, this.getMaxValue())
        }
    }

    'load $colorsteps' () {

        var item = this.read('/selection/current/image')

        if (!item) return '';

        var colorsteps = this.read('/colorstep/sort/list', item.id);


        return `<div class='step-list' ref="$stepList">
                    ${colorsteps.map( step => {
                        var cut = step.cut ? 'cut' : '';      
                        var unitValue = this.getUnitValue(step);
                        return `
                            <div class='color-step ${step.selected ? 'selected' : ''}' colorstep-id="${step.id}" >
                                <div class="color-cut">
                                    <div class="guide-change ${cut}" colorstep-id="${step.id}"></div>
                                </div>                                
                                <div class="color-view">
                                    <div class="color-view-item" style="background-color: ${step.color}" colorstep-id="${step.id}" ></div>
                                </div>                            
                                <div class="color-code">
                                    <input type="text" class="code" value='${step.color}' colorstep-id="${step.id}"  />
                                </div>
                                <div class="color-unit ${this.getUnitName(step)}">
                                    <input type="number" class="${UNIT_PERCENT}" min="0" max="100" step="0.1"  value="${unitValue.percent}" colorstep-id="${step.id}"  />
                                    <input type="number" class="${UNIT_PX}" min="0" max="1000" step="1"  value="${unitValue.px}" colorstep-id="${step.id}"  />
                                    <input type="number" class="${UNIT_EM}" min="0" max="500" step="0.1"  value="${unitValue.em}" colorstep-id="${step.id}"  />
                                    ${this.getUnitSelect(step)}
                                </div>                       
                                <div class="tools">
                                    <button type="button" class='remove-step' colorstep-id="${step.id}" >&times;</button>
                                </div>
                            </div>
                        `
                    }).join('')}
                </div>`
    }

    refresh () {
        this.load()
    }

    [MULTI_EVENT(
        EVENT_CHANGE_COLOR_STEP,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh(); }

    initColor (color) {
        this.dispatch('/colorstep/initColor', color)        
    }

    selectStep (e) {
        var item = this.read('/item/get', e.$delegateTarget.attr('colorstep-id'));
            
        this.read('/item/each/children', item.parentId, (step) => {
            if (step.selected) {
                step.selected = false; 
                this.run('/item/set', step);
            }
        })

        item.selected = true; 

        this.initColor(item.color)   
        var newValue = {id: item.id, selected: item.selected};  
        this.commit(CHANGE_COLOR_STEP, newValue);
        this.refresh();        
    }    

    [CLICK('$colorsteps .color-view-item')] (e) {
        this.selectStep(e)
    }

    [INPUT('$colorsteps input.code')] (e) {
        var item = this.read('/selection/current/image')
        if (!item) return; 

        var color = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('colorstep-id')
        
        var step = this.read('/item/get', id)

        if (step) {
            var newValue = {id: step.id, color}
            this.commit(CHANGE_COLOR_STEP, newValue)

            this.refs.$stepList.$(`.color-view-item[colorstep-id="${step.id}"]`).css({
                'background-color': color 
            })
        }

    }

    getMaxValue (layer) {
        return this.$store.step.width;
    }

    [CHANGE('$colorsteps select.unit')] (e) {

        var unit = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('colorstep-id')
        
        var step = this.read('/item/get', id)

        if (step) {
            var newValue = {id: step.id, unit};
            this.commit(CHANGE_COLOR_STEP, newValue )

            var $parent = e.$delegateTarget.parent();
            $parent.removeClass(UNIT_PERCENT, UNIT_PX, UNIT_EM).addClass(unit);
        }        
    }

    [INPUT('$colorsteps input.percent')] (e) {
        var item = this.read('/selection/current/image')
        if (!item) return; 

        var layer = this.read('/selection/current/layer');

        var percent = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('colorstep-id')
        
        var step = this.read('/item/get', id)

        if (step) {
            // percent; 
            var px = percent2px(percent, this.getMaxValue(layer) );
            var em = percent2em(percent, this.getMaxValue(layer) );
            var newValue = {id: step.id, percent, px, em }

            this.commit(CHANGE_COLOR_STEP, newValue);

        }
    }

    [INPUT('$colorsteps input.px')] (e) {
        var item = this.read('/selection/current/image')
        if (!item) return; 

        var layer = this.read('/selection/current/layer');

        var px = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('colorstep-id')
        
        var step = this.read('/item/get', id)

        if (step) {
            // step.px = px; 
            var percent = px2percent(px, this.getMaxValue(layer));
            var em = px2em(px, this.getMaxValue(layer));
            var newValue = {id: step.id, percent, px, em }
            this.commit(CHANGE_COLOR_STEP, newValue);       
        }
    }
    
    [INPUT('$colorsteps input.em')] (e) {
        var item = this.read('/selection/current/image')
        if (!item) return; 

        var layer = this.read('/selection/current/layer');        

        var em = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('colorstep-id')
        
        var step = this.read('/item/get', id)

        if (step) {
            // step.em = em; 
            var percent = em2percent(em, this.getMaxValue(layer));
            var px = em2px(em, this.getMaxValue(layer));            
            var newValue = {id: step.id, percent, px, em }

            this.commit(CHANGE_COLOR_STEP, newValue);          
        }
    }    

    [CLICK('$colorsteps .remove-step')] (e) {
        var item = this.read('/selection/current/image')
        if (!item) return; 

        var id = e.$delegateTarget.attr('colorstep-id')
        
        this.run('/colorstep/remove', id)
        this.emit(REMOVE_COLOR_STEP, id);
        this.refresh()

    }


    [CLICK('$colorsteps .guide-change')] (e) {
        var id = e.$delegateTarget.attr('colorstep-id');
        var item = this.read('/item/get', id);

        if (item.id) {
            this.commit(CHANGE_COLOR_STEP, {id: item.id, cut: !item.cut})
            this.refresh();
        }

    }    

}