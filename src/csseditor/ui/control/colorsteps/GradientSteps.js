import UIElement, { EVENT } from '../../../../colorpicker/UIElement';
import Dom from '../../../../util/Dom';
import { px2em, px2percent, percent2px, percent2em, em2percent, em2px } from '../../../../util/filter/functions';
import { 
    CHANGE_COLOR_STEP, 
    REMOVE_COLOR_STEP, 
    ADD_COLOR_STEP, 
    CHANGE_EDITOR,
    CHANGE_SELECTION
} from '../../../types/event';
import { isPX, UNIT_PX, UNIT_EM, isPercent, isEM, UNIT_PERCENT, EMPTY_STRING } from '../../../../util/css/types';
import { CHANGE, INPUT, POINTEREND, POINTERMOVE, POINTERSTART, CLICK, SHIFT, CHECKER, DEBOUNCE, LOAD } from '../../../../util/Event';
import { ITEM_SET, ITEM_GET } from '../../../types/ItemTypes';
import { SELECTION_CURRENT_IMAGE, SELECTION_CURRENT, SELECTION_IS_IMAGE, SELECTION_CURRENT_LAYER } from '../../../types/SelectionTypes';
import { HISTORY_PUSH } from '../../../types/HistoryTypes';
import { IMAGE_TYPE_IS_GRADIENT, IMAGE_TO_LINEAR_RIGHT, IMAGE_TYPE_IS_NOT_GRADIENT } from '../../../types/ImageTypes';
import { ITEM_MAP_CHILDREN, ITEM_EACH_CHILDREN } from '../../../types/ItemSearchTypes';
import { TOOL_COLOR_SOURCE } from '../../../types/ToolTypes';
import { COLORSTEP_COLOR_SOURCE, COLORSTEP_REMOVE, COLORSTEP_ADD, COLORSTEP_INIT_COLOR, COLORSTEP_SORT, COLORSTEP_UNIT_VALUE } from '../../../types/ColorStepTypes';

export default class GradientSteps extends UIElement {

    template () { 
        return `
            <div class='gradient-steps'>
                <div class="hue-container" ref="$back"></div>            
                <div class="hue" ref="$steps">
                    <div class='step-list' ref="$stepList">
                    </div>
                </div>
            </div>
        ` 
    }

    getStepPosition (step) {
        var {min, max} = this.getMinMax() 
        
        var left = this.refs.$steps.offset().left

        min -= left;
        max -= left;

        if (isPX(step.unit)) {
            return step.px;
        } 

        return min + (max - min) * (step.percent / 100);
    }

    getUnitName (step) {
        var unit = step.unit || UNIT_PERCENT

        if ([UNIT_PX, UNIT_EM].includes(unit)) {
            return unit; 
        }

        return UNIT_PERCENT
    }

    getUnitSelect (step) {

        var unit = step.unit || UNIT_PERCENT

        if ([UNIT_PX, UNIT_EM].includes(unit) == false) {
            unit = UNIT_PERCENT;
        }

        return `
        <select class='unit' data-colorstep-id="${step.id}">
            <option value='${UNIT_PERCENT}' ${isPercent(unit) ? 'selected' : EMPTY_STRING}>%</option>
            <option value='${UNIT_PX}' ${isPX(unit) ? 'selected' : EMPTY_STRING}>px</option>
            <option value='${UNIT_EM}' ${isEM(unit) ? 'selected' : EMPTY_STRING}>em</option>
        </select>
        `
    }

    getMaxValue () {
        return this.$store.step.width;
    }

