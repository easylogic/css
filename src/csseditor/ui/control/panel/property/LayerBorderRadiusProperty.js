import BaseProperty from "./BaseProperty";

export default class LayerBorderRadiusProperty extends BaseProperty {

    getTitle () { return 'Border Radius'; }
    getBody () {
        return `
            <RadiusFixed></RadiusFixed>
            <radius></radius>
        `
    }
}