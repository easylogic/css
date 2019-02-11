import BaseProperty from "./BaseProperty";

export default class LayerTextProperty extends BaseProperty {

    getTitle () { return 'Text'; }
    getBody () {
        return `<Text />`
    }
}