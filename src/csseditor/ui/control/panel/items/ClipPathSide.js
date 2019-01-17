import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER, 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH
} from "../../../../types/event";
import { EVENT } from "../../../../../colorpicker/UIElement";
import { 
    CLIP_PATH_TYPE_CIRCLE, 
    CLIP_PATH_TYPE_ELLIPSE, 
    CLIP_PATH_SIDE_TYPE_NONE,
    CLIP_PATH_SIDE_TYPE_CLOSEST,
    CLIP_PATH_SIDE_TYPE_FARTHEST
} from "../../../../module/ItemTypes";
import { CHANGE } from "../../../../../util/Event";
import { SELECTION_CURRENT_LAYER_ID, SELECTION_CURRENT_LAYER } from "../../../../module/SelectionTypes";
import { EMPTY_STRING } from "../../../../../util/css/types";


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
                                }).join(EMPTY_STRING)}
                            </select>
                        </div>
                    </div>                                                    
                </div>
            </div>
        `
    }

    [EVENT(
        CHANGE_LAYER,
        CHANGE_EDITOR,
        CHANGE_SELECTION,
        CHANGE_LAYER_CLIPPATH
    )] () { this.refresh() }


    refresh() {

        var isShow = this.isShow();

        this.$el.toggleClass('show', isShow);

        if (isShow) {

            this.read(SELECTION_CURRENT_LAYER, (layer) => {
                this.refs.$clipSideType.val(layer.clipPathSideType || CLIP_PATH_SIDE_TYPE_NONE);
            });
        }

    }

    isShow () {
        var item = this.read(SELECTION_CURRENT_LAYER);

        if (!item) return false;
        
        if (item.clipPathType == CLIP_PATH_TYPE_CIRCLE) return true; 
        if (item.clipPathType == CLIP_PATH_TYPE_ELLIPSE) return true; 
    }    

    [EVENT('toggleClipPathSideType')] () {
        this.$el.toggleClass('show');
    }

    [CHANGE('$clipSideType')] () {
        this.read(SELECTION_CURRENT_LAYER_ID, (id) => {
            this.commit(CHANGE_LAYER_CLIPPATH, {
                id, 
                clipPathSideType: this.refs.$clipSideType.val()
            })
        })
    }

}