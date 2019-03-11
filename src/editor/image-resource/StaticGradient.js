import { Gradient } from "./Gradient";

export class StaticGradient extends Gradient {
    getDefaultObject() {
        return super.getDefaultObject({  
            type: 'static-gradient', 
            static: true, 
            color: 'rgba(0, 0, 0, 0)'
        })
    }

    toString () {
        return `linear-gradient(to right, ${this.json.color}, ${this.json.color})`
    }

    isStatic () { return true; }
}
