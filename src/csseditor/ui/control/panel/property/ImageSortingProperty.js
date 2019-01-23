import BaseProperty from "./BaseProperty";

export default class ImageSortingProperty extends BaseProperty {

    getTitle () { return 'Image sorting'; }
    getBody () {
        return `
            <ImageSorting ></ImageSorting>
        `
    }
}