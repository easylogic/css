import BaseProperty from "./BaseProperty";

export default class Transform2DProperty extends BaseProperty {

    getTitle () { return 'Transform 2D'; }
    getBody () {
        return `<transform ></transform>`
    }
}