import { EMPTY_STRING } from "../../util/css/types";
import { CSS_TO_STRING, CSS_SORTING } from "../../util/css/make";
import { Length } from "../unit/Length";
import { Display } from "../css-property/Display";
import { GroupItem } from "./GroupItem";
import { Filter } from "../css-property/Filter";
import { BackdropFilter } from "../css-property/BackdropFilter";
import { BackgroundImage } from "../css-property/BackgroundImage";
import { keyEach, combineKeyArray } from "../../util/functions/func";

export class ArtBoard extends GroupItem {

    getDefaultObject (obj = {}) {
        return super.getDefaultObject({ 
            itemType: 'artboard', 
            width: Length.px(300),
            height: Length.px(400),
            backgroundColor: 'white',
            name: 'New ArtBoard',
            x: Length.px(100),
            y: Length.px(100),
            filters: [],
            backdropFilters: [],
            backgroundImages: [],            
            perspectiveOriginPositionX: Length.percent(0),
            perspectiveOriginPositionY: Length.percent(0),
            display: Display.parse({display: 'block'}),
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
        json.filters = json.filters.map(f => Filter.parse(f));
        json.backdropFilters = json.backdropFilters.map(f =>
          BackdropFilter.parse(f)
        );
        json.backgroundImages = json.backgroundImages.map(f =>
          BackgroundImage.parse(f)
        );
    
        if (json.display) json.display = Display.parse(json.display);

        return json
    } 

    getDefaultTitle () { return 'ArtBoard' }
     

    get directories () {
        return this.search({itemType: 'directory'})
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

    /** root item 만 조회  */
    get rootItems () {
        return this.tree().filter(it => it.isRootItem()); 
    }
     
    get filters() {
        return this.json.filters;
    }
    get backdropFilters() {
        return this.json.backdropFilters;
    }
    get backgroundImages() {
        return this.json.backgroundImages || [];
    }

    addBackgroundImage(item) {
        this.json.backgroundImages.push(item);
        return item;
    }

    addFilter(item) {
        this.json.filters.push(item);
        return item;
    }

    addBackdropFilter(item) {
        this.json.backdropFilters.push(item);
        return item;
    }
    

    traverse (item, results, hasLayoutItem) {
        // var parentItemType = item.parent().itemType;
        if (item.isAttribute()) return; 
        // if (parentItemType == 'layer') return;         
        if (!hasLayoutItem && item.isLayoutItem() && !item.isRootItem()) return; 

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


    toPropertyCSS(list) {
        var results = {};
        list.forEach(item => {
          keyEach(item.toCSS(), (key, value) => {
            if (!results[key]) results[key] = [];
            results[key].push(value);
          });
        });
    
        return combineKeyArray(results);
    }

    toBackgroundImageCSS() {
        return this.toPropertyCSS(this.backgroundImages);
    }

    toFilterCSS() {
        return this.toPropertyCSS(this.filters);
    }
    toBackdropFilterCSS() {
        return this.toPropertyCSS(this.backdropFilters);
    }    

    toString () {
        return CSS_TO_STRING(this.toCSS())
    }

    toBoundString () {
        return CSS_TO_STRING(this.toBoundCSS())
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
            ...this.toDisplayCSS(),
            ...this.toPerspectiveCSS(),
            ...this.toFilterCSS(),
            ...this.toBackdropFilterCSS(),
            ...this.toBackgroundImageCSS()            
        }); 

    }

    toBoundString () {
        return CSS_TO_STRING({
            position: 'absolute',            
            ...this.toBoundCSS()
        })
    }

    toDisplayCSS () { 
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

    toGridString () {
        return '';
    }
}