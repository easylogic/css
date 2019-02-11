import items  from './items/index'
import BaseTab from "../../BaseTab";
import { SELECT_TAB_IMAGE } from '../../../types/event';
import property from './property/index';


export default class ImageTabView extends BaseTab {

    template () {
        return `
            <div class="tab horizontal">
                <div class="tab-header no-border" ref="$header">
                    <div class="tab-item selected" data-id="gradient">Gradient</div>
                    <div class="tab-item small-font" data-id="background">Background</div>
                    <div class="tab-item" data-id="pattern">Pattern</div>
                    <div class="tab-item" data-id="css">CSS</div>
                </div>
                <div class="tab-body" ref="$body">
                    <div class="tab-content flex selected" data-id="gradient">
                        <div class='fixed'><ColorPickerPanel /></div>
                        <div class='scroll'><ImageSortingProperty /><ColorStepProperty /></div>    
                    </div>
                    <div class="tab-content flex" data-id="background">
                        <BackgroundProperty></BackgroundProperty>
                    </div>
                    <div class="tab-content flex" data-id="pattern">
                        <div class='fixed'><BackgroundProperty /></div>
                        <div class='scroll'><RotatePatternProperty /></div>    
                    </div>                    
                    <div class="tab-content" data-id="css"><BackgroundCodeProperty /></div>
                </div>
            </div> 
        `
    }

    onTabShow () {
        this.config('tool.tabs.image.selectedId', this.selectedTabId);        
        this.emit(SELECT_TAB_IMAGE, this.selectedTabId)
    }

    components () {
        return {       
            ...property,     
            ...items
        }
    }
}