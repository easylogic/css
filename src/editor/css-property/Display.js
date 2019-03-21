import { Property } from "../items/Property";
import { Length } from "../unit/Length";
import { WHITE_STRING } from "../../util/css/types";

export class Display extends Property {

    getDefaultObject(obj = {}) {
        return super.getDefaultObject( { 
            itemType: 'display', ...obj 
        })
    }

    toCSS () {
        return {
            'display': this.json.display
        }
    }

    isLayout () {
        return false; 
    }

}

export class LayoutDisplay extends Display {

    isLayout() {
        return true;
    }
}

export class InlineDisplay extends Display {
    getDefaultObject(obj = {}) {
        return super.getDefaultObject({
            type: 'inline',
            display: 'inline'
        })
    }
}

export class InlineBlockDisplay extends Display {
    getDefaultObject(obj = {}) {
        return super.getDefaultObject({
            type: 'inline-block',
            display: 'inline-block'
        })
    }
}

export class BlockDisplay extends Display {
    getDefaultObject(obj = {}) {
        return super.getDefaultObject({
            type: 'block',
            display: 'block'
        })
    }
}

export class FlexDisplay extends LayoutDisplay {
    getDefaultObject (obj = {}) {
        return super.getDefaultObject({
            type: 'flex',
            display: 'flex',

            // refer to https://developer.mozilla.org/docs/Web/CSS/flex-direction            
            direction: 'row', 

            // refer to https://developer.mozilla.org/docs/Web/CSS/align-items
            alignItems: 'normal',  

            // refer to https://developer.mozilla.org/docs/Web/CSS/align-content
            alignCentent: 'normal', 

            // refer to https://developer.mozilla.org/docs/Web/CSS/flex-wrap
            wrap: 'nowrap',

            justifyContent: 'flex-start'
        })
    }

    toCSS () {
        var json = this.json;
        var css = {
            display: 'flex'
        }

        if (json.direction != 'row') {
            css['flex-direction'] = json.direction
        }

        if (json.alignItems != 'normal') {
            css['align-items'] = json.alignItems
        }

        if (json.alignContent != 'normal') {
            css['align-content'] = json.alignContent
        }        

        if (json.wrap != 'nowrap') {
            css['flex-wrap'] = json.wrap
        }

        if (json.justifyContent != 'flex-start') {
            css['justify-content'] = json.justifyContent
        }        

        return css;
    }

}

export class GridDisplay extends LayoutDisplay {
    getDefaultObject (obj = {}) {
        return super.getDefaultObject({
            type: 'grid',
            display: 'grid',
            gap: Length.px(0),
            rowGap: Length.px(0),
            columnGap: Length.px(0),
            columns: [Length.fr(1)],
            rows: [Length.fr(1)],
            areas: [],
        })
    }


    toCSS () {
        var json = this.json;
        var css = {
            display: 'grid'
        }

        if (json.gap.value > 0) {
            css['grid-gap'] = json.gap
        }

        if (json.rowGap.value > 0) {
            css['grid-row-gap'] = json.rowGap
        }        

        if (json.columnGap.value > 0) {
            css['grid-column-gap'] = json.columnGap
        }                

        if (json.columns.length) {
            css['grid-template-columns'] = json.columns.join(WHITE_STRING)
        }

        if (json.rows.length) {
            css['grid-template-rows'] = json.rows.join(WHITE_STRING)
        }        

        if (json.areas.length) {
            css['grid-template-areas'] = json.areas.map(it => `"${it.join(WHITE_STRING)}"`).join(WHITE_STRING)
        }

        return css;
    }
}

const DisplayClassName = {
    'inline': InlineDisplay,
    'inline-block': InlineBlockDisplay,
    'block': BlockDisplay,
    'flex': FlexDisplay,
    'grid': GridDisplay
}


Display.parse = (obj) => {
    var DisplayClass = DisplayClassName[obj.type];

    return new DisplayClass(obj);
}