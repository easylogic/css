import UIElement, { EVENT } from "../../../../util/UIElement";
import { html } from "../../../../util/functions/func";
import { CLICK, POINTERSTART, STOP, PREVENT, MOVE, END, CHANGE, CHANGEINPUT } from "../../../../util/Event";
import { editor } from "../../../../editor/editor";
import { CHANGE_SELECTION, CHANGE_LAYER, CHANGE_ARTBOARD, CHANGE_RECT, CHANGE_INSPECTOR } from "../../../types/event";
import { Length } from "../../../../editor/unit/Length";
import { itemPositionCalc } from "../../../../editor/ItemPositionCalc";
import { Segment } from "../../../../editor/util/Segment";
import RowEditor from "./grid/RowEditor";
import ColumnEditor from "./grid/ColumnEditor";
import PreviewEditor from "./grid/PreviewEditor";
import ColumnGapEditor from "./grid/ColumnGapEditor";
import RowGapEditor from "./grid/RowGapEditor";


export default class GridLayoutEditor extends UIElement {

    components() {
        return {
            RowEditor,
            ColumnEditor,
            PreviewEditor,
            ColumnGapEditor,
            RowGapEditor            
        }
    }

    template () {
        return html`
            <div class='grid-layout-editor'>
                <ColumnEditor />
                <RowEditor />
                <PreviewEditor />
                <ColumnGapEditor />
                <RowGapEditor />
                <button type="button" class='move-layout' ref="$moveLayout">+</button>
                <button type="button" class='add-column' ref="$addColumn">+</button>
                <button type="button" class='add-row' ref="$addRow">+</button>      
            </div>
        `
    }     

    getTarget () {
        var current = this.current || editor.selection.current;

        if (editor.selection.count() > 1) {
            return null;
        }

        if (!current) return null;

        if (!current.hasLayout()) {
            // NOOP
        } else if (current.parent().hasLayout()) {
            current = current.parent();
        }

        return current;
    }


    [EVENT('setGridLayoutEditor')] (rect, current) {

        this.current = current;

        if (!current.display.isGrid()) {
            this[EVENT('initGridLayoutEditor')] ();
            return;
        }

        this.$el.css(rect);
    }

    getPosition() {
        return {
            left: Length.parse(this.$el.css('left')),
            top: Length.parse(this.$el.css('top'))
        }
    }

    [EVENT('initGridLayoutEditor')] () {
        this.initGridLayoutEditor();
    }

    initGridLayoutEditor () {
        this.$el.css({ left: '-10000px'})
    }    

    refresh() {
        var current = this.getTarget();

        if (!current) {
            this.initGridLayoutEditor();            
            return;
        }
        if (!current.display.isGrid()) {
            this.initGridLayoutEditor();
            return; 
        }

        this.$el.css(current.screenRect);
        
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_ARTBOARD,
        CHANGE_INSPECTOR,
        CHANGE_SELECTION
    )] () {
        this.refresh();
    }

    modifyGrid (callback) {
        var current = this.getTarget()

        if (current) {
            callback && callback (current);

            if (current.itemType == 'artboard') {
                this.emit(CHANGE_ARTBOARD, current);
            } else {
                this.emit(CHANGE_LAYER, current);
            }
        }


    }

    [CLICK('$addColumn')] () {
        this.modifyGrid((current) => {
            current.display.columns.push(Length.fr(1));
        })
       
    }

    [CLICK('$addRow')] () {
        this.modifyGrid((current) => {
            current.display.rows.push(Length.fr(1));
        })
       
    }

    [POINTERSTART('$moveLayout') + STOP + PREVENT + MOVE('moveResize') + END('moveResizeEnd')] () {
        editor.config.set('selection.direction', Segment.MOVE);
        itemPositionCalc.initialize();   
        this.emit('setGuideLine');
        this.emit('matchPosition');
        this.emit(CHANGE_RECT);     
    }    

    moveResize (dx, dy) {
        itemPositionCalc.calculate(dx, dy);
        this.emit('setGuideLine');
        this.emit('matchPosition');
        this.emit(CHANGE_RECT);    
    }

    moveResizeEnd (dx, dy) {
        this.emit('moveResizeEnd', dx, dy)
    }


}