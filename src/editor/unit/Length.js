import { isNotUndefined } from "../../util/functions/func";

const stringToPercent = {
    'center': 50,
    'top' : 0,
    'left': 0,
    'right': 100,
    'bottom': 100
}

export class Position { }

Position.CENTER = 'center'
Position.TOP = 'top'
Position.RIGHT = 'right'
Position.LEFT = 'left'
Position.BOTTOM = 'bottom'



export class Length {
    constructor(value = '', unit = '') {
        this.value = value; 
        this.unit = unit; 
    }    

    [Symbol.toPrimitive] (hint) {
        if (hint == 'number') {
            return this.value; 
        }

        return this.toString();
    }

    static string (value) { return new Length(value + "", ''); }
    static px (value) { return new Length(+value, 'px'); }
    static em (value) { return new Length(+value, 'em'); }
    static percent (value) { return new Length(+value, '%');  }   
    static deg(value) { return new Length(+value, 'deg'); }    
    static create (obj) {
        if (obj instanceof Length) {
            return obj;
        } else if (obj.unit) {
            if (obj.unit == '%' || obj.unit == 'percent') {

                var value = 0;

                if (isNotUndefined(obj.percent)) {
                    value = obj.percent;
                } else if (isNotUndefined(obj.value)) {
                    value = obj.value; 
                }

                return Length.percent(value);
            } else if (obj.unit == 'px') {
                var value = 0;

                if (isNotUndefined(obj.px)) {
                    value = obj.px;
                } else if (isNotUndefined(obj.value)) {
                    value = obj.value; 
                }

                return Length.px(value);
            } else if (obj.unit == 'em') {
                var value = 0;

                if (isNotUndefined(obj.em)) {
                    value = obj.em;
                } else if (isNotUndefined(obj.value)) {
                    value = obj.value; 
                }

                return Length.em(value);
            } else if (obj.unit == 'deg') {
                var value = 0;

                if (isNotUndefined(obj.deg)) {
                    value = obj.deg;
                } else if (isNotUndefined(obj.value)) {
                    value = obj.value; 
                }

                return Length.deg(value);                
            } else if (obj.unit === '' || obj.unit === 'string') {
                var value = '';

                if (isNotUndefined(obj.str)) {
                    value = obj.str;
                } else if (isNotUndefined(obj.value)) {
                    value = obj.value; 
                }
                
                return Length.string(value);
            }
        }

        return Length.string(obj)
    }
    toString() {return this.value + this.unit; }    
    isPercent () { return this.unit == '%'  }
    isPx () { return this.unit == 'px' }
    isEm () { return this.unit == 'em' }
    isDeg () { return this.unit == 'deg' }
    isString () { return this.unit === '' }

    set (value) {
        this.value = value; 
    }

    plus (obj) {
        this.value += +obj; 
        return this; 
    }

    minus (obj) {
        return this.plus(-1 * obj);
    }

    multi (obj) {
        this.value *= +obj; 
        return this;  
    }    

    div (obj) {
        this.value /= +obj; 
        return this; 
    }

    mod (obj) {
        this.value %= +obj; 
        return this; 
    }    

    clone () {
        return new Length(this.value, this.unit);
    }

    getUnitName() {
        return this.unit === '%' ? 'percent' : this.unit; 
    }

    toJSON () {
        return { value: this.value, unit: this.unit }
    }

    rate (value) {
        return value / this.value; 
    }

    stringToPercent() {

        if (isNotUndefined(stringToPercent[this.value])) {
            return Length.percent(stringToPercent[this.value]);
        }

        return Length.percent(0); 
    }

    stringToEm(maxValue) {
        return this.stringToPercent().toEm(maxValue)
    }

    stringToPx(maxValue) {
        return this.stringToPercent().toPx(maxValue)
    }

    toPercent (maxValue, fontSize = 16) {
        if (this.isPercent()) {
            return this;
        } else if (this.isPx()) {
            return Length.percent((this.value * 100) / maxValue)
        } else if (this.isEm()) {
            return Length.percent((this.value * fontSize)*100 / maxValue)
        } else if (this.isString()) {
            return this.stringToPercent(maxValue);
        }
    }

    toEm (maxValue, fontSize = 16) {
        if (this.isPercent()) {
            return Length.em( (this.value/100) * maxValue / fontSize)
        } else if (this.isPx()) {
            return Length.em(this.value / fontSize);
        } else if (this.isEm()) {
            return this; 
        } else if (this.isString()) {
            return this.stringToEm(maxValue);
        }
    }    

    toPx (maxValue, fontSize = 16) {
        if (this.isPercent()) {
            return Length.px((this.value / 100) * maxValue);
        } else if (this.isPx()) {
            return this;
        } else if (this.isEm()) {
            return Length.px((this.value / 100) * maxValue / 16);
        } else if (this.isString()) {
            return this.stringToPx(maxValue);            
        }
    }
}
