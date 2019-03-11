import { Layer } from "../Layer";

export class Shape extends Layer {

    getDefaultObject() {
        return super.getDefaultObject({ type: 'shape' })
    }
}  