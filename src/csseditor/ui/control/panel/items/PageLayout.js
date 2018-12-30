import UIElement from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_EDITOR } from "../../../../types/event";
import { CLICK } from "../../../../../util/Event";

export default class PageLayout extends UIElement {
    template () {
        return `
            <div class='property-item layout'>
                <div class='items no-padding'>
                    <div>
                        <label>Layout</label>
                        <div class='layout-buttons' ref="$buttons">
                            <button type="button" class='beginner' ref="$beginner">B</button>
                            <button type="button" class='expertor' ref="$expertor">E</button>
                        </div>
                    </div>   
                                 
                </div>
            </div>
        `
    }

    refresh () {
        this.refs.$buttons.removeClass('beginner-mode').removeClass('expertor-mode')
        this.refs.$buttons.addClass(this.read('storage/get', 'layout') + '-mode')
    }

    [EVENT_CHANGE_EDITOR] () {
        this.refresh()
    }

    '@changeStorage' () {
        this.refresh();
    }

    [CLICK('$beginner')] (e) {
        this.emit('updateLayout', 'beginner')
        this.dispatch('storage/set', 'layout', 'beginner')        
        this.refresh();        

        this.emit('changeEditor')        
    }

    [CLICK('$expertor')] (e) {
        this.emit('updateLayout', 'expertor')
        this.dispatch('storage/set', 'layout', 'expertor')
        this.refresh();
        this.emit('changeEditor')        
    }

}