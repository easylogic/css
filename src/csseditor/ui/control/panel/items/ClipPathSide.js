import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_LAYER, 
    CHANGE_LAYER, 
    CHANGE_LAYER_CLIPPATH, 
    EVENT_CHANGE_EDITOR, 
    EVENT_CHANGE_SELECTION, 
    EVENT_CHANGE_LAYER_CLIPPATH
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import { 
    CLIP_PATH_TYPE_NONE, 
    CLIP_PATH_TYPE_CIRCLE, 
    CLIP_PATH_TYPE_ELLIPSE, 
    CLIP_PATH_TYPE_INSET, 
    CLIP_PATH_TYPE_POLYGON, 
    CLIP_PATH_TYPE_SVG, 
    CLIP_PATH_SIDE_TYPE_NONE,
    CLIP_PATH_SIDE_TYPE_CLOSEST,
    CLIP_PATH_SIDE_TYPE_FARTHEST
} from "../../../../module/ItemTypes";
import { CHANGE } from "../../../../../util/Event";


const CLIP_PATH_SIDE_TYPES = [
    CLIP_PATH_SIDE_TYPE_NONE,
    CLIP_PATH_SIDE_TYPE_CLOSEST,
    CLIP_PATH_SIDE_TYPE_FARTHEST
]

export default class ClipPathSide extends BasePropertyItem {
    template () {
        return `
            <div class='property-item clip-path-side'>
                <div class='items'>            
                    <div>
                        <label>Side</label>
                        <div >
                            <select ref="$clipSideType">
                                ${CLIP_PATH_SIDE_TYPES.map(type => {
                                    return `<option value="${type}">${type}</option>`
                                }).join('')}
                            </select>
                        </div>
                    </div>                                                    
                </div>
            </div>
        `
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION,
        EVENT_CHANGE_LAYER_CLIPPATH
    )] () { this.refresh() }


    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            this.read('selection/current/layer', (layer) => {
                this.refs.$clipSideType.val(layer.clipPathSideType || CLIP_PATH_SIDE_TYPE_NONE);
            });
        }

    }

    isShow () {
        var item = this.read('selection/current/layer');

        if (!item) return false;
        
        if (item.clipPathType == CLIP_PATH_TYPE_CIRCLE) return true; 
        if (item.clipPathType == CLIP_PATH_TYPE_ELLIPSE) return true; 
    }    

    '@toggleClipPathSideType' () {
        this.$el.toggleClass('show');
    }

    [CHANGE('$clipSideType')] () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_CLIPPATH, {
                id, 
                clipPathSideType: this.refs.$clipSideType.val()
            })
        })
    }

}