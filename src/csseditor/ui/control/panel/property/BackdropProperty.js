import BaseProperty from "./BaseProperty";

export default class BackdropProperty extends BaseProperty {

    getTitle () { return 'Backdrop Filter'; }
    getBody () {
        return `
            <BackdropList ></BackdropList>
        `
    }
}