import BaseCSSEditor from '../BaseCSSEditor';
import FeatureControl from '../ui/control/FeatureControl';

import LayerToolbar from '../ui/view/LayerToolbar';
import SubFeatureControl from '../ui/control/SubFeatureControl';
import ExportWindow from '../ui/window/ExportWindow';
import Timeline from '../ui/control/Timeline';
import DropView from '../ui/control/DropView';
import VerticalColorStep from '../ui/control/VerticalColorStep';
import Animation from '../../util/animation/Animation';
import ClipPathImageList from '../ui/control/panel/ClipPathImageList';
import { CHANGE_EDITOR, CHANGE_PAGE } from '../types/event';
import HandleView from '../ui/view/HandleView';
import ToolMenu from '../ui/view/ToolMenu';
import SelectLayerView from '../ui/view/SelectLayerView';
import { EVENT } from '../../colorpicker/UIElement';
import Alignment from '../ui/control/Alignment';
import { ITEM_ADD_PAGE } from '../types/ItemCreateTypes';
import { ITEM_LOAD } from '../types/ItemTypes';
import { STORAGE_LOAD } from '../types/StorageTypes';
import HotKey from '../ui/control/HotKey';

export default class CSSEditor extends BaseCSSEditor {

    afterRender() { 
        setTimeout(() => {
            this.emit(CHANGE_EDITOR);
        }, 100)
    }

    template () {
        return `
            <div class="layout-main show-timeline" ref="$layoutMain">
                <div class="layout-header">
                    <div class="page-tab-menu">
                        <ToolMenu></ToolMenu>
                    </div>
                </div>
                <div class="layout-top">
                
                </div>
                <div class="layout-left">      
                    <SelectLayerView></SelectLayerView>
                </div>
                <div class="layout-body">
                    <LayerToolbar></LayerToolbar>                
                    <VerticalColorStep></VerticalColorStep>
                    <HandleView></HandleView>                      
                </div>                
                <div class="layout-right">
                    <Alignment></Alignment>
                    <FeatureControl></FeatureControl>
                    <ClipPathImageList></ClipPathImageList>
                </div>
                <div class="layout-footer">
                    <Timeline></Timeline>
                </div>
                <ExportWindow></ExportWindow>
                <DropView></DropView>
                <HotKey></HotKey>
            </div>
        `
    }

    components() {      
        return { 
            HotKey,
            Alignment,
            SelectLayerView,
            ToolMenu,
            LayerToolbar,
            ClipPathImageList,
            VerticalColorStep, 
            DropView,
            ExportWindow,
            HandleView,
            FeatureControl, 
            SubFeatureControl, 
            Timeline
        }
    } 

    loadStart (isAdd) {
        this.dispatch(STORAGE_LOAD, (isLoaded) => {
            if (!isLoaded && isAdd) { 
                this.dispatch(ITEM_ADD_PAGE, true)
            } else {
                this.dispatch(ITEM_LOAD);
            }
            this.emit(CHANGE_PAGE)
        });
    }

    toggleTimeline () {
        this.$el.toggleClass('show-timeline')
    } 

    [EVENT('updateLayout')] (layout) {
        // screenModes.filter(key => key != layout).forEach(key => {
        //     this.refs.$layoutMain.removeClass(`${key}-mode`)
        // })

        // this.refs.$layoutMain.addClass(`${layout}-mode`)
    }

    [EVENT('togglePagePanel')] () {
        this.$el.toggleClass('has-page-panel')
    }

    [EVENT('toggleLayerPanel')] () {
        this.$el.toggleClass('has-layer-panel')
    }
}