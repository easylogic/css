import BaseModule from "../../colorpicker/BaseModule";
import shapes from "./shapes/index";
import { GETTER } from "../../util/Store";
import { SHAPE_GET, SHAPE_TO_CSS_TEXT, SHAPE_LIST } from "../types/ShapeTypes";
import { LAYER_DEFAULT_OBJECT } from "../types/ItemTypes";
import { LAYER_TO_STRING } from "../types/LayerTypes";

const shapeKeys = Object.keys(shapes);

export default class ShapeManager extends BaseModule {

    [GETTER(SHAPE_LIST)] ($store) {
        return shapeKeys;
    }

    [GETTER(SHAPE_GET)] ($store, key) {
        return shapes[key];
    }

    [GETTER(SHAPE_TO_CSS_TEXT)] ($store, key) {
        var item = {...LAYER_DEFAULT_OBJECT,  ...shapes[key]}

        var cssText = $store.read(LAYER_TO_STRING, item, true)

        return cssText;
    }
}