import BaseProperty from "./BaseProperty";

export default class LayerBorderProperty extends BaseProperty {

    getTitle () { return 'Border'; }
    getBody () {
        return `
            <LayerBorderPreview></LayerBorderPreview>
            <BorderFixed></BorderFixed>
            <BorderWidth></BorderWidth>
            <BorderColorFixed></BorderColorFixed>
        `
    }
}