    // load 후에 이벤트를 재설정 해야한다. 
    [LOAD('$stepList')] () {
        var item = this.read(SELECTION_CURRENT_IMAGE)

        if (!item) return EMPTY_STRING;

        return this.read(ITEM_MAP_CHILDREN, item.id, (step) => {

            var cut = step.cut ? 'cut' : EMPTY_STRING; 
            var unitValue = this.read('colorstep/unit/value', step, this.getMaxValue());
            return `
                <div 
                    class='drag-bar ${step.selected ? 'selected' : EMPTY_STRING}' 
                    id="${step.id}"
                    style="left: ${this.getStepPosition(step)}px;"
                >   
                    <div class="guide-step step" style=" border-color: ${step.color};background-color: ${step.color};"></div>
                    <div class='guide-line' 
                        style="background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), ${step.color} 10%) ;"></div>
                    <div class="guide-change ${cut}" data-colorstep-id="${step.id}"></div>
                    <div class="guide-unit ${this.getUnitName(step)}">
                        <input type="number" class="${UNIT_PERCENT}" min="-100" max="100" step="0.1"  value="${unitValue.percent}" data-colorstep-id="${step.id}"  />
                        <input type="number" class="${UNIT_PX}" min="-100" max="1000" step="1"  value="${unitValue.px}" data-colorstep-id="${step.id}"  />
                        <input type="number" class="${UNIT_EM}" min="-100" max="500" step="0.1"  value="${unitValue.em}" data-colorstep-id="${step.id}"  />
                        ${this.getUnitSelect(step)}
                    </div>       
                </div>
            `
        })
    }

    isShow() {

        var item = this.read(SELECTION_CURRENT);

        if (!item.length) return false; 

        item = item[0];

        if (!this.read(IMAGE_TYPE_IS_GRADIENT, item.type)) {
            return false; 
        }

        if (!this.read(SELECTION_IS_IMAGE)) {
            return false; 
        }

        return true; 
    }

    refresh () {

        this.$el.toggle(this.isShow())


        this.read(SELECTION_CURRENT_IMAGE, item => {
            var type = item ? item.type : EMPTY_STRING 
    
            if (this.read(IMAGE_TYPE_IS_GRADIENT, type)) {
                this.load()
                this.setColorUI()
            }
        })
        
    }

    setColorUI() {
        this.setBackgroundColor()
    }

    setBackgroundColor() {

        this.refs.$stepList.css(
            'background-image', 
            this.read(IMAGE_TO_LINEAR_RIGHT, this.read(SELECTION_CURRENT_IMAGE))
        )

    }

    /* slide 영역 min,max 구하기  */
    getMinMax() {
        var min = this.refs.$steps.offsetLeft(); 
        var width = this.refs.$steps.width();
        var max = min + width;

        return {min, max, width}
    }

    /* 현재 위치 구하기  */ 
    getCurrent (e) {
        var {min, max} = this.getMinMax()
        var {x} = e.xy
 
        var current = Math.min(Math.max(min, x), max)

        return current
    }

    /**
     * 마우스 이벤트로 현재 위치 및 percent 설정, 전체  gradient 리프레쉬 
     * 
     * @param {*} e 
     */
    refreshColorUI (e) {
        
        var {min, max} = this.getMinMax()

        var current = this.getCurrent(e)

        if (this.currentStep) {
            var posX = Math.max(min, current)
            var px = posX - this.refs.$steps.offsetLeft();

            if (e.ctrlKey) {
                px = Math.floor(px);    // control + drag is floor number 
            }
            this.currentStepBox.px('left', px)
            // var percent = Math.floor((current - min) / (max - min) * 100)

            var item = this.read(ITEM_GET, this.currentStepBox.attr('id'));

            if (item) {

                // item.px = px; 
                var percent = Math.floor(px2percent(px, max - min));
                var em = px2em(px, max- min);
                var newValue = {id: item.id, px, percent, em}

                this.currentUnitPercent.val(percent);
                this.currentUnitPx.val(px);
                this.currentUnitEm.val(em);

                this.run(ITEM_SET, newValue);
                this.run('colorstep/sort', newValue.id, this.getSortedStepList());
                this.commit(CHANGE_COLOR_STEP, newValue);
                this.setBackgroundColor();
            }
        }
    }

