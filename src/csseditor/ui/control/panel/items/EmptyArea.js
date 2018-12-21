import BasePropertyItem from "./BasePropertyItem";

export default class EmptyArea extends BasePropertyItem {
    template () {
        return `
            <div class='property-item empty-area show' style="height: ${this.props.height};"></div>
        `
    }

}