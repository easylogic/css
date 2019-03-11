import BasePropertyItem from "./BasePropertyItem";
import { 
    CHANGE_LAYER, 
    CHANGE_EDITOR, 
    CHANGE_SELECTION, 
    CHANGE_LAYER_CLIPPATH
} from "../../../../types/event";
import { EVENT } from "../../../../../util/UIElement";
import { CHANGE } from "../../../../../util/Event";
import { html } from "../../../../../util/functions/func";
import { CLIP_PATH_SIDE_TYPE_NONE, CLIP_PATH_SIDE_TYPE_CLOSEST, CLIP_PATH_SIDE_TYPE_FARTHEST } from "../../../../../util/css/types";
import { editor } from "../../../../../editor/editor";

const CLIP_PATH_SIDE_TYPES = [
    CLIP_PATH_SIDE_TYPE_NONE,
    CLIP_PATH_SIDE_TYPE_CLOSEST,
    CLIP_PATH_SIDE_TYPE_FARTHEST
]

export default class ClipPathSide extends BasePropertyItem {
    template () {
        return html`
            <div class='property-item clip-path-side show'>
                <div class='items'>            
                    <div>
                        <label>Side</label>
                        <div class='full-size'>
                            <select ref="$clipSideType">
                                ${CLIP_PATH_SIDE_TYPES.map(type => {
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

        var isShow = this.isShow();

        if (isShow) {
            var layer = editor.selection.currentLayer;
            if (layer) {
                this.refs.$clipSideType.val(layer.clippath.sideType || 'none'); 
            }
        }

    }

    isShow () {
        var item = editor.selection.currentLayer;
        if (!item) return false;

        var clippath = item.clippath;
        if (!clippath) return false; 
        
        if (clippath.isCircle()) return true; 
        if (clippath.isEllipse()) return true; 

        return false; 
    }    

    [EVENT('toggleClipPathSideType')] () {
        this.$el.toggleClass('show');
    }

    [CHANGE('$clipSideType')] () {

        var layer = editor.selection.layer;
        if (layer) {
            var clippath = layer.clippath
            if (clippath) {
                clippath.sideType = this.refs.$clipSideType.val()    
            }
            editor.send(CHANGE_LAYER_CLIPPATH);
        }

    }

}