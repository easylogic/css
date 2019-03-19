import { Item } from "./Item";
import { Length } from "./unit/Length";

export class RectItem extends Item {

    getDefaultObject(obj = {}) {
        return super.getDefaultObject({
            x: Length.px(0),
            y: Length.px(0),
            width: Length.px(0),
            height: Length.px(0),
        })
    }

    convert (json) {
        json = super.convert(json);

        json.width = Length.parse(json.width)
        json.height = Length.parse(json.height)
        json.x = Length.parse(json.x)
        json.y = Length.parse(json.y)        

        return json
    } 
}