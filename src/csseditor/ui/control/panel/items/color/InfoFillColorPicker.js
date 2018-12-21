
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { MULTI_EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    EVENT_CHANGE_EDITOR,
    EVENT_CHANGE_SELECTION,
    EVENT_CHANGE_LAYER_BACKGROUND_COLOR,
    CHANGE_LAYER_BACKGROUND_COLOR
} from '../../../../../types/event';

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
            this.colorPicker.dispatch('/initColor', defaultColor)
        }, 100)
        
    }    

    template () { 
        return `<div class='colorpicker-layer'> </div>`
    }

    changeColor (color) {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_BACKGROUND_COLOR, {id, backgroundColor: color})
        })
    }

    
    [MULTI_EVENT (
        EVENT_CHANGE_LAYER_BACKGROUND_COLOR,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        if (this.read('/selection/is/layer')) {
            this.read('/selection/current/layer', (layer) => {
                if (layer.backgroundColor) {
                    if (layer.backgroundColor.includes('rgb')) return;
                    this.colorPicker.initColorWithoutChangeEvent(layer.backgroundColor);
                }

            })
        }
    }
}