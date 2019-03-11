import UIElement, { EVENT } from "../../../../../util/UIElement";
import { CHANGE_EDITOR, CHANGE_PAGE, CHANGE_SELECTION, CHANGE_PAGE_TRANSFORM } from "../../../../types/event";
import { CLICK, INPUT, CHANGEINPUT } from "../../../../../util/Event";
import { defaultValue } from "../../../../../util/functions/func";
import { editor } from "../../../../../editor/editor";
import { Length } from "../../../../../editor/unit/Length";

export default class Page3D extends UIElement {
    template () {
        return `
            <div class='property-item size show'>
                <div class='items'>
                    <div>
                        <label> 3D </label>
                        <div>
                            <label><input type='checkbox' ref="$preserve"> preserve-3d </label>
                        </div>
                    </div>    
                    <div>
                        <label> Perspective </label>
                        <div>
                            <input type="range" ref="$perspectiveRange" min="-2000" max="2000" /> 
                            <input type="number" ref="$perspective" /> <span class='unit'>%</span>
                        </div>                        
                    </div>                                 
                    <div>
                        <label>Origin  X </label>
                        <div>
                            <input type="range" ref="$xRange" min="-100" max="100" />                         
                            <input type="number" ref="$x" /> <span class='unit'>%</span>
                        </div>
                    </div>                                            
                    <div>
                        <label>Origin Y </label>
                        <div>
                            <input type="range" ref="$yRange" min="-100" max="100" />                                                 
                            <input type="number" ref="$y" /> <span class='unit'>%</span>
                        </div>
                    </div>                                                                
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_PAGE_TRANSFORM
    )] () {
        this.refresh()
    }

    refresh() {
        var item = editor.selection.artboard;
        if (item) {    
            var perspective = defaultValue(item.perspective, Length.px (0));
            var perspectiveOriginPositionX = defaultValue(item.perspectiveOriginPositionX, Length.percent(0));
            var perspectiveOriginPositionY = defaultValue(item.perspectiveOriginPositionY, Length.percent(0));

            this.refs.$perspective.val(+perspective);
            this.refs.$perspectiveRange.val(+perspective);            
            this.refs.$x.val(+perspectiveOriginPositionX);
            this.refs.$y.val(+perspectiveOriginPositionY);
            this.refs.$xRange.val(+perspectiveOriginPositionX);
            this.refs.$yRange.val(+perspectiveOriginPositionY);            
            this.refs.$preserve.checked(!!item.preserve);
        }
        
    }

    [CLICK('$preserve')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {      
            artboard.preserve = this.refs.$preserve;
            editor.send(CHANGE_PAGE, artboard);
        }
    }

    [INPUT('$perspective')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {        
            var value = this.refs.$perspective.val();
            artboard.perspective = Length.px(+value);
            this.refs.$perspectiveRange.val(value)
            editor.send(CHANGE_PAGE_TRANSFORM, artboard);
        }
    }

    [CHANGEINPUT('$perspectiveRange')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {        
            var value = this.refs.$perspectiveRange.val();
            artboard.perspective = Length.px(+value);
            this.refs.$perspective.val(value)
            editor.send(CHANGE_PAGE_TRANSFORM, artboard);
        }
    }    

    [INPUT('$x')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {
            var value = this.refs.$x.val()
            artboard.perspectiveOriginPositionX = Length.percent(+value);
            this.refs.$xRange.val(value);
            editor.send(CHANGE_PAGE_TRANSFORM, artboard);
        }
    }    

    [CHANGEINPUT('$xRange')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {
            var value = this.refs.$xRange.val();
            this.refs.$x.val(value);            
            artboard.perspectiveOriginPositionX = Length.percent(+value);
            editor.send(CHANGE_PAGE_TRANSFORM, artboard);
        }
    }        


    [INPUT('$y')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {
            var value = this.refs.$y.val();
            artboard.perspectiveOriginPositionY = Length.percent(+value);
            this.refs.$yRange.val(value);
            editor.send(CHANGE_PAGE_TRANSFORM, artboard);
        }
    }        


    [CHANGEINPUT('$yRange')] (e) {
        var artboard = editor.selection.artboard;
        if (artboard) {
            var value = this.refs.$yRange.val();
            this.refs.$y.val(value);
            artboard.perspectiveOriginPositionY = Length.percent(value);
            editor.send(CHANGE_PAGE_TRANSFORM, artboard);
        }        
    }            
}