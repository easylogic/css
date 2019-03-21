import { MovableItem } from "./MovableItem";


export class GroupItem extends MovableItem {

    get layers () {
        return this.search({itemType: 'layer'})
    }         

    isLayoutItem () {
        return false;
    }
    
    changeDisplay (newDisplay) {
        var oldDisplay = this.json.display;

        if (oldDisplay.isLayout() && !newDisplay.isLayout()) {
            // flex, grid => inline, inline-block. block 으로 변화 
            // 실제 offset 데이타를 x,y,width, height 로 변환해서 등록 
            this.layers.forEach(layer => layer.changeOffsetToPosition())
        } 

        this.json.display = newDisplay;
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

    refreshItem (callback) {

        callback && callback(this);

        this.children.forEach(child => {
            child.refreshItem(callback);
        })        
    }

}