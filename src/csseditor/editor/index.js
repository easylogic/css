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
import Alignment from '../ui/control/Alignment';
import { ITEM_ADD_PAGE } from '../types/ItemCreateTypes';
import { ITEM_LOAD } from '../types/ItemTypes';
import { STORAGE_LOAD } from '../types/StorageTypes';
import HotKey from '../ui/control/HotKey';
import { LOAD_START } from '../types/LoadTypes';
import UIElement, { EVENT } from '../../util/UIElement';
import { RESIZE, DEBOUNCE } from '../../util/Event';
import { RESIZE_WINDOW, TOGGLE_TIMELINE, CHANGE_HEIGHT_TIMELINE, INIT_HEIGHT_TIMELINE } from '../types/ToolTypes';
import TimelineSplitter from '../ui/control/timeline/TimelineSplitter';

export default class CSSEditor extends UIElement {

    afterRender() { 
        setTimeout(() => {
            this.emit(RESIZE_WINDOW)
            this.emit(CHANGE_EDITOR);
        }, 100)
    }

    template () {
        return `
            <div class="layout-main show-timeline" ref="$layoutMain">
                <div class="layout-header">
                    <div class="page-tab-menu"><ToolMenu /></div>
                </div>
                <div class="layout-middle">
                    <div class="layout-left">      
                        <SelectLayerView/>
                    </div>
                    <div class="layout-body">
                        <LayerToolbar />
                        <VerticalColorStep />
                        <HandleView />
                    </div>                
                    <div class="layout-right">
                        <Alignment />
                        <FeatureControl />
                        <ClipPathImageList />
                    </div>
                </div>
                <div class="layout-footer" ref="$footer">
                    <TimelineSplitter />
                    <Timeline />
                </div>
                <ExportWindow />
                <DropView />
                <HotKey />                
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
            TimelineSplitter,
            Timeline
        }
    } 

    [EVENT(CHANGE_EDITOR)] () {
        /*
        this.read(SELECTION_CURRENT_LAYER, (layer) => {
            var self = this; 
            var obj = layer.style
            var aniObject = Animation.createTimeline([{
                duration: 1000, 
                obj,
                timing: 'ease-out-sine',
                iteration: 3, 
                direction: 'alternate',
                keyframes : {
                    '0%': {
                        'x': '0px',
                        'background-color': 'rgba(255, 255, 255, 0.5)',
                    },
                    '100%': {
                        'x': '250px',
                        'background-color': 'rgba(255, 0, 255, 1)'
                    }
                } 

            }], {
                callback() {
                    self.run('item/set', layer);
                    self.emit('animationEditor')
                }
            });

            aniObject.start();
    
        })
        */

    }

    [EVENT(LOAD_START)] (isAdd) {
        this.dispatch(STORAGE_LOAD, (isLoaded) => {
            if (!isLoaded && isAdd) { 
                this.dispatch(ITEM_ADD_PAGE, true)
            } else {
                this.dispatch(ITEM_LOAD);
            }
            this.emit(CHANGE_PAGE)
        });
    }

    [EVENT(TOGGLE_TIMELINE)] () {
        this.$el.toggleClass('show-timeline')
    } 

    [EVENT('togglePagePanel')] () {
        this.$el.toggleClass('has-page-panel')
    }

    [EVENT('toggleLayerPanel')] () {
        this.$el.toggleClass('has-layer-panel')
    }

    [RESIZE('window') + DEBOUNCE(100)] (e) {
        this.emit(RESIZE_WINDOW)
    }

    [EVENT(INIT_HEIGHT_TIMELINE)] () {
        this.initFooterHeight = this.refs.$footer.height()
    }

    [EVENT(CHANGE_HEIGHT_TIMELINE)] (size) {
        this.refs.$footer.px('height', this.initFooterHeight - size.dy); 
    }
}