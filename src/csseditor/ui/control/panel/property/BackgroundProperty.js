import BaseProperty from "./BaseProperty";

export default class BackgroundProperty extends BaseProperty {

    getTitle () { return 'Background Image'; }
    getBody () {
        return `
            <BackgroundInfo></BackgroundInfo>
            <BackgroundBlend></BackgroundBlend>
            <div class='sub-feature'>
                <BackgroundSize></BackgroundSize>
            </div>
        `
    }
}