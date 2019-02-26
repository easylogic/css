import BaseModule from "../../util/BaseModule";


import { ACTION } from "../../util/Store";
import { PATTERN_SET } from "../types/PatternTypes";
import patterns from "./patterns/index";
import { ITEM_SET } from "../types/ItemTypes";

export default class PatternManager extends BaseModule {


    [ACTION(PATTERN_SET)] ($store, item, patternName, patternOption) {
        var pattern = item.pattern || {};

        pattern[patternName] = patternOption || {} 

        $store.run(ITEM_SET, {id: item.id, pattern})
    }
}