
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    CHANGE_LAYER_BACKGROUND_COLOR
} from '../../../../../types/event';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER, SELECTION_IS_LAYER } from '../../../../../module/SelectionTypes';

export default class InfoFillColorPicker extends UIElement {
 
    afterRender () {
        var defaultColor = 'rgba(0, 0, 0, 0)'

        this.colorPicker = ColorPicker.create({
            type: 'xd-tab',
            tabTitle: 'Background',  
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
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_BACKGROUND_COLOR, {id, backgroundColor: color})
        })
    }

    
    [EVENT (
        CHANGE_LAYER_BACKGROUND_COLOR,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        if (this.read(SELECTION_IS_LAYER)) {
            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                if (layer.backgroundColor) {
                    if (layer.backgroundColor.includes('rgb')) return;
                    this.colorPicker.initColorWithoutChangeEvent(layer.backgroundColor);
                }

            })
        }
    }
}