    [EVENT('changeColor')] () {

        if (this.read(IMAGE_TYPE_IS_NOT_GRADIENT, this.read(SELECTION_CURRENT_IMAGE))) return;
        if (this.read(TOOL_COLOR_SOURCE) !=  this.read(COLORSTEP_COLOR_SOURCE)) return; 

        if (this.currentStep) {

            var item = this.read(ITEM_GET, this.currentStep.attr('id'))

            if (item) {
                var color = this.config('color');
                var newValue = {id: item.id, color} ;

                this.commit(CHANGE_COLOR_STEP, newValue);
                this.refresh();
            }
        }

    }    

    [EVENT(
        CHANGE_COLOR_STEP,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh(); }

    'checkTarget' (e) {
        return this.refs.$back.is(e.target)
    }

    // 이미 선언된 메소드를 사용하여 메타 데이타로 쓴다. 
    // checkTarget 이라는 메소드가 true 를 리턴해줘야 아래 이벤트는 실행된다. 
    [CLICK('$back')] (e) {
        this.addStep(e);
    }

    removeStep (e) {

        var id = e.$delegateTarget.attr('id')

        this.run(COLORSTEP_REMOVE, id);
        this.emit(REMOVE_COLOR_STEP, id);
        this.run(HISTORY_PUSH, 'Remove colorstep');        
        this.refresh();
    }

    addStep (e) {
        var {min, max} = this.getMinMax()

        var current = this.getCurrent(e)

        var percent = Math.floor((current - min) / (max - min) * 100)

        var item = this.read(SELECTION_CURRENT_IMAGE);

        if (!item) return; 

        this.dispatch(COLORSTEP_ADD, item, percent);
        this.emit(ADD_COLOR_STEP, item, percent);
        this.run(HISTORY_PUSH, 'Add colorstep');
        this.refresh()
    }

    initColor (color) {
        this.dispatch(COLORSTEP_INIT_COLOR, color)        
    }

    getSortedStepList () {
        var list = this.refs.$stepList.$$('.drag-bar').map(it => {
            return {id : it.attr('id'), x: it.cssFloat('left')}
        })

        list.sort((a, b) => {
            if (a.x == b.x) return 0; 
            return a.x > b.x ? 1: -1;
        })

        return list.map(it => it.id)
    }

    selectStep (e) {
        var parent = e.$delegateTarget.parent();
        var item = this.read(ITEM_GET, parent.attr('id'));
            
        this.read(ITEM_EACH_CHILDREN, item.parentId, (step) => {
            if (step.selected) {
                step.selected = false;
                this.run(ITEM_SET, step);
            } 
        })

        item.selected = true; 

        this.initColor(item.color)     

        this.currentStepBox = this.currentStepBox || parent;
        var $selected = this.refs.$stepList.$('.selected');
        if ($selected && !$selected.is(this.currentStepBox)) {
            $selected.removeClass('selected');
        }

        this.currentStepBox.addClass('selected')
        this.run (ITEM_SET, item); 
        this.dispatch(COLORSTEP_SORT, item.id, this.getSortedStepList());
        this.setBackgroundColor();
    }

    [CLICK('$steps .step') + SHIFT] (e) {
        this.removeStep(e);
    }

    [CLICK('$steps .step')] (e) {
        this.selectStep(e)
    }

    [CLICK('$steps .guide-change')] (e) {
        var id = e.$delegateTarget.attr('data-colorstep-id');
        var item = this.read(ITEM_GET, id);

        if (item.id) {
            // var cut = !item.cut;
            var newValue = {id: item.id, cut : !item.cut}
            this.commit(CHANGE_COLOR_STEP, newValue)
            this.run(HISTORY_PUSH, 'Apply cut option');        

            this.refresh();
        }

    }

    [CHANGE('$steps .guide-unit select.unit')] (e) {

        var unit = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read(ITEM_GET, id)

        if (step) {
            step.unit = unit;

            var unitValue = this.read(COLORSTEP_UNIT_VALUE,step, this.getMaxValue());
            var newValue = {id: step.id, unit, ...unitValue}
  
            this.commit(CHANGE_COLOR_STEP, newValue);

            var $parent = e.$delegateTarget.parent();
            $parent.removeClass(UNIT_PERCENT, UNIT_PX, UNIT_EM).addClass(this.getUnitName(step));
        }        
    }


    [INPUT('$steps input.percent')] (e) {
        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) return; 

        var layer = this.read(SELECTION_CURRENT_LAYER);

        var percent = +e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read(ITEM_GET, id)

        if (step) {

            var newValue = {
                id: step.id,
                percent,
                px: percent2px(percent, this.getMaxValue(layer) ),
                em: percent2em(percent, this.getMaxValue(layer) )
            }

            this.currentStepBox.px('left', newValue.px)                
            // this.currentUnitPercent.val(item.percent);
            this.currentUnitPx.val(newValue.px);
            this.currentUnitEm.val(newValue.em);

            this.commit(CHANGE_COLOR_STEP, newValue);
            this.setBackgroundColor();         
        }
    }

