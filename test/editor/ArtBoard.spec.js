import { editor } from "../../src/editor/editor";
import { Project } from "../../src/editor/Project";
import { ArtBoard } from "../../src/editor/ArtBoard";
import { Layer } from "../../src/editor/Layer";
import { Length } from "../../src/editor/unit/Length";
import { Directory } from "../../src/editor/Directory";

let project, artboard;

beforeEach(() => {
    editor.clear()
    project = editor.addProject(new Project())
    artboard = project.addArtBoard(new ArtBoard({name: 'New ArtBoard'}))

})

afterEach( () => {
    editor.clear()
})

test('ArtBoard - add Directory', () => {
    var directory = artboard.addDirectory(new Directory({ name: 'Sample Group'}));

    expect(directory.name).toEqual('Sample Group');
    expect(directory.itemType).toEqual('directory');
});

test('ArtBoard - add Layer', () => {
    var layer = artboard.addLayer(new Layer({ name: 'Sample Layer'}));

    expect(layer.name).toEqual('Sample Layer');
    expect(layer.itemType).toEqual('layer');

    expect(artboard.layers.length).toEqual(1);
});

test('ArtBoard - toCSS', () => {
    var artboard = new ArtBoard({
        name: 'aaa',
        backgroundColor: 'red',
        overflow: 'hidden',
        width: Length.px(300),
        height: Length.px(400),
        perspectiveOriginPositionX: Length.percent(100),
        perspectiveOriginPositionY: Length.percent(200)
    })

    var css = artboard.toCSS()

    expect(css['background-color']).toEqual('red')
    expect(css['overflow']).toEqual('hidden')
    expect(css['width']).toEqual('300px')
    expect(css['height']).toEqual('400px')
    expect(css['perspective-origin']).toEqual('100% 200%')
})