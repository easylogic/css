import { Item } from "./Item";

export class Project extends Item {

    addArtBoard (artboard) {
        return this.addItem('artboard', artboard);
    }

    add (artboard) {
        return this.addArtBoard(artboard);
    }

    get artboards () {
        return this.children.filter(it => it.itemType === 'artboard');
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

    getDefaultTitle () { return 'Project' }    

    getDefaultObject (obj = {}) {
        return super.getDefaultObject({
            itemType: 'project',
            ...obj
        })
    }

}