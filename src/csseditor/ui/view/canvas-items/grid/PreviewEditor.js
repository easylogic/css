import UIElement, { EVENT } from "../../../../../util/UIElement";
import { LOAD } from "../../../../../util/Event";
import { EMPTY_STRING, WHITE_STRING } from "../../../../../util/css/types";
import { editor } from "../../../../../editor/editor";
import { CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_SELECTION, CHANGE_RECT, CHANGE_INSPECTOR } from "../../../../types/event";
import { repeat, debounce } from "../../../../../util/functions/func";
import { Segment } from "../../../../../editor/util/Segment";

export default class PreviewEditor extends UIElement {

    initialize () {
        super.initialize()

        this.rowCount = 0; 
        this.columnCount = 0; 
        this.offsetList = []
        this.cachedOffsetElement = null

        this.bindCalculateOffset = debounce(this.calculateOffset.bind(this), 100);
    }

    templateClass() {
        return 'preview'
    }

    initCachedOffsetElement() {
        this.cachedOffsetElement = null;
    }

    getCachedOffsetElement () {
        
        if (!this.cachedOffsetElement) {
            this.cachedOffsetElement = this.$el.$$('.preview-item')
        }

        return this.cachedOffsetElement
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

    [LOAD()]() {
        var current = this.getTarget();

        if (!current) return EMPTY_STRING;
        if (!current.display.isGrid()) return EMPTY_STRING

        var columns = current.display.columns;
        var rows = current.display.rows; 

        var total = rows.length * columns.length;
        this.$el.cssText(`
            grid-template-columns: ${columns.join(WHITE_STRING)}; 
            grid-template-rows: ${rows.join(WHITE_STRING)};
            grid-row-gap: ${current.display.rowGap};          
            grid-column-gap: ${current.display.columnGap};              
        `)        
        return repeat(total).map( (_, index) => {

            var column = index % columns.length + 1;
            var row = Math.floor(index / columns.length) + 1;

            var area = 'area';

            return `<div class='preview-item' data-area='${area}' data-column='${column}' data-row='${row}'></div>`
        })
    }

    [EVENT('setGridLayoutEditor')] (rect, current) {
        if (editor.config.get('selection.direction') == Segment.MOVE) return;         
        this.current = current;

        if (!current.display.isGrid()) {
            return;
        }

        var columnCount = +this.columnCount;
        var rowCount = +this.rowCount;

        var displayColumnCount = current.display.columns.length; 
        var displayRowCount = current.display.rows.length; 

        var isChanged = (columnCount != displayColumnCount) || (rowCount != displayRowCount);

        if (isChanged) {
            this.refresh();
            this.columnCount = displayColumnCount
            this.rowCount = displayRowCount
        }

    }    

    refresh() {
        var current = this.getTarget();

        // console.log(current);

        if (!current) {
            return;
        }
        if (!current.display.isGrid()) {
            return; 
        }
        
        // if item has a grid layout 
        this.load();

        this.initCachedOffsetElement();
        this.bindCalculateOffset();
    }

    calculateOffset () {
        // 어짜피 해야할 연산이고 이 연산은 캐쉬를 만들기 위해서 만들어지기 때문에 막지 않는다. 
        // if (Segment.isMove(editor.config.get('selection.direction'))) {
        //     // console.log('move');
        //     // return; 
        // }

        var pos = this.parent.getPosition();
        this.offsetList = this.getCachedOffsetElement().map($el => {
            var [row, column] = $el.attrs('data-row', 'data-column')
            var offset = $el.offsetRect()
            offset.left += pos.left.value;
            offset.top += pos.top.value; 
            row = +row; 
            column = +column;
            return {
                row, 
                column,
                ...offset
            }
        })

        // 헤이, preview 가 생성이 되면 각 셀의 오프셋 위치랑 몇가지 정보를 정의할꺼야. 이건 가져다 쓰면 된다. 
        editor.config.set('grid.preview.position', this.offsetList);

        // console.log(this.offsetList);
    }

    removeVirtualSelect (it) {
        it.removeClass('virtual-select');
    }

    addVirtualSelect (it) {
        it.addClass('virtual-select');
    }    

    [EVENT('selectGridGuideItem')] (startX, startY, dx, dy) {
        var currentX = startX + dx; 
        var currentY = startY + dy;

        var list = this.offsetList.filter(it => {
            var inX = it.left <= currentX &&  currentX <= (it.left + it.width)
            var inY = it.top <= currentY &&  currentY <= (it.top + it.height)

            return inX && inY;
        })

        if (list.length) {
            var {row, column} = list[0]

            if (this.selectedItem) {
                this.selectedItem.forEach(this.removeVirtualSelect)
            }

            this.selectedItem = this.$el.$$(`[data-column="${column}"][data-row="${row}"]`)
            this.selectedItem.forEach(this.addVirtualSelect);

            const minRow = row; 
            const maxRow = row; 
            const minColumn = column;
            const maxColumn = column;

            editor.config.set('grid.guide.move.area', {minRow, minColumn, maxRow, maxColumn})

            // console.log(this.selectedItem);
        }

    }

    [EVENT('resizeGridGuideItem')] (rect) {

        var list = this.offsetList.filter(it => rect.checkInOffset(it));

        if (list.length) {

            if (this.selectedItem) {
                this.selectedItem.forEach(this.removeVirtualSelect)
            }

            var minColumn = Number.MAX_SAFE_INTEGER;
            var minRow = Number.MAX_SAFE_INTEGER;
            var maxColumn = Number.MIN_SAFE_INTEGER;
            var maxRow = Number.MIN_SAFE_INTEGER
            this.selectedItem = []
            list.forEach( ({row, column}) =>  {
                const item = this.$el.$(`[data-column="${column}"][data-row="${row}"]`)
                item.addClass('virtual-select');
                this.selectedItem.push(item);

                if (row < minRow) minRow = row; 
                if (row > maxRow) maxRow = row; 
                if (column < minColumn) minColumn = column; 
                if (column > maxColumn) maxColumn = column; 
            })

            editor.config.set('grid.guide.move.area', {minRow, minColumn, maxRow, maxColumn})
        }
    }    

    [EVENT('recoverGridGuideItem')] () {
        if (this.selectedItem) {
            this.selectedItem.forEach(this.removeVirtualSelect)
            this.selectedItem = null; 
        }
    }

    [EVENT(CHANGE_RECT)] () {
        this.bindCalculateOffset();
    }


    [EVENT('changePreviewOffset')] () {
        this.bindCalculateOffset();
    }    

    [EVENT(
        CHANGE_LAYER,
        CHANGE_ARTBOARD,
        CHANGE_INSPECTOR,        
        CHANGE_SELECTION,
        'refreshPreviewEditor'
    )] () {
        this.refresh();
    }

}