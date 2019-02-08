import { IMAGE_ITEM_TYPE_LINEAR, IMAGE_ITEM_TYPE_REPEATING_LINEAR } from "../../types/ItemTypes";
import { clone, isNotUndefined, repeat } from "../../../util/functions/func";
import { percentUnit } from "../../../util/css/types";

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
        var randomPosition = opt.randomPosition || false; 
        var randomSize = opt.randomSize || false; 
        
        if (count < 2) return results;

        var degree = 360 / count;

        return repeat(count-1).map( (_, index) => {
            var newItem = {...image};
            newItem.angle = this.caculateAngle(newItem, (index + 1) * degree)

            if (randomPosition) {
                newItem.backgroundPositionX = this.getBackgroundPositionX(index)
                newItem.backgroundPositionY = this.getBackgroundPositionY(index)
            }

            if (randomSize) {
                newItem.backgroundSizeWidth = this.getBackgroundSizeWidth(index);
                newItem.backgroundSizeHeight = this.getBackgroundSizeHeight(index);    
            }

            newItem.backgroundBlendMode = blend;

            return newItem
        })
    }

    getBackgroundSizeWidth (index) {
        var value = Math.random() * 100; 
        return percentUnit(value);
    }


    getBackgroundSizeHeight (index) {
        var value = Math.random() * 100; 
        return percentUnit(value);
    }

    getBackgroundPositionX (index) {
        var value = Math.random() * 100; 
        return percentUnit(value);
    }

    getBackgroundPositionY (index) {
        var value = Math.random() * 100; 
        return percentUnit(value);
    }

    caculateAngle (image, plusAngle = 0) {
        var angle = isNotUndefined(DEFINED_ANGLES[image.angle]) ? DEFINED_ANGLES[image.angle] : image.angle;
        
        angle = angle || 0

        return (angle + plusAngle) % 360; 
    }
}