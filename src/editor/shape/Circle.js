import { Layer } from "../Layer";
import { Length } from "../unit/Length";

export class Circle extends Layer {

    getDefaultTitle() {
        return 'Circle'
    }

    getDefaultObject() {
        return super.getDefaultObject({ type: 'circle' })
    }  

    /**
     * circle has only border-radius: 100%; 
     */
    toBorderRadiusCSS () {
        var css = {
            'border-radius': Length.percent(100)
        }
        return css;
    }
}