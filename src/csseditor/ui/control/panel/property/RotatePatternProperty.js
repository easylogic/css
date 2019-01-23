import BaseProperty from "./BaseProperty";

export default class RotatePatternProperty extends BaseProperty {

    getTitle () { return 'Rotate pattern'; }
    getBody () {
        return `
            <RotatePattern ></RotatePattern>
        `
    }
}