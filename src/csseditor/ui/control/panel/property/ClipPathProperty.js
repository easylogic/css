import BaseProperty from "./BaseProperty";

export default class ClipPathProperty extends BaseProperty {

    getTitle () { return 'Clip Path'; }
    getBody () {
        return `
            <ClipPath />
            <ClipPathSide />
            <ClipPathPolygon />
            <!-- ClipPathSVG /-->
        `
    }
}