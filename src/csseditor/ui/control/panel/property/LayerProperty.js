import BaseProperty from "./BaseProperty";

export default class LayerProperty extends BaseProperty {

    getTitle () { return 'Property'; }
    getBody () {
        return `
            <Name></Name>
            <size></size>            
            <Rotate></Rotate>
            <opacity></opacity>         
            <LayerBlend></LayerBlend>     
        `
    }
}