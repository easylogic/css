import BaseModule from "../../colorpicker/BaseModule";
import { parseParamNumber } from "../../util/gl/filter/util";
import { CHANGE_LAYER, CHANGE_LAYER_POSITION } from "../types/event";


export default class MatrixManager extends BaseModule {

    afterDispatch() {
        this.$store.emit(CHANGE_LAYER_POSITION);
    }

    '/matrix/move' ($store, newValue) {
        var item = $store.read('/item/get', newValue.id)        

        Object.keys(newValue).filter(key => key != 'id').forEach(key => {
            item[key] = (parseParamNumber(item[key]) + newValue[key])  + 'px'
        })

        $store.run('/item/set', item);
    }

}