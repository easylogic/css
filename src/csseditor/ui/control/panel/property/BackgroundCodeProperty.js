import BaseProperty from "./BaseProperty";

export default class BackgroundCodeProperty extends BaseProperty {

    getTitle () { return 'CSS Code'; }
    getBody () {
        return `
            <BackgroundCode ></BackgroundCode>
        `
    }
}