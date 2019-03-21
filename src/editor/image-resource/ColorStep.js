import { Item } from "../items/Item";
import { Length } from "../unit/Length";
export class ColorStep extends Item {

    getDefaultObject() {
        return super.getDefaultObject({ 
            cut: false,
            percent: 0,
            unit: '%',
            px: 0, 
            em: 0,
            color: 'rgba(0, 0, 0, 0)'
        })
    }   
    
    on () {
        this.json.cut = true; 
    }

    off () {
        this.json.cut = false; 
    }

    toggle () {
        this.json.cut = !this.json.cut; 
    }

    changeUnit (unit, maxValue) {
        this.json.unit = unit; 
        this.reset(this.getUnitValue(maxValue));
    }

    getUnit () {
        return this.json.unit == '%' ? 'percent' : this.json.unit;
    }

    getUnitValue (maxValue) {
        if (this.isPX) {    
            return {
                px:  this.json.px,
                percent: +Length.px(this.json.px).toPercent(maxValue),
                em: +Length.px(this.json.px).toEm(maxValue)
            }
        } else if (this.isEm) {
            return {
                em: this.json.em,
                percent: +Length.em(this.json.em).toPercent(maxValue),
                px: +Length.em(this.json.em).toPx(maxValue)
            }
        }
    
        return {
            percent: this.json.percent,
            px: +Length.percent(this.json.percent).toPx(maxValue),
            em: +Length.percent(this.json.percent).toEm(maxValue)
        }
    }
    

    add (num) {
        var unit = this.getUnit()
        this.json[unit] += +num;

        return this; 
    }

    sub (num) {
        var unit = this.getUnit()
        this.json[unit] -= +num;

        return this; 
    }

    mul (num) {
        var unit = this.getUnit()
        this.json[unit] *= +num;

        return this; 
    }
    
    div (num) {
        var unit = this.getUnit()
        this.json[unit] /= +num;

        return this; 
    }
    
    mod (num) {
        var unit = this.getUnit()
        this.json[unit] %= +num;

        return this; 
    }    

    get isPx () { return this.json.unit == 'px' }
    get isPercent () { return this.json.unit == '%' || this.json.unit === 'percent' }
    get isEm () { return this.json.unit == 'em' }


    /**
     * convert Length instance 
     * @return {Length}
     */
    toLength (maxValue) {
        // TODO: apply maxValue
        return Length.parse(this.json); 
    }

    /**
     * get color string 
     * 
     * return {string}
     */
    toString () {
        return `${this.json.color} ${this.toLength()}`
    }

    reset (json) {
        super.reset(json);
        if (this.parent()) {
           this.parent().sortColorStep(); 
        }
    }
} 