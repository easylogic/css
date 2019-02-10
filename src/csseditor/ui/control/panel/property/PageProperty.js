import BaseProperty from "./BaseProperty";

export default class PageProperty extends BaseProperty {

    getTitle () { return 'Page property'; }
    getBody () {
        return `<PageName /><PageSize /><clip /><Page3D />`
    }
}