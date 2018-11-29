import UIElement from "../../../../../colorpicker/UIElement";
import Dom from "../../../../../util/Dom";

export default class BasePropertyItem extends UIElement {

    onToggleShow() {}
    
    'click $title' (e) {
        var $dom  = new Dom (e.target);

        if ($dom.hasClass('title')) {
            this.$el.toggleClass('show');
            this.onToggleShow();
        }

    } 

}