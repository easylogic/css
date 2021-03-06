
import Color from "../../util/Color";
import { px2em, px2percent, percent2px, percent2em, em2percent, em2px } from "../../util/filter/functions";
import { CHANGE_EDITOR } from "../types/event";
import { ITEM_SET, ITEM_SORT, ITEM_REMOVE, ITEM_INIT_CHILDREN } from "../types/ItemTypes";
import { isPX, isEM, ITEM_TYPE_COLORSTEP } from "../../util/css/types";
import { isUndefined, defaultValue } from "../../util/functions/func";
import { GETTER, ACTION } from "../../util/Store";
import { SELECTION_CURRENT_IMAGE } from "../types/SelectionTypes";
import { COLORSTEP_COLOR_SOURCE, COLORSTEP_CURRENT, COLORSTEP_LIST, COLORSTEP_ADD, COLORSTEP_REMOVE, COLORSTEP_SORT, COLORSTEP_SORT_LIST, COLORSTEP_CURRENT_INDEX, COLORSTEP_CUT_OFF, COLORSTEP_CUT_ON, COLORSTEP_UNIT_VALUE, COLORSTEP_ORDERING_EQUALS, COLORSTEP_ORDERING_EQUALS_LEFT, COLORSTEP_ORDERING_EQUALS_RIGHT } from "../types/ColorStepTypes";
import { ITEM_CREATE_COLORSTEP } from "../types/ItemCreateTypes";
import { ITEM_LIST_CHILDREN, ITEM_MAP_COLORSTEP_CHILDREN } from "../types/ItemSearchTypes";
import BaseModule from "../../util/BaseModule";

const INIT_COLOR_SOURCE = ITEM_TYPE_COLORSTEP

export default class ColorStepManager extends BaseModule {

    initialize () {
        super.initialize() 

        this.$store.step = {
            width: 400
        }
    }


    afterDispatch () {
        this.$store.emit(CHANGE_EDITOR)
    }    

    [GETTER(COLORSTEP_COLOR_SOURCE)] ($store) {
        return INIT_COLOR_SOURCE
    }

    [GETTER(COLORSTEP_CURRENT)] ($store, index) {
        if (!isUndefined(index)) {
            return $store.read(COLORSTEP_LIST)[index] || $store.read(ITEM_CREATE_COLORSTEP)
        } else {
            return $store.read(COLORSTEP_LIST).filter(item => !!item.selected)[0]
        }
    }
    
    [ACTION(COLORSTEP_ADD)] ($store, item, percent) {
    
        var parentId = item.id;
        var list = $store.read(ITEM_MAP_COLORSTEP_CHILDREN, parentId)

        if (!list.length) {

            $store.read(ITEM_CREATE_COLORSTEP, {parentId, color: 'rgba(216,216,216, 0)', percent, index: 0});
            $store.read(ITEM_CREATE_COLORSTEP, {parentId, color: 'rgba(216,216,216, 1)', percent: 100, index: 100});

            $store.run(ITEM_INIT_CHILDREN, parentId);            
            return; 
        }

        var colorsteps = list
    
        if (percent < colorsteps[0].percent) {

            colorsteps[0].index = 1; 

            $store.read(ITEM_CREATE_COLORSTEP, {parentId, index: 0, color: colorsteps[0].color, percent});
            $store.run(ITEM_SET, colorsteps[0]);      
            $store.run(ITEM_INIT_CHILDREN, parentId);

            return;             
        }

        var lastIndex = colorsteps.length -1
        if (colorsteps[lastIndex].percent < percent) {
            var color = colorsteps[lastIndex].color;  
            var index = colorsteps[lastIndex].index + 1;         

            $store.read(ITEM_CREATE_COLORSTEP, {parentId, index,  color, percent});
            $store.run(ITEM_INIT_CHILDREN, parentId);            
            return;             
        }        
       
        for(var i = 0, len = colorsteps.length - 1; i < len; i++) {
            var step = colorsteps[i];
            var nextStep = colorsteps[i+1];

            if (step.percent <= percent && percent <= nextStep.percent) {
                var color = Color.mix(step.color, nextStep.color, (percent - step.percent)/(nextStep.percent - step.percent), 'rgb');

                $store.read(ITEM_CREATE_COLORSTEP, {parentId, index: step.index + 1, color, percent});
                $store.run(ITEM_INIT_CHILDREN, parentId);
                return; 
            }
        }
    }    

    [ACTION(COLORSTEP_REMOVE)] ($store, id) {
        $store.run(ITEM_REMOVE, id);
    }

