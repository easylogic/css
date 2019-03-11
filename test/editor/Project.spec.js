import { editor } from "../../src/editor/editor";
import { Project } from "../../src/editor/Project";
import { ArtBoard } from "../../src/editor/ArtBoard";

beforeEach(() => {
    editor.clear()
})

afterEach( () => {
    editor.clear()
})

test('Project - add Project', () => {
    var project = editor.addProject(new Project({ name: 'Sample Project'}));

    expect(project.name).toEqual('Sample Project');
});

test('Project - add ArtBoard', () => {
    var project = editor.addProject(new Project({ name: 'Sample Project'}));

    var artboard = project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))

    expect(artboard.name).toEqual('New ArtBoard')
});

test('Project - get artboards ', () => {
    var project = editor.addProject(new Project({ name: 'Sample Project'}));

    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))

    expect(project.artboards.length).toEqual(5)
})

test('Porject - remove all artboard', () => {
    var project = editor.addProject(new Project({ name: 'Sample Project'}));

    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))
    project.addArtBoard(new ArtBoard({ name: 'New ArtBoard'}))

    project.clear();

    // console.log(project.artboards)s

    expect(project.artboards.length).toEqual(0)
})