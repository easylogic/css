import Dom from '../../../util/Dom';
import CanvasView from './CanvasView';
import { CLICK, POINTERSTART, SELF, IF, MOVE, END } from '../../../util/Event';
import { editor } from '../../../editor/editor';

export default class HandleView extends CanvasView {


    // checkPage (e) {
    //     return this.refs.$colorview.is(e.target);
    // }

    // [CLICK('$page .layer') + SELF] (e) {
    //     var id = e.$delegateTarget.attr('item-id')
    //     if (id) {

    //         var item = editor.get(id);

    //         if (item.lock) return; 

    //         item.select()
    //     }
    // }

    // isPageMode (e) {
    //     if (editor.selection.artboards.length) {
    //         return true; 
    //     }

    //     var $target = new Dom(e.target)

    //     if ($target.is(this.refs.$colorview)) {
    //         return true;
    //     }

    //     if ($target.is(this.refs.$canvas)) {
    //         return true;
    //     }
    // }

    // // [POINTERSTART('$canvas') + IF('isPageMode') + MOVE('moveArea') + END('endArea')] (e) {
    // //     this.xy = e.xy;
    // //     this.targetXY = e.xy;        
    // //     var {x, y} = this.xy;
    // //     this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: 0px;height:0px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`)
    // //     this.refs.$dragArea.show();
    // // }     
    
    // moveArea () {
    //     this.targetXY = editor.config.get('pos');
    //     var toolSize = editor.config.get('tool.size');

    //     var width = Math.abs(this.targetXY.x - this.xy.x)
    //     var height = Math.abs(this.targetXY.y - this.xy.y)

    //     var offset = toolSize['board.offset'];

    //     var x = Math.min(this.targetXY.x, this.xy.x) + toolSize['board.scrollLeft'] - offset.left;
    //     var y = Math.min(this.targetXY.y, this.xy.y) + toolSize['board.scrollTop'] - offset.top;
    //     this.refs.$dragArea.cssText(`position:absolute;left: ${x}px;top: ${y}px;width: ${width}px;height:${height}px;background-color: rgba(222,222,222,0.5);border:1px solid #ececec;`);
    // }    

    // endArea () {
    //     var toolSize = editor.config.get('tool.size');
    //     var width = Math.abs(this.targetXY.x - this.xy.x)
    //     var height = Math.abs(this.targetXY.y - this.xy.y)

    //     var po = toolSize['page.offset'];

    //     var x = Math.min(this.targetXY.x, this.xy.x) - po.left;
    //     var y = Math.min(this.targetXY.y, this.xy.y) - po.top;        

    //     var area = {x, y, width, height}

    //     if (width != 0 && height != 0) {    
    //         // noop 
    //     } else {
    //         var $target = new Dom(editor.config.get('bodyEvent').target)

    //         if ($target.hasClass('layer')) {
    //             area = {x, y, width:1, height:1}
    //         } else {
    //             area = {x, y, width:0, height:0}
    //         }
    //     }

    //     editor.selection.area(area);  
        
    //     var layer = editor.selection.layer
    //     if (layer) {
    //         editor.selection.focus(layer);
    //     }

    //     this.targetXY = null;
    //     this.xy = null;

    //     this.refs.$dragArea.hide();
    // }    
}