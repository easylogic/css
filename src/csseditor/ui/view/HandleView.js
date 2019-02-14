import Dom from '../../../util/Dom';
import GradientView from './GradientView';
import { ITEM_FOCUS } from '../../types/ItemTypes';
import { CLICK, POINTERSTART, POINTERMOVE, POINTEREND, SELF, CHECKER } from '../../../util/Event';
import { SELECTION_ONE, SELECTION_CURRENT, SELECTION_IS_LAYER, SELECTION_IS_PAGE, SELECTION_AREA } from '../../types/SelectionTypes';

export default class HandleView extends GradientView {


    checkPage (e) {
        return this.refs.$colorview.is(e.target);
    }

    [CLICK('$page .layer') + SELF] (e) {
        var id = e.$delegateTarget.attr('item-layer-id')
        if (id) {

            var item = this.get(id);

            if (item.lock) return; 

            this.dispatch(SELECTION_ONE, id);
            this.run(ITEM_FOCUS, id);
        }
    }


    refreshPosition (obj) {
        this.read(SELECTION_CURRENT).forEach(item => {
            this.dispatch('matrix/move', {id: item.id, ...obj})
            this.refreshLayer();
        })    
    }

    isDownCheck () {
        return this.isDown
    }

    isNotDownCheck () {
        return !this.isDown
    }

    isPageMode (e) {
        if (this.read(SELECTION_IS_PAGE)) {
            return true; 
        }

        var $target = new Dom(e.target)

        if ($target.is(this.refs.$colorview)) {
            return true;
        }

        if ($target.is(this.refs.$canvas)) {
            return true;
        }
    }

    hasDragArea () {
        return this.dragArea
    }

    hasNotDragArea () {
        return !this.dragArea
    }

    [POINTERSTART('$canvas') + CHECKER('hasNotDragArea') + CHECKER('isPageMode') + CHECKER('isNotDownCheck')] (e) {
        this.isDown = true; 
        this.xy = e.xy;
        this.targetXY = e.xy;        
        var x = this.xy.x;
        var y = this.xy.y;
        this.dragArea = true;
        this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: 0px;height:0px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`)
        this.refs.$dragArea.show();
        // console.log('b');        
    }     
    
    [POINTERMOVE('document') + CHECKER('hasDragArea') + CHECKER('isDownCheck')] (e) {
        // if (!this.xy) return;         
        // this.refs.$page.addClass('moving');
        this.targetXY = e.xy;
        var toolSize = this.config('tool.size');

        var width = Math.abs(this.targetXY.x - this.xy.x)
        var height = Math.abs(this.targetXY.y - this.xy.y)

        var offset = toolSize['board.offset'];

        var x = Math.min(this.targetXY.x, this.xy.x) + toolSize['board.scrollLeft'] - offset.left;
        var y = Math.min(this.targetXY.y, this.xy.y) + toolSize['board.scrollTop'] - offset.top;
        this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: ${width}px;height:${height}px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`);

        // console.log('c');
    }    

    [POINTEREND('document') + CHECKER('hasDragArea') + CHECKER('isDownCheck')] (e) {
        this.isDown = false; 
        var toolSize = this.config('tool.size');
        var width = Math.abs(this.targetXY.x - this.xy.x)
        var height = Math.abs(this.targetXY.y - this.xy.y)

        var po = toolSize['page.offset'];

        var x = Math.min(this.targetXY.x, this.xy.x) - po.left;
        var y = Math.min(this.targetXY.y, this.xy.y) - po.top;        

        var area = {x, y, width, height}

        if (width != 0 && height != 0) {    
            // noop 
        } else {
            var $target = new Dom(e.target)

            if ($target.hasClass('layer')) {
                area = {x, y, width:1, height:1}
            } else {
                area = {x, y, width:0, height:0}
            }
        }

        this.dispatch(SELECTION_AREA, area)

        this.updateSelection();         
        
        if (this.read(SELECTION_IS_LAYER)) {
            var items = this.read(SELECTION_CURRENT);
            this.run(ITEM_FOCUS, items[0]);                 
        }


        this.targetXY = null;
        this.xy = null;

        // console.log('a');

        this.refs.$dragArea.hide();
        setTimeout(() => {
            this.dragArea = false;
        }, 100)

    }    
}