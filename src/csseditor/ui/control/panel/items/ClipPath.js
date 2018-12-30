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
import { CHANGE, CLICK } from "../../../../../util/Event";

const CLIP_PATH_TYPES = [
    CLIP_PATH_TYPE_NONE,
    CLIP_PATH_TYPE_CIRCLE,
    CLIP_PATH_TYPE_ELLIPSE,
    CLIP_PATH_TYPE_INSET,
    CLIP_PATH_TYPE_POLYGON,
    CLIP_PATH_TYPE_SVG
]

export default class ClipPath extends BasePropertyItem {
    template () {
        return `
            <div class='property-item clip-path show'>
                <div class='title' ref="$title">Clip Path</div>
                <div class='items'>            
                    <div>
                        <label>View editor</label>
                        <div >
                            <label><input type="checkbox" ref="$showClipPathEditor" /> show clip path editor</label>
                        </div>
                    </div>                       

                    <div>
                        <label>Type</label>
                        <div >
                            <select ref="$clipType">
                                ${CLIP_PATH_TYPES.map(type => {
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
        // EVENT_CHANGE_LAYER_CLIPPATH
    )] () { this.refresh() }

    refresh() {
        this.read('selection/current/layer', (layer) => {
            this.refs.$showClipPathEditor.checked(layer.showClipPathEditor);
            this.refs.$clipType.val(layer.clipPathType || CLIP_PATH_TYPE_NONE);
        });
    }

    [CHANGE('$clipType')] () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_CLIPPATH, {
                id, 
                clipPathType: this.refs.$clipType.val()
            })
        })
    }

    [CLICK('$showClipPathEditor')] () {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_CLIPPATH, {
                id, 
                showClipPathEditor: this.refs.$showClipPathEditor.checked()
            })
        })
    }



}