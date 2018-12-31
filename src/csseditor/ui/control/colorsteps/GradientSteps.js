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
import { isPX, UNIT_PX, UNIT_EM, isPercent, isEM, UNIT_PERCENT } from '../../../../util/css/types';
import { CHANGE, INPUT, POINTEREND, POINTERMOVE, POINTERSTART, CLICK, SHIFT, CHECKER, DEBOUNCE, LOAD } from '../../../../util/Event';

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
            <option value='${UNIT_PERCENT}' ${isPercent(unit) ? 'selected' : ''}>%</option>
            <option value='${UNIT_PX}' ${isPX(unit) ? 'selected' : ''}>px</option>
            <option value='${UNIT_EM}' ${isEM(unit) ? 'selected' : ''}>em</option>
        </select>
        `
    }

    getMaxValue () {
        return this.$store.step.width;
    }

    // load 후에 이벤트를 재설정 해야한다. 
    [LOAD('$stepList')] () {
        var item = this.read('selection/current/image')

        if (!item) return '';

        return this.read('item/map/children', item.id, (step) => {

            var cut = step.cut ? 'cut' : ''; 
            var unitValue = this.read('colorstep/unit/value', step, this.getMaxValue());
            return `
                <div 
                    class='drag-bar ${step.selected ? 'selected' : ''}' 
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

        var item = this.read('selection/current');

        if (!item.length) return false; 

        item = item[0];

        if (!this.read('image/type/isGradient', item.type)) {
            return false; 
        }

        if (!this.read('selection/is/image')) {
            return false; 
        }

        return true; 
    }

    refresh () {

        this.$el.toggle(this.isShow())


        this.read('selection/current/image', item => {
            var type = item ? item.type : '' 
    
            if (this.read('image/type/isGradient', type)) {
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
            this.read('image/toLinearRight', this.read('selection/current/image'))
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

            var item = this.read('item/get', this.currentStepBox.attr('id'));

            if (item) {

                // item.px = px; 
                var percent = Math.floor(px2percent(px, max - min));
                var em = px2em(px, max- min);
                var newValue = {id: item.id, px, percent, em}

                this.currentUnitPercent.val(percent);
                this.currentUnitPx.val(px);
                this.currentUnitEm.val(em);

                this.run('item/set', newValue);
                this.run('colorstep/sort', newValue.id, this.getSortedStepList());
                this.commit(CHANGE_COLOR_STEP, newValue);
                this.setBackgroundColor();
            }
        }
    }

    [EVENT('changeColor')] () {

        if (this.read('image/isNotGradientType', this.read('selection/current/image'))) return;
        if (this.read('tool/colorSource') !=  this.read('colorstep/colorSource')) return; 

        if (this.currentStep) {

            var item = this.read('item/get', this.currentStep.attr('id'))

            if (item) {
                var color = this.read('tool/get', 'color');
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

        this.run('colorstep/remove', id);
        this.emit(REMOVE_COLOR_STEP, id);
        this.run('history/push', 'Remove colorstep');        
        this.refresh();
    }

    addStep (e) {
        var {min, max} = this.getMinMax()

        var current = this.getCurrent(e)

        var percent = Math.floor((current - min) / (max - min) * 100)

        var item = this.read('selection/current/image');

        if (!item) return; 

        this.dispatch('colorstep/add', item, percent);
        this.emit(ADD_COLOR_STEP, item, percent);
        this.run('history/push', 'Add colorstep');
        this.refresh()
    }

    initColor (color) {
        this.dispatch('colorstep/initColor', color)        
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
        var item = this.read('item/get', parent.attr('id'));
            
        this.read('item/each/children', item.parentId, (step) => {
            if (step.selected) step.selected = false; 
        })

        item.selected = true; 

        this.initColor(item.color)     

        this.currentStepBox = this.currentStepBox || parent;
        var $selected = this.refs.$stepList.$('.selected');
        if ($selected && !$selected.is(this.currentStepBox)) {
            $selected.removeClass('selected');
        }

        this.currentStepBox.addClass('selected')
        this.run ('item/set', item); 
        this.dispatch('colorstep/sort', item.id, this.getSortedStepList());
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
        var item = this.read('item/get', id);

        if (item.id) {
            // var cut = !item.cut;
            var newValue = {id: item.id, cut : !item.cut}
            this.commit(CHANGE_COLOR_STEP, newValue)
            this.run('history/push', 'Apply cut option');        

            this.refresh();
        }

    }

    [CHANGE('$steps .guide-unit select.unit')] (e) {

        var unit = e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read('item/get', id)

        if (step) {
            step.unit = unit;

            var unitValue = this.read('colorstep/unit/value',step, this.getMaxValue());
            var newValue = {id: step.id, unit, ...unitValue}
  
            this.commit(CHANGE_COLOR_STEP, newValue);

            var $parent = e.$delegateTarget.parent();
            $parent.removeClass(UNIT_PERCENT, UNIT_PX, UNIT_EM).addClass(this.getUnitName(step));
        }        
    }


    [INPUT('$steps input.percent')] (e) {
        var item = this.read('selection/current/image')
        if (!item) return; 

        var layer = this.read('selection/current/layer');

        var percent = +e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read('item/get', id)

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
        var item = this.read('selection/current/image')
        if (!item) return; 

        var layer = this.read('selection/current/layer');

        var px = +e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read('item/get', id)

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
        var item = this.read('selection/current/image')
        if (!item) return; 

        var layer = this.read('selection/current/layer');        

        var em = +e.$delegateTarget.val()
        var id = e.$delegateTarget.attr('data-colorstep-id')
        
        var step = this.read('item/get', id)

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
            this.run('history/push', 'Moved colorstep');
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