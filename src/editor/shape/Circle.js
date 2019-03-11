import { Layer } from "../Layer";

export class Circle extends Layer {

    getDefaultObject() {
        return super.getDefaultObject({ type: 'circle' })
    }  
}