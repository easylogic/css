
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../util/UIElement';
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    CHANGE_LAYER
} from '../../../../../types/event';
import { editor } from '../../../../../../editor/editor';

export default class InfoFillColorPicker extends UIElement {
 
    initialize() {
        super.initialize();

        this.eventType = CHANGE_LAYER
        this.eventKey = 'backgroundColor'
    }

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
        editor.selection.updateLayer(this.eventType, {[this.eventKey]: color})
    }
    setColor (color) {
        this.colorPicker.initColorWithoutChangeEvent(color);
    }  
    
    [EVENT (
        CHANGE_LAYER,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }    

    refresh() {
        var layer = editor.selection.layer;
        if (layer) {
            var color = layer.backgroundColor || 'rgba(0, 0, 0, 1)'
            this.setColor(color);
        }
    }
} 