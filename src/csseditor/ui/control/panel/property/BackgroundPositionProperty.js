import BaseProperty from "./BaseProperty";

export default class BackgroundPositionProperty extends BaseProperty {

    getTitle () { return 'Background Position'; }
    getBody () {
        return `
            <BackgroundPosition></BackgroundPosition>
        `
    }
}