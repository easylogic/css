import LayerToolbar from "../ui/view/LayerToolbar";
import ExportWindow from "../ui/window/ExportWindow";
import Timeline from "../ui/control/Timeline";
import DropView from "../ui/control/DropView";
import VerticalColorStep from "../ui/control/VerticalColorStep";
import Animation from "../../util/animation/Animation";
import { CHANGE_EDITOR, CHANGE_ARTBOARD } from "../types/event";
import CanvasView from "../ui/view/CanvasView";
import ToolMenu from "../ui/view/ToolMenu";
import SelectLayerView from "../ui/view/SelectLayerView";
import Alignment from "../ui/control/Alignment";
import HotKey from "../ui/control/HotKey";
import { LOAD_START } from "../types/LoadTypes";
import UIElement, { EVENT } from "../../util/UIElement";
import { RESIZE, DEBOUNCE } from "../../util/Event";
import {
  RESIZE_WINDOW,
  TOGGLE_TIMELINE,
  CHANGE_HEIGHT_TIMELINE,
  INIT_HEIGHT_TIMELINE
} from "../types/ToolTypes";
import TimelineSplitter from "../ui/control/timeline/TimelineSplitter";
import Inspector from "../ui/control/Inspector";
import { editor } from "../../editor/editor";
import FillPicker from "../ui/control/FillPicker";
import BackgroundPropertyPopup from "../ui/control/BackgroundPropertyPopup";

export default class CSSEditor extends UIElement {
  afterRender() {
    editor.initPicker(this.children.$picker);

    setTimeout(() => {
      this.emit(RESIZE_WINDOW);
      this.emit(CHANGE_EDITOR);
    }, 100);
  }

  template() {
    return `
            <div class="layout-main -show-timeline" ref="$layoutMain">
                <div class="layout-header">
                    <div class="page-tab-menu"><ToolMenu /></div>
                </div>
                <div class="layout-middle">
                    <div class="layout-left">      
                        <SelectLayerView/>
                    </div>
                    <div class="layout-body">
                        <LayerToolbar />
                        <CanvasView />
                        <VerticalColorStep />                        
                    </div>                
                    <div class="layout-right">
                        <Alignment />
                        <Inspector />
                    </div>
                </div>
                <div class="layout-footer" ref="$footer">
                    <!-- TimelineSplitter /-->
                    <!-- Timeline /-->
                </div>
                <ExportWindow />
                <DropView />
                <HotKey />       
                <FillPicker ref="$picker" />
                <BackgroundPropertyPopup />
            </div>
  
        `;
  }

  components() {
    return {
      BackgroundPropertyPopup,
      FillPicker,
      HotKey,
      Alignment,
      Inspector,
      SelectLayerView,
      ToolMenu,
      LayerToolbar,
      VerticalColorStep,
      DropView,
      ExportWindow,
      CanvasView,
      TimelineSplitter,
      Timeline
    };
  }

  [EVENT(CHANGE_EDITOR)]() {
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

  [EVENT(LOAD_START)](isAdd) {
    console.log("최초 로딩은 어디서 할까요?");
    // this.dispatch(STORAGE_LOAD, (isLoaded) => {
    //     if (!isLoaded && isAdd) {
    //         this.dispatch(ITEM_ADD_PAGE, true)
    //     } else {
    //         this.dispatch(ITEM_LOAD);
    //     }
    //     this.emit(CHANGE_ARTBOARD)
    // });
  }

  [EVENT(TOGGLE_TIMELINE)]() {
    this.$el.toggleClass("show-timeline");
  }

  [RESIZE("window") + DEBOUNCE(100)](e) {
    this.emit(RESIZE_WINDOW);
  }

  [EVENT(INIT_HEIGHT_TIMELINE)]() {
    this.initFooterHeight = this.refs.$footer.height();
  }

  [EVENT(CHANGE_HEIGHT_TIMELINE)](size) {
    this.refs.$footer.px("height", this.initFooterHeight - size.dy);
  }
}
