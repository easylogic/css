import BaseProperty from "./BaseProperty";

export default class LayerProperty extends BaseProperty {

    getTitle () { return 'Property'; }
    getBody () {
        return `<Name /><size /><Rotate /><opacity /><LayerBlend />`
    }
}