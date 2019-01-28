import { CLICK } from "../../../../../util/Event";
import UIElement from "../../../../../colorpicker/UIElement";
import items from "../items/index";
import Dom from "../../../../../util/Dom";

export default class BaseProperty extends UIElement {
    onToggleShow() {}

    template () {
        return `
        <div class='property ${this.getClassName()} show'>
            ${this.isHideHeader() ? '' : `
            <div class='property-title' ref="$title">
                ${this.getTitle()}
                <span class="tools">${this.getTools()}</span>
            </div>
            `}
            <div class='property-body'>
                ${this.getBody()}
            </div>
        </div>
        `
    }

    isHideHeader () { return false; }
    getClassName() {return ''}
    getTitle () { return '' }
    getTools () { return '' }
    getBody () { return '' }
    
    [CLICK('$title')] (e) {
        var $dom  = new Dom (e.target);

        if ($dom.hasClass('property-title')) {
            this.$el.toggleClass('show');
            this.onToggleShow();
        }

    } 

    isPropertyShow () {
        return this.$el.hasClass('show');
    }

    components () {
        return items
    }
}