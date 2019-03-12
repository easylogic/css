import { Layer } from "../Layer";

export class Circle extends Layer {

    getDefaultTitle() {
        return 'Circle'
    }

    getDefaultObject() {
        return super.getDefaultObject({ type: 'circle' })
    }  
}