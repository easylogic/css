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

const CLIP_PATH_TYPES = [
    CLIP_PATH_TYPE_NONE,
    CLIP_PATH_TYPE_CIRCLE,
    CLIP_PATH_TYPE_ELLIPSE,
    CLIP_PATH_TYPE_INSET,
    CLIP_PATH_TYPE_POLYGON,
    CLIP_PATH_TYPE_SVG
]


const CLIP_PATH_SIDE_TYPES = [
    CLIP_PATH_SIDE_TYPE_NONE,
    CLIP_PATH_SIDE_TYPE_CLOSEST,
    CLIP_PATH_SIDE_TYPE_FARTHEST
]

export default class ClipPath extends BasePropertyItem {
    template () {
        return `
            <div class='property-item clip-path show'>
                <div class='title' ref="$title">Clip Path</div>
                <div class='items'>            
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
                    <div>
                        <label>Fit Size</label>
                        <div >
                            <label><input type="checkbox" ref="$fit" /> fit to layer</label>
                        </div>
                    </div>                
                    <div>
                        <label>Clip</label>
                        <div class='clip-path-container' ref="$clipPath" title="Click me!!">

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
        this.read('/selection/current/layer', (layer) => {
            if (layer.clipPathSvg) {
                this.refs.$clipPath.html(layer.clipPathSvg)
            } else {
                this.refs.$clipPath.empty();
            }

            this.refs.$fit.checked(layer.fitClipPathSize)
            this.refs.$clipType.val(layer.clipPathType || CLIP_PATH_TYPE_NONE);
            this.refs.$clipSideType.val(layer.clipPathSideType || CLIP_PATH_SIDE_TYPE_NONE);
        });
    }

    'click $clipPath' () {
        this.emit('toggleClipPathImageList')
    }

    'click $fit' () {
        this.read('/selection/current/layer', (layer) => {

            this.commit(CHANGE_LAYER_CLIPPATH, {id: layer.id, fitClipPathSize: this.refs.$fit.checked()})
            this.refresh();            
        })
    }

    'change $clipType' () {
        this.read('/selection/current/layer', (layer) => {
            if (layer.clipPathType == CLIP_PATH_TYPE_NONE) {
                this.refs.$fit.checked(false)
                this.refs.$clipPath.empty();
                layer.clipPathSvg = '';
            }

            this.commit(CHANGE_LAYER_CLIPPATH, {
                id: layer.id, 
                clipPathSvg: layer.clipPathSvg,  
                clipPathType: this.refs.$clipType.val()
            })
        })
    }

    'change $clipSideType' () {
        this.read('/selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_CLIPPATH, {
                id, 
                clipPathSideType: this.refs.$clipSideType.val()
            })
        })
    }

}