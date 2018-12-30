import BasePropertyItem from "./BasePropertyItem";
import { 
    EVENT_CHANGE_EDITOR,
    EVENT_CHANGE_SELECTION,
    EVENT_CHANGE_LAYER_TEXT,
    CHANGE_LAYER_TEXT
} from "../../../../types/event";
import { MULTI_EVENT } from "../../../../../colorpicker/UIElement";
import UnitRange from "./element/UnitRange";
import { UNIT_PX } from "../../../../../util/css/types";
import { CHANGE } from "../../../../../util/Event";



const fontFamilyList = [
    'Georgia', 
    "Times New Roman", 
    'serif',
    'sans-serif'
]

const fontWeightList = [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900'
]


const MAX_FONT_SIZE = 300; 
const MAX_LINE_HEIGHT = 100;

export default class Font extends BasePropertyItem {
    template () {
        return `
            <div class='property-item font show'>
                <div class='title' ref="$title">Font</div>            
                <div class='items'>
                    <div>
                        <label>Family</label>   
                        <div>
                            <select ref="$fontFamily">
                                ${fontFamilyList.map(f => {
                                    return `<option value="${f}">${f}</option>`
                                }).join('')}
                            </select>
                        </div>
                    </div>   
                    <div>
                        <label>Weight</label>   
                        <div>
                            <select ref="$fontWeight">
                                ${fontWeightList.map(f => {
                                    return `<option value="${f}">${f}</option>`
                                }).join('')}
                            </select>
                        </div>
                    </div>                       
                    <div>
                        <label>Size</label>
                        <UnitRange 
                            ref="$fontSize" 
                            min="1" max="300" step="1" value="13" unit="${UNIT_PX}"
                            maxValueFunction="getMaxFontSize"
                            updateFunction="updateFontSize"
                        ></UnitRange>
                    </div>      
                    <div>
                        <label>Line Height</label>
                        <UnitRange 
                            ref="$lineHeight" 
                            min="1" max="100" step="0.01" value="1" unit="${UNIT_PX}"
                            maxValueFunction="getMaxLineHeight"
                            updateFunction="updateLineHeight"
                        ></UnitRange>
                    </div>                           
                </div>
            </div>
        `
    }  

    components () {
        return { UnitRange }
    }

    getMaxFontSize () {
        return MAX_FONT_SIZE
    }

    getMaxLineHeight () {
        return MAX_LINE_HEIGHT
    }    

    refresh () {
        this.read('selection/current/layer', layer => {
            this.refs.$fontFamily.val(layer.fontFamily);
            this.refs.$fontWeight.val(layer.fontWeight);
            this.children.$fontSize.refresh(layer.fontSize);
            this.children.$lineHeight.refresh(layer.lineHeight);
        })
    }

    [MULTI_EVENT(
        EVENT_CHANGE_LAYER_TEXT,
        EVENT_CHANGE_EDITOR,
        EVENT_CHANGE_SELECTION
    )] () {
        this.refresh();
    }

    updateFontSize (fontSize) {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, fontSize})
        })
    }

    updateLineHeight (lineHeight) {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, lineHeight})
        })
    }    

    updateFontFamily (fontFamily) {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, fontFamily})
        })
    }

    updateFontWeight (fontWeight) {
        this.read('selection/current/layer/id', (id) => {
            this.commit(CHANGE_LAYER_TEXT, {id, fontWeight})
        })
    }    

    [CHANGE('$fontFamily')] (e) {
        this.updateFontFamily(this.refs.$fontFamily.val());
    }

    [CHANGE('$fontWeight')] (e) {
        this.updateFontWeight(this.refs.$fontWeight.val());
    }    
}