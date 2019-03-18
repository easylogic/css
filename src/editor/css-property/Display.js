import { Property } from "../Property";

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

export class FlexDisplay extends Display {
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

export class GridDisplay extends Display {
    getDefaultObject (obj = {}) {
        return super.getDefaultObject({
            type: 'grid',
            display: 'grid'
        })
    }
}

const DisplayClassName = {
    'inline' : InlineDisplay,
    'inline-block': InlineBlockDisplay,
    'block': BlockDisplay,
    'flex': FlexDisplay,
    'grid': GridDisplay
}


Display.parse = (obj) => {
    var DisplayClass = DisplayClassName[obj.type];

    return new DisplayClass(obj);
}