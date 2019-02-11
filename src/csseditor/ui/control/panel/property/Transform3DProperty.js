import BaseProperty from "./BaseProperty";

export default class Transform3DProperty extends BaseProperty {

    getTitle () { return 'Transform 3D'; }
    getBody () {
        return `<transform3d />`
    }
}