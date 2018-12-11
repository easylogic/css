import BasePropertyItem from "./BasePropertyItem";
import { EVENT_CHANGE_LAYER, CHANGE_LAYER , EVENT_CHANGE_EDITOR, EVENT_CHANGE_SELECTION, EVENT_CHANGE_LAYER_CLIPPATH} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";

export default class ClipPath extends BasePropertyItem {
    template () {
        return `
            <div class='property-item clip-path show'>
                <div class='title' ref="$title">Clip Image</div>
                <div class='items'>            
                    <div>
                        <label>Type</label>
                        <div >
                            <select ref="$clipType">
                                <option value="none">none</option>
                                <!-- <option value="circle">circle</option>-->
                                <!-- <option value="inset">inset</option> -->
                                <!-- <option value="polygon">polygon</option> -->
                                <option value="svg">svg</option>
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

            this.refs.$fit.el.checked = !!layer.fitClipPathSize
            this.refs.$clipType.val(layer.clipPathType);
        });
    }

    'click $clipPath' () {
        this.emit('toggleClipPathImageList')
    }

    'click $fit' () {
        this.read('/selection/current/layer', (layer) => {

            this.commit(CHANGE_LAYER, {id: layer.id, fitClipPathSize: this.refs.$fit.el.checked})
            this.refresh();            
        })
    }

    'change $clipType' () {
        this.read('/selection/current/layer', (layer) => {
            if (layer.clipPathType == 'none') {
                this.refs.$fit.el.checked = false
                this.refs.$clipPath.empty();
                layer.clipPathSvg = '';
            }

            this.commit(CHANGE_LAYER, {id: layer.id, clipPathSvg: layer.clipPathSvg,  clipPathType: this.refs.$clipType.val()})
            this.refresh();
        })
    }

}