    [ACTION(COLORSTEP_SORT)] ($store, id, sortedList) {
        
        sortedList.forEach( (stepId, index) => {
            var item = this.get(stepId);
            item.index = index * 100; 
            
            $store.run(ITEM_SET, item);
        })

        $store.run(ITEM_SORT, id);
    }

    [GETTER(COLORSTEP_SORT_LIST)] ($store, parentId) {
        var colorsteps = $store.read(ITEM_MAP_COLORSTEP_CHILDREN, parentId);

        colorsteps.sort( (a, b) => {
            if (a.index == b.index) return 0; 
            return a.index > b.index ? 1 : -1; 
        })

        return colorsteps;
    }


    // 이미지 리스트 얻어오기 
    [GETTER(COLORSTEP_LIST)] ($store) {
        var image = $store.read(SELECTION_CURRENT_IMAGE);

        if (image) {
            return $store.read(COLORSTEP_SORT_LIST, image.id); 
        }

        return []
    }


    [GETTER(COLORSTEP_CURRENT_INDEX)] ($store, index) {
        if (isUndefined(index)) {
            return $store.read(COLORSTEP_LIST).map((step, index) => { 
                return { step, index }
            }).filter(item => {
                return !!item.step.selected
            })[0].index
        } else {
            return index; 
        }
    }        

    [ACTION(COLORSTEP_CUT_OFF)] ($store, id) {
        var list = []
        if (isUndefined(id)) {
            list = $store.read(COLORSTEP_LIST);
        } else {
            list = [ this.get(id) ]
        }
        list.forEach(item => {
            item.cut = false; 
            $store.run(ITEM_SET, item);                
        })
    }

    [ACTION(COLORSTEP_CUT_ON)] ($store, id) {
        var list = []
        if (isUndefined(id)) {
            list = $store.read(COLORSTEP_LIST);
        } else {
            list = [ this.get(id) ]
        }
        list.forEach(item => {
            item.cut = true; 
            $store.run(ITEM_SET, item);                
        })
    }    


    getMaxValue () {
        return this.$store.step.width;
    }

    getUnitValue (step, maxValue) {

        if (isPX(step.unit)) {
            if (isUndefined(step.px)) {
                step.px = percent2px(step.percent, maxValue)
            }

            return {
                px:  step.px,
                percent: px2percent(step.px, maxValue),
                em: px2em(step.px, maxValue)
            }
        } else if (isEM (step.unit)) {
            if (isUndefined(step.em)) {
                step.em = percent2em(step.percent, maxValue)
            }            
            return {
                em: step.em,
                percent: em2percent(step.em, maxValue),
                px: em2px(step.em, maxValue)
            }
        }

        return {
            percent: step.percent,
            px: percent2px(step.percent, maxValue),
            em: percent2em(step.percent, maxValue)
        }
    }        

    [GETTER(COLORSTEP_UNIT_VALUE)] ($store, step, maxValue) {
        return this.getUnitValue(step, +defaultValue(maxValue, this.getMaxValue()));
    }

    [ACTION(COLORSTEP_ORDERING_EQUALS)] ($store, firstIndex = 0, lastIndex = Number.MAX_SAFE_INTEGER) {

        var list = $store.read(COLORSTEP_LIST).map(step => {
            return {...step, ...$store.read(COLORSTEP_UNIT_VALUE, step, this.getMaxValue())};
        });

        if (lastIndex > list.length -1 ) {
            lastIndex = list.length - 1; 
        }

        var count = (lastIndex - firstIndex); 
        var dist = (list[lastIndex].px - list[firstIndex].px)/count; 

        var firstValue = list[firstIndex].px;
        for(var i = firstIndex, start = 0; i <= lastIndex; i++, start++) {
            var step = list[i];
            step.px = firstValue + start * dist; 
            step.percent = px2percent(step.px, this.getMaxValue())
            step.em = px2em(step.px, this.getMaxValue());
            $store.run(ITEM_SET, step);
        }

    }


    [ACTION(COLORSTEP_ORDERING_EQUALS_LEFT)] ($store) {
        $store.run(COLORSTEP_ORDERING_EQUALS, 0, $store.read(COLORSTEP_CURRENT_INDEX));
    }    

    [ACTION(COLORSTEP_ORDERING_EQUALS_RIGHT)] ($store) {
        $store.run(COLORSTEP_ORDERING_EQUALS, $store.read(COLORSTEP_CURRENT_INDEX));
    }        



}