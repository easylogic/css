import { Item } from "./Item";
import { EMPTY_STRING } from "../util/css/types";
import { CSS_TO_STRING, CSS_SORTING } from "../util/css/make";
import { Length } from "./unit/Length";
import { BlockDisplay, Display } from "./css-property/Display";

export class ArtBoard extends Item {

    getDefaultObject (obj = {}) {
        return super.getDefaultObject({ 
            itemType: 'artboard', 
            width: Length.px(300),
            height: Length.px(400),
            backgroundColor: 'white',
            name: 'New ArtBoard',
            x: Length.px(100),
            y: Length.px(100),
            perspectiveOriginPositionX: Length.percent(0),
            perspectiveOriginPositionY: Length.percent(0),
            display: new BlockDisplay(),
            ...obj 
        })
    }

    getArtBoard () {
        return this; 
    }

    convert (json) {
        json = super.convert(json);

        json.width = Length.parse(json.width)
        json.height = Length.parse(json.height)
        json.x = Length.parse(json.x)
        json.y = Length.parse(json.y)        
        json.perspectiveOriginPositionX = Length.parse(json.perspectiveOriginPositionX)
        json.perspectiveOriginPositionY = Length.parse(json.perspectiveOriginPositionY)

        if (json.display) json.display = Display.parse(json.display);

        return json
    } 


    hasLayout () {
        var displayType = this.json.display.type

        switch(displayType) {
        case 'flex': 
        case 'grid':
            return true; 
        default: 
            return false; 
        }
    }

    getDefaultTitle () { return 'ArtBoard' }
     

    get directories () {
        return this.search({itemType: 'directory'})
    }    

    get layers () {
        return this.search({itemType: 'layer'})
    }        

    isLayoutItem () {
        return false;
    }

    traverse (item, results, hasLayoutItem) {
        if (item.isAttribute()) return; 
        if (!hasLayoutItem && item.isLayoutItem()) return; 
        if (item.parent().itemType == 'layer') return; 
        results.push(item);

        item.children.forEach(child => {
            this.traverse(child, results);
        })
    }

    tree (hasLayoutItem) {
        var results = [] 
        
        this.children.forEach(item => {
            this.traverse(item, results, hasLayoutItem);
        })

        return results
    }

    get allDirectories () {
        return this.tree().filter(it => it.itemType == 'directory'); 
    }

    /**
     * arboard 를 부모로 하고 절대좌표르 가진 layer 만 조회  
     */
    get allLayers () {
        return this.tree().filter(it => it.itemType == 'layer'); 
    }

    get texts () {
        return this.search({itemType: 'layer', type: 'text'})
    }            

    get images () {
        return this.search({itemType: 'layer', type: 'image'})
    }                


    toString () {
        return CSS_TO_STRING(this.toCSS())
    }


    toCSS () {
        var json = this.json ; 
        var css ={
            overflow: json.overflow || EMPTY_STRING,
            'transform-style': json.preserve ? 'preserve-3d' : 'flat',
            position: 'absolute',
            'background-color': json.backgroundColor
        } 
     
 
        return CSS_SORTING({
            ...css,
            ...this.toBoundCSS(),
            ...this.toLayoutCSS(),
            ...this.toPerspectiveCSS()
        }); 

    }

    toLayoutCSS () { 
        return this.json.display.toCSS()
    }

    toPerspectiveCSS() {
        var css = {} 
        var json = this.json; 

        if (json.perspective) {
            css.perspective = json.perspective;
        }

        if (json.perspectiveOriginPositionX.isPercent() && json.perspectiveOriginPositionY.isPercent() ) {
            css['perspective-origin'] = `${json.perspectiveOriginPositionX} ${json.perspectiveOriginPositionY}`;
        }           

        return css; 
    }

    insertLast (source) {

        var sourceParent = source.parent()

        source.parentId = this.id;
        source.index = Number.MAX_SAFE_INTEGER;

        sourceParent.sort();
        this.sort();

    }
}