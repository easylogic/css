import BaseProperty from "./BaseProperty";

export default class LayerCodeProperty extends BaseProperty {

    getTitle () { return 'CSS Code'; }
    getBody () {
        return `<LayerCode />`
    }
}