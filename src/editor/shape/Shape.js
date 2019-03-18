import { Layer } from "../Layer";

export class Shape extends Layer {

    getDefaultTitle() {
        return 'Shape'
    } 

    getDefaultObject() {
        return super.getDefaultObject({ type: 'shape' })
    }
}  