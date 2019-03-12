
import ColorPicker from '../../../../../../colorpicker/index'
import UIElement, { EVENT } from '../../../../../../util/UIElement';
import { 
    CHANGE_EDITOR,
    CHANGE_SELECTION,
    // TEXT_FILL_COLOR
} from '../../../../../types/event';

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

    templateClass () { 
        return 'colorpicker-layer'
    }

    changeColor (color) {
        if (this.changeColorId) {
            this.commit(this.eventType, {id: this.changeColorId, color})
        }
    }

    // [EVENT(TEXT_FILL_COLOR)] (id, eventType) {
    //     this.changeColorId = id;
    //     this.itemType = this.get( id).itemType;
    //     this.eventType = eventType;

    //     this.refresh();
    // }

    [EVENT (
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () { this.refresh() }   
    
    setColor (color) {
        this.colorPicker.initColorWithoutChangeEvent(color);
    }  

    refresh() {
        if (this.changeColorId) {
            var item = this.get( this.changeColorId);
            this.setColor(item.color);
        }

    }

}