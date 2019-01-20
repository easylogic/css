import BaseModule from "../../colorpicker/BaseModule";


import { GETTER, ACTION } from "../../util/Store";
import { PATTERN_MAKE, PATTERN_GET, PATTERN_SET } from "../types/PatternTypes";
import patterns from "./patterns/index";
import { ITEM_SET } from "../types/ItemTypes";

export default class PatternManager extends BaseModule {


    [GETTER(PATTERN_MAKE)] ($store, item) {
        var patternOption = item.pattern  || {}
        var patternList = Object.keys(patternOption);

        if (!patternList.length) {
            return null;
        }

        var results = [];
        patternList.filter(name => patterns[name]).forEach(patternName => {

            if (patternOption[patternName].enable) {
                results.push(...patterns[patternName].make(item, patternOption[patternName]) )
            }

        })

        results.push(item);

       return results;
    }

    [GETTER(PATTERN_GET)] ($store, item, patternName) {
        var pattern = item.pattern || {};

        return pattern[patternName] || {}
    }

    [ACTION(PATTERN_SET)] ($store, item, patternName, patternOption) {
        var pattern = item.pattern || {};

        pattern[patternName] = patternOption || {} 

        $store.run(ITEM_SET, {id: item.id, pattern})
    }
}