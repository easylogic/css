
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { MULTI_EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_EDITOR,
    EVENT_CHANGE_SELECTION,
    CHANGE_BOXSHADOW,
    CHANGE_TEXTSHADOW,
    CHANGE_LAYER_FILTER
} from '../../../../../types/event';
import { ITEM_TYPE_BOXSHADOW, ITEM_TYPE_FILTER, ITEM_TYPE_TEXTSHADOW } from '../../../../../module/ItemTypes';

export default class FillColorPicker extends UIElement {

    afterRender () {
        var defaultColor = 'rgba(0, 0, 0, 0)'

        this.colorPicker = ColorPicker.create({
            type: 'xd-tab',
            position: 'inline',
            container: this.$el.el,
            color: defaultColor,
            onChange: (c) => {
                this.changeColor(c);
            }
        })    

        setTimeout(() => {
            this.colorPicker.dispatch('/initColor', defaultColor)
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

    '@fillColorId' (id) {
        this.changeColorId = id;
        this.itemType = this.read('/item/get', id).itemType;
        this.eventType = CHANGE_BOXSHADOW;
        
        if (this.itemType == ITEM_TYPE_TEXTSHADOW) {
            this.eventType = CHANGE_TEXTSHADOW;
        } else if (this.itemType == ITEM_TYPE_FILTER) {
            this.eventType = CHANGE_LAYER_FILTER;
        }


        this.refresh();
    }

    [MULTI_EVENT (
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        if (this.changeColorId) {
            var item = this.read('/item/get', this.changeColorId);
            this.colorPicker.initColorWithoutChangeEvent(item.color);
        }

    }

}