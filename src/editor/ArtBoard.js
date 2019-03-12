import { Item } from "./Item";
import { EMPTY_STRING } from "../util/css/types";
import { CSS_TO_STRING, CSS_SORTING } from "../util/css/make";
import { Length } from "./unit/Length";
import { Directory } from "./Directory";



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
            ...obj 
        })
    }


    // clone () {
    //     var json = JSON.parse(JSON.stringify(this.json));
    //     return new ArtBoard(json);
    // }    

    convert (json) {
        json = super.convert(json);

        json.width = Length.create(json.width)
        json.height = Length.create(json.height)
        json.x = Length.create(json.x)
        json.y = Length.create(json.y)        
        json.perspectiveOriginPositionX = Length.create(json.perspectiveOriginPositionX)
        json.perspectiveOriginPositionY = Length.create(json.perspectiveOriginPositionY)

        return json
    } 

    addDirectory (directory) {
        return this.addItem('directory', directory);
    }

    addLayer (layer) {
        return this.addItem('layer', layer); 
    }    

    getDefaultTitle () { return 'ArtBoard' }
     

    get directories () {
        return this.search({itemType: 'directory'})
    }    

    get layers () {
        return this.search({itemType: 'layer'})
    }        


    traverse (item, results) {
        if (item.isAttribute()) return; 
        results.push(item);

        item.children.forEach(child => {
            this.traverse(child, results);
        })
    }

    tree () {
        var results = [] 
        
        this.children.forEach(item => {
            this.traverse(item, results);
        })

        return results
    }

    get allDirectories () {
        return this.tree().filter(it => it.itemType == 'directory'); 
    }

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
            width: `${json.width}`,
            height: `${json.height}`,
            position: 'absolute',
            display: 'inline-block',
            'background-color': json.backgroundColor,
            transform: `translateX(${json.x}) translateY(${json.y}) translateZ(0px)`
        } 

        if (json.perspective) {
            css.perspective = `${json.perspective}`;
        }

        if (json.perspectiveOriginPositionX.isPercent() && json.perspectiveOriginPositionY.isPercent() ) {
            css['perspective-origin'] = `${json.perspectiveOriginPositionX} ${json.perspectiveOriginPositionY}`;
        }        
 
        return CSS_SORTING(css); 

    }

    toBoundCSS () {
        var json = this.json 
        return {
            width: json.width,
            height: json.height,
            transform: `translateX(${json.x}) translateY(${json.y}) translateZ(0px)`
        }
    }

    insertLast (source) {

        var sourceParent = source.parent()

        source.parentId = this.id;
        source.index = Number.MAX_SAFE_INTEGER;

        sourceParent.sort();
        this.sort();

    }
}