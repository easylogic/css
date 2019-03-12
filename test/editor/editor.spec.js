import { editor } from "../../src/editor/editor";
import { Project } from "../../src/editor/Project";
import { ArtBoard } from "../../src/editor/ArtBoard";
import { Layer } from "../../src/editor/Layer";

beforeEach(() => {
    editor.removeChildren()
})

test('Editor - normal', () => {
    editor.set('a', 'b');

    expect(editor.get('a')).toEqual('b');
});

test('Editor - add project', () => {
    editor.addProject(new Project())
    expect(editor.projects.length).toEqual(1);

    editor.addProject(new Project());
    expect(editor.projects.length).toEqual(2);
})

test('Editor - addArtBoard', () => {
    var project = editor.addProject(new Project())

    project.addArtBoard(new ArtBoard())

    expect(project.artboards.length).toEqual(1);

    project.artboards.forEach(artboard => {
        expect(typeof artboard.id).toEqual('string');
    });
}) 

test('Editor - removeChildren', () => {
    var project = editor.addProject(new Project())
    expect(editor.projects.length).toEqual(1);
    editor.removeChildren()
    expect(editor.projects.length).toEqual(0);
})

test('Editor - config', () => {
    editor.config.a = 'b';

    expect(editor.config.a).toEqual('b')
})

test('Editor - clone', () => {
    var project = editor.addProject(new Project());
    var artboard = project.addArtBoard(new ArtBoard());
    var layer = artboard.addLayer(new Layer());

    var cloneLayer = layer.clone(true)

    expect(layer.id != cloneLayer.id).toEqual(true);
})

test('Editor - copy', () => {
    var project = editor.addProject(new Project());
    var artboard = project.addArtBoard(new ArtBoard());
    artboard.addLayer(new Layer());
    artboard.addLayer(new Layer());
    artboard.addLayer(new Layer());
    artboard.addLayer(new Layer());
    artboard.addLayer(new Layer());

    var newArtBoard = artboard.copy()

    expect(artboard.layers.length).toEqual(newArtBoard.length-1)

})