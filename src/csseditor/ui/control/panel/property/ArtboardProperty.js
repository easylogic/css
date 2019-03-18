import BaseProperty from "./BaseProperty";

export default class ArtboardProperty extends BaseProperty {

    getTitle () { return 'Page'; }
    getBody () {
        return `
            <PageName />
            <PageSize />
            <clip />
            <Page3D />
        `
    }
}