import BaseModule from "../../colorpicker/BaseModule";
import { CHANGE_LAYER_POSITION } from "../types/event";
import { pxUnit, unitValue } from "../../util/css/types";
import { ACTION } from "../../util/Store";
import { ITEM_SET } from "../types/ItemTypes";


export default class MatrixManager extends BaseModule {

    afterDispatch() {
        this.$store.emit(CHANGE_LAYER_POSITION);
    }

    [ACTION('matrix/move')] ($store, newValue) {
        var item = this.get(newValue.id)        

        Object.keys(newValue).filter(key => key != 'id').forEach(key => {
            item[key] = pxUnit(unitValue(item[key]) + newValue[key])
        })

        $store.run(ITEM_SET, item);
    }

}