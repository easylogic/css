import { editor } from "./editor";
import { Length } from "./unit/Length";
import { Layer } from "./Layer";

export class ItemPositionCalc {
    constructor() {

    }

    initialize () {
        this.cachedSelectionItems = {}
        editor.selection.items.map(it => it.clone()).forEach(it => {
            this.cachedSelectionItems[it.id] = it; 
        });

        this.rect = editor.selection.rect();
    }

    caculateMove (item, dx, dy) {
        const cacheItem = this.cachedSelectionItems[item.id]
        var x = cacheItem.x.value + dx; 
        var y = cacheItem.y.value + dy; 
        item.x = Length.px(x);
        item.y = Length.px(y);
    }    


    setupX (cacheItem) {
        var minX = this.rect.x.value; 
        var width = this.rect.width.value;         
        var maxX = minX + width; 

        var xDistRate = (cacheItem.screenX.value - minX) / width;
        var x2DistRate = (cacheItem.screenX2.value - minX) / width;


        return {minX, width, maxX, xDistRate, x2DistRate}
    }    


    setupY (cacheItem) {
        var minY = this.rect.y.value; 
        var height = this.rect.height.value;     
        var maxY = minY + height; 

        var yDistRate = (cacheItem.screenY.value - minY) / height;
        var y2DistRate = (cacheItem.screenY2.value - minY) / height;

        return {minY, height, maxY, yDistRate, y2DistRate}
    }


    setY (item, minY, maxY, yrate, y2rate) {
        var distY = Math.round(yrate);
        var distY2 = Math.round(y2rate);
        var height = distY2 - distY;

        item.y = Length.px(distY + minY) 
        if (item instanceof Layer) {
            item.y.minus(item.getArtBoard().y.value)
        }

        item.height = Length.px( height )
    }


    setX (item, minX, maxX, xrate, x2rate) {
        var distX = Math.round(xrate);
        var distX2 = Math.round(x2rate);
        var width = distX2 - distX;

        item.x = Length.px(distX + minX) 
        if (item instanceof Layer) {
            item.x.minus(item.getArtBoard().x.value)
        }

        item.width = Length.px( width )
    }

    caculateRight (item, dx, dy) {
        const cacheItem = this.cachedSelectionItems[item.id]
        let {minX, width, maxX, xDistRate, x2DistRate} = this.setupX(cacheItem)

        var totalWidth = width + dx; 
        var xr = totalWidth * xDistRate;
        var x2r = totalWidth * x2DistRate; 

        if (totalWidth >= 0) {
            this.setX(item, minX, maxX, xr, x2r);
        }
    }

    caculateBottom (item, dx, dy) {    
        const cacheItem = this.cachedSelectionItems[item.id]
        let {minY, height, maxY, yDistRate, y2DistRate} = this.setupY(cacheItem)

        var totalHeight = height + dy; 
        var yr = totalHeight * yDistRate;
        var y2r = totalHeight * y2DistRate; 

        if (totalHeight >= 0) {
            this.setY (item, minY, maxY, yr, y2r);
        }
    }


    caculateTop (item, dx, dy) {   

        const cacheItem = this.cachedSelectionItems[item.id]
        let {minY, height, maxY, yDistRate, y2DistRate} = this.setupY(cacheItem)

        minY += dy; 
        var totalHeight = maxY - minY; 

        var yr = totalHeight * yDistRate;
        var y2r = totalHeight * y2DistRate;

        if (minY <= maxY ) {
            this.setY (item, minY, maxY, yr, y2r);
        }

    }


    caculateLeft (item, dx, dy) {
        const cacheItem = this.cachedSelectionItems[item.id]
        let {minX, width, maxX, xDistRate, x2DistRate} = this.setupX(cacheItem)

        minX += dx; 
        var totalWidth = maxX - minX; 

        var xr = totalWidth * xDistRate;
        var x2r = totalWidth * x2DistRate;

        if (minX <= maxX ) {
            this.setX(item, minX, maxX, xr, x2r);
        }
    }

}