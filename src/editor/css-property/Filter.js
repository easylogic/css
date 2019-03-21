import { UNIT_DEG, UNIT_PERCENT, UNIT_COLOR, UNIT_PX } from "../../util/css/types";
import { Length } from "../unit/Length";
import { Property } from "../items/Property";

export class Filter extends Property {

    getDefaultObject(obj = {}) {
        return super.getDefaultObject( { itemType: 'filter', ...obj })
    } 

    toString () {
        return `${this.json.type}(${this.json.value || ''})`
    }
}


export class BlurFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'blur',
            value: BlurFilter.spec.defaultValue
        })
    }
}

BlurFilter.spec = { title: 'Blur', inputType: 'range', min: 0, max: 100, step: 1, unit: UNIT_PX, defaultValue: Length.px(0) }

export class GrayscaleFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'grayscale', 
            value: GrayscaleFilter.spec.defaultValue 
        })
    }
}

GrayscaleFilter.spec = { title: 'Grayscale', inputType: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(0) }

export class HueRotateFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'hue-rotate',
            value: HueRotateFilter.spec.defaultValue
        })
    }
}

HueRotateFilter.spec = { title: 'Hue', inputType: 'range', min: 0, max: 360, step: 1, unit: UNIT_DEG, defaultValue: Length.deg(0) }

export class InvertFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'invert',
            value: InvertFilter.spec.defaultValue
        })
    }
}

InvertFilter.spec = { title: 'Invert', inputType: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(0) }

export class BrightnessFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'brightness',
            value: BrightnessFilter.spec.defaultValue
        })
    }
}

BrightnessFilter.spec = { title: 'Brightness', inputType: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(100) }

export class ContrastFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'contrast',
            value: ContrastFilter.spec.defaultValue
        })
    }
}

ContrastFilter.spec = { title: 'Contrast', inputType: 'range', min: 0, max: 200, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(100) }


export class OpacityFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({
            type: 'opacity',
            value: OpacityFilter.spec.defaultValue
        })
    }
}

OpacityFilter.spec = { title: 'Opacity', inputType: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(100) }

export class SaturateFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'saturate', 
            value: SaturateFilter.spec.defaultValue 
        })
    }
}

SaturateFilter.spec = { title: 'Saturate', inputType: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(100) }

export class SepiaFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'sepia',
            value: SepiaFilter.spec.defaultValue
        })
    }
}

SepiaFilter.spec = { title: 'Sepia', inputType: 'range', min: 0, max: 100, step: 1, unit: UNIT_PERCENT, defaultValue: Length.percent(0) }

export class DropshadowFilter extends Filter {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'drop-shadow', 
            multi: true,
            offsetX: DropshadowFilter.spec.offsetX.defaultValue,
            offsetY: DropshadowFilter.spec.offsetY.defaultValue,
            blurRadius: DropshadowFilter.spec.blurRadius.defaultValue,
            color: DropshadowFilter.spec.color.defaultValue
        })
    }

    toString () {
        var json = this.json; 
        return `drop-shadow(${json.offsetX} ${json.offsetY} ${json.blurRadius} ${json.color})`
    }
}

DropshadowFilter.spec = {
    offsetX: { title: 'Offset X', inputType: 'range', min: -100, max: 100, step: 1, defaultValue: Length.px(0), unit: UNIT_PX },
    offsetY: { title: 'Offset Y', inputType: 'range', min: -100, max: 100, step: 1, defaultValue: Length.px(0), unit: UNIT_PX },
    blurRadius: { title: 'Blur Radius', inputType: 'range', min: 0, max: 100, step: 1, defaultValue: Length.px(0), unit: UNIT_PX },
    color: { title: 'Color', inputType: 'color', defaultValue: 'rgba(0, 0, 0, 0)', unit: UNIT_COLOR }
}
 
export const FilterClassList = [
    BlurFilter,
    GrayscaleFilter,
    HueRotateFilter,
    InvertFilter,
    BrightnessFilter,
    ContrastFilter,
    OpacityFilter,
    SaturateFilter,
    SepiaFilter,
    DropshadowFilter
]

export const FilterClassName = {
    'blur': BlurFilter,
    'grayscale': GrayscaleFilter,
    'hue-rotate': HueRotateFilter,
    'invert': InvertFilter,
    'brightness': BrightnessFilter,
    'contrast': ContrastFilter,
    'opacity': OpacityFilter,
    'saturate': SaturateFilter,
    'sepia': SepiaFilter,
    'drop-shadow': DropshadowFilter
}

Filter.parse = (obj) => {
    var FilterClass = FilerClassName[obj.type];

    return new FilterClass(obj);
}

