import UIElement, { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { EVENT_CHANGE_EDITOR, CHANGE_PAGE, EVENT_CHANGE_SELECTION, EVENT_CHANGE_PAGE_TRANSFORM, CHANGE_PAGE_TRANSFORM } from "../../../../types/event";
import { UNIT_PERCENT, unitString, unitValue, percentUnit, pxUnit, UNIT_PX } from "../../../../../util/css/types";
import { CLICK, INPUT, CHANGEINPUT } from "../../../../../util/Event";
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
                            <input type="range" ref="$perspectiveRange" min="-2000" max="2000" /> 
                            <input type="number" ref="$perspective" /> <span class='unit'>${unitString(UNIT_PX)}</span>
                        </div>                        
                    </div>                                 
                    <div>
                        <label>Origin  X </label>
                        
                        <div>
                            <input type="range" ref="$xRange" min="-100" max="100" />                         
                            <input type="number" ref="$x" /> <span class='unit'>${unitString(UNIT_PERCENT)}</span>
                        </div>
                    </div>                                            
                    <div>
                        <label>Origin Y </label>
                        
                        <div>
                            <input type="range" ref="$yRange" min="-100" max="100" />                                                 
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
        this.read('selection/current/page', (item) => {
            var perspective = unitValue( defaultValue(item.perspective, pxUnit (0)) );
            var perspectiveOriginPositionX = unitValue( defaultValue(item.perspectiveOriginPositionX, percentUnit(0)) );
            var perspectiveOriginPositionY = unitValue( defaultValue(item.perspectiveOriginPositionY, percentUnit(0)) );

            this.refs.$perspective.val(perspective);
            this.refs.$x.val(perspectiveOriginPositionX);
            this.refs.$y.val(perspectiveOriginPositionY);

            this.refs.$perspectiveRange.val(perspective);
            this.refs.$xRange.val(perspectiveOriginPositionX);
            this.refs.$yRange.val(perspectiveOriginPositionY);            
            this.refs.$preserve.checked(!!item.preserve);
        })
        
    }

    [CLICK('$preserve')] (e) {

        this.read('selection/current/page/id', (id) => {
            var preserve = this.refs.$preserve.checked();

            this.commit(CHANGE_PAGE, {id, preserve});
        })
    }

    [INPUT('$perspective')] (e) {
        this.read('selection/current/page/id', (id) => {
            var value = this.refs.$perspective.val();
            var perspective = pxUnit(+value);

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspective});
            this.refs.$perspectiveRange.val(value)
        })
    }

    [CHANGEINPUT('$perspectiveRange')] (e) {
        this.read('selection/current/page/id', (id) => {
            var value = this.refs.$perspectiveRange.val();
            var perspective = pxUnit(+value);

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspective});
            this.refs.$perspective.val(value)
        })
    }    

    [INPUT('$x')] (e) {
        this.read('selection/current/page/id', (id) => {
            var value = this.refs.$x.val()
            var perspectiveOriginPositionX = percentUnit(+value);

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionX});
            this.refs.$xRange.val(value);
        })
    }    

    [CHANGEINPUT('$xRange')] (e) {
        this.read('selection/current/page/id', (id) => {
            var value = this.refs.$xRange.val();
            var perspectiveOriginPositionX = percentUnit(+value);

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionX});
            this.refs.$x.val(value);
        })
    }        


    [INPUT('$y')] (e) {
        this.read('selection/current/page/id', (id) => {
            var value = this.refs.$y.val();
            var perspectiveOriginPositionY = percentUnit(+value);

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionY});
            this.refs.$yRange.val(value);
        })
    }        


    [CHANGEINPUT('$yRange')] (e) {
        this.read('selection/current/page/id', (id) => {
            var value = this.refs.$yRange.val();
            var perspectiveOriginPositionY = percentUnit(+value);

            this.commit(CHANGE_PAGE_TRANSFORM, {id, perspectiveOriginPositionY});
            this.refs.$y.val(value);
        })
    }            
}