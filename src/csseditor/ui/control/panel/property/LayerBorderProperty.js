import BaseProperty from "./BaseProperty";

export default class LayerBorderProperty extends BaseProperty {

    getTitle () { return 'Border'; }
    getBody () {
        return `
            <BorderFixed></BorderFixed>
            <BorderWidth></BorderWidth>
            <BorderColorFixed></BorderColorFixed>
        `
    }
}