
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION
} from '../../../../../types/event';

export default class FillColorPicker extends UIElement {

    afterRender () {
        var defaultColor = 'rgba(0, 0, 0, 0)'

        this.colorPicker = ColorPicker.create({
            type: 'xd-tab',
            tabTitle: 'Fill',            
            position: 'inline',
            container: this.$el.el,
            color: defaultColor,
            onChange: (c) => {
                this.changeColor(c);
            }
        })    

        setTimeout(() => {
            this.colorPicker.dispatch('initColor', defaultColor)
        }, 100)
        
    }    

    template () { 
        return `<div class='colorpicker-layer'> </div>`
    }

    changeColor (color) {
        if (this.changeColorId) {
            this.commit(this.eventType, {id: this.changeColorId, color})
        } else {
            this.callback(color);
        }
    }

    [EVENT('fillColorId')] (id, eventType) {
        this.changeColorId = id;
        this.itemType = this.read('item/get', id).itemType;
        this.eventType = eventType;

        this.color = null;
        this.callback = null; 

        this.refresh();
    }

    [EVENT('selectFillColor')] (color, callback) {
        this.changeColorId = null;
        this.itemType = null;
        this.eventType = null;
        this.color = color;
        this.callback = callback; 

        this.refresh();
    }    

    [EVENT (
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        if (this.changeColorId) {
            var item = this.read('item/get', this.changeColorId);
            this.colorPicker.initColorWithoutChangeEvent(item.color);
        } else if (this.callback) {
            this.colorPicker.initColorWithoutChangeEvent(this.color);
        }

    }

}