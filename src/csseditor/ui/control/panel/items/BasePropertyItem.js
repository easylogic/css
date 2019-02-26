import UIElement from "../../../../../util/UIElement";
import Dom from "../../../../../util/Dom";
import { CLICK } from "../../../../../util/Event";

export default class BasePropertyItem extends UIElement {

    onToggleShow() {}
    
    [CLICK('$title')] (e) {
        var $dom  = new Dom (e.target);

        if ($dom.hasClass('title')) {
            this.$el.toggleClass('show');
            this.onToggleShow();
        }

    } 

    isPropertyShow () {
        return this.$el.hasClass('show');
    }

}