import items  from './items/index'
import BaseTab from "../../BaseTab";
import { SELECT_TAB_IMAGE, CHANGE_SELECTION, CHANGE_EDITOR, CHANGE_IMAGE } from '../../../types/event';
import property from './property/index';
import { LOAD } from '../../../../util/Event';
import { SELECTION_CURRENT_IMAGE } from '../../../types/SelectionTypes';
import { IMAGE_TYPE_IS_IMAGE } from '../../../../util/css/make';
import { EVENT } from '../../../../util/UIElement';


export default class ImageTabView extends BaseTab {

    template () {
        return `
            <div class="tab horizontal">
                <div class="tab-header no-border" ref="$header">
                    <div class="tab-item selected" data-id="gradient" ref="$gradientTabTitle">Gradient</div>
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
                        <RotatePatternProperty />
                    </div>                    
                    <div class="tab-content" data-id="css"><BackgroundCodeProperty /></div>
                </div>
            </div> 
        `
    }

    [LOAD('$gradientTabTitle')] () {
        var item = this.read(SELECTION_CURRENT_IMAGE);
        var title = 'Gradient'

        if (item && IMAGE_TYPE_IS_IMAGE(item.type)) {
            title = 'Image'
        }
        
        return `<span>${title}</span>`
    }

    refresh () {
        this.load();
    }

    [EVENT(
        CHANGE_SELECTION,
        CHANGE_EDITOR,
        CHANGE_IMAGE
    )] () {
        this.refresh()
    }

    onTabShow () {
        this.load()
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