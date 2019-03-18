import MenuItem from "./MenuItem";
import { editor } from "../../../../editor/editor";
import { Rect } from "../../../../editor/shape/Rect";
import { Project } from "../../../../editor/Project";
import { ArtBoard } from "../../../../editor/ArtBoard";
import { CHANGE_EDITOR } from "../../../types/event";

let a = 0; 

export default class AddRect extends MenuItem {
    getIcon() { return 'rect'; }
    getTitle () { return 'Rectangle'; }
    clickButton (e) {
        this.add();
    }

    add () {
        var project = editor.selection.currentProject;
        if (!project) {
            project = editor.addProject(new Project({ name: 'New Project'}));
            project.select()
        }

        var artboard = project.artboard || editor.selection.currentArtBoard; 
        if (!artboard) {
            artboard = project.add(new ArtBoard({ name: 'New ArtBoard'}));
            artboard.select()
        }

        var current = editor.selection.current; 

        var layer = current.add(new Rect())
        layer.select();      

        this.emit(CHANGE_EDITOR);
    }
} 