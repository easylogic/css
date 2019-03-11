import { editor } from "../../src/editor/editor";
import { Project } from "../../src/editor/Project";
import { ArtBoard } from "../../src/editor/ArtBoard";

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