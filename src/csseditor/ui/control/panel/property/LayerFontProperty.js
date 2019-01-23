import BaseProperty from "./BaseProperty";

export default class LayerFontProperty extends BaseProperty {

    getTitle () { return 'Font'; }
    getBody () {
        return `
            <Font></Font>
        `
    }
}