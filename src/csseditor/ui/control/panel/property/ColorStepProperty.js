import BaseProperty from "./BaseProperty";

export default class ColorStepProperty extends BaseProperty {

    getTitle () { return 'Color steps'; }
    getBody () {
        return `
            <ColorStepsInfo ></ColorStepsInfo>
        `
    }
}