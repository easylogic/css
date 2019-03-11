import BaseProperty from "./BaseProperty";
import { html } from "../../../../../util/functions/func";

export default class BackgroundProperty extends BaseProperty {

    getTitle () { return 'Background Image'; }
    getBody () {
        return html`
            <BackgroundBlend />        
            <div class='sub-feature'>
                <BackgroundSize />
            </div>
        `
    }
}