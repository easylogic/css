import BaseProperty from "./BaseProperty";

export default class ClipPathProperty extends BaseProperty {

    getTitle () { return 'Clip Path'; }
    getBody () {
        return `
            <ClipPath></ClipPath>   
            <ClipPathSide></ClipPathSide>
            <ClipPathPolygon></ClipPathPolygon>
            <ClipPathSVG></ClipPathSVG>
        `
    }
}