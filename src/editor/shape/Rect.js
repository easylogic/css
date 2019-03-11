import { Layer } from "../Layer";

export class Rect extends Layer {

    getDefaultObject() {
        return super.getDefaultObject({ 
            type: 'rect' 
        })
    }
}  