import { IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_REPEATING_LINEAR } from "../../types/ItemTypes";
import { clone, isNotUndefined } from "../../../util/functions/func";

const DEFINED_ANGLES = {
    'to top': 0,
    'to top right': 45,    
    'to right': 90,
    'to bottom right': 135,    
    'to bottom': 180,
    'to bottom left': 225,    
    'to left': 270,
    'to top left' : 315

}

export default class rotate {

    make (item, opt = {}) {   // return always array 

        var results = [];

        if (item.type == IMAGE_ITEM_TYPE_LINEAR || item.type == IMAGE_ITEM_TYPE_REPEATING_LINEAR) {
            results.push(...this.makeClone(item, opt))
        }

        return results;
    }

    makeClone (image, opt) {
        var results = [];
        opt = opt || { clone: 1, blend: 'normal'}

        var count = opt.clone || 1; 
        var blend = opt.blend || 'normal';
        
        if (count < 2) return results;

        var degree = 360 / count;

        return [...Array(count-1)].map( (_, index) => {
            var newItem = clone(image);
            newItem.angle = this.caculateAngle(newItem, (index + 1) * degree)
            newItem.backgroundBlendMode = blend;

            return newItem
        })
    }

    caculateAngle (image, plusAngle = 0) {
        var angle = isNotUndefined(DEFINED_ANGLES[image.angle]) ? DEFINED_ANGLES[image.angle] : image.angle;
        
        angle = angle || 0

        return (angle + plusAngle) % 360; 
    }
}