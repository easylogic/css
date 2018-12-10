import UIElement from '../../../colorpicker/UIElement';
import PageShowGrid from '../control/panel/items/PageShowGrid';
import { EVENT_CHANGE_PAGE, CHANGE_EDITOR } from '../../types/event';

export default class ToolMenu extends UIElement {

    components () {
        return { PageShowGrid }
    }

    template () { 
        return `
            <div class='tool-menu'>         
                <div class='items'>
                    <label>Show Grid <input type='checkbox' ref="$check"></label>                
                    <button type="button" ref="$exportButton">Export</button>                
                    <button type="button" ref="$saveButton">Save</button>
                    <a class="button" href="https://github.com/easylogic/css" target="_github_">Github</a>
                </div>
            </div>
        `
    }



    'click $check' () {
        this.read('/selection/current/page', (item) => {
            this.dispatch('/tool/set', 'show.grid', this.refs.$check.el.checked)
        })
    }

    'click $saveButton' (e) {
        this.run('/storage/save');
    }

    'click $viewSample' (e) {
        this.emit('togglePageSampleView');
    }    

    'click $exportButton' (e) { 
        this.emit('showExport')
    }

} 