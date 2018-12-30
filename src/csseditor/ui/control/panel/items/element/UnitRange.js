import UIElement from "../../../../../../colorpicker/UIElement";
import { 
    px2em, px2percent, 
    percent2em, percent2px, 
    em2percent, em2px 
} from "../../../../../../util/filter/functions";
import { parseParamNumber } from "../../../../../../util/gl/filter/util";
import { UNIT_PX, UNIT_PERCENT, UNIT_EM, isPercent, isPX, isEM, unitString, unit, unitObject, isPxUnit, isPercentUnit, isEmUnit } from "../../../../../../util/css/types";
import { INPUT, CLICK } from "../../../../../../util/Event";
import { POSITION_LEFT, POSITION_TOP, POSITION_RIGHT, POSITION_BOTTOM, POSITION_CENTER } from "../../../../../module/ItemTypes";

const position_list = [
    POSITION_LEFT, 
    POSITION_TOP, 
    POSITION_RIGHT,
    POSITION_BOTTOM,
    POSITION_CENTER
]

export default class UnitRange extends UIElement {


    created () {
        this.min = this.props.min || 0; 
        this.max = this.props.max || 1000;
        this.step = this.props.step || 1;
        this.value = this.props.value || 0;
        this.unit = this.props.unit || UNIT_PX 
        this.showClass = 'show'
        this.maxValueFunction = this.parent[this.props.maxvaluefunction].bind(this.parent);
        this.updateFunction = this.parent[this.props.updatefunction].bind(this.parent);
    }

    afterRender () {
        this.initializeRangeMax(this.unit);
    }
    
    template () {

        var value = position_list.includes(this.value) ? "" : this.value;

        return `
            <div class='unit-range'>
                <div class='base-value'>
                    <input ref="$range" type="range" class='range' min="${this.min}" max="${this.max}" step="${this.step}" value="${value}" />
                    <input ref="$number" type="number" class='number' min="${this.min}" max="${this.max}" step="${this.step}" value="${value}"  />
                    <button ref="$unit" type="button" class='unit'>${this.unit}</button>
                </div>
                <div class="multi-value" ref="$multiValue">
                    <div ref="$px" class="${UNIT_PX}" unit='${UNIT_PX}'></div>
                    <div ref="$percent" class="${UNIT_PERCENT}" unit='${UNIT_PERCENT}'></div>
                    <div ref="$em" class="${UNIT_EM}" unit='${UNIT_EM}'></div>
                </div>
            </div>
        `
    } 

    [CLICK('$multiValue div')] (e) {
        var unit = e.$delegateTarget.attr('unit');
        var value = e.$delegateTarget.attr('value');

        this.selectUnit(unit, value);
    }

    refresh (value = '') {

        if (isPxUnit(value) || isPercentUnit(value) || isEmUnit(value)) {
            this.selectUnit(value.unit, value.value);
            return; 
        }

        //TODO: remove legacy code 
        value = (value || '') + '' 
        var unit = UNIT_PX
        if (value.includes(UNIT_PERCENT)) {
            unit = UNIT_PERCENT
        } else if (value.includes(UNIT_EM)) {
            unit = UNIT_EM
        }

        value = position_list.includes(value) ? "" : parseParamNumber(value);

        this.selectUnit(unit, value);
        //TODO: remove legacy code 

    }
    
    initializeRangeMax (unit) {
        
        if (isPercent (unit)) {
            var max = isPercent(this.props.unit) ? this.props.max : 300;
            this.refs.$range.attr('max', max);
            this.refs.$range.attr('step', 0.01);
            this.refs.$number.attr('max', max);
            this.refs.$number.attr('step', 0.01);
        } else if (isPX(unit)) {
            var max = isPX(this.props.unit) ? this.props.max : 1000;

            this.refs.$range.attr('max', max);
            this.refs.$range.attr('step', 1);
            this.refs.$number.attr('max', max);
            this.refs.$number.attr('step', 1);
        } else if (isEM(unit)) {
            var max = isEM(this.props.unit) ? this.props.max : 300;
            this.refs.$range.attr('max', max);
            this.refs.$range.attr('step', 0.01);
            this.refs.$number.attr('max', max);
            this.refs.$number.attr('step', 0.01);            
        }
    }

    selectUnit (unit, value) {
        this.unit = unit;         
        this.value = position_list.includes(value) ? "" : value; 

        this.refs.$range.val(this.value);
        this.refs.$number.val(this.value);
        this.refs.$unit.text(unitString(this.unit));

        this.initializeRangeMax(this.unit);
    }
    [CLICK('$unit')] (e) {
        this.$el.toggleClass(this.showClass);
        this.updateRange();
    }

    updateRange () {
        var unit = this.unit; 
        var px = isPX(unit) ? this.refs.$range.val() : undefined;
        var percent = isPercent(unit) ? this.refs.$range.val() : undefined;
        var em = isEM(unit) ? this.refs.$range.val() : undefined;
        var maxValue = this.maxValueFunction();

        if (px) { 
            this.refs.$px.text(px + ' px').attr('value', px);
            this.refs.$percent.text(px2percent(px, maxValue) + ' %').attr('value', px2percent(px, maxValue)) 
            this.refs.$em.text(px2em(px, maxValue) + ' em').attr('value', px2em(px, maxValue)) 
        } else if (percent) { 
            this.refs.$percent.text(percent + ' %').attr('value', percent)
            this.refs.$px.text(percent2px(percent, maxValue) + ' px').attr('value', percent2px(percent, maxValue))
            this.refs.$em.text(percent2em(percent, maxValue) + ' em').attr('value', percent2em(percent, maxValue))
        } else if (em) { 
            this.refs.$em.text(em + ' em').attr('value', em); 
            this.refs.$percent.text(em2percent(em, maxValue) + ' %').attr('value', em2percent(em, maxValue))
            this.refs.$px.text(em2px(em, maxValue) + ' px').attr('value', em2px(em, maxValue))            
        }
    }

    [INPUT('$range')] (e) {
        var value = +this.refs.$range.val();
        this.refs.$number.val(value)
        this.updateRange();    
        this.updateFunction(unitObject(value, this.unit));    
    }

    [INPUT('$number')] (e) {
        var value = +this.refs.$number.val();
        this.refs.$range.val(value)
        this.updateRange();        
        this.updateFunction(unitObject (value, this.unit));
    }    
}