import { ITEM_TYPE_PAGE } from '../../module/SelectionManager';
import Dom from '../../../util/Dom';
import GradientView from './GradientView';
import { CHANGE_SELECTION } from '../../types/event';


export default class HandleView extends GradientView {


    checkPage (e) {
        return e.target == this.refs.$colorview.el;
    }

    'click $page .layer | self' (e) {
        var id = e.$delegateTarget.attr('item-layer-id')
        if (id) {
            this.dispatch('/selection/one', id);
            this.emit(CHANGE_SELECTION)

            // console.log(e);
        }
    }

    selectPageMode () {
        
        if (!this.dragArea) {
            this.dispatch('/selection/change', ITEM_TYPE_PAGE) ;
        }

    }

    isDownCheck () {
        return this.isDown
    }

    isNotDownCheck () {
        return !this.isDown
    }

    isPageMode (e) {
        if (this.read('/selection/is/page')) {
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

    'pointerstart $canvas | hasNotDragArea | isPageMode | isNotDownCheck' (e) {
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
    
    'pointermove document | hasDragArea | isDownCheck' (e) {
        // if (!this.xy) return;         
        // this.refs.$page.addClass('moving');
        this.targetXY = e.xy;

        var width = Math.abs(this.targetXY.x - this.xy.x)
        var height = Math.abs(this.targetXY.y - this.xy.y)

        var offset = this.refs.$board.offset();

        var x = Math.min(this.targetXY.x, this.xy.x) + this.refs.$board.scrollLeft() - offset.left;
        var y = Math.min(this.targetXY.y, this.xy.y) + this.refs.$board.scrollTop() - offset.top;
        this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: ${width}px;height:${height}px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`);

        // console.log('c');
    }    

    'pointerend document | hasDragArea | isDownCheck' (e) {
        this.isDown = false; 
        
        var width = Math.abs(this.targetXY.x - this.xy.x)
        var height = Math.abs(this.targetXY.y - this.xy.y)

        var po = this.refs.$page.offset();

        var x = Math.min(this.targetXY.x, this.xy.x) - po.left;
        var y = Math.min(this.targetXY.y, this.xy.y) - po.top;


        this.dispatch('/selection/area', {x, y, width, height})
        this.updateSelection();

        this.targetXY = null;
        this.xy = null;

        // console.log('a');

        this.refs.$dragArea.hide();
        setTimeout(() => {
            this.dragArea = false;
        }, 100)
    }    
}