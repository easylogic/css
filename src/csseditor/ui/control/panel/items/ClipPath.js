import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER, 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { CHANGE, CLICK } from "../../../../../util/Event";
import { html } from "../../../../../util/functions/func";
import { CLIP_PATH_TYPE_NONE, CLIP_PATH_TYPE_CIRCLE, CLIP_PATH_TYPE_ELLIPSE, CLIP_PATH_TYPE_INSET, CLIP_PATH_TYPE_POLYGON, CLIP_PATH_TYPE_SVG } from "../../../../../util/css/types";
import { editor } from "../../../../../editor/editor";

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
        return html`
            <div class='property-item clip-path show'>
                <div class='items'>            
                    <div>
                        <label>View editor</label>
                        <div >
                            <label><input type="checkbox" ref="$showClipPathEditor" /> show clip path editor</label>
                        </div>
                    </div>                       
                    <div>
                        <label>Type</label>
                        <div class='full-size'>
                            <select ref="$clipType">
                                ${CLIP_PATH_TYPES.map(type => {
                                    return `<option value="${type}">${type}</option>`
                                })}
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
        var layer = editor.selection.currentLayer;
        if (layer) {
            this.refs.$showClipPathEditor.checked(layer.showClipPathEditor);
            this.refs.$clipType.val(layer.clipPathType || 'none');
        }
    }

    [CHANGE('$clipType')] () {
        editor.selection.updateLayer(CHANGE_LAYER_CLIPPATH, {
            clipPathType: this.refs.$clipType.val()
        })        
    }

    [CLICK('$showClipPathEditor')] () {
        editor.selection.updateLayer(CHANGE_LAYER_CLIPPATH, {
            showClipPathEditor: this.refs.$showClipPathEditor.checked()
        })
    }



}