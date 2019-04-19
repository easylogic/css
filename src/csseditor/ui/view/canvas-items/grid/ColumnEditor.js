import UIElement, { EVENT } from "../../../../../util/UIElement";
import { LOAD, CLICK, DROP, DRAGSTART, PREVENT, STOP, ENTER, ARROW_UP, ARROW_DOWN, KEYDOWN } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";
import { EMPTY_STRING, WHITE_STRING } from "../../../../../util/css/types";
import { CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_SELECTION, CHANGE_INSPECTOR } from "../../../../types/event";
import { Segment } from "../../../../../editor/util/Segment";
import { Length } from "../../../../../editor/unit/Length";

export default class ColumnEditor extends UIElement {

    initialize() {
        super.initialize()

        this.columnCount = 0;  
    }

    templateClass() {
        return 'column-editor'
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

        var columns = current.display.columns;
        this.$el.attr('count', columns.length)
        this.$el.cssText(`
            grid-template-rows: 1fr; 
            grid-template-columns: ${columns.join(WHITE_STRING)};
            grid-column-gap: ${current.display.columnGap};
        `)

        return columns.map( (column, index) => {
            return `<div class='grid-item' data-index='${index}' draggable='true'>
                <div class='column' contenteditable="true" tabIndex="-1">${column}</div>
            </div>`
        })
    }

    refreshColumnSize () {
        var current = this.getTarget();

        if (!current) return EMPTY_STRING;
        if (!current.display.isGrid()) return EMPTY_STRING

        var columns = current.display.columns;
        this.$el.cssText(`
            grid-template-rows: 1fr; 
            grid-template-columns: ${columns.join(WHITE_STRING)};
            grid-column-gap: ${current.display.columnGap};
        `)
    }

    [DRAGSTART('$el .grid-item')] (e) {
        this.sourceIndex = e.$delegateTarget.attr('data-index');
    }

    [DROP('$el .grid-item') + PREVENT + STOP] (e) {
        var targetIndex = e.$delegateTarget.attr('data-index');
        
        if (targetIndex == this.sourceIndex) {
            this.modifyColumn((current) => {
                current.display.changeColumn(this.sourceIndex, targetIndex);
            })
        }

    }

    modifyColumn (callback, isRefresh = true) {
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

            this.modifyColumn((current) => {
                current.display.removeColumn(index);
            })

        } else {
            // alt key 눌러서 삭제 할 예정이라 selected 할 필요가 없어짐 
            // e.$delegateTarget.onlyOneClass('selected');
        }

    }


    modifyColumnSize (e) {
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
                len.sub(1);
            }
        }

        if (len.value <= 0 || len.value == '') {
            len.value = 1;
        }        


        var index = $el.parent().attr('data-index')
        
        $el.text(len);
        
        this.modifyColumnLength(index, len);

    }


    getKeyTarget (key) {
        switch(key) {
        case 'Enter': return 'enter'
        case 'ArrowDown': return 'sub'
        case 'ArrowUp': return 'add'
        }
    }    

    [KEYDOWN('$el .column') + ENTER + ARROW_DOWN + ARROW_UP + PREVENT + STOP] (e) {
        this.modifyColumnSize(e);
        return false;
    }

    modifyColumnLength (index, len) {
        this.modifyColumn((current) => {
            current.display.updateColumn(index, len);
            this.refreshColumnSize();
        }, false)
    }


    [EVENT('setGridLayoutEditor')] (rect, current) {
        if (editor.config.get('selection.direction') == Segment.MOVE) return;         
        this.current = current;

        var columnCount = this.columnCount;

        var displayColumnCount = current.display.columns.length; 

        var isChanged = (columnCount != displayColumnCount);

        if (isChanged) {
            this.refresh();
            this.columnCount = displayColumnCount;
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