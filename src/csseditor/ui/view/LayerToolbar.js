import UIElement from '../../../colorpicker/UIElement';
import ImageListView from './ImageListView';
import { CLICK } from '../../../util/Event';

export default class LayerToolbar extends UIElement {

    template () {  
        return `
            <div class='layer-toolbar'>            
                <div class="panel-toolbar">
                    <div class="button-group">
                        <button class="page-panel-button" ref="$togglePagePanel" title="Toggle Page">Page</button>
                        <!-- <button class="layer-panel-button" ref="$toggleLayerPanel" title="Toggle Layer">Layer</button> -->
                    </div>
                    <label>&nbsp;</label>
                    <div class="button-group">
                        <button class="dodo" ref="$undo" title="Undo">Undo</button>
                        <button class="dodo" ref="$redo" title="Redo">Redo</button>
                    </div> 
                </div>
              
                <div style="display:inline-block;vertical-align:middle;">       
                    <ImageListView></ImageListView>               
                </div>
               
                <div class="button-group group-align" ref="$groupAlign">
                    <button type="button" title="left" data-value="left"></button>
                    <button type="button" title="center" data-value="center"></button>
                    <button type="button" title="right" data-value="right"></button>
                    <button type="button" title="top" data-value="top"></button>
                    <button type="button" title="middle" data-value="middle"></button>
                    <button type="button" title="bottom" data-value="bottom"></button>
                    <button type="button" title="vertical" data-value="vertical"></button>
                    <button type="button" title="horizontal" data-value="horizontal"></button>
                </div>

                <div class="button-group group-order" ref="$groupOrdering">
                    <button type="button" title="front" data-value="front"></button>
                    <button type="button" title="back" data-value="back"></button>
                    <button type="button" title="forward" data-value="forward"></button>
                    <button type="button" title="backward" data-value="backward"></button>
                </div>                
                                
            </div>
        `
    }

    components () {
        return { ImageListView }
    }

    [CLICK('$groupAlign button')] (e) {
        this.dispatch('ordering/type', e.$delegateTarget.attr('data-value'))
    }

    [CLICK('$groupOrdering button')] (e) {
        this.dispatch('ordering/index', e.$delegateTarget.attr('data-value'))
    }    

    [CLICK('$undo')] (e) {
        this.dispatch('history/undo')
    }

    [CLICK('$redo')] (e) {
        this.dispatch('history/redo')
    }    

    [CLICK('$togglePagePanel')] () {
        this.emit('togglePagePanel');
    }

    [CLICK('$toggleLayerPanel')] () {
        this.emit('toggleLayerPanel');
    }    
}