import items  from './items/index'
import BaseTab from "../../BaseTab";
import { SELECT_TAB_LAYER } from '../../../types/event';
import { SCROLL } from '../../../../util/Event';

import property from './property/index';


export default class LayerTabView extends BaseTab {

    template () {
        return `
        <div class="tab horizontal">
            <div class="tab-header no-border" ref="$header">
                <div class="tab-item" data-id="page">Page</div>
                <div class="tab-item selected" data-id="property">Property</div>
                <div class="tab-item" data-id="border">Border</div>       
                <div class="tab-item" data-id="fill">Fill</div>       
                <div class="tab-item" data-id="text">Text</div>
                <div class="tab-item small-font" data-id="clip-path">Clip Path</div>
                <div class="tab-item small-font" data-id="transform">Transform</div>
                <div class="tab-item" data-id="transform3d">3D</div>
                <div class="tab-item" data-id="css">CSS</div>
            </div>
            <div class="tab-body" ref="$body">
                <div class="tab-content" data-id="page"><PageProperty /></div>
                <div class="tab-content selected flex" data-id="property">
                    <div class='fixed'><LayerInfoColorPickerPanel /></div>
                    <div class='scroll' ref="$layerInfoScroll"><LayerProperty /></div>
                </div>
                <div class="tab-content flex" data-id="border">
                    <div class='fixed'><LayerBorderColorPickerPanel /></div>
                    <div class='scroll' ref="$layerBorderScroll"><LayerBorderProperty /><LayerBorderRadiusProperty /></div>
                </div>                
                <div class="tab-content flex" data-id="text">
                    <div class='fixed'><LayerTextColorPickerPanel /></div>
                    <div class='scroll' ref="$layerTextScroll"><LayerFontProperty /><LayerTextProperty /><TextShadowProperty /></div>
                </div>
                <div class="tab-content flex" data-id="fill">
                    <div class='fixed'><FillColorPickerPanel /></div>
                    <div class='scroll' ref="$layerFillScroll">
                        <BoxShadowProperty /><FilterProperty /><BackdropProperty /><EmptyArea height="100px" />      
                    </div>
                </div>                
                <div class="tab-content" data-id="clip-path"><ClipPathProperty /></div>
                <div class="tab-content" data-id="transform"><Transform2DProperty /></div>
                <div class="tab-content" data-id="transform3d"><Transform3DProperty /></div>
                <div class="tab-content" data-id="css"><LayerCodeProperty/></div>
            </div>
        </div>`
    }

    [SCROLL('$layerInfoScroll')] (e) {
        this.setScrollTabTitle(this.refs.$layerInfoScroll)
    }

    [SCROLL('$layerBorderScroll')] (e) {
        this.setScrollTabTitle(this.refs.$layerBorderScroll)
    }    

    [SCROLL('$layerTextScroll')] (e) {
        this.setScrollTabTitle(this.refs.$layerTextScroll)
    }
    
    [SCROLL('$layerFillScroll')] (e) {
        this.setScrollTabTitle(this.refs.$layerFillScroll)
    }    

    
    onTabShow () {
        this.config('tool.tabs.layer.selectedId', this.selectedTabId);
        this.emit(SELECT_TAB_LAYER, this.selectedTabId)
    }

    components () {
        return {...property, ...items}
    }
}