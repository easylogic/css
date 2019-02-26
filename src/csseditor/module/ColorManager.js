import BaseModule from "../../util/BaseModule";

import ColorList from './color-list/index'
import { ACTION, GETTER } from "../../util/Store";

export default class ColorManager extends BaseModule {

    initialize( ) {
        super.initialize() 

        this.$store.selectedColorType = 'material'
    }

    [ACTION('color/get/type')] ($store) {
        return $store.selectedColorType;
    }

    [ACTION('color/change/type')] ($store, type) {
        $store.selectedColorType = type  

        $store.emit('changeColorType')
    }

    [GETTER('color/list/type')] ($store) {
        return ColorList.types; 
    }

    [GETTER('/color/list')] ($store) {
        return ColorList.list[$store.selectedColorType || 'material'];
    }
}