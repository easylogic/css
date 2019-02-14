
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../colorpicker/UIElement';
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    CHANGE_LAYER_BACKGROUND_COLOR
} from '../../../../../types/event';
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from '../../../../../types/SelectionTypes';

export default class LayerColorPickerLayer extends UIElement {

    afterRender () {

        this.eventType = CHANGE_LAYER_BACKGROUND_COLOR
        this.eventKey = 'backgroundColor'

        var layer = this.read(SELECTION_CURRENT_LAYER);

        var defaultColor = layer ? layer.backgroundColor : 'rgba(0, 0, 0, 0)'

        this.colorPicker = ColorPicker.create({
            type: 'xd',
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

    templateClass () { 
        return 'colorpicker-layer'
    }

    changeColor (color) {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(this.eventType, {id, [this.eventKey]: color})
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

    [EVENT('selectLayerColor')] (color, key, eventType) {
        this.eventKey = key
        this.eventType = eventType;

        this.colorPicker.initColorWithoutChangeEvent(color);
    }
}