
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    CHANGE_COLOR_STEP, 
    CHANGE_IMAGE_COLOR, 
    CHANGE_IMAGE , 
    CHANGE_EDITOR,
    CHANGE_SELECTION
} from '../../../../../types/event';
import { isNotUndefined } from '../../../../../../util/functions/func';
import { SELECTION_CURRENT, SELECTION_IS_IMAGE, SELECTION_CURRENT_IMAGE } from '../../../../../types/SelectionTypes';
import { ITEM_EACH_CHILDREN } from '../../../../../types/ItemSearchTypes';
import { IMAGE_TYPE_IS_GRADIENT, IMAGE_TYPE_IS_STATIC } from '../../../../../../util/css/make';

export default class ColorPickerLayer extends UIElement {

    afterRender () {
        var defaultColor = 'red'
        this.colorPicker = ColorPicker.create({
            type: 'ring-tab',
            tabTitle: 'Step',
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
        var item = this.read(SELECTION_CURRENT)

        if (!item.length) return; 

        item = item[0];

        if (this.read(SELECTION_IS_IMAGE)) {
            
            if (IMAGE_TYPE_IS_STATIC(item.type)) {
                this.commit(CHANGE_IMAGE_COLOR, {id: item.id, color})
            } else if (IMAGE_TYPE_IS_GRADIENT(item.type)) {

                this.read(ITEM_EACH_CHILDREN, item.id, (step) => {
                    if (step.selected) {
                        this.commit(CHANGE_COLOR_STEP, {id: step.id, color})
                    }
                })
            }
        }

    }

    [EVENT(CHANGE_COLOR_STEP)] (newValue) {
        if (isNotUndefined(newValue.color)) {
            this.colorPicker.initColorWithoutChangeEvent(this.config('color'));
        }
    }

    [EVENT('changeColor')] () {
        this.colorPicker.initColorWithoutChangeEvent(this.config('color'));
    } 

    [EVENT(
      CHANGE_IMAGE,
      CHANGE_EDITOR,
      CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        if (this.read(SELECTION_IS_IMAGE)) {
            this.read(SELECTION_CURRENT_IMAGE, (image) => {
                if (IMAGE_TYPE_IS_STATIC(image.type)) {
                    this.colorPicker.initColorWithoutChangeEvent(image.color);
                } else if (IMAGE_TYPE_IS_GRADIENT(image.type)) {
                    
                }
            })
        }
    }

}