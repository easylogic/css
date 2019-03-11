import { ConicGradient } from "./ConicGradient";
 
export class RepeatingConicGradient extends ConicGradient {
    getDefaultObject() {
        return super.getDefaultObject({  type: 'repeating-conic-gradient' })
    }
}