import BaseProperty from "./BaseProperty";

export default class BackgroundColorProperty extends BaseProperty {
    isHideHeader() {
        return true;
    }
    getBody() {
        return `
            <div class='property-item background-color'>
            <label class='property-item-label'>
                Background Color
            </label>
            <div class='property-item-input-field grid-1-3' >
                <div class='preview' ref='$preview'>
                    <div class='mini-view' ref='$miniView'></div>
                </div>
                <div class='color-input'>
                    <input type='text' ref='$colorCode' />
                </div>
            </div>
            </div>
        `;
    }
}