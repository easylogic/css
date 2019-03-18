import { Item } from "./Item";

export class Project extends Item {

    add (item) {
        if (item.itemType == 'artboard') {
            return super.add(item);
        } else {
            throw new Error('It is able to only artboard in project ')
        }
            
    }

    get artboards () {
        return this.children.filter(it => it.itemType === 'artboard');
    }

    get layers () {
        var results = [] 
        this.artboards.forEach((artboard) => {
            results.push(...artboard.allLayers);
        })

        return results;
    }

    get allItems () {
        var results = [] 
        this.artboards.forEach((artboard) => {
            results.push(artboard, ...artboard.allLayers);
        })

        return results;
    }

    traverse (item, depth, results) {
        if (item.isAttribute()) return; 
        item.depth = depth;
        results.push(item);

        item.children.forEach(child => {
            this.traverse(child, depth + 1, results);
        })
    }

    tree () {
        var results = [] 
        
        this.artboards.forEach(artboard => {
            this.traverse(artboard, 1, results);
        })

        return results; 
    }

    getDefaultTitle () { return 'New Project' }    

    getDefaultObject (obj = {}) {
        return super.getDefaultObject({
            itemType: 'project',
            ...obj
        })
    }

}