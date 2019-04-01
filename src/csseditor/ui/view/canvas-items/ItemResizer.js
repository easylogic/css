import UIElement, { EVENT } from "../../../../util/UIElement";
import { Segment } from "../../../../editor/util/Segment";
import { SELF, POINTERSTART, MOVE, END, PREVENT, STOP } from "../../../../util/Event";
import { CHANGE_RECT, CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_SELECTION, COPY_ITEMS, CHANGE_INSPECTOR } from "../../../types/event";
import { html } from "../../../../util/functions/func";
import { editor } from "../../../../editor/editor";
import { itemPositionCalc } from "../../../../editor/ItemPositionCalc";
import { gridItemPositionCalc } from "../../../../editor/GridItemPositionCalc";

export default class ItemResizer extends UIElement {

    template () {
        return html`
            <div class='item-resizer select-view'>
                ${Segment.LIST.map(seg => {
                    return `<button type="button" class='segment' data-value="${seg}"></button>`
                })}
            </div>
        `
    }     

    [POINTERSTART('$el button') + SELF + PREVENT + STOP + MOVE('moveResize') + END('moveResizeEnd')] (e) {
        editor.config.set('selection.direction', e.$delegateTarget.attr('data-value'));

        var current = editor.selection.current;

        if (current.isLayoutItem() && current.parent().display.isGrid()) {
            // 드래그 해서 옮길 수 있는 객체의 변화 
            this.layoutItem = current; 
            this.layoutType = 'grid';                
            this.layoutCurrentRect = current.screenRect;    
            this.layoutContainerRect = current.parent().screenRect;

            const canvasContainerRect = editor.config.get('canvas.container.rect');
            const canvasScrollLeft = editor.config.get('canvas.container.scrollLeft');
            const canvasScrollTop = editor.config.get('canvas.container.scrollTop');

            this.screenX = e.xy.x - canvasContainerRect.x + canvasScrollLeft;
            this.screenY = e.xy.y - canvasContainerRect.y + canvasScrollTop;

            this.emit('changePreviewOffset');
            const direction = editor.config.get('selection.direction');
            if ( Segment.isMove(direction) ) {
                
                // 움직이기 
                // 마우스 포인트 기준으로 grid layout 내의 시작 좌표 설정 
                // 마우스 포인트 기준에 따라서 preview 표시 
                // preview 는 내가 어디 있는지 표시하고 그 데이타를 남김 
                // 마우스를 올렸을 때는 grid-column/row 설정 
                // item manager 업데이트 

            } else {
                gridItemPositionCalc.initialize();
            }

        } else {
            // 드래그 해서 옮길 수 있는 객체의 변화  
            // alt key 누르 상태로 시작하면 copy , 복사본만 움직임 
            if (Segment.isMove(editor.config.get('selection.direction')) && e.altKey) {
                editor.selection.select(...editor.copy())
                this.emit(COPY_ITEMS);
            }

            itemPositionCalc.initialize();   
            this.emit('setGuideLine');
            this.emit('matchPosition');
            this.emit(CHANGE_RECT);     
        }

    }         

    moveResize (dx, dy) {

        if (this.layoutType == 'grid') {

            // console.log(this.screenX, this.screenY, dx, dy)
            if ( Segment.isMove(editor.config.get('selection.direction')) ) {
                this.emit('selectGridGuideItem', this.screenX, this.screenY, dx, dy)
            } else {
                gridItemPositionCalc.calculate(dx, dy);
                this.emit('resizeGridGuideItem', gridItemPositionCalc.newRect)
            }

        } else {
            itemPositionCalc.calculate(dx, dy);
            this.emit('setGuideLine');
            this.emit('matchPosition');
            // when item is moving, is it set position? 
            this.emit(CHANGE_RECT);     
        }
    }

    moveResizeEnd (dx, dy) {
        if (this.layoutType == 'grid') {
            this.layoutType = null;

            if (editor.config.get('grid.guide.move.area')) {

                const {minRow, minColumn, maxRow, maxColumn} = editor.config.get('grid.guide.move.area');

                // grid row, column 은 layer 속성이라 layer 에 바로 설정함 
                this.layoutItem.setGridRowColumn(minRow, minColumn, maxRow, maxColumn); 
            }

            this.emit('recoverGridGuideItem')
            this.emit(CHANGE_RECT, 'grid');
            editor.config.remove('grid.guide.move.item');
            editor.config.remove('grid.guide.move.area');               
        } else {

            this.emit('moveResizeEnd', dx, dy)
            this.emit(CHANGE_RECT);        
        }

    }

    getRowColumnIndex(current) {
        var list = editor.config.get('grid.preview.position');        
        var rect = current.screenRect;

        var screenX2 = current.screenX2.value;
        var screenY2 = current.screenY2.value;
        var startRow = -1, startColumn = -1, endRow = -1, endColumn = -1; 

        var startList = list.filter(it => {
            return (
                rect.left.value == it.left && 
                rect.top.value == it.top
            );
        })

        if (startList.length) {
            const { row, column } = startList[0]
            startRow = row;
            startColumn = column;
        }

        var endList = list.filter(it => {
            return (
                (it.left + it.width) == screenX2 && 
                (it.top + it.height) == screenY2
            )
        })

        if (endList.length) {
            const { row, column } = endList[0]
            endRow = row; 
            endColumn = column; 
        }

        if (startRow > -1) {
            return { startRow, startColumn, endRow, endColumn }
        }

        return null; 
    }

    setItemResizer () {
        var current = editor.selection.current;
        // console.log(current);
        if (current) {
            if (current.isLayoutItem()) {
                this.$el.attr('data-rect', 'true')
                this.$el.attr('data-layout', current.parent().display.type)                
            } else {
                this.$el.attr('data-rect', 'false')
                this.$el.attr('data-layout', current.display.type)                
            }
            this.$el.attr('data-mode', current.itemType)            

        } 
        
        if (current && current.isLayoutItem()) {
            this.$el.css(current.screenRect)
            
            var parent = current.parent();
            if (parent && parent.screen) {
                this.emit('setGridLayoutEditor', parent.screenRect, parent);
            }

            return; 
        }

        if (editor.selection.artboard || editor.selection.layer) {

            var current = editor.selection.current; 
            var currentRect = editor.selection.currentRect;
            if (currentRect && !current.isLayoutItem()) {
                this.$el.css(currentRect.screenRect)

                if (current.hasLayout()) {
                    this.emit('setGridLayoutEditor', currentRect.screenRect, current);
                } 

            } else {
                this.$el.css({ left: '-10000px'})    
                this.emit('initGridLayoutEditor')
            }
        } else {
            this.$el.css({ left: '-10000px'})
            this.emit('initGridLayoutEditor')            
        }
        
    }

    [EVENT(
        CHANGE_ARTBOARD,
        CHANGE_LAYER,
        CHANGE_RECT,
        CHANGE_SELECTION,
        CHANGE_INSPECTOR,
        'setItemResizer'
    )] () { 
        this.setItemResizer();
    }

}