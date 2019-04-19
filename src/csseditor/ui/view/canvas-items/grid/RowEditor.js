import UIElement, { EVENT } from "../../../../../util/UIElement";
import { LOAD, CLICK, DROP, DRAGSTART, PREVENT, STOP, KEYDOWN, ENTER, ARROW_UP, ARROW_DOWN } from "../../../../../util/Event";
import { CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_SELECTION, CHANGE_INSPECTOR } from "../../../../types/event";
import { editor } from "../../../../../editor/editor";
import { EMPTY_STRING, WHITE_STRING } from "../../../../../util/css/types";
import { Segment } from "../../../../../editor/util/Segment";
import { Length } from "../../../../../editor/unit/Length";

export default class RowEditor extends UIElement {

    initialize () {
        super.initialize();

        this.rowCount = 0;
    }

    templateClass () {
        return 'row-editor'
    }

    getTarget () {
        var current = this.current || editor.selection.current;

        if (!current) return null;

        if (!current.hasLayout()) {
            // NOOP
        } else if (current.parent().hasLayout()) {
            current = current.parent();
        }

        return current;
    }


    [LOAD()] () {
        var current = this.getTarget();

        if (!current) return EMPTY_STRING;
        if (!current.display.isGrid()) return EMPTY_STRING

        var rows = current.display.rows;
        this.$el.attr('count', rows.length)        

        this.refreshRowSize();

        return rows.map( (row, index) => {
            return `<div class='grid-item' data-index='${index}' draggable='true'>
                <div class='row' contenteditable="true" tabIndex="-1">${row}</div>
            </div>`
        })
    }


    refreshRowSize () {
        var current = this.getTarget();

        if (!current) return EMPTY_STRING;
        if (!current.display.isGrid()) return EMPTY_STRING

        var rows = current.display.rows;
        this.$el.cssText(`
            grid-template-columns: 1fr; 
            grid-template-rows: ${rows.join(WHITE_STRING)};
            grid-row-gap: ${current.display.rowGap};
        `)
    }    

    [DRAGSTART('$el .grid-item')] (e) {
        this.sourceIndex = e.$delegateTarget.attr('data-index');
    }

    [DROP('$el .grid-item') + PREVENT + STOP] (e) {
        var targetIndex = e.$delegateTarget.attr('data-index');
        
        if (targetIndex == this.sourceIndex) {
            this.modifyRow((current) => {
                current.display.changeRow(this.sourceIndex, targetIndex);
            })
        }

    }

    modifyRow (callback , isRefresh = true ) {
        var current = this.getTarget();

        if (current) {
            callback && callback(current);

            if (isRefresh) this.refresh();

            this.emit('refreshItem', current);
            this.emit('refreshPreviewEditor', current);
        }
    }

    [CLICK('$el .grid-item')] (e) {

        // alt key 를 누르면 삭제 
        if (e.altKey) {
            var index = +e.$delegateTarget.attr('data-index');

            this.modifyRow((current) => {
                current.display.removeRow(index);
            })

        } else {
            // alt key 눌러서 삭제 할 예정이라 selected 할 필요가 없어짐 
            // e.$delegateTarget.onlyOneClass('selected');
        }

    }



    modifyRowSize (e) {
        var type = this.getKeyTarget(e.key || e.code);
        var $el = e.$delegateTarget;
        var len = Length.parse($el.text());

        if (len.isString() && len.value != 'auto') {
            len = Length.fr(1);
        }

        if (len.isString() && len.value === 'auto') {
            // NOOP 
        } else {
            if (type == 'add') {
                len.add(1);
            } else if (type == 'sub') {
                len.add(-1);
            }
        }

        if (len.value <= 0 || len.value == '') {
            len.value = 1;
        }        

        var index = $el.parent().attr('data-index')

        this.modifyRowLength(index, len);
        
        $el.text(len);
    }

    getKeyTarget (key) {
        switch(key) {
        case 'Enter': return 'enter'
        case 'ArrowDown': return 'sub'
        case 'ArrowUp': return 'add'
        }
    }

    [KEYDOWN('$el .row') + ENTER + ARROW_DOWN + ARROW_UP + PREVENT + STOP ] (e) {
        this.modifyRowSize(e);
        return false;
    }    
   
    modifyRowLength (index, len) {
        this.modifyRow((current) => {
            current.display.updateRow(index, len);
            this.refreshRowSize();
        }, false)
    }
 

    [EVENT('setGridLayoutEditor')] (rect, current) {
        if (editor.config.get('selection.direction') == Segment.MOVE) return;         
        this.current = current;

        var rowCount = this.rowCount;
        var displayRowCount = current.display.rows.length; 

        var isChanged = (rowCount != displayRowCount);

        if (isChanged) {
            this.refresh();
            this.rowCount = displayRowCount
        }

    }

    refresh() {
        var current = this.getTarget();

        if (!current) {          
            return;
        }
        if (!current.display.isGrid()) {
            return; 
        }
        
        // if item has a grid layout 
        this.load();
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_INSPECTOR,
        CHANGE_ARTBOARD,
        CHANGE_SELECTION
    )] () {
        this.refresh();
    }
}