    [INPUT('$steps input.px')] (e) {
        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) return; 

        var layer = this.read(SELECTION_CURRENT_LAYER);

        var px = +e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read(ITEM_GET, id)

        if (step) {
            var newValue = {
                id: step.id,
                px,
                percent: px2percent(px, this.getMaxValue(layer)),
                em: px2em(px, this.getMaxValue(layer))
            }

            this.currentStepBox.px('left', newValue.px)                
            this.currentUnitPercent.val(newValue.percent);
            // this.currentUnitPx.val(item.px);
            this.currentUnitEm.val(newValue.em);

            this.commit(CHANGE_COLOR_STEP, newValue);
            this.setBackgroundColor();                    
        }
    }
    
    [INPUT('$steps input.em')] (e) {
        var item = this.read(SELECTION_CURRENT_IMAGE)
        if (!item) return; 

        var layer = this.read(SELECTION_CURRENT_LAYER);        

        var em = +e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read(ITEM_GET, id)

        if (step) {
            var newValue = {
                id: step.id, 
                em, 
                percent: em2percent(em, this.getMaxValue(layer)),
                px: em2px(em, this.getMaxValue(layer))
            }
            
            this.currentStepBox.px('left', newValue.px)                
            this.currentUnitPercent.val(newValue.percent);
            this.currentUnitPx.val(newValue.px);
            // this.currentUnitEm.val(item.em);
        
            this.commit(CHANGE_COLOR_STEP, newValue);
            this.setBackgroundColor();         
        }
    }        

    isDownCheck (e) {
        return this.isDown
    }

    isNotDownCheck (e) {
        return !this.isDown
    }    

    isNotFirstPosition (e) {
        return this.xy.x !== e.xy.x || this.xy.y !== e.xy.y     
    } 

    // Event Bindings 
    [POINTEREND('document') + CHECKER('isDownCheck')] (e) { 
        this.isDown = false       
        if (this.refs.$stepList) {
            this.refs.$stepList.removeClass('mode-drag')       
            this.run(HISTORY_PUSH, 'Moved colorstep');
        }
    }

    [POINTERMOVE('document') + CHECKER('isDownCheck')] (e) {
        this.refreshColorUI(e);
        this.refs.$stepList.addClass('mode-drag')
    }

    isStepElement (e) {
        return new Dom(e.target).hasClass('step');
    }

    [POINTERSTART('$steps .step') + CHECKER('isNotDownCheck') + CHECKER('isStepElement')] (e) {
        e.preventDefault();

        this.isDown = true; 
        this.xy = e.xy;
        this.currentStep = e.$delegateTarget;
        this.currentStepBox = this.currentStep.parent();
        this.currentUnit = this.currentStepBox.$(".guide-unit")
        this.currentUnitPercent = this.currentUnit.$(".percent")
        this.currentUnitPx = this.currentUnit.$(".px")
        this.currentUnitEm = this.currentUnit.$(".em")

        if (this.currentStep) {
            this.selectStep(e)
        }

    }

}