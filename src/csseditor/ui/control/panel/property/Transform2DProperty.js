import BaseProperty from "./BaseProperty";

export default class Transform2DProperty extends BaseProperty {

    getTitle () { return 'Transform'; }
    getBody () {
        return `<transform ></transform>`
    }
}