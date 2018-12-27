import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_EDITOR, CHANGE_PAGE, EVENT_CHANGE_SELECTION, EVENT_CHANGE_PAGE_TRANSFORM, CHANGE_PAGE_TRANSFORM } from "../../../../types/event";
import { UNIT_PERCENT, unitString, unitValue, percentUnit, pxUnit, UNIT_PX } from "../../../../../util/css/types";
import { CLICK, INPUT } from "../../../../../util/Event";
import { defaultValue } from "../../../../../util/functions/func";

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
                            <input type="number" ref="$perspective" /> <span class='unit'>${unitString(UNIT_PX)}</span>
                        </div>                        
                    </div>                                 
                    <div>
                        <label>Origin  X </label>
                        
                        <div>
                            <input type="number" ref="$x" /> <span class='unit'>${unitString(UNIT_PERCENT)}</span>
                        </div>
                    </div>                                            
                    <div>
                        <label>Origin Y </label>
                        
                        <div>
                            <input type="number" ref="$y" /> <span class='unit'>${unitString(UNIT_PERCENT)}</span>
                        </div>
                    </div>                                                                
                </div>
            </div>
        `
    }

    [MULTI_EVENT(
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_PAGE_TRANSFORM
    )] () {
        this.refresh()
    }

    refresh() {
        this.read('/selection/current/page', (item) => {
            var perspective = unitValue( defaultValue(item.perspective, pxUnit (0)) );
            var perspectiveOriginPositionX = unitValue( defaultValue(item.perspectiveOriginPositionX, percentUnit(0)) );
            var perspectiveOriginPositionY = unitValue( defaultValue(item.perspectiveOriginPositionY, percentUnit(0)) );

            this.refs.$perspective.val(perspective);
            this.refs.$x.val(perspectiveOriginPositionX);
            this.refs.$y.val(perspectiveOriginPositionY);
            this.refs.$preserve.checked(!!item.preserve);
        })
        
    }

    [CLICK('$preserve')] (e) {

        this.read('/selection/current/page/id', (id) => {
            var preserve = this.refs.$preserve.checked();

            this.commit(CHANGE_PAGE, {id, preserve});
        })
    }

    [INPUT('$perspective')] (e) {
        this.read('/selection/current/page/id', (id) => {
            var perspective = pxUnit(+this.refs.$perspective.val());

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspective});
        })
    }

    [INPUT('$x')] (e) {
        this.read('/selection/current/page/id', (id) => {
            var perspectiveOriginPositionX = percentUnit(+this.refs.$x.val());

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionX});
        })
    }    


    [INPUT('$y')] (e) {
        this.read('/selection/current/page/id', (id) => {
            var perspectiveOriginPositionY = percentUnit(+this.refs.$y.val());

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionY});
        })
    }        
}