import UnitRange from "./element/UnitRange";
import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_IMAGE, CHANGE_EDITOR, CHANGE_SELECTION } from "../../../../types/event";
import { UNIT_PX} from "../../../../../util/css/types";
import { CLICK } from "../../../../../util/Event";
import { editor } from "../../../../../editor/editor";

export default class BackgroundSize extends UIElement {
    components () {
        return {
            UnitRange
        }
    }
    template () {
        return `
            <div class='property-item background show'>
                <div class='items'>
                    <div>
                        <label>size</label>
                        <div class='size-list' ref="$size">
                            <button type="button" value="contain" title="contain" ></button>
                            <button type="button" value="cover" title="cover"></button>
                            <button type="button" value="auto" title="auto"></button>
                        </div>
                    </div>
                    <div>
                        <label>x</label>
                        <UnitRange 
                            ref="$x" 
                            min="-100" max="1000" step="1" value="0" unit="${UNIT_PX}"
                            maxValueFunction="getMaxX"
                            updateFunction="updateX"
                        />
                    </div>
                    <div>
                        <label>y</label>
                        <UnitRange 
                            ref="$y" 
                            min="-100" max="1000" step="1" value="0" unit="${UNIT_PX}"
                            maxValueFunction="getMaxY"
                            updateFunction="updateY"
                        />
                    </div>
                    <div>
                        <label>width</label>
                        <UnitRange 
                            ref="$width" 
                            min="0" max="1000" step="1" value="0" unit="${UNIT_PX}"
                            maxValueFunction="getMaxWidth"
                            updateFunction="updateWidth"
                        />
                    </div>
                    <div>
                        <label>height</label>
                        <UnitRange 
                            ref="$height" 
                            min="0" max="1000" step="1" value="0" unit="${UNIT_PX}"
                            maxValueFunction="getMaxHeight"
                            updateFunction="updateHeight"
                        />
                    </div>                    
                    <div>
                        <label>repeat</label>
                        <div class='flex repeat-list' ref="$repeat">
                            <button type="button" value='no-repeat' title="no-repeat">
                                <span></span>
                            </button>                        
                            <button type="button" value='repeat' title="repeat">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <button type="button" value='repeat-x' title="repeat-x">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <button type="button" value='repeat-y' title="repeat-y">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                            <button type="button" value='space' title="space">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>                                
                            </button>
                            <button type="button" value='round' title="round">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>                                                                
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    updateWidth (width) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, {width})
    }

    updateHeight (height) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, {height})
    }

    updateX (x) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, {x})
    }    

    updateY (y) {
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, {y})
    }        

    getMaxHeight () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return +layer.height
    }

    getMaxY () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return (+layer.height) * 2
    }

    getMaxWidth () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return +layer.width
    }

    getMaxX () {
        var layer = editor.selection.currentLayer;

        if (!layer) return 0;

        return (+layer.width) * 2 
    }    

    [CLICK('$size button')] (e) {
        var size = e.$delegateTarget.val();
        this.selectBackgroundSize(size);        
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, { size })
    }    

    selectBackgroundSize(value = 'auto') {
        var selectedItem = this.refs.$size.$('.selected');
        if (selectedItem) selectedItem.removeClass('selected');

        if (!['contain', 'cover', 'auto'].includes(value)) {
            value = 'auto'; 
        }

        var item = this.refs.$size.$(`[value=${value}]`);

        if (item) {
            item.addClass('selected');
        }
    }

    selectBackgroundRepeat(value) {
        var selectedItem = this.refs.$repeat.$('.selected');
        if (selectedItem) selectedItem.removeClass('selected');

        var item = this.refs.$repeat.$(`[value=${value}]`);

        if (item) {
            item.addClass('selected');
        }
    }

    [CLICK('$repeat button')] (e) {
        var repeat = e.$delegateTarget.val();
        this.selectBackgroundRepeat(repeat);        
        editor.selection.updateBackgroundImage(CHANGE_IMAGE, { repeat })
    }

    [EVENT(
        CHANGE_IMAGE,
        CHANGE_EDITOR,
        CHANGE_SELECTION
    )] () {
        this.refresh()
    }

    refresh() {

        var isShow = this.isShow()

        this.$el.toggle(isShow)

        if (isShow) {
            var image = editor.selection.currentBackgroundImage;
            if (image) {
                this.children.$width.refresh(image.width);
                this.children.$height.refresh(image.height);
                this.children.$x.refresh(image.x);
                this.children.$y.refresh(image.y);
                this.selectBackgroundSize(image.size);
                this.selectBackgroundRepeat(image.repeat);
            }
        }
    }

    isShow () {

        return true; 
    }

}