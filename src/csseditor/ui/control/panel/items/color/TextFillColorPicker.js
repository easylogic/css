
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    TEXT_FILL_COLOR
} from '../../../../../types/event';
import { ITEM_GET } from '../../../../../types/ItemTypes';

export default class TextFillColorPicker extends UIElement {
 
    afterRender () {
        var defaultColor = 'rgba(0, 0, 0, 0)'

        this.colorPicker = ColorPicker.create({
            type: 'xd-tab',
            tabTitle: 'Text',            
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
        }
    }

    [EVENT(TEXT_FILL_COLOR)] (id, eventType) {
        this.changeColorId = id;
        this.itemType = this.read(ITEM_GET, id).itemType;
        this.eventType = eventType;

        this.refresh();
    }

    [EVENT (
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        if (this.changeColorId) {
            var item = this.read(ITEM_GET, this.changeColorId);
            this.colorPicker.initColorWithoutChangeEvent(item.color);
        }

    }

}