import UIElement from '../../../colorpicker/UIElement';
import ImageListView from './ImageListView';
import { CLICK } from '../../../util/Event';

export default class LayerToolbar extends UIElement {

    template () {  
        return `
            <div class='layer-toolbar'>            
                <div style="display:inline-block;vertical-align:middle;">       
                    <ImageListView></ImageListView>               
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

    [CLICK('$togglePagePanel')] () {
        this.emit('togglePagePanel');
    }

    [CLICK('$toggleLayerPanel')] () {
        this.emit('toggleLayerPanel');
    }    
}