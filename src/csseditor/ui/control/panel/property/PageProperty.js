import BaseProperty from "./BaseProperty";

export default class PageProperty extends BaseProperty {

    getTitle () { return 'Page property'; }
    getBody () {
        return `
            <PageName></PageName>
            <PageSize></PageSize>
            <clip></clip>           
            <Page3D></Page3D>       
        `
    }
}