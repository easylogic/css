import UIElement, { EVENT } from '../../../util/UIElement';

import { 
    CHANGE_EDITOR
} from '../../types/event';

import { editor } from '../../../editor/editor';
import { Length } from '../../../editor/unit/Length';

import ItemResizer from './canvas-items/ItemResizer';
import GuideLine from './canvas-items/GuideLine';
import DragAreaView from './canvas-items/DragAreaView';
import DragArea from './canvas-items/DragArea';
import ItemManager from './canvas-items/ItemManager';
import GridLayoutEditor from './canvas-items/GridLayoutEditor';
import { RESIZE, SCROLL } from '../../../util/Event';
import { RESIZE_WINDOW } from '../../types/ToolTypes';


export default class CanvasView extends UIElement {

    components() {
        return {
            ItemManager,
            ItemResizer,
            GuideLine,
            DragAreaView,
            DragArea,
            GridLayoutEditor
        }
    }

    template () {
        return `
            <div class='page-view'>
                <div class='page-content' ref="$board">
                    <div class="page-scroll-panel" style="position:relative" ref="$panel">
                        <div class="page-canvas" ref="$canvas">
                            <DragArea />
                            <ItemManager />
                        </div>          
                        <div class="page-selection">
                            <GuideLine />
                            <ItemResizer />
                            <DragAreaView />
                            <GridLayoutEditor />
                        </div>
                    </div>
                </div>
            </div>
        `
    }    
    

    refresh () {
        this.setBackgroundColor();
    }
 
    setBackgroundColor() {

        var canvasCSS = { 
            width: Length.px( editor.config.get('canvas.width') ), 
            height: Length.px( editor.config.get('canvas.height') )
        }

        this.refs.$panel.css(canvasCSS)
    }

    // all effect 
    [EVENT( 'refreshCanvas' )] () { 
        this.refresh(); 

        this.emit('refreshItemManager')
    }

    [SCROLL('$board')] () {
        editor.config.set('canvas.container.rect', this.refs.$board.rect());
        editor.config.set('canvas.container.scrollLeft', this.refs.$board.scrollLeft());
        editor.config.set('canvas.container.scrollTop', this.refs.$board.scrollTop());        
    }

    [EVENT(RESIZE_WINDOW)] () {
        editor.config.set('canvas.container.rect', this.refs.$board.rect());
        editor.config.set('canvas.container.scrollLeft', this.refs.$board.scrollLeft());
        editor.config.set('canvas.container.scrollTop', this.refs.$board.scrollTop());
